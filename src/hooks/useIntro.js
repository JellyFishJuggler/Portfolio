import { useCallback, useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { useLoadProgress } from "./useLoadProgress";
import { INTRO, INTRO_EASE } from "../data/intro";

const KEY = "intro-seen";

/* Every inline property the intro puts on the hero, so settling can take all
   of them off again and leave the element exactly as the page found it. */
const POSE_PROPS = ["transform", "will-change", "font-size", "margin-bottom"];

const clamp = (value, lo, hi) => Math.min(Math.max(value, lo), hi);

function clearPose(el) {
  if (!el) return;
  POSE_PROPS.forEach((prop) => el.style.removeProperty(prop));
}

/** Remember that the intro is done, for the rest of this browser session. */
export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* storage blocked; the intro will simply run again next load */
  }
}

/**
 * Whether this load should play the intro, settled before the first paint so
 * a home page that isn't going to animate never flashes its final state
 * first. `?intro=1` forces it on and `?intro=0` forces it off, for working on
 * the sequence without needing a fresh session.
 *
 * @returns {boolean}
 */
function wantsIntro() {
  if (typeof window === "undefined") return false;

  const forced = new URLSearchParams(window.location.search).get("intro");
  if (forced === "0") return false;
  if (forced === "1") return true;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  try {
    if (sessionStorage.getItem(KEY)) return false;
  } catch {
    /* storage blocked: treat this load as the first one */
  }
  return true;
}

/**
 * Put the wordmark in the pose the intro opens on, and report the numbers
 * the flight animates back.
 *
 * The transform goes on the hero — the element with the clip box — rather
 * than on the text, so the mask scales with the wordmark and nothing is cut
 * off on the way. The text is made bigger by raising the font-size instead
 * of by scaling the glyphs, so the glyphs are drawn at the size they are
 * shown at and the flight has no scale to unwind. That grows the box, which
 * would push the grid down, so the extra height is handed straight back as a
 * negative margin and the layout under the wordmark never moves.
 *
 * Returns null if the layout can't be measured, which is the signal to skip
 * the intro rather than animate towards a guess.
 *
 * @param {HTMLElement} hero - the clip box around the wordmark.
 * @returns {{x: number, y: number, barTop: number, fontSize: string, rest: string, margin: string}|null}
 */
function poseHero(hero) {
  const word = hero?.firstElementChild;
  if (!word) return null;

  /* Measured with a range, because the element holding the text is stretched
     to the full width of the page: its own rect is the width of the column,
     not of the wordmark. */
  const range = document.createRange();
  range.selectNodeContents(word);
  const text = range.getBoundingClientRect();
  const box = hero.getBoundingClientRect();
  if (!text.width || !text.height || !box.height) return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const narrow = vw <= INTRO.narrowBreakpoint;
  const scale = clamp(
    ((narrow ? INTRO.widthNarrow : INTRO.width) * vw) / text.width,
    INTRO.minScale,
    INTRO.maxScale,
  );

  const fontSize = parseFloat(getComputedStyle(hero).fontSize);
  if (!fontSize) return null;

  /* How far the middle of the text sits below the top of the box. offsetTop
     is layout, and the difference of the two rects cancels out the wordmark's
     own slide-in, so this holds wherever the text happens to be sitting when
     the fonts land. */
  const offsetY =
    word.offsetTop + (text.top - word.getBoundingClientRect().top) + text.height / 2;

  hero.style.fontSize = `${fontSize * scale}px`;
  const rise = hero.getBoundingClientRect().height - box.height;
  if (rise > 0) hero.style.marginBottom = `${-rise}px`;

  const centreX = box.left + box.width / 2;
  const centreY = box.top + offsetY * scale;
  const x = vw / 2 - centreX;
  const y = vh / 2 + INTRO.nudge - centreY;

  hero.style.willChange = "transform";
  hero.style.transform = `translate(${x}px, ${y}px)`;

  return {
    x,
    y,
    // the bar hangs off the bottom of the wordmark as it is on screen
    barTop: centreY + y + (text.height * scale) / 2,
    fontSize: `${fontSize * scale}px`,
    rest: `${fontSize}px`,
    margin: rise > 0 ? `${-rise}px` : "0px",
  };
}

/**
 * The first-visit intro for the home page.
 *
 * Owns the whole sequence: waiting for the fonts, measuring and posing the
 * real wordmark, holding the bar, flying it home, then taking every trace of
 * itself back off. The phases are `measuring | loading | exiting | done`, or
 * `idle` when this load isn't getting the intro at all; the page puts the
 * current one on its root as `data-intro`, and CSS does the rest.
 *
 * Nothing here renders. The wordmark is the hero's own element rather than a
 * second copy of the text, so the page needs to hand over a ref to it and to
 * the bar.
 *
 * @param {object} props
 * @param {React.RefObject<HTMLElement>} props.heroRef - the clip box.
 * @param {React.RefObject<HTMLElement>} props.barRef - the bar, faded in JS.
 * @returns {{phase: string, progress: import("framer-motion").MotionValue<number>, skip: () => void, barTop: number|null}}
 */
export function useIntro({ heroRef, barRef }) {
  /* One decision, taken once: it has to be the same on every render or the
     page would flip between its intro and final states. */
  const decidedRef = useRef(null);
  if (decidedRef.current === null) decidedRef.current = wantsIntro();
  const eligible = decidedRef.current;

  const [phase, setPhase] = useState(() => (eligible ? "measuring" : "idle"));
  const [barTop, setBarTop] = useState(null);

  const runRef = useRef(null);
  const startedRef = useRef(false);

  /* The bar finishing has to reach the timeline below, which is set up once
     in an effect, so it goes through a ref rather than a dependency. */
  const onBarComplete = useCallback(() => runRef.current?.holdThenFly(), []);

  const { progress, complete } = useLoadProgress({
    active: phase === "loading",
    onComplete: onBarComplete,
  });

  useEffect(() => {
    if (!eligible) {
      markIntroSeen();
      return undefined;
    }
    if (startedRef.current) return undefined;
    startedRef.current = true;

    const root = document.getElementById("root");
    const pending = new Set();
    let live = true;
    let flight = null;
    let skippable = false;
    let pose = null;

    /** A sleep that can be cut short when the intro is torn down. */
    const sleep = (ms) =>
      new Promise((resolve) => {
        pending.add(resolve);
        setTimeout(() => {
          pending.delete(resolve);
          resolve();
        }, ms);
      });

    /* Taking the pose off is the whole promise of the intro: at the end the
       hero must be byte-for-byte what the page would have rendered without
       any of this. Stopping the flight is not enough on its own — framer has
       a frame in flight that can write the pose straight back after the
       cleanup, which is how a resize jump used to leave the wordmark scaled
       up in a "done" page. So the pose is cleared again on the next frame,
       after the animation has definitely stopped writing. */
    const unpose = () => {
      flight?.stop();
      flight = null;
      clearPose(heroRef.current);
      const again = requestAnimationFrame(() => clearPose(heroRef.current));
      pending.add(() => cancelAnimationFrame(again));
    };

    const settle = () => {
      markIntroSeen();
      unpose();
      root?.removeAttribute("aria-busy");
      setPhase("done");
    };

    /* A viewport that changes size mid-flight would leave the wordmark
       heading for a centre that no longer exists, so it lands immediately
       instead. */
    const jump = () => {
      if (live) settle();
    };

    const onKey = (event) => {
      if (event.key !== "Escape" && event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      skip();
    };

    const arm = () => {
      skippable = true;
      window.addEventListener("keydown", onKey);
      window.addEventListener("click", skip);
    };

    const disarm = () => {
      skippable = false;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", skip);
    };

    function skip() {
      if (!skippable) return;
      skippable = false;
      complete(true);
    }

    async function holdThenFly() {
      await sleep(INTRO.barHold);
      if (!live) return;
      disarm();

      /* The bar is on its way out before the wordmark starts moving, so the
         two overlap instead of queueing. */
      const bar = barRef.current;
      if (bar) animate(bar, { opacity: 0 }, { duration: INTRO.barFade, ease: INTRO_EASE });

      await sleep(INTRO.barLead);
      if (!live) return;

      /* This is the flight. The reveal delays in CSS are fractions of it. */
      setPhase("exiting");
      flight = animate(
        heroRef.current,
        {
          x: [pose.x, 0],
          y: [pose.y, 0],
          fontSize: [pose.fontSize, pose.rest],
          marginBottom: [pose.margin, "0px"],
        },
        { duration: INTRO.flight, ease: INTRO_EASE },
      );
      await flight;
      if (!live) return;
      settle();
    }

    async function start() {
      await Promise.race([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        sleep(INTRO.fontsCap),
      ]);
      if (!live) return;

      pose = poseHero(heroRef.current);
      if (!pose) {
        settle();
        return;
      }
      setBarTop(pose.barTop);
      /* Flipping the phase is what makes the wordmark visible and starts its
         rise; the pose is already on the element, so both land together. */
      setPhase("loading");
      arm();
    }

    runRef.current = { holdThenFly, skip };
    root?.setAttribute("aria-busy", "true");
    window.addEventListener("resize", jump);
    window.addEventListener("orientationchange", jump);
    start();

    return () => {
      live = false;
      // Cleared rather than left set, so React's dev double-invoke can start
      // the sequence again from the top instead of leaving it half-run.
      startedRef.current = false;
      runRef.current = null;
      disarm();
      window.removeEventListener("resize", jump);
      window.removeEventListener("orientationchange", jump);
      unpose();
      // After unpose, so the frame it just queued is cancelled rather than
      // firing into a run that may already be starting again.
      pending.forEach((resolve) => resolve());
      pending.clear();
      root?.removeAttribute("aria-busy");
    };
  }, [complete, eligible, heroRef, barRef]);

  return { phase, progress, skip: useCallback(() => runRef.current?.skip(), []), barTop };
}

export default useIntro;

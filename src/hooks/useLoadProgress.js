import { useCallback, useEffect, useRef } from "react";
import { animate, useMotionValue } from "framer-motion";
import { INTRO } from "../data/intro";

/* The portrait tile marks its own <img>: the state machine can't take a ref
   to a node the page builds, and the tile is the only thing on the page with
   a bitmap worth waiting for. */
const PHOTO = '[data-intro-task="photo"]';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** A task that can never reject: a failed decode still counts as done. */
const ready = (task) => Promise.resolve(task).catch(() => {});

function fontsReady() {
  return document.fonts ? document.fonts.ready : undefined;
}

function photoDecoded() {
  const img = document.querySelector(PHOTO);
  if (!img) return undefined;
  if (img.decode) return img.decode();
  if (img.complete) return undefined;
  return new Promise((resolve) => {
    img.addEventListener("load", resolve, { once: true });
    img.addEventListener("error", resolve, { once: true });
  });
}

function windowLoaded() {
  if (document.readyState === "complete") return undefined;
  return new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
}

/**
 * Progress for the intro bar, tied to work the page is really doing.
 *
 * Three real tasks — webfonts, the portrait decode, the window load event —
 * plus a cap, and a floor: the value creeps toward `ceiling` whatever is
 * still outstanding, so a warm cache can't flash the intro past in a frame.
 * Both the creep and the finish animate the same motion value upwards, so
 * the bar can only ever move forward.
 *
 * @param {object} props
 * @param {boolean} props.active - run the tasks; false leaves the bar at 0.
 * @param {() => void} props.onComplete - called once the value has reached
 *   100, so the caller can start its hold-then-fly sequence.
 * @returns {{ progress: import("framer-motion").MotionValue<number>, complete: (fast?: boolean) => void }}
 */
export function useLoadProgress({ active, onComplete }) {
  const progress = useMotionValue(0);
  const creepRef = useRef(null);
  const settledRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const complete = useCallback(
    (fast = false) => {
      if (settledRef.current) return;
      settledRef.current = true;
      // A new animation on the same value supersedes the creep, which is
      // what keeps the bar from easing back down mid-fill.
      creepRef.current?.stop();
      return animate(progress, 1, {
        duration: fast ? INTRO.skipFill : INTRO.settle,
        ease: "easeOut",
      }).then(() => onCompleteRef.current?.());
    },
    [progress],
  );

  useEffect(() => {
    if (!active) return undefined;

    creepRef.current = animate(progress, INTRO.ceiling, {
      duration: INTRO.creep,
      ease: "easeOut",
    });

    let live = true;
    Promise.all([
      ready(fontsReady()),
      ready(photoDecoded()),
      ready(windowLoaded()),
      // The creep is the floor, not decoration: waiting on it is what stops a
      // warm cache from flashing the whole intro past in a single frame. The
      // cap is the ceiling on the waiting, so a task that never settles
      // doesn't strand the page.
      Promise.resolve(creepRef.current),
      wait(INTRO.taskCap),
    ]).then(() => {
      if (live) complete();
    });

    return () => {
      live = false;
      creepRef.current?.stop();
    };
  }, [active, complete, progress]);

  return { progress, complete };
}

export default useLoadProgress;

import { Fragment, useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cx } from "../../utils/cx";
import styles from "./ScrollRevealText.module.css";

/**
 * Progress-driven per-character text reveal.
 *
 * Every character has two states, dim and lit. Lit is the inherited text
 * colour; dim is that same colour at `--reveal-min` opacity. Characters
 * light up in reading order as the block scrolls through the viewport, with
 * a soft boundary that can land mid-word.
 *
 * The effect is implemented entirely in CSS: the component writes a single
 * custom property, `--p`, on the container, and each character derives its
 * own opacity from `--p`, its own index `--i`, and the total `--total`.
 * There are no React state updates during scrolling, so a ~420-character
 * block costs one style recalculation per frame rather than 420 re-renders.
 *
 * Mapping: progress is 0 when the top of the block reaches `start` of the
 * viewport height and 1 when the bottom reaches `end`. Scrolling back up
 * reverses it, so the effect is fully reversible.
 *
 * Three escape hatches, because a reveal that can get stuck dim is worse
 * than no reveal at all:
 *   - If the document is too short to ever reach progress 1, the block plays
 *     a one-time timed reveal when it first enters view instead.
 *   - Under `prefers-reduced-motion` nothing is observed and every character
 *     renders fully lit.
 *   - If the measurement throws, the block falls back to fully lit.
 *
 * Accessibility: the full text is exposed once to assistive tech in a
 * visually-hidden copy (`user-select: none`, so selecting and copying the
 * visible text does not duplicate it), while the per-character spans are
 * `aria-hidden` so screen readers never read letter by letter. The visible
 * characters remain real, selectable text.
 *
 * @param {object} props
 * @param {string} props.text - the copy to reveal. Never hardcoded here.
 * @param {React.ElementType} [props.as="p"] - element to render.
 * @param {string} [props.className] - extra classes for the container.
 * @param {number} [props.start=0.85] - viewport fraction where progress is 0.
 * @param {number} [props.end=0.5] - viewport fraction where progress is 1.
 */
export function ScrollRevealText({ text, as: Tag = "p", className, start = 0.85, end = 0.5 }) {
  const containerRef = useRef(null);
  const reduce = useReducedMotion();

  /**
   * Words are wrapped so a line can never break mid-word, and the spaces
   * between them are left as ordinary collapsible whitespace so wrapping
   * still behaves normally. Index counts characters only, which keeps it
   * monotonic in reading order regardless of where the lines break.
   */
  const words = useMemo(() => {
    let index = 0;
    return text.split(" ").map((word) => {
      const chars = Array.from(word).map((char, i) => {
        const offset = index + i;
        return { char, i: offset };
      });
      index += chars.length;
      return { chars, offset: index - chars.length };
    });
  }, [text]);

  const total = useMemo(
    () => words.reduce((sum, word) => sum + word.chars.length, 0),
    [words],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduce) return undefined;

    const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
    const write = (p) => el.style.setProperty("--p", p.toFixed(4));
    const settle = () => write(1);

    /** Distance the block must travel for progress to sweep 0 → 1. */
    const travel = (height, vh) => (start - end) * vh + height;

    let frame = 0;

    const measure = () => {
      const vh = window.innerHeight || 1;
      const rect = el.getBoundingClientRect();
      const span = travel(rect.height, vh);
      if (span <= 0) return 1;
      // rect.top is viewport-relative, so it already encodes scroll position.
      return clamp01(((start * vh - rect.top) / span));
    };

    /**
     * Whether the document is tall enough for the block to ever reach
     * progress 1. Uses document-relative position so the answer does not
     * depend on where the reader happens to be scrolled right now.
     */
    const canReachEnd = () => {
      const vh = window.innerHeight || 1;
      const rect = el.getBoundingClientRect();
      const span = travel(rect.height, vh);
      if (span <= 0) return true;
      const docTop = rect.top + window.scrollY;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - vh,
      );
      return (start * vh - docTop + maxScroll) / span >= 1;
    };

    /**
     * Progress the block would have with the document scrolled to the top.
     * If that is already 1, the block is fully lit before the reader has
     * scrolled at all and a scroll-driven reveal would never be seen —
     * document-relative, so a reload mid-page does not change the answer.
     */
    const progressAtTop = () => {
      const vh = window.innerHeight || 1;
      const rect = el.getBoundingClientRect();
      const span = travel(rect.height, vh);
      if (span <= 0) return 1;
      const docTop = rect.top + window.scrollY;
      return clamp01((start * vh - docTop) / span);
    };

    try {
      /* Two situations where scrolling cannot drive the reveal, both of
         which would otherwise leave the copy looking inert:
           - the document is too short to ever reach progress 1;
           - the block already sits past the end of the mapping on load,
             e.g. a tall viewport, or the block is above the fold.
         Both play a one-time timed reveal when the block is first seen. */
      const startsLit = progressAtTop() >= 1;
      if (!canReachEnd() || startsLit) {
        let timer = 0;
        const observer = new IntersectionObserver(
          (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            observer.disconnect();
            // Starting from 0 when the block was already lit: there is no
            // partial state to catch up to, and this is the entrance.
            const from = startsLit ? 0 : measure();
            const duration = 1500;
            const began = performance.now();
            const step = (now) => {
              const t = Math.min(1, (now - began) / duration);
              // ease-out cubic: fast start, gentle settle on the final words.
              write(from + (1 - from) * (1 - (1 - t) ** 3));
              if (t < 1) timer = requestAnimationFrame(step);
            };
            timer = requestAnimationFrame(step);
          },
          { threshold: 0.01 },
        );
        observer.observe(el);
        return () => {
          observer.disconnect();
          if (timer) cancelAnimationFrame(timer);
        };
      }

      /* Normal case: one rAF-throttled listener writing one custom property. */
      const onScroll = () => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          write(measure());
        });
      };

      write(measure());
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);

      // Line breaks depend on the loaded font, so the character count per
      // line — and therefore where the reveal boundary sits — can change.
      const fonts = document.fonts;
      if (fonts?.ready) fonts.ready.then(onScroll).catch(() => {});

      // Height changes (image loads, reflow) move the mapping.
      let observer = null;
      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(onScroll);
        observer.observe(el);
      }

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) cancelAnimationFrame(frame);
        if (observer) observer.disconnect();
      };
    } catch {
      /* Never leave the copy unreadable. */
      settle();
      return undefined;
    }
  }, [start, end, reduce]);

  return (
    <Tag
      ref={containerRef}
      className={cx(styles.root, reduce && styles.static, className)}
      style={{ "--total": total }}
    >
      <span className={styles.srCopy}>{text}</span>
      <span className={styles.chars} aria-hidden="true">
        {words.map((word, w) => (
          <Fragment key={`${word.offset}-${w}`}>
            <span className={styles.word}>
              {word.chars.map(({ char, i }) => (
                <span className={styles.char} key={i} style={{ "--i": i }}>
                  {char}
                </span>
              ))}
            </span>
            {/* Real whitespace *outside* the nowrap span: it becomes the
                line-break opportunity between two words, and collapses
                harmlessly at the end of a line. */}
            {w < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

export default ScrollRevealText;

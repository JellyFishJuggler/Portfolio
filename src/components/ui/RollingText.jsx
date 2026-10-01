import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cx } from "../../utils/cx";
import styles from "./RollingText.module.css";

/**
 * Hover "text roll" (elevator) label. On hover/focus the visible copy
 * slides up out of a clipped frame while an identical copy slides in from
 * below, rippling character by character. Purely transform-driven, driven
 * by the boolean `active` state so it is interruptible and reversible.
 *
 * The root exposes the full label as its accessible name; both layers are
 * aria-hidden so the text is read exactly once. Text stays selectable.
 *
 * @param {object} props
 * @param {string} props.text - the label; also the accessible name.
 * @param {"parent"|"self"} [props.trigger="parent"] - "parent" drives the
 *   roll from the nearest interactive ancestor (a, button, [data-roll-trigger]),
 *   falling back to the text itself; "self" only from the text.
 * @param {number} [props.stagger=0.015] - seconds per character; capped so
 *   long strings finish the roll in ~0.4s.
 * @param {number} [props.duration=0.25] - roll duration for one character.
 * @param {number[]} [props.ease=[0.76, 0, 0.24, 1]] - cubic-bezier easing.
 * @param {string} [props.className]
 */
export function RollingText({
  text,
  trigger = "parent",
  stagger = 0.015,
  duration = 0.25,
  ease = [0.76, 0, 0.24, 1],
  className,
}) {
  const rootRef = useRef(null);
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();

  const list = useMemo(
    () => [...text].map((ch) => (ch === " " ? "\u00A0" : ch)),
    [text],
  );
  /* Cap the total ripple so long labels (some 28px footer values run past
     twenty characters) finish within ~0.4s rather than crawling. */
  const step = useMemo(
    () => Math.min(stagger, 0.15 / Math.max(list.length, 1)),
    [stagger, list.length],
  );

  const set = useCallback((value) => setActive(value), []);

  useEffect(() => {
    if (reduce) return undefined;
    const root = rootRef.current;
    if (!root) return undefined;

    const triggerEl =
      trigger === "parent"
        ? root.closest("a, button, [data-roll-trigger]") || root
        : root;

    const enter = () => set(true);
    const leave = () => set(false);
    const focusin = (e) => {
      if (typeof e.target.matches === "function" && e.target.matches(":focus-visible")) {
        set(true);
      }
    };
    const focusout = () => set(false);

    /* Pointer only on precise pointers: touch taps would leave the roll
       stuck half-open. Keyboard focus still activates it everywhere. */
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) {
      triggerEl.addEventListener("pointerenter", enter);
      triggerEl.addEventListener("pointerleave", leave);
    }
    triggerEl.addEventListener("focusin", focusin);
    triggerEl.addEventListener("focusout", focusout);

    return () => {
      if (fine) {
        triggerEl.removeEventListener("pointerenter", enter);
        triggerEl.removeEventListener("pointerleave", leave);
      }
      triggerEl.removeEventListener("focusin", focusin);
      triggerEl.removeEventListener("focusout", focusout);
    };
  }, [reduce, trigger, set]);

  if (reduce) {
    return (
      <span className={cx(styles.root, className)} aria-label={text}>
        {text}
      </span>
    );
  }

  const layer = (variants) => (
    <span className={styles.layer} aria-hidden="true">
      {list.map((ch, i) => (
        <motion.span
          key={`${i}:${ch}`}
          className={styles.char}
          variants={variants}
          animate={active ? "active" : "idle"}
          transition={{ duration, ease, delay: i * step }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );

  return (
    <span ref={rootRef} className={cx(styles.root, className)} aria-label={text}>
      {layer({ idle: { y: "0%" }, active: { y: "-100%" } })}
      {layer({ idle: { y: "100%" }, active: { y: "0%" } })}
    </span>
  );
}

export default RollingText;
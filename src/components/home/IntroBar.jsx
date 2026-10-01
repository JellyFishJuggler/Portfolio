import { useRef, useState } from "react";
import { motion, useMotionValueEvent } from "framer-motion";
import styles from "./IntroBar.module.css";

/* Screen readers don't need 60 updates a second, and neither does React:
   the value is rounded down to these steps before it goes into state. */
const STEPS = 10;

/**
 * The intro's loading bar. Presentation only — the value, the skip and the
 * fade-out all belong to useIntro, and the fill is a motion value so the
 * progress animates without re-rendering anything per frame.
 *
 * @param {object} props
 * @param {import("framer-motion").MotionValue<number>} props.progress - 0…1.
 * @param {React.RefObject<HTMLElement>} props.barRef - the bar element.
 * @param {number} props.top - where the wordmark's bottom edge is on screen.
 */
export function IntroBar({ progress, barRef, top }) {
  const [value, setValue] = useState(0);
  const stepRef = useRef(0);

  useMotionValueEvent(progress, "change", (latest) => {
    const step = Math.min(Math.floor(latest * STEPS), STEPS) * (100 / STEPS);
    if (step === stepRef.current) return;
    stepRef.current = step;
    setValue(step);
  });

  return (
    <div
      ref={barRef}
      className={styles.bar}
      style={{ "--intro-bar-top": `${top}px` }}
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <motion.div className={styles.fill} style={{ scaleX: progress, originX: 0 }} />
    </div>
  );
}

export default IntroBar;

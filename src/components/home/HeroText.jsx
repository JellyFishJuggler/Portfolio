import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./HeroText.module.css";

/**
 * Oversized wordmark behind the bento grid. Old text exits upward, new
 * text rises in from below. The container keeps overflow:hidden because
 * that is what masks the slide; the padding-top plus a 1.1 line-height
 * is what keeps ascenders from being clipped.
 *
 * Decorative: the real page heading lives elsewhere, so this is
 * aria-hidden to avoid announcing a mutating wordmark.
 *
 * @param {object} props
 * @param {string} props.text - current wordmark.
 * @param {React.RefObject<HTMLElement>} [props.heroRef] - the clip box, which
 *   the home intro poses and flies.
 */
export function HeroText({ text, heroRef }) {
  const reduce = useReducedMotion();

  return (
    <div className={styles.hero} ref={heroRef} aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div
          key={text}
          initial={reduce ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: "-100%" }}
          transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {text}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default HeroText;

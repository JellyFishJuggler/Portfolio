import { motion, useReducedMotion } from "framer-motion";
import { cx } from "../../utils/cx";

/**
 * Fades content up as it enters the viewport, once. Skipped entirely
 * under prefers-reduced-motion, which would otherwise leave the element
 * sitting at opacity 0 if the observer never fires.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {React.ElementType} [props.as="div"]
 */
export function Reveal({ children, className, as = "div" }) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={cx(className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
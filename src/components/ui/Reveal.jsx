import { motion, useReducedMotion } from "framer-motion";
import { cx } from "../../utils/cx";

/* One soft rise per group, groups offset slightly so a page cascades in
   rather than appearing all at once. */
const DURATION = 0.8;
const STAGGER = 0.09;

/**
 * Fades content up over 0.8s, in one of two ways.
 *
 * `group` numbers the top-level blocks of a page: they animate as the tab
 * opens, one after another. Without it the element reveals as it scrolls
 * into view, once — the default for content nested deeper (case-study rows,
 * media, metric tiles).
 *
 * Skipped entirely under prefers-reduced-motion, which would otherwise leave
 * the element sitting at opacity 0 if the observer never fires.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {React.ElementType} [props.as="div"]
 * @param {number} [props.group] - position in the page's cascade.
 */
export function Reveal({ children, className, as = "div", group }) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] ?? motion.div;
  const from = { opacity: 0, y: 16 };
  const to = { opacity: 1, y: 0 };
  const transition = { duration: DURATION, ease: [0.22, 1, 0.36, 1] };

  const anim =
    typeof group === "number"
      ? {
          initial: from,
          animate: to,
          transition: { ...transition, delay: group * STAGGER },
        }
      : {
          initial: from,
          whileInView: to,
          viewport: { once: true, margin: "0px 0px -10% 0px" },
          transition,
        };

  return (
    <MotionTag className={cx(className)} {...anim}>
      {children}
    </MotionTag>
  );
}

export default Reveal;

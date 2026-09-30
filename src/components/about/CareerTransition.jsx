import { Reveal } from "../ui";
import useInView from "../../hooks/useInView";
import { careerTransition } from "../../data/about";
import { cx } from "../../utils/cx";
import styles from "./CareerTransition.module.css";

/**
 * The bridge from current direction into the historical sections.
 *
 * Intentionally quiet: muted, small, generous spacing, and no card, border
 * or background. It reads as an aside, not a second headline.
 *
 * Colour lifts from grey to white as it is scrolled into view — see
 * About.module.css for the shared rule.
 */
export function CareerTransition() {
  const [ref, inView] = useInView();

  return (
    <Reveal>
      <p ref={ref} className={cx(styles.transition, inView && styles.lit)}>
        {careerTransition}
      </p>
    </Reveal>
  );
}

export default CareerTransition;
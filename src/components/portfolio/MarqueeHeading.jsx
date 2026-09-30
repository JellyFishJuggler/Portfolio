import { Marquee, VisuallyHidden } from "../ui";
import styles from "./MarqueeHeading.module.css";

/** How many times the title repeats inside one copy of the loop. Enough to
 *  exceed any viewport width so the seam is never visible. */
const REPEATS = 5;

/**
 * Full-bleed section divider: the title repeated and scrolling left, with
 * a real h2 hidden for screen readers behind the decorative text.
 *
 * @param {object} props
 * @param {string} props.title - the real heading.
 * @param {number} [props.duration=40] - seconds per loop.
 */
export function MarqueeHeading({ title, duration = 40 }) {
  const line = Array.from({ length: REPEATS }, () => title).join(" – ");

  return (
    <div className={styles.wrap}>
      <VisuallyHidden as="h2">{title}</VisuallyHidden>
      <Marquee bleed decorative duration={duration} groupClassName={styles.line}>
        {line}
      </Marquee>
    </div>
  );
}

export default MarqueeHeading;
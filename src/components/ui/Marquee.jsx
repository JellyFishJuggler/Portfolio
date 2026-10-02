import { cx } from "../../utils/cx";
import useReducedMotionSafe from "../../hooks/useReducedMotionSafe";
import styles from "./Marquee.module.css";

/**
 * Seamless horizontal loop. Renders two identical copies of `children` and
 * translates by -50%, so the seam lands exactly where the second copy
 * starts. Under reduced motion it renders a single static copy instead.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - one copy of the content.
 * @param {number} [props.duration=22] - seconds per loop.
 * @param {boolean} [props.bleed=false] - wider edge fade, for full-bleed headings.
 * @param {boolean} [props.pauseOnHover=false]
 * @param {boolean} [props.decorative=false] - aria-hidden the whole thing.
 * @param {string} [props.label] - accessible name for the whole strip. Needs
 *   a role to sit on, so it is paired with role="group".
 * @param {string} [props.className] - extra classes for the viewport element.
 * @param {string} [props.trackClassName] - extra classes for the scrolling track.
 * @param {string} [props.groupClassName] - extra classes for one copy's wrapper.
 */
export function Marquee({
  children,
  duration = 22,
  bleed = false,
  pauseOnHover = false,
  decorative = false,
  label,
  className,
  trackClassName,
  groupClassName,
}) {
  const reduced = useReducedMotionSafe();

  if (reduced) {
    return (
      <div
        className={cx(styles.marquee, bleed && styles.bleed, styles.static, className)}
        {...(decorative ? { "aria-hidden": "true" } : {})}
        {...(label ? { role: "group", "aria-label": label } : {})}
      >
        <div className={cx(styles.group, groupClassName)}>{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cx(styles.marquee, bleed && styles.bleed, pauseOnHover && styles.pause, className)}
      {...(decorative ? { "aria-hidden": "true" } : {})}
      {...(label ? { role: "group", "aria-label": label } : {})}
    >
      <div
        className={cx(styles.track, trackClassName)}
        style={{ "--marquee-duration": `${duration}s` }}
      >
        <div className={cx(styles.group, groupClassName)}>{children}</div>
        <div className={cx(styles.group, groupClassName)} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Marquee;

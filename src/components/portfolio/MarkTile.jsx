import { cx } from "../../utils/cx";
import styles from "./MarkTile.module.css";

/**
 * Typographic stand-in for a project that has no cover art. It keeps the
 * card and hero frames occupied at the right aspect ratio instead of
 * rendering scaffolding text, so the layout never collapses or leaks
 * asset-path placeholders into the page.
 *
 * Decorative only: the project title is always present nearby, so this is
 * hidden from assistive technology rather than read out as an image label.
 *
 * @param {object} props
 * @param {string} props.mark - 2–3 glyph label for the project.
 * @param {"hero"|"card"} [props.variant="hero"]
 * @param {string} [props.className]
 */
export function MarkTile({ mark, variant = "hero", className }) {
  return (
    <div
      className={cx(styles.mark, variant === "card" && styles.card, className)}
      aria-hidden="true"
    >
      <span className={styles.text}>{mark}</span>
    </div>
  );
}

export default MarkTile;
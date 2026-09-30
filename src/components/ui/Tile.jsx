import styles from "./Tile.module.css";

/**
 * Square tile for the tools marquee. Renders a brand mark when `logoPath`
 * is given, otherwise the skill name as a short text label — which is how
 * XGBoost and SQL are handled, as neither has a brand mark.
 *
 * @param {object} props
 * @param {string} [props.name] - skill name, used for the label and aria.
 * @param {string} [props.logoPath] - SVG path data; omit for a text tile.
 * @param {string} [props.fill] - brand color for the mark.
 * @param {boolean} [props.hidden=false] - aria-hidden, for the duplicate copy.
 */
export function Tile({ name, logoPath, fill, hidden = false }) {
  return (
    <div className={styles.tile} {...(hidden ? { "aria-hidden": "true" } : {})}>
      {logoPath ? (
        <svg
          className={styles.media}
          viewBox="0 0 24 24"
          role="img"
          aria-label={name}
          width="100%"
          height="100%"
        >
          <path fill={fill} d={logoPath} />
        </svg>
      ) : (
        <span className={styles.label}>{name}</span>
      )}
    </div>
  );
}

export default Tile;

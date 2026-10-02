import styles from "./SkipLink.module.css";

/**
 * First tab stop on every page. The header repeats on every route and the
 * home grid is a wall of links, so a keyboard user would otherwise tab past
 * a dozen controls before reaching any content.
 *
 * Hidden until focused, in which case it sits above the fixed header. The
 * target (`#main`) carries tabindex="-1" so the browser can actually move
 * focus there rather than only scrolling.
 */
export function SkipLink() {
  return (
    <a className={styles.skip} href="#main">
      Skip to content
    </a>
  );
}

export default SkipLink;

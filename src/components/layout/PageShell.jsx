import { cx } from "../../utils/cx";
import styles from "./PageShell.module.css";

/**
 * Page frame: side padding, optional max-width, and (on home) the
 * fixed-viewport layout. The grain itself is global, on body::before.
 *
 * @param {object} props
 * @param {boolean} [props.compact=false] - home's 100dvh, no-scroll shell.
 * @param {boolean} [props.constrain=false] - cap content at --page-max.
 * @param {string} [props.introPhase] - home's intro phase, published as
 *   `data-intro` for the styles that key off it.
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function PageShell({ compact = false, constrain = false, introPhase, className, children }) {
  return (
    <div
      className={cx(styles.shell, compact && styles.compact, className)}
      data-intro={introPhase}
    >
      {constrain ? <div className={styles.inner}>{children}</div> : children}
    </div>
  );
}

export default PageShell;

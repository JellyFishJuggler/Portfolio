import { cx } from "../../utils/cx";
import styles from "./PageHeading.module.css";

/**
 * The single h1 for section pages (/portfolio and /contact). Extracted from
 * the old ProjectTitleBlock so both pages share one heading style and keep
 * the two-line balance.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
export function PageHeading({ children, className }) {
  return <h1 className={cx(styles.heading, className)}>{children}</h1>;
}

export default PageHeading;
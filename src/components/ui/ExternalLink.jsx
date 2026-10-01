import { ArrowUpRight } from "lucide-react";
import { RollingText } from "./RollingText";
import styles from "./ExternalLink.module.css";

/**
 * Muted text link with a small arrow that turns white and nudges on hover.
 * Opened in a new tab; rel="noreferrer" because the hrefs are external.
 *
 * @param {object} props
 * @param {string} props.href
 * @param {React.ReactNode} props.children - link text; a string when
 *   `roll` is set, since it becomes the RollingText label.
 * @param {number} [props.size=14] - arrow size in px.
 * @param {boolean} [props.roll=false] - roll the text on hover/focus.
 * @param {string} [props.className]
 */
export function ExternalLink({ href, children, size = 14, roll = false, className }) {
  return (
    <a
      className={`${styles.link} ${className ?? ""}`}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {roll ? <RollingText text={String(children)} /> : children}
      <ArrowUpRight className={styles.arrow} size={size} strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}

export default ExternalLink;

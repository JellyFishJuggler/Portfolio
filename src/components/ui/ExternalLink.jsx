import { ArrowUpRight } from "lucide-react";
import styles from "./ExternalLink.module.css";

/**
 * Muted text link with a small arrow that turns white and nudges on hover.
 * Opened in a new tab; rel="noreferrer" because the hrefs are external.
 *
 * @param {object} props
 * @param {string} props.href
 * @param {React.ReactNode} props.children - link text.
 * @param {number} [props.size=14] - arrow size in px.
 * @param {string} [props.className]
 */
export function ExternalLink({ href, children, size = 14, className }) {
  return (
    <a
      className={`${styles.link} ${className ?? ""}`}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
      <ArrowUpRight className={styles.arrow} size={size} strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}

export default ExternalLink;

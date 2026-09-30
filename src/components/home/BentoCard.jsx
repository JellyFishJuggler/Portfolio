import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Card } from "../ui";
import { cx } from "../../utils/cx";
import styles from "./BentoCard.module.css";

/**
 * A single bento tile. Renders label + arrow by default, or `children`
 * when a tile needs custom content (the photo card).
 *
 * Hover and focus both report the label upward, which is what drives the
 * hero wordmark swap. Internal targets use a router <Link>; external or
 * still-unresolved ones stay a plain <a>.
 *
 * @param {object} props
 * @param {string} [props.label] - tile label; also the hero swap text.
 * @param {string} [props.href] - external/unresolved URL.
 * @param {string} [props.to] - internal route for a <Link>.
 * @param {string} [props.target] - link target, for files opened in a new tab.
 * @param {(label: string|null) => void} [props.onActive]
 * @param {string} [props.className] - grid placement.
 * @param {React.ReactNode} [props.children] - replaces the label + arrow.
 */
export function BentoCard({ label, href, to, target, onActive, className, children }) {
  const handlers =
    onActive && label
      ? {
          onMouseEnter: () => onActive(label),
          onMouseLeave: () => onActive(null),
          onFocus: () => onActive(label),
          onBlur: () => onActive(null),
        }
      : {};

  const inner =
    children ?? (
      <>
        <span className={styles.label}>{label}</span>
        <ArrowUpRight className={styles.arrow} size={16} strokeWidth={1.5} aria-hidden="true" />
      </>
    );

  const cardProps = {
    className: cx(styles.card, className),
    interactive: true,
    frosted: true,
    ...handlers,
  };

  if (to) {
    return (
      <Card as={Link} to={to} {...cardProps}>
        {inner}
      </Card>
    );
  }
  if (href) {
    /* A new-tab target needs noopener/noreferrer so the opened document
       can't reach back through window.opener. */
    return (
      <Card as="a" href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} {...cardProps}>
        {inner}
      </Card>
    );
  }
  return <Card {...cardProps}>{inner}</Card>;
}

export default BentoCard;

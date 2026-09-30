import { cx } from "../../utils/cx";
import styles from "./Card.module.css";

/**
 * Base translucent card: background, 1px border, radius, grain.
 * Shared by home bento cards, project cards, metric tiles, tables and
 * code blocks so the surface treatment is defined in exactly one place.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as="div"] - element or component to render.
 * @param {boolean} [props.interactive=false] - hover/focus lift.
 * @param {boolean} [props.frosted=false] - backdrop blur, for overlap layering.
 * @param {"lg"|"md"} [props.size="lg"] - radius, lg = --radius, md = --radius-md.
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Card({
  as: Tag = "div",
  interactive = false,
  frosted = false,
  size = "lg",
  className,
  children,
  ...rest
}) {
  return (
    <Tag
      className={cx(
        styles.card,
        interactive && styles.interactive,
        frosted && styles.frosted,
        size === "md" && styles.sm,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Card;

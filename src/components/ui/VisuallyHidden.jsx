import styles from "./VisuallyHidden.module.css";

/**
 * Screen-reader-only text. Used where a real heading has to exist for
 * assistive tech but the visual design replaces it (the decorative
 * section marquees, for instance).
 *
 * @param {object} props
 * @param {React.ElementType} [props.as="span"]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function VisuallyHidden({ as: Tag = "span", className, children, ...rest }) {
  return (
    <Tag className={className ? `${styles.hidden} ${className}` : styles.hidden} {...rest}>
      {children}
    </Tag>
  );
}

export default VisuallyHidden;

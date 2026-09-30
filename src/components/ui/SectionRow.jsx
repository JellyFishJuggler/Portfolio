import styles from "./SectionRow.module.css";

/**
 * Label-in-left-column, content-in-right layout, so body copy starts at
 * roughly 59% of the page width. This is the default block for every
 * narrative section on a case study.
 *
 * @param {object} props
 * @param {React.ReactNode} props.label - short muted label ("Context", "01", …).
 * @param {React.ReactNode} props.children - body content.
 * @param {string} [props.className]
 */
export function SectionRow({ label, children, className }) {
  return (
    <div className={`${styles.row} ${className ?? ""}`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export default SectionRow;

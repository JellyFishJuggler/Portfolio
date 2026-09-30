import styles from "./ProjectTitleBlock.module.css";

/**
 * The listing's single h1. `text-wrap: balance` keeps the two-line rag
 * even rather than leaving a short second line.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function ProjectTitleBlock({ children }) {
  return (
    <h1 className={styles.title}>{children}</h1>
  );
}

export default ProjectTitleBlock;
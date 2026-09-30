import { Card } from "../ui";
import styles from "./ComingSoon.module.css";

/**
 * Shown when a project has no `sections` yet. Keeps the title, hero and
 * meta visible so the entry is not a dead link, and states plainly that
 * the write-up has not been published.
 *
 * @param {object} props
 * @param {{title: string}} props.project
 */
export function ComingSoon({ project }) {
  return (
    <Card size="md" className={styles.wrap}>
      <h2 className={styles.title}>Case study coming soon</h2>
      <p className={styles.body}>
        {project.title} is listed, but the write-up has not been published yet. Check back
        later.
      </p>
    </Card>
  );
}

export default ComingSoon;
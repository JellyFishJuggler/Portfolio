import { ProjectCard } from "./ProjectCard";
import styles from "./ProjectGrid.module.css";

/**
 * Two-column listing. A trailing odd card stays in its own column rather
 * than stretching across the row.
 *
 * @param {object} props
 * @param {object[]} props.projects - already-ordered, already-filtered entries
 *   from data/projects.
 * @param {string} [props.emptyMessage] - what to say when `projects` is empty,
 *   which is how the page reads when every entry is still a draft.
 */
export function ProjectGrid({ projects, emptyMessage }) {
  if (projects.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.grid}>
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} eager={i < 2} />
      ))}
    </div>
  );
}

export default ProjectGrid;
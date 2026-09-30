import { ProjectCard } from "./ProjectCard";
import styles from "./ProjectGrid.module.css";

/**
 * Two-column listing. A trailing odd card stays in its own column rather
 * than stretching across the row.
 *
 * @param {object} props
 * @param {object[]} props.projects - already-ordered entries from data/projects.
 */
export function ProjectGrid({ projects }) {
  if (projects.length === 0) {
    return <p className={styles.empty}>No projects yet.</p>;
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
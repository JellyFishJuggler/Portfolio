import { Link } from "react-router-dom";
import { Card, MediaFigure } from "../ui";
import { cx } from "../../utils/cx";
import styles from "./ProjectCard.module.css";

/**
 * A project tile on the listing: the cover image over a one-line caption
 * with the title and category. The whole card is one link to the case
 * study, and hovering zooms the cover inside its clipped frame.
 *
 * @param {object} props
 * @param {object} props.project - one entry from data/projects.
 * @param {boolean} [props.eager=false] - skip lazy loading for above-fold art.
 * @param {string} [props.className]
 */
export function ProjectCard({ project, eager = false, className }) {
  return (
    <Card as={Link} to={`/portfolio/${project.slug}`} interactive className={cx(styles.card, className)}>
      <div className={styles.media}>
        <MediaFigure
          src={project.cover}
          alt={`${project.title} — ${project.category}`}
          aspect="var(--ar-card)"
          radius="sm"
          hint={`/img/projects/${project.slug}/cover.webp`}
          eager={eager}
        />
      </div>
      <div className={styles.caption}>
        <span className={styles.title}>{project.title}</span>
        <span className={styles.category}>{project.category}</span>
      </div>
    </Card>
  );
}

export default ProjectCard;
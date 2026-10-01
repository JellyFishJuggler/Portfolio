import { Link } from "react-router-dom";
import { Card, MediaFigure, RollingText } from "../ui";
import { MarkTile } from "./MarkTile";
import { cx } from "../../utils/cx";
import styles from "./ProjectCard.module.css";

/**
 * A project tile on the listing: the cover image over a one-line caption
 * with the title and category. The whole card is one link to the case
 * study, and hovering zooms the cover inside its clipped frame.
 *
 * Projects without a cover fall back to a typographic `mark` tile at the
 * same aspect ratio, so the grid stays even and no scaffolding text leaks
 * into the listing.
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
        {project.cover ? (
          <MediaFigure
            src={project.cover}
            /* The caption below already names the project, so the cover is
               decorative here; a descriptive alt would be announced twice. */
            alt=""
            variant="card"
            radius="sm"
            eager={eager}
          />
        ) : (
          <MarkTile mark={project.mark} variant="card" />
        )}
      </div>
      <div className={styles.caption}>
        <RollingText text={project.title} className={styles.title} />
        <span className={styles.category}>{project.category}</span>
      </div>
    </Card>
  );
}

export default ProjectCard;
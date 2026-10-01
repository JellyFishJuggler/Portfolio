import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { VisuallyHidden } from "../ui";
import styles from "./NextProject.module.css";

/**
 * Link to the next project in registry order, wrapping at the end. The
 * project title is hidden visually but included in the accessible name, so
 * the link reads as "Next, InsightPulse" rather than a bare "Next".
 *
 * @param {object} props
 * @param {{slug: string, title: string}} props.project
 */
export function NextProject({ project }) {
  if (!project) return null;

  return (
    <nav className={styles.wrap}>
      <Link className={styles.link} to={`/portfolio/${project.slug}`}>
        Next
        <VisuallyHidden>{project.title}</VisuallyHidden>
        <ArrowRight className={styles.arrow} strokeWidth={1} aria-hidden="true" />
      </Link>
    </nav>
  );
}

export default NextProject;
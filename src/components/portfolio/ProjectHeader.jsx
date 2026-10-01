import { ExternalLink } from "../ui";
import styles from "./ProjectHeader.module.css";

const LINKS = [
  ["github", "GitHub"],
  ["demo", "Live demo"],
  ["report", "Report"],
];

/**
 * Case-study masthead: title, category, and whichever external links the
 * project actually has.
 *
 * @param {object} props
 * @param {{title: string, category: string, links: Record<string,string>}} props.project
 */
export function ProjectHeader({ project }) {
  const links = LINKS.filter(([key]) => project.links?.[key]);

  return (
    <header className={styles.wrap}>
      <div>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.category}>{project.category}</p>
      </div>

      {links.length > 0 && (
        <div className={styles.links}>
          {links.map(([key, label]) => (
            <ExternalLink key={key} href={project.links[key]} size={14}>
              {label}
            </ExternalLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default ProjectHeader;
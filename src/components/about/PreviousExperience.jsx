import { Reveal } from "../ui";
import useInView from "../../hooks/useInView";
import { headings, previousExperience } from "../../data/about";
import { cx } from "../../utils/cx";
import styles from "./PreviousExperience.module.css";

/**
 * Previous professional experience.
 *
 * The heading is deliberately "Previous Experience": this is history, and the
 * page must not let design work read as the current role. No descriptions
 * were supplied for these roles, so the description track collapses rather
 * than being filled with invented copy — adding real copy later needs no
 * layout change, since the three-track grid is already the default.
 *
 * Rows, not cards, and no logos.
 */
export function PreviousExperience() {
  const hasDescriptions = previousExperience.some((role) => role.description);
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className={cx(styles.section, inView && styles.lit)}>
      <h2 className={styles.heading}>{headings.previousExperience}</h2>

      <div className={cx(styles.list, !hasDescriptions && styles.noDescriptions)}>
        {previousExperience.map((role) => (
          <Reveal key={`${role.period}-${role.organization}`}>
            <div className={styles.row}>
              <span className={styles.period}>{role.period}</span>

              <span className={styles.role}>
                <span className={styles.roleName}>{role.role}</span>
                <span className={styles.organization}>{role.organization}</span>
              </span>

              {role.description && <span className={styles.description}>{role.description}</span>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default PreviousExperience;
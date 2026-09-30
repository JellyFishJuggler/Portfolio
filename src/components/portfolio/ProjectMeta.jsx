import styles from "./ProjectMeta.module.css";

const FIELDS = [
  ["context", "Context"],
  ["role", "Role"],
  ["year", "Year"],
  ["duration", "Duration"],
  ["status", "Status"],
];

/**
 * The five-column fact strip under the hero, plus the stack line. Fields
 * missing from the data are skipped rather than rendered as blanks.
 *
 * @param {object} props
 * @param {{context?: string, role?: string, year?: string, duration?: string, status?: string}} props.meta
 * @param {string[]} [props.stack]
 */
export function ProjectMeta({ meta, stack = [] }) {
  const fields = FIELDS.filter(([key]) => meta?.[key]);
  if (fields.length === 0 && stack.length === 0) return null;

  return (
    <>
      <dl className={styles.meta}>
        {fields.map(([key, label]) => (
          <div className={styles.field} key={key}>
            <dt className={styles.label}>{label}</dt>
            <dd className={styles.value}>{meta[key]}</dd>
          </div>
        ))}
      </dl>

      {stack.length > 0 && (
        <p className={styles.stack}>
          <span className={styles.label}>Stack </span>
          {stack.join(" · ")}
        </p>
      )}
    </>
  );
}

export default ProjectMeta;
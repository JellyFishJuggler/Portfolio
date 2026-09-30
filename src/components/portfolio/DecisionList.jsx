import { Reveal, SectionRow } from "../ui";
import styles from "./DecisionList.module.css";

/**
 * Key decisions as numbered rows (01, 02, …). Each row keeps its number as
 * the left-hand label and carries the decision's own title inside the body,
 * so a list never degrades into anonymous numbered paragraphs.
 *
 * @param {object} props
 * @param {string} [props.title] - optional heading above the list.
 * @param {{label: string, body: string}[]} props.items
 */
export function DecisionList({ title, items = [] }) {
  if (items.length === 0) return null;

  return (
    <Reveal>
      <div className={styles.list}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {items.map((item, i) => (
          <SectionRow
            key={item.label ?? i}
            label={<span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>}
            className={styles.row}
          >
            <span className={styles.label}>{item.label}</span>
            {item.body}
          </SectionRow>
        ))}
      </div>
    </Reveal>
  );
}

export default DecisionList;
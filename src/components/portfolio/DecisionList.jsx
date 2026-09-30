import { SectionRow } from "../ui";
import styles from "./DecisionList.module.css";

/**
 * Key decisions as numbered rows (01, 02, …).
 *
 * @param {object} props
 * @param {{label: string, body: string}[]} props.items
 */
export function DecisionList({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <SectionRow
          key={item.label ?? i}
          label={<span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>}
          className={styles.row}
        >
          {item.body}
        </SectionRow>
      ))}
    </div>
  );
}

export default DecisionList;
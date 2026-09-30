import { Card } from "../ui";
import styles from "./MetricTiles.module.css";

/**
 * Headline results as bordered tiles. Up to four across, dropping to two
 * on small screens.
 *
 * @param {object} props
 * @param {{value: string, label: string}[]} props.items
 */
export function MetricTiles({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <div className={styles.grid}>
      {items.map((m) => (
        <Card key={m.label} size="md" className={styles.tile}>
          <span className={styles.value}>{m.value}</span>
          <span className={styles.label}>{m.label}</span>
        </Card>
      ))}
    </div>
  );
}

export default MetricTiles;
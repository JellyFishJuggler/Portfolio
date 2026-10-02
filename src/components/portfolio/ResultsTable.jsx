import { Card } from "../ui";
import styles from "./ResultsTable.module.css";

/**
 * Comparison table for results. A row with `highlight` is emphasised as
 * the chosen configuration.
 *
 * @param {object} props
 * @param {string} [props.caption]
 * @param {string[]} props.columns
 * @param {{cells: string[], highlight?: boolean}[]} props.rows
 */
export function ResultsTable({ caption, columns = [], rows = [] }) {
  if (rows.length === 0) return null;

  return (
    <Card size="md" className={styles.wrap}>
      {caption && <p className={styles.caption}>{caption}</p>}
      <div className={styles.scroll}>
        <table className={styles.table}>
          {columns.length > 0 && (
            <thead>
              <tr>
                {columns.map((c) => (
                  /* A confusion matrix leaves the top-left cell blank by
                     convention. An empty header is announced as an empty
                     column, so it is hidden instead: the row headers below
                     already say what the axis is. */
                  <th key={c || "corner"} scope="col" {...(c ? null : { "aria-hidden": "true" })}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={row.highlight ? styles.highlight : undefined}>
                {row.cells.map((cell, j) =>
                  j === 0 ? (
                    <th key={j} scope="row" className={styles.rowHead}>
                      {cell}
                    </th>
                  ) : (
                    <td key={j}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default ResultsTable;
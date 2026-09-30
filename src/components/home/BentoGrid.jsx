import { BentoCard } from "./BentoCard";
import { cx } from "../../utils/cx";
import styles from "./BentoGrid.module.css";

/**
 * The 12-column bento grid, and the single owner of the home layout:
 *
 *   row 1  About(3)   Portfolio(9)
 *   row 2  Contact(6) photo(3)   [marquee / Resume](3)
 *
 * The right column is an equal split of the tools marquee and Resume.
 * About and Contact keep their existing plain <a> hrefs; they are still
 * unresolved and deliberately out of scope.
 *
 * `photo` and `ticker` are passed in as nodes so the page owns what they
 * are; this component only decides where they sit.
 *
 * @param {object} props
 * @param {(label: string|null) => void} props.onActive
 * @param {React.ReactNode} props.photo
 * @param {React.ReactNode} props.ticker
 */
export function BentoGrid({ onActive, photo, ticker }) {
  return (
    <main className={styles.grid}>
      <BentoCard label="About" href="/about" onActive={onActive} className={styles.span3} />
      <BentoCard label="Portfolio" to="/portfolio" onActive={onActive} className={styles.span9} />
      <BentoCard label="Contact" href="/contact" onActive={onActive} className={styles.span6} />

      <div className={cx(styles.span3, styles.fill)}>{photo}</div>

      <div className={cx(styles.stackCol, styles.span3)}>
        {ticker}
        <BentoCard label="Resume" href="#" onActive={onActive} />
      </div>
    </main>
  );
}

export default BentoGrid;

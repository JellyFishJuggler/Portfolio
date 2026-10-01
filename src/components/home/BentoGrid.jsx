import { BentoCard } from "./BentoCard";
import { site } from "../../data/site";
import { cx } from "../../utils/cx";
import styles from "./BentoGrid.module.css";

/**
 * The 12-column bento grid, and the single owner of the home layout:
 *
 *   row 1  About(3)   Portfolio(9)
 *   row 2  Contact(6) photo(3)   [marquee / Resume](3)
 *
 * The right column is an equal split of the tools marquee and Resume.
 * About, Portfolio and Contact are internal routes and use a router <Link>.
 *
 * `photo` and `ticker` are passed in as nodes so the page owns what they
 * are; this component only decides where they sit.
 *
 * @param {object} props
 * @param {(label: string|null) => void} props.onActive
 * @param {React.ReactNode} props.photo
 * @param {React.ReactNode} props.ticker
 * @param {boolean} [props.inert=false] - take the grid out of play, which the
 *   home intro does while it owns the screen.
 */
export function BentoGrid({ onActive, photo, ticker, inert = false }) {
  return (
    <main className={styles.grid} inert={inert}>
      <BentoCard label="About" to="/about" onActive={onActive} className={styles.span3} />
      <BentoCard label="Portfolio" to="/portfolio" onActive={onActive} className={styles.span9} />
      <BentoCard label="Contact" to="/contact" onActive={onActive} className={styles.span6} />

      <div className={cx(styles.span3, styles.fill)}>{photo}</div>

      <div className={cx(styles.stackCol, styles.span3)}>
        {ticker}
        <BentoCard
          label="Resume"
          href={site.resume}
          target="_blank"
          onActive={onActive}
        />
      </div>
    </main>
  );
}

export default BentoGrid;

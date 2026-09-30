import { Reveal } from "../ui";
import { headings, intro } from "../../data/about";
import styles from "./AboutHero.module.css";

/**
 * The oversized `About` heading plus the current-direction introduction.
 *
 * Editorial and left-aligned: the heading sits hard against the left edge
 * and the introduction is pushed to its right by `--about-intro-offset`, so
 * the two never stack into a conventional centred hero block. The offset
 * collapses to zero below the desktop breakpoint.
 */
export function AboutHero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>{headings.title}</h1>

      <Reveal>
        <p className={styles.intro}>{intro}</p>
      </Reveal>
    </section>
  );
}

export default AboutHero;
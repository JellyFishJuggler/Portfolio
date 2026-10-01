import { Reveal } from "../ui";
import useInView from "../../hooks/useInView";
import { headings, intro } from "../../data/about";
import { cx } from "../../utils/cx";
import styles from "./AboutHero.module.css";

/**
 * The `About` heading plus the current-direction introduction.
 *
 * Left-aligned and flush: the introduction sits directly under the heading
 * on the same left edge, at a 52ch measure so it stays readable while
 * filling only the narrative column.
 *
 * The introduction starts grey and lifts to white as it is scrolled into
 * view, and stays white — the same one-way cue used by the sections below.
 */
export function AboutHero() {
  /* requireScroll: this intro is above the fold, so the observer would
     otherwise fire on the first frame and the cue would never be seen. */
  const [ref, inView] = useInView({ requireScroll: true });

  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>{headings.title}</h1>

      <Reveal>
        <p ref={ref} className={cx(styles.intro, inView && styles.lit)}>
          {intro}
        </p>
      </Reveal>
    </section>
  );
}

export default AboutHero;
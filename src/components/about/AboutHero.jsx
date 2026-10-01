import { ScrollRevealText } from "../ui";
import { headings, intro } from "../../data/about";
import styles from "./AboutHero.module.css";

/**
 * The `About` heading plus the current-direction introduction.
 *
 * The introduction is a large editorial statement that reveals character by
 * character as it scrolls, so it is rendered by `ScrollRevealText` rather
 * than as plain copy. That component owns its own typography, so no
 * paragraph styles are applied here.
 */
export function AboutHero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>{headings.title}</h1>

      <ScrollRevealText text={intro} />
    </section>
  );
}

export default AboutHero;

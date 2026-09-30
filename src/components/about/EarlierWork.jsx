import { Reveal } from "../ui";
import useInView from "../../hooks/useInView";
import { headings, testimonials } from "../../data/about";
import { cx } from "../../utils/cx";
import styles from "./EarlierWork.module.css";

/**
 * Verbatim feedback from previous design work.
 *
 * Presented as an archival list of quotes and attributions — no stars,
 * ratings, avatars, or card chrome. The quotation marks are the only
 * ornament, kept typographic rather than a graphic.
 *
 * The section heading and quotes start grey and lift to white as the block is
 * scrolled into view, so reading down reads as progress.
 */
export function EarlierWork() {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className={cx(styles.section, inView && styles.lit)}>
      <h2 className={styles.heading}>{headings.earlierWork}</h2>

      <div className={styles.list}>
        {testimonials.map((item) => (
          <Reveal key={item.attribution}>
            <figure className={styles.item}>
              <blockquote className={styles.quote}>
                <span className={styles.mark} aria-hidden="true">
                  &ldquo;
                </span>
                {item.quote}
              </blockquote>
              <figcaption className={styles.attribution}>{item.attribution}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default EarlierWork;
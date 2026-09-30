import { portrait } from "../../data/about";
import styles from "./AboutPortrait.module.css";

/**
 * The sticky portrait column.
 *
 * The asset and its intrinsic size come from data/about.js, so swapping in
 * a transparent cutout later is a one-line change with no layout edit.
 *
 * Deliberately NOT done here, because the current asset is an opaque photo
 * rather than a cutout: no card, no border, no radius, no invented
 * background, no crop. `object-fit: contain` shows the whole frame, and the
 * empty space on the left is `--about-portrait-inset` — intentional.
 *
 * The wrapper is what sticks; the image itself does not, so the sticky
 * element is a tall block rather than a tall image that would fight the
 * viewport.
 */
export function AboutPortrait() {
  return (
    <aside className={styles.column}>
      <div className={styles.sticky}>
        <img
          className={styles.image}
          src={portrait.src}
          alt={portrait.alt}
          width={portrait.width}
          height={portrait.height}
          loading="eager"
          decoding="async"
        />
      </div>
    </aside>
  );
}

export default AboutPortrait;
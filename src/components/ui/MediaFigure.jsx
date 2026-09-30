import { cx } from "../../utils/cx";
import styles from "./MediaFigure.module.css";

/**
 * Full-width media figure with a fixed aspect ratio, so nothing shifts
 * while lazy images load. When `src` is missing it renders a dark
 * placeholder naming the expected asset path.
 *
 * @param {object} props
 * @param {string} [props.src] - image path; omit to show the placeholder.
 * @param {string} [props.alt] - real alt text, required when src is present.
 * @param {string} [props.caption] - muted caption beneath the frame.
 * @param {"cover"|"contain"} [props.fit="cover"] - object-fit.
 * @param {"hero"|"card"} [props.variant="hero"] - standard aspect ratio.
 * @param {string} [props.aspect] - one-off CSS aspect-ratio; overrides variant.
 * @param {string} [props.hint] - path shown in the placeholder.
 * @param {"md"|"sm"} [props.radius="md"]
 * @param {boolean} [props.eager=false] - skip lazy loading for above-fold art.
 */
export function MediaFigure({
  src,
  alt,
  caption,
  fit = "cover",
  variant = "hero",
  aspect,
  hint,
  radius = "md",
  eager = false,
  className,
}) {
  return (
    <figure className={cx(styles.figure, className)}>
      <div
        className={cx(
          styles.frame,
          variant === "card" && styles.card,
          variant === "hero" && styles.hero,
          radius === "sm" && styles.sm,
          fit === "contain" && styles.contain,
        )}
        style={aspect ? { "--ar": aspect } : undefined}
      >
        {src ? (
          <img
            className={styles.media}
            src={src}
            alt={alt ?? ""}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <div className={styles.placeholder}>
            <span>Add image</span>
            {hint && <span>{hint}</span>}
          </div>
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

export default MediaFigure;
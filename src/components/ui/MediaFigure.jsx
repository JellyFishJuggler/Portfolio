import { useState } from "react";
import { cx } from "../../utils/cx";
import styles from "./MediaFigure.module.css";

/**
 * Full-width media figure with a fixed aspect ratio, so nothing shifts
 * while lazy images load. When `src` is missing — or fails to load — it
 * renders a dark placeholder naming the expected asset path, which is a
 * truer signal to whoever has to fix it than a broken-image glyph.
 *
 * @param {object} props
 * @param {string} [props.src] - image path; omit to show the placeholder.
 * @param {string} [props.alt] - real alt text, required when src is present.
 * @param {string} [props.caption] - muted caption beneath the frame.
 * @param {"cover"|"contain"} [props.fit="cover"] - object-fit.
 * @param {"hero"|"card"} [props.variant="hero"] - standard aspect ratio.
 * @param {string} [props.aspect] - one-off CSS aspect-ratio; overrides variant.
 * @param {number} [props.width] - intrinsic width, for the space reservation.
 * @param {number} [props.height] - intrinsic height, for the same.
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
  width,
  height,
  hint,
  radius = "md",
  eager = false,
  className,
}) {
  const [broken, setBroken] = useState(false);

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
        {src && !broken ? (
          <img
            className={styles.media}
            src={src}
            alt={alt ?? ""}
            width={width}
            height={height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onError={() => setBroken(true)}
          />
        ) : (
          /* Scaffolding, not content: hidden so it doesn't leak into the
             accessible name of an enclosing link. */
          <div className={styles.placeholder} aria-hidden="true">
            <span>Add image</span>
            {(hint || (broken && src)) && <span>{broken ? src : hint}</span>}
          </div>
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

export default MediaFigure;
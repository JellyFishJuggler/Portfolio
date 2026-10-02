import { useState } from "react";
import { Card } from "../ui";
import { cx } from "../../utils/cx";
import styles from "./PhotoCard.module.css";

/**
 * Portrait tile. Grayscale, subject bottom-aligned.
 *
 * The <img> is marked as an intro task: the home intro waits for it to decode
 * rather than for an arbitrary delay, and this is the only bitmap on the page.
 * `width`/`height` are the asset's own pixels so the browser can reserve the
 * box before the bytes arrive.
 *
 * @param {object} props
 * @param {string} props.src
 * @param {string} [props.fallbackSrc] - tried once if `src` fails to load.
 * @param {string} props.alt
 * @param {number} [props.width] - intrinsic width of the asset.
 * @param {number} [props.height] - intrinsic height of the asset.
 * @param {string} [props.className] - grid placement.
 */
export function PhotoCard({ src, fallbackSrc, alt, width, height, className }) {
  /* A failed image keeps its box and shows the browser's broken-image glyph,
     which is worse than nothing on a tile that is mostly picture. Falling
     back once, then giving up quietly, is the smallest useful behaviour. */
  const [failed, setFailed] = useState(false);
  const src2 = failed && fallbackSrc ? fallbackSrc : src;

  return (
    <Card frosted className={cx(styles.photo, className)}>
      {src2 && (
        <img
          src={src2}
          alt={alt}
          width={width}
          height={height}
          loading="eager"
          decoding="async"
          data-intro-task="photo"
          onError={() => {
            if (fallbackSrc && !failed) setFailed(true);
          }}
        />
      )}
    </Card>
  );
}

export default PhotoCard;

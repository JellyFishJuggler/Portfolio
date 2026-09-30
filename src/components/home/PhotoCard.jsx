import { Card } from "../ui";
import { cx } from "../../utils/cx";
import styles from "./PhotoCard.module.css";

/**
 * Portrait tile. Grayscale, subject bottom-aligned.
 *
 * @param {object} props
 * @param {string} props.src
 * @param {string} props.alt
 * @param {string} [props.className] - grid placement.
 */
export function PhotoCard({ src, alt, className }) {
  return (
    <Card frosted className={cx(styles.photo, className)}>
      <img src={src} alt={alt} loading="eager" decoding="async" />
    </Card>
  );
}

export default PhotoCard;

import { Card } from "../ui";
import { cx } from "../../utils/cx";
import styles from "./PhotoCard.module.css";

/**
 * Portrait tile. Grayscale, subject bottom-aligned.
 *
 * The <img> is marked as an intro task: the home intro waits for it to decode
 * rather than for an arbitrary delay, and this is the only bitmap on the page.
 *
 * @param {object} props
 * @param {string} props.src
 * @param {string} props.alt
 * @param {string} [props.className] - grid placement.
 */
export function PhotoCard({ src, alt, className }) {
  return (
    <Card frosted className={cx(styles.photo, className)}>
      <img src={src} alt={alt} loading="eager" decoding="async" data-intro-task="photo" />
    </Card>
  );
}

export default PhotoCard;

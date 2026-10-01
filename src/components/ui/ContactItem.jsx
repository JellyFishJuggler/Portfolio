import { cx } from "../../utils/cx";
import { RollingText } from "./RollingText";
import styles from "./ContactItem.module.css";

/**
 * A contact cell: an optional small grey label above a value link. Shared by
 * the footer (default sizing) and the contact page (overridden via the
 * `--value-size` / `--label-size` custom properties).
 *
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} props.value
 * @param {string} props.href
 * @param {string} [props.title] - hover text, used to surface the handle.
 * @param {boolean} [props.roll=false] - roll the value on hover/focus.
 * @param {string} [props.className]
 */
export function ContactItem({ label, value, href, title, roll = false, className }) {
  return (
    <div className={cx(styles.item, className)}>
      {label && <span className={styles.label}>{label}</span>}
      <a className={styles.value} href={href} title={title}>
        {roll ? <RollingText text={value} /> : value}
      </a>
    </div>
  );
}

export default ContactItem;
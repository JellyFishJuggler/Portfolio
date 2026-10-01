import { cx } from "../../../utils/cx";
import styles from "./controls.module.css";

/**
 * Primary form action (Submit). Full width to match the fields above it.
 *
 * @param {object} props
 * @param {string} [props.className]
 */
export function Button({ className, ...rest }) {
  return <button className={cx(styles.button, className)} {...rest} />;
}

export default Button;
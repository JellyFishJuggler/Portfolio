import { cx } from "../../utils/cx";
import styles from "./FormStatus.module.css";

/**
 * Form-level feedback under the submit button. Always an aria-live region
 * so status changes announce; error feedback additionally gets role="alert".
 *
 * @param {object} props
 * @param {"idle"|"sending"|"success"|"error"|"info"} props.status
 * @param {string|null} props.feedback
 */
export function FormStatus({ status, feedback }) {
  return (
    <p
      aria-live="polite"
      className={cx(styles.status, status === "error" && styles.statusError)}
      role={status === "error" ? "alert" : undefined}
    >
      {feedback}
    </p>
  );
}

export default FormStatus;
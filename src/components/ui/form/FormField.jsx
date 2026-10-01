import styles from "./controls.module.css";

/**
 * A labeled form group: label above the control, error message below.
 * `data-invalid` on the wrapper drives the danger border on the control,
 * and errors are announced via `role="alert"`.
 *
 * @param {object} props
 * @param {string} props.id - the control's id (also used for the label).
 * @param {string} [props.label]
 * @param {boolean} [props.required]
 * @param {string} [props.error]
 * @param {string} [props.errorId] - id for aria-describedby on the control.
 * @param {React.ReactNode} props.children - the control itself.
 */
export function FormField({ id, label, required, error, errorId, children }) {
  return (
    <div className={styles.field} data-invalid={error ? "true" : undefined}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error && (
        <p id={errorId} role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
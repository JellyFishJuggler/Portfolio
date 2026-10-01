import styles from "./controls.module.css";

/**
 * Single-line text field. Styling-only; all behaviour (value, validation,
 * aria wiring) comes from the parent form.
 */
export function TextInput(props) {
  return <input className={styles.input} {...props} />;
}

export default TextInput;
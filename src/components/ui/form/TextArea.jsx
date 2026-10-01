import styles from "./controls.module.css";

/**
 * Multi-line message field (vertically resizable). Styling-only; all
 * behaviour (value, validation, aria wiring) comes from the parent form.
 */
export function TextArea(props) {
  return <textarea className={styles.textarea} {...props} />;
}

export default TextArea;
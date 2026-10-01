import styles from "./controls.module.css";

/**
 * Single-line text field. Styling-only; all behaviour (value, validation,
 * aria wiring) comes from the parent form. Use `inputRef` rather than
 * `ref` so the caller can focus the field without forwardRef.
 */
export function TextInput({ inputRef, className, ...props }) {
  return (
    <input
      ref={inputRef}
      className={className || styles.input}
      {...props}
    />
  );
}

export default TextInput;
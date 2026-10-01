import styles from "./controls.module.css";

/**
 * Multi-line message field (vertically resizable). Styling-only; all
 * behaviour (value, validation, aria wiring) comes from the parent form.
 * Use `inputRef` rather than `ref` so the caller can focus the field
 * without forwardRef.
 */
export function TextArea({ inputRef, className, ...props }) {
  return (
    <textarea
      ref={inputRef}
      className={className || styles.textarea}
      {...props}
    />
  );
}

export default TextArea;
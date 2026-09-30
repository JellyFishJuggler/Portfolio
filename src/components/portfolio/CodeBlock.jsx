import { Card } from "../ui";
import styles from "./CodeBlock.module.css";

/**
 * A short verbatim snippet, for configuration or an API call. Static
 * text only — no syntax highlighting, no editing.
 *
 * @param {object} props
 * @param {string} [props.caption]
 * @param {string} props.code
 * @param {string} [props.language] - recorded on the <code> element; kept for
 *   future highlighting, not used for styling today.
 */
export function CodeBlock({ caption, code, language }) {
  if (!code) return null;

  return (
    <Card size="md" className={styles.wrap}>
      {caption && <p className={styles.caption}>{caption}</p>}
      <pre className={styles.code}>
        <code data-language={language}>{code}</code>
      </pre>
    </Card>
  );
}

export default CodeBlock;
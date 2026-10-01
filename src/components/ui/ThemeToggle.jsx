import { useEffect, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import styles from "./ThemeToggle.module.css";

/* How long the switch stays open after a tap or key press, so touch users
   see the result of their tap without a hover to reveal it. */
const PEEK_MS = 1200;

/**
 * The header theme control: a 14px dot that is the switch at rest and opens
 * into a 56x28 track around itself on hover, keyboard focus, or for a short
 * peek after a press.
 *
 * The button's own box is the resting dot, so the header layout never
 * changes; the track and the fixed-size hit area are absolutely positioned
 * on top of it. Every state is a CSS transition driven by custom properties,
 * so there is no per-frame React state and reversing mid-animation is
 * smooth. `data-peek` is the one thing React owns.
 *
 * @param {object} props
 * @param {"dark"|"light"} [props.theme="dark"] - current theme; the knob
 *   sits on the side matching it.
 * @param {() => void} props.onToggle - flips the theme (useTheme's toggle).
 * @param {string} [props.className]
 */
export function ThemeToggle({ theme = "dark", onToggle, className }) {
  const [peek, setPeek] = useState(false);
  const timer = useRef(null);

  const clearPeek = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  /* The peek is a timer, so it has to die with the component. */
  useEffect(() => clearPeek, []);

  const activate = () => {
    onToggle();
    clearPeek();
    setPeek(true);
    timer.current = setTimeout(() => {
      timer.current = null;
      setPeek(false);
    }, PEEK_MS);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Dark mode"
      data-theme={theme}
      data-peek={peek ? "true" : undefined}
      className={cx(styles.toggle, className)}
      onClick={activate}
    >
      <span className={styles.hit} aria-hidden="true" />
      <span className={styles.track} aria-hidden="true" />
      <span className={styles.knob} aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;

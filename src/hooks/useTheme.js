import { useEffect, useState } from "react";

const KEY = "theme";

/**
 * Light/dark theme state, persisted to localStorage and reflected as the
 * `light` class on <html>, which theme.css keys its light palette off.
 *
 * The third entry is the theme as a name, for components that need to branch
 * on it (the switch knob's side). Existing two-element destructuring is
 * unaffected.
 *
 * @returns {[boolean, () => void, "dark"|"light"]} [isLight, toggle, theme]
 */
export function useTheme() {
  const [light, setLight] = useState(() => {
    try {
      return localStorage.getItem(KEY) === "light";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    try {
      localStorage.setItem(KEY, light ? "light" : "dark");
    } catch {
      /* storage unavailable; theme just won't persist */
    }
  }, [light]);

  return [light, () => setLight((v) => !v), light ? "light" : "dark"];
}

export default useTheme;

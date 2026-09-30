import { useEffect, useState } from "react";

const KEY = "theme";

/**
 * Light/dark theme state, persisted to localStorage and reflected as the
 * `light` class on <html>, which theme.css keys its light palette off.
 * @returns {[boolean, () => void]} [isLight, toggle]
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

  return [light, () => setLight((v) => !v)];
}

export default useTheme;

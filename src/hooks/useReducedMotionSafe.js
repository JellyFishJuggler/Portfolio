import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * prefers-reduced-motion, resolved to a boolean.
 * framer-motion's own useReducedMotion is used for its animations, but it
 * returns null on the first render and this needs a plain boolean for
 * deciding whether to render looping CSS animations at all.
 * @returns {boolean}
 */
export function useReducedMotionSafe() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    onChange();
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export default useReducedMotionSafe;

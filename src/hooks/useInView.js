import { useEffect, useRef, useState } from "react";

/**
 * Reports when an element has been scrolled into view, once.
 *
 * Used by the About page to shift text from muted grey to white as it is
 * reached, so reading down the page reads as progress. It latches on the
 * first intersection and never resets, which is what makes it a progress
 * cue rather than a blinking effect.
 *
 * `rootMargin` biases the trigger earlier than the element's own edge, so
 * the colour change starts while the block is still entering the viewport
 * instead of snapping once it is fully visible.
 *
 * @param {object} [options]
 * @param {string} [options.rootMargin="0px 0px -12% 0px"] - trigger window.
 * @param {boolean} [options.enabled=true] - set false to skip observing.
 * @returns {[React.RefObject<HTMLElement>, boolean]} ref to attach, and inView.
 */
export function useInView({ rootMargin = "0px 0px -12% 0px", enabled = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return undefined;

    // No observer support: show the settled state rather than leaving the
    // text stuck at low-contrast grey forever.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, enabled]);

  return [ref, inView];
}

export default useInView;
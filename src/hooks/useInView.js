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
 * `requireScroll` exists for text that is already above the fold on load —
 * without it the observer fires during the first frame and the effect is
 * never seen. With it, the observer is armed by the first scroll event, so
 * the text stays grey until the reader actually moves, then latches white.
 *
 * @param {object} [options]
 * @param {string} [options.rootMargin="0px 0px -12% 0px"] - trigger window.
 * @param {boolean} [options.enabled=true] - set false to skip observing.
 * @param {boolean} [options.requireScroll=false] - arm on first scroll.
 * @returns {[React.RefObject<HTMLElement>, boolean]} ref to attach, and inView.
 */
export function useInView({
  rootMargin = "0px 0px -12% 0px",
  enabled = true,
  requireScroll = false,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [armed, setArmed] = useState(!requireScroll);

  useEffect(() => {
    if (!requireScroll || armed) return undefined;
    // Any real scroll counts, including a scrollbar drag or a keyboard
    // page-down. `once` keeps this to a single listener for the page.
    const arm = () => setArmed(true);
    window.addEventListener("scroll", arm, { once: true, passive: true });
    return () => window.removeEventListener("scroll", arm);
  }, [requireScroll, armed]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || !armed) return undefined;

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
  }, [rootMargin, enabled, armed]);

  return [ref, inView];
}

export default useInView;
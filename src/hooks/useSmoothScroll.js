import { useEffect } from "react";

/**
 * Soft, accelerated document scrolling for precise pointers (mouse /
 * trackpad): wheel input is eased over requestAnimationFrame with a slight
 * speed boost, so the page glides instead of jumping. Native scroll is
 * never detached from — we drive `window.scrollTo`, so scroll-linked work
 * (IntersectionObserver reveals, the About character reveal) keeps firing.
 *
 * Guarded: touch drags pass through untouched, and prefers-reduced-motion
 * leaves scrolling native. Wheels inside a nested scrollable element are
 * left alone, and Ctrl/meta (pinch zoom) is never intercepted.
 *
 * @param {boolean} [active=true] - set false to skip the whole effect.
 */
export function useSmoothScroll(active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduce.matches || !fine.matches) return undefined;

    let current = window.scrollY;
    let target = window.scrollY;
    let raf = null;

    const max = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const isNestedScrollable = (el) => {
      let node = el instanceof Element ? el : document.body;
      while (node && node !== document.documentElement) {
        const s = getComputedStyle(node);
        if (node.scrollHeight > node.clientHeight + 1) {
          if (
            s.overflowY === "auto" ||
            s.overflowY === "scroll" ||
            s.overflow === "auto" ||
            s.overflow === "scroll"
          ) {
            return true;
          }
        }
        node = node.parentElement;
      }
      return false;
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        raf = null;
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e) => {
      if (e.ctrlKey || e.metaKey) return;
      if (isNestedScrollable(e.target)) return;
      e.preventDefault();
      /* 1.15 gives the scroll a touch of acceleration on top of the
         eased ramp; the spring below provides the soft landing. */
      target = Math.min(Math.max(0, target + e.deltaY * 1.15), max());
      if (!raf) raf = requestAnimationFrame(tick);
    };

    /* Scrollbars, keyboard and programmatic scroll bypass the wheel
       path; re-anchor so the next wheel resume continues from reality. */
    const onScroll = () => {
      if (raf) return;
      current = window.scrollY;
      target = current;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active]);
}

export default useSmoothScroll;
import { useEffect } from "react";

/**
 * @param {string} title - full document.title for this page.
 * @returns {void}
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

/**
 * @returns {null} placeholder; real page lands in a later commit.
 */
export default function Portfolio() {
  useDocumentTitle("Portfolio — Srijan Gupta");
  return null;
}

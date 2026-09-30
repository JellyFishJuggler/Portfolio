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

export default function Home() {
  useDocumentTitle("Srijan Gupta — AI/ML Engineer");
  return null;
}

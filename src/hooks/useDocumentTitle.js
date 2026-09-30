import { useEffect } from "react";

/**
 * Sets document.title for the lifetime of the calling page.
 * @param {string} title
 * @returns {void}
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default useDocumentTitle;

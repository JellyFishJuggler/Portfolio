import { useEffect } from "react";

/**
 * Sets the document title and meta description for the lifetime of the
 * calling page. Everything social that can be set from the document head is
 * here, so a route has one place to declare what it is about.
 *
 * The static tags in index.html are what crawlers and chat apps actually read:
 * most don't execute JavaScript, so a client-set description only ever helps
 * a visitor who is already on the page. This hook keeps the tab and any
 * crawler that does render in agreement with the route.
 *
 * @param {object} meta
 * @param {string} meta.title - document title, used as-is.
 * @param {string} [meta.description] - meta description, also used as the
 *   og and twitter description so all three can't disagree.
 * @returns {void}
 */
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    document.title = title;

    if (!description) return undefined;

    /* Set rather than create: the tags already exist in index.html, and
       recreating them would drop their position in the head. */
    const setContent = (selector, content) => {
      const tag = document.head.querySelector(selector);
      if (tag) tag.setAttribute("content", content);
    };

    setContent('meta[name="description"]', description);
    setContent('meta[property="og:description"]', description);
    setContent('meta[name="twitter:description"]', description);

    return undefined;
  }, [title, description]);
}

export default useDocumentMeta;

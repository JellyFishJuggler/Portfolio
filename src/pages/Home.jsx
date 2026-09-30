import { useEffect } from "react";
import BentoHome from "../components/BentoHome";

export const PAGE_TITLES = {
  portfolio: "Portfolio — Srijan Gupta",
  caseStudy: (title) => `${title} — Srijan Gupta`,
};

/**
 * @param {string} title - full document.title for this page.
 * @returns {void}
 */
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default function Home() {
  useDocumentTitle("Srijan Gupta — AI/ML Engineer");
  return <BentoHome />;
}

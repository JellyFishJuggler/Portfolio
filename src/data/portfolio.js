/**
 * Copy for the portfolio listing page. Lives here with the rest of the
 * wording so the page component holds no strings of its own.
 */

/** Page heading, set as a marquee above the grid. */
export const portfolioIntro =
  "Dive into a few projects that represent my most fulfilling AI and machine learning work";

/**
 * Shown in place of the grid when nothing is publishable yet — which happens
 * when every project still carries TODO copy and the production filter hides
 * them all. Wording avoids the word "TODO" so the marker never reaches a
 * visitor.
 */
export const portfolioEmpty = "Projects coming soon.";

export default { portfolioIntro, portfolioEmpty };

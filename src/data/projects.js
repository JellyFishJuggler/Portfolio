/**
 * Project registry. Adding a project means adding one object here and,
 * optionally, files under `public/img/projects/<slug>/`. Nothing else in
 * the app needs to change.
 *
 * Field reference
 * ----------------
 * slug      (required) URL segment: /portfolio/<slug>
 * title     (required) display title
 * category  (required) short descriptor shown on the listing card
 * cover     cover image path; omit to render a placeholder
 * hero      case-study hero image path; omit to render a placeholder
 * meta      { context, role, year, duration, status } — status/role are free text
 * stack     string[] tool names
 * links     { github?, demo?, report? } — only render what is present
 * metrics   [{ value, label }] headline results
 * sections  ordered blocks; empty/absent renders ComingSoon
 * order     optional sort key, ascending
 * featured  optional flag; ordering falls back to array position
 *
 * Section block types (see SectionRenderer's registry):
 *   { type: "marquee",   title }
 *   { type: "rows",      rows: [{ label, body }] }
 *   { type: "media",     src, alt, caption, aspect, fit }
 *   { type: "metrics",   items: [{ value, label }] }
 *   { type: "table",     caption, columns, rows, highlightRow }
 *   { type: "code",      caption, language, code }
 *   { type: "decisions", title, items: [{ label, body }] }
 *
 * Unverified claims carry a "TODO: verify" note rather than a guess.
 */

export const projects = [
  {
    slug: "aquis",
    title: "AQUIS",
    category: "Time-Series Forecasting",
    cover: null, // TODO: add /img/projects/aquis/cover.webp
    hero: null, // TODO: add /img/projects/aquis/hero.webp
    meta: {
      context: "TODO: describe the problem and who it was for.",
      role: "TODO: your role on the team.",
      year: "TODO",
      duration: "TODO",
      status: "TODO",
    },
    stack: ["Python", "XGBoost", "Streamlit"],
    links: {}, // TODO: add { github, demo, report } once they exist.
    metrics: [], // TODO: add headline results.
    sections: [
      { type: "marquee", title: "From readings to forecasts" },
      { type: "rows", rows: [{ label: "Context", body: "TODO: what the model had to predict and why." }] },
      { type: "media", src: null, alt: "", caption: "TODO: caption", aspect: "888 / 570" },
      { type: "rows", rows: [{ label: "Approach", body: "TODO: features, model choice, validation." }] },
      { type: "metrics", items: [] },
      { type: "rows", rows: [{ label: "Result", body: "TODO: what improved, and for whom." }] },
    ],
    order: 1,
    featured: true,
  },
  {
    slug: "upi-fraud-detector",
    title: "UPI Fraud Detector",
    category: "Fraud Detection",
    cover: null, // TODO: add /img/projects/upi-fraud-detector/cover.webp
    hero: null, // TODO: add /img/projects/upi-fraud-detector/hero.webp
    meta: {
      context: "Built for a Razorpay hackathon. TODO: confirm the brief.",
      role: "TODO: your role on the team.",
      year: "TODO",
      duration: "TODO",
      status: "Hackathon entry",
    },
    stack: ["Python", "Pandas", "scikit-learn"],
    links: {}, // TODO: add { github, demo, report } once they exist.
    metrics: [
      { value: "99.33%", label: "Recall — TODO: verify against the hackathon writeup" },
      { value: "TODO", label: "Precision" },
      { value: "TODO", label: "Fraud class count" },
    ],
    sections: [
      { type: "marquee", title: "Catching the transaction that shouldn't exist" },
      { type: "rows", rows: [{ label: "Context", body: "TODO: the hackathon brief and dataset." }] },
      { type: "media", src: null, alt: "", caption: "TODO: caption", aspect: "888 / 570" },
      { type: "rows", rows: [{ label: "Approach", body: "TODO: features, model choice, validation." }] },
      {
        type: "table",
        caption: "TODO: confirm these numbers before publishing.",
        columns: ["Model", "Precision", "Recall", "F1"],
        rows: [
          { cells: ["TODO", "TODO", "TODO", "TODO"] },
          { cells: ["TODO", "TODO", "TODO", "TODO"], highlight: true },
        ],
      },
      { type: "rows", rows: [{ label: "Result", body: "TODO: what the model would have caught." }] },
    ],
    order: 2,
    featured: true,
  },
  {
    slug: "maternal-health-risk",
    title: "Maternal Health Risk",
    category: "Healthcare Classification",
    stack: ["Python", "Pandas", "scikit-learn"],
  },
  {
    slug: "spam-mail-detector",
    title: "Spam Mail Detector",
    category: "NLP Classification",
    stack: ["Python", "Pandas", "scikit-learn"],
  },
  {
    slug: "clinicdocs-ai",
    title: "ClinicDocs AI",
    category: "RAG Assistant",
    stack: ["Python", "Streamlit"],
  },
  {
    slug: "insightpulse",
    title: "InsightPulse",
    category: "Analytics Dashboard",
    stack: ["Python", "Streamlit", "SQL"],
  },
];

/** Normalized so every consumer can skip optional fields. */
export const allProjects = projects.map((p) => ({
  cover: null,
  hero: null,
  meta: {},
  stack: [],
  links: {},
  metrics: [],
  sections: [],
  ...p,
}));

/** Sorted by explicit `order`, then by declaration order for the rest. */
export const sortedProjects = allProjects
  .map((project, index) => ({ project, index }))
  .sort(
    (a, b) =>
      (a.project.order ?? Number.MAX_SAFE_INTEGER) - (b.project.order ?? Number.MAX_SAFE_INTEGER) ||
      a.index - b.index,
  )
  .map(({ project }) => project);

/** @returns {object|undefined} the project for `slug`. */
export function getProject(slug) {
  return allProjects.find((p) => p.slug === slug);
}

/** @returns {object|undefined} the project after `slug`, wrapping at the end. */
export function getNextProject(slug) {
  const i = sortedProjects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return sortedProjects[(i + 1) % sortedProjects.length];
}

export default sortedProjects;
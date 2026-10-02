/**
 * Per-route document metadata. Titles and descriptions live here rather than
 * inside the pages so the whole set can be read at a glance, and so the
 * sitemap, share tags and tab titles are all obviously in agreement.
 *
 * `description` is applied to meta[name=description] as well as the og and
 * twitter variants, so those three can never drift apart.
 */
export const routeMeta = {
  "/": {
    title: "Srijan Gupta — AI/ML Engineer",
    description:
      "Srijan Gupta — AI/ML Engineer building machine learning systems and interfaces.",
  },
  "/portfolio": {
    title: "Portfolio — Srijan Gupta",
    description:
      "Selected AI and machine learning projects: fraud detection, repository question-answering, and a from-scratch maths library — with the numbers behind each.",
  },
  "/contact": {
    title: "Contact — Srijan Gupta",
    description:
      "Get in touch with Srijan Gupta about AI/ML engineering, machine learning projects, or collaboration.",
  },
  "/about": {
    title: "About — Srijan Gupta",
    description:
      "Srijan Gupta is an AI/ML engineer and data scientist with a background in product design, working across machine learning, data science and interface engineering.",
  },
};

/**
 * Metadata for one case study. Built from the project's own copy rather than
 * a parallel table, so a project can never ship without a description.
 *
 * @param {object} [project] - an entry from the project registry.
 * @returns {{title: string, description: string}}
 */
export function projectMeta(project) {
  if (!project) return routeMeta["/portfolio"];
  const summary = project.meta?.context ?? "";
  return {
    title: `${project.title} — Srijan Gupta`,
    description: summary
      ? `${project.title} — ${project.category}. ${summary}`
      : `${project.title} — ${project.category}.`,
  };
}

export default routeMeta;

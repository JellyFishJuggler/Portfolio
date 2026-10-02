/**
 * Project registry. Adding a project means adding one object here and,
 * optionally, a cover image under `public/img/projects/<slug>/`. Nothing
 * else in the app needs to change.
 *
 * Field reference
 * ----------------
 * slug      (required) URL segment: /portfolio/<slug>
 * title     (required) display title
 * category  (required) short descriptor shown on the listing card
 * mark      (required) 2–3 glyph cover label, used when there is no `cover`
 * cover     cover image path; omit to render the typographic `mark` tile
 * hero      case-study hero image path; omit to render the typographic tile
 * meta      { context, role, year, duration, status } — status/role are free text
 * stack     string[] tool names
 * links     { github?, demo?, report? } — only render what is present
 * metrics   [{ value, label }] headline results, rendered under the meta row
 * sections  ordered blocks; empty/absent renders ComingSoon
 * order     optional sort key, ascending
 *
 * A `metrics` block also exists for results that belong partway through the
 * narrative. Don't use both for the same numbers — top-level `metrics` is
 * rendered in the masthead.
 *
 * Section block types (see SectionRenderer's registry):
 *   { type: "marquee",   title }
 *   { type: "rows",      rows: [{ label, body }] }
 *   { type: "media",     src, path, alt, caption, aspect, fit }
 *                            src may be null; `path` names the expected
 *                            asset and is what the placeholder shows.
 *   { type: "metrics",   items: [{ value, label }] }
 *   { type: "table",     caption, columns, rows, highlightRow }
 *   { type: "code",      caption, language, code }
 *   { type: "decisions", title, items: [{ label, body }] }
 *
 * Every figure below is taken from the project's own README and evaluation
 * output. Nothing is estimated, and where a number is a weak claim it is
 * labelled as such rather than dropped.
 */

export const projects = [
  {
    slug: "upi-fraud-detection",
    title: "UPI Fraud Risk Manager",
    category: "Fraud Detection",
    mark: "UPI",
    cover: null,
    hero: null,
    meta: {
      context:
        "End-to-end fraud risk scoring for UPI-style mobile-money transactions, built on the PaySIM simulated dataset — roughly 6.3M transactions in which fraud is about 0.1% of all volume.",
      role:
        "Sole author for the modelling pipeline, evaluation protocol and write-up. The Streamlit demo layer was built with AI assistance.",
      year: "2026",
      duration: "",
      status: "Live on Streamlit Community Cloud",
    },
    stack: ["Python", "XGBoost", "Pandas", "NumPy", "Streamlit"],
    links: {
      github: "https://github.com/JellyFishJuggler/upi-finance-detector",
      demo: "https://upi-finance-detector.streamlit.app/",
    },
    metrics: [
      { value: "99.33%", label: "Fraud recall — held-out test set" },
      { value: "88.65%", label: "Fraud precision" },
      { value: "11", label: "Fraud cases missed, of 1,643" },
    ],
    sections: [
      { type: "marquee", title: "The transaction that shouldn't exist" },
      {
        type: "rows",
        rows: [
          {
            label: "The problem",
            body: "Fraud is a tiny fraction of total volume, so the two error types cost very different amounts. A false negative is direct fraud exposure; a false positive costs analyst review capacity and adds friction for an innocent customer. Accuracy alone is useless here — a model that predicts “not fraud” for everything scores 99.9% and catches nothing. So the pipeline optimises the precision/recall trade-off for the fraud class instead.",
          },
        ],
      },
      {
        type: "rows",
        rows: [
          {
            label: "Features",
            body: "The base transaction fields, plus two engineered signals. `balanceErrorOrig` measures the balance discrepancy on the origin side — `(oldbalanceOrg − newbalanceOrig) − amount` — and anything non-zero means the balance update is inconsistent with the amount moved. `amountToBalanceRatio` compares the transaction size to the originating balance. Transaction type is one-hot encoded.",
          },
        ],
      },
      {
        type: "rows",
        rows: [
          {
            label: "Honest threshold selection",
            body: "The decision threshold was chosen on out-of-fold predictions — predictions made by fold models on data those models never saw — by maximising F2. That threshold was then locked at 0.64 and frozen before the final evaluation, which ran exactly once, on a 20% stratified test set that stayed untouched throughout development.",
          },
        ],
      },
      {
        type: "table",
        caption: "Final evaluation on the untouched held-out test set (1,272,524 transactions, locked threshold 0.64).",
        columns: ["Metric", "Value"],
        rows: [
          { cells: ["Accuracy", "99.982%"] },
          { cells: ["Fraud precision", "88.65%"] },
          { cells: ["Fraud recall", "99.33%"], highlight: true },
          { cells: ["Fraud F1", "93.69%"] },
          { cells: ["Fraud F2", "96.99%"] },
        ],
      },
      {
        type: "table",
        caption: "Confusion matrix on the same held-out set.",
        columns: ["", "Predicted genuine", "Predicted fraud"],
        rows: [
          { cells: ["Actual genuine", "TN = 1,270,672", "FP = 209"] },
          { cells: ["Actual fraud", "FN = 11", "TP = 1,632"], highlight: true },
        ],
      },
      {
        type: "rows",
        rows: [
          {
            label: "What the errors cost",
            body: "The 209 false positives carry about ₹30.9M in transaction value and average ₹147,728 each. The 11 false negatives carry about ₹1.99M and average ₹181,238. These are indicative exposures, not realised losses — a flagged genuine transaction is not a loss, it is review friction, and whether missed fraud becomes an actual loss depends on recovery, liability rules and timing.",
          },
        ],
      },
      {
        type: "rows",
        rows: [
          {
            label: "Explainability",
            body: "Both XGBoost gain-based feature importance and permutation importance (F1 scoring) on the held-out set put `amountToBalanceRatio`, `newbalanceOrig` and `oldbalanceDest` at the top. Transactions that drain an account or leave inconsistent balances carry more fraud signal — but these are associations, not causal claims. A legitimate large transfer can share exactly the same pattern.",
          },
        ],
      },
      {
        type: "decisions",
        title: "What went wrong first",
        items: [
          {
            label: "SMOTE crashed the process",
            body: "Full-data SMOTE combined with 5-fold stratified cross-validation ran out of memory and crashed — oversampling a multi-million-row dataset multiplied the working set well past what the machine could hold. The final pipeline handles imbalance inside XGBoost with `scale_pos_weight` instead, at zero extra memory cost. The abandoned runs are kept in `archive/` rather than deleted.",
          },
          {
            label: "A silent labelling mismatch",
            body: "An early version of the app labelled transaction types `CASH OUT` while training used `CASH_OUT`. Nothing errored — the one-hot features were simply zeroed out for those types. It was caught during testing and fixed.",
          },
          {
            label: "Model paths resolved against the CWD",
            body: "Hardcoded relative model paths raised `FileNotFoundError` depending on where `streamlit run` was invoked from. Paths are now resolved relative to the script location.",
          },
        ],
      },
      {
        type: "rows",
        rows: [
          {
            label: "Limitations",
            body: "PaySIM is a simulation, so results may not transfer to real UPI traffic, which has different fraud typologies and adversarial behaviour. Fraud patterns drift and a static model degrades as attackers adapt. The review-cost figures are illustrative assumptions, not operational data. The deployed app flags transactions for review rather than asserting that a transaction is fraudulent — that wording is deliberate.",
          },
        ],
      },
    ],
    order: 1,
    featured: true,
  },
  {
    slug: "repo-reader",
    title: "RepoReader",
    category: "RAG · Codebase Q&A",
    mark: "RAG",
    cover: null,
    hero: null,
    meta: {
      context:
        "A retrieval-augmented assistant that clones any GitHub repository, indexes its code and docs, and answers questions about it in plain English.",
      role: "Sole author — retrieval pipeline, CLI, and Streamlit interface.",
      year: "2026",
      duration: "",
      status: "Live on Streamlit Community Cloud",
    },
    stack: ["Python", "LangChain", "Hugging Face", "Streamlit"],
    links: {
      github: "https://github.com/JellyFishJuggler/RepoReader",
      demo: "https://reporeader-srijan.streamlit.app/",
    },
    metrics: [
      { value: "384-dim", label: "Local embeddings — all-MiniLM-L6-v2" },
      { value: "Llama 3.3 70B", label: "Chat model, via Together" },
      { value: "4", label: "Chunks retrieved by default" },
    ],
    sections: [
      { type: "marquee", title: "Ask any repository a question" },
      {
        type: "rows",
        rows: [
          {
            label: "What it does",
            body: "Point it at a GitHub URL or a local folder and it clones the repository, reads every supported file, indexes the contents, and answers questions grounded strictly in that code. When the answer isn't in the repository it replies “Not found in repository.” rather than improvising, and every answer is followed by the list of source files it was drawn from.",
          },
        ],
      },
      {
        type: "rows",
        rows: [
          {
            label: "The pipeline",
            body: "Files are read, then split into 1,000-character chunks with a 200-character overlap so nothing meaningful is lost at a boundary. Each chunk is prefixed with `[filename: <name>]` so a question that mentions a file by name matches it. Chunks are embedded locally into 384-dimensional vectors, held in an in-memory vector store, and retrieved by cosine similarity against the embedded question.",
          },
        ],
      },
      {
        type: "decisions",
          title: "Design decisions",
          items: [
            {
              label: "Notebook-aware parsing",
              body: "`.ipynb` files are parsed cell-by-cell instead of being embedded as raw JSON, which otherwise fills the index with base64 image blobs, cell ids and rendered HTML that pollutes every retrieval.",
            },
            {
              label: "A hallucination guardrail",
              body: "The system prompt forbids the model from using anything outside the retrieved context, and the fallback response is fixed. Source attribution is attached deterministically after generation rather than asked of the model, so it can't be forgotten or hallucinated.",
            },
            {
              label: "Local embeddings",
              body: "Embeddings run locally with all-MiniLM-L6-v2 at no API cost, computed once per run. Only generation needs a hosted model.",
            },
            {
              label: "Secrets resolved lazily",
              body: "The Hugging Face token is read on the first question, trying the OS environment, then `st.secrets`, then a local `.env`. The same code therefore works locally and on Streamlit Community Cloud without edits, and the sidebar shows whether a token was found.",
            },
          ],
        },
      {
        type: "rows",
        rows: [
          {
            label: "Two ways to use it",
            body: "An interactive REPL for follow-up questions, or `-q` for a single scripted answer. The Streamlit app runs the same pipeline as a chat interface, with the source files in an expandable panel and a slider controlling how much context reaches the model.",
          },
        ],
      },
    ],
    order: 2,
    featured: true,
  },
  {
    slug: "ml-maths",
    title: "ML Maths",
    category: "Models From Scratch",
    mark: "ML",
    cover: null,
    hero: null,
    meta: {
      context:
        "Six machine learning algorithms implemented from scratch in NumPy and Pandas, with no scikit-learn in the algorithm layer. Each file is self-contained and paired with a test that scores it on unseen data.",
      role: "Sole author — implementation, evaluation, and write-up.",
      year: "2026",
      duration: "",
      status: "Ongoing",
    },
    stack: ["Python", "NumPy", "Pandas", "Matplotlib"],
    links: {
      github: "https://github.com/JellyFishJuggler/ml-maths",
    },
    metrics: [
      { value: "6", label: "Models implemented from scratch" },
      { value: "95.8%", label: "Logistic regression — test accuracy" },
      { value: "0.9945", label: "Linear regression — test R²" },
    ],
    sections: [
      { type: "marquee", title: "No sklearn — just the maths underneath" },
      {
        type: "rows",
        rows: [
          {
            label: "Why",
            body: "Library calls hide the part that matters. Writing each model out by hand — the gradient, the closed-form solution, the information gain — is the only way to actually know what the fitted object is doing. Every model here takes a DataFrame, exposes `fit()` and `predict()`, and runs as a standalone demo.",
          },
        ],
      },
      {
        type: "table",
        caption: "Score on data each model had never seen during training.",
        columns: ["Model", "Type", "Metric", "Unseen-data score"],
        rows: [
          { cells: ["NaiveBayes", "Classification", "Accuracy", "86%"] },
          { cells: ["LogisticRegression", "Classification", "Accuracy", "95.8%"], highlight: true },
          { cells: ["LinearRegression", "Regression", "R²", "0.9945"] },
          { cells: ["MultiLinearRegression", "Regression", "R²", "0.9912"] },
          { cells: ["GradientDescent", "Regression", "R²", "0.9499"] },
          { cells: ["iD3_decision_tree", "Classification", "Accuracy", "100%"] },
        ],
      },
      {
        type: "rows",
        rows: [
          {
            label: "Evaluation protocol",
            body: "Each model has a matching test file under `tests/` that scores it on a held-out split or on brand-new samples. For the spam classifier, the 86% is genuine test accuracy over 50 messages that never entered training — not the 100% the model scores on its own training set, which is just memorisation.",
          },
        ],
      },
      {
        type: "decisions",
          title: "Weak results, kept visible",
        items: [
          {
            label: "Gradient descent under-converges",
            body: "At the default learning rate of 1e-6 convergence is slow, so the learnt weights never reach the true values and its R² is the lowest of the three regression models. Raising the rate fixes it. The default is left as-is and documented rather than quietly tuned until the number looked better.",
          },
          {
            label: "The decision tree's 100% is not real-world accuracy",
            body: "The synthetic play-golf data is generated from a fixed rule with no noise, so the tree recovers that rule exactly and scores 100% on both train and test. On real, noisier data expect far lower. The README says so explicitly.",
          },
          {
            label: "The tree plot is AI-generated",
            body: "`plotTree()` in the ID3 demo is AI-generated code. Everything else in the repository is hand-written, and the README flags this one exception.",
          },
        ],
      },
    ],
    order: 3,
    featured: true,
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

/**
 * A project is safe to ship only once its copy is finished. Draft entries
 * carry a literal "TODO" in the field that still needs writing, which is
 * cheap to spot in review and impossible to miss in a search, so it doubles
 * as the flag: anything matching is held back from the public listing, from
 * the next-project link and from the sitemap, but stays visible in dev.
 */
const TODO_PATTERN = /\bTODO\b/;

/**
 * Every string in a project that still carries a TODO marker, as
 * `"section[3].rows[0].body"`. Paths are dotted so a warning points at the
 * exact field to finish.
 *
 * @param {object} project
 * @returns {string[]} dotted paths, empty when the project is clean.
 */
export function todoFields(project) {
  const hits = [];

  const walk = (value, path) => {
    if (typeof value === "string") {
      if (TODO_PATTERN.test(value)) hits.push(path);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, i) => walk(item, `${path}[${i}]`));
      return;
    }
    if (value && typeof value === "object") {
      Object.entries(value).forEach(([key, child]) => walk(child, `${path}.${key}`));
    }
  };

  walk(project, "");
  /* The marker in the `slug` itself would break routing rather than copy, so
     it is reported but not treated as a publish blocker. */
  return hits.filter((path) => !path.startsWith(".slug"));
}

/**
 * @param {object} project
 * @returns {boolean} whether `project` is finished enough to show publicly.
 */
export function isPublishable(project) {
  return todoFields(project).length === 0;
}

/**
 * The projects the app is allowed to show. In a production build anything
 * still holding a TODO is filtered out; in dev every project stays visible so
 * work in progress is easy to click through.
 *
 * @param {object} [options]
 * @param {boolean} [options.prod] - override the environment check. Build
 *   scripts pass this explicitly since they run outside Vite.
 * @returns {object[]}
 */
export function publishedProjects({ prod = import.meta.env?.PROD ?? false } = {}) {
  return prod ? allProjects.filter(isPublishable) : allProjects;
}

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
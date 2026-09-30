/**
 * About page content. Single source of truth, mirroring data/projects.js.
 *
 * Content rules for this page:
 *   - The current identity is AI/ML + Data Science. Product design, UI/UX and
 *     3D are the *previous* professional background and are presented as
 *     history, never as the current role.
 *   - Testimonials and roles are quoted verbatim from the supplied source
 *     material. Nothing here is invented: no clients, no metrics, no AI/ML
 *     employment, and no job descriptions that were not supplied.
 */

/**
 * Portrait asset.
 *
 * IMPORTANT — this is a temporary fallback. The repository does not contain
 * the transparent cutout portrait shown in the design reference, so this
 * points at the only portrait asset available, `public/img/pfp.png`.
 *
 * That file is a 832x1071 fully-opaque photo (alpha channel is 100% opaque),
 * so it renders as a hard-edged rectangle on the near-black page. It is NOT
 * a cutout and is not treated as one: no card, border, radius, or invented
 * background is wrapped around it. `object-fit: contain` keeps it uncropped
 * and undistorted.
 *
 * To use a real cutout later, drop the transparent PNG/WebP into `public/img`
 * and change ONLY `src` below — the layout does not need to change.
 */
export const portrait = {
  src: "/img/pfp.png",
  alt: "Srijan Gupta",
  /**
   * Fixed by the asset, not by layout: the box the portrait is allowed to
   * occupy. `contain` fills this without cropping or distorting.
   */
  width: 832,
  height: 1071,
};

/** Section headings, kept together so the page order is readable at a glance. */
export const headings = {
  title: "About",
  earlierWork: "Earlier Work & Collaborations",
  previousExperience: "Previous Experience",
};

/**
 * Current direction. Leads with AI/ML and Data Science; the product-design
 * background is named as something that shaped the approach, not as the role.
 */
export const intro =
  "I'm Srijan Gupta — a Computer Science student focused on AI/ML, Data Science, and building intelligent systems. I come from a product design background, which taught me to think deeply about users, systems, and how technology is experienced. Today, my focus is on machine learning and data-driven problem solving — learning, experimenting, and building projects that combine technical depth with thoughtful product thinking.";

/**
 * Bridge into the historical sections. Deliberately muted and secondary:
 * this is the "what came before" signal, not a second hero statement.
 */
export const careerTransition =
  "Before moving deeper into AI/ML, I worked across product design, UI/UX, and visual production. That background still shapes how I build — but my focus today is data, machine learning, and intelligent systems.";

/**
 * Verbatim feedback from previous design work. Presented as archival
 * professional feedback — quotes and attributions only, no ratings, avatars
 * or review-card UI.
 */
export const testimonials = [
  {
    quote:
      "Srijan is a very fun person to work with and brought enthusiasm to our team. Throughout our time working together, he demonstrated strong design thinking and collaboration skills. Beyond his technical talent, he is a fantastic collaborator who takes feedback constructively and elevates projects with his designs.",
    attribution: "Silver Crane Studios",
  },
  {
    quote:
      "Srijan designed our web pages with great attention to detail and patience. He was extremely cooperative throughout the process and handled every request calmly and professionally. The final outcome reflected a clear understanding of our brand.",
    attribution: "Zerra's Makeovers",
  },
  {
    quote:
      "Working with Srijan was a great experience. He approached our project with care, quickly implemented feedback, and created a seamless user experience that made navigating the site effortless. The turnaround time exceeded expectations, and his designs truly supported the impact we aimed to make.",
    attribution: "Collective Networks",
  },
  {
    quote:
      "Srijan approaches design with creativity and precision, translating abstract ideas into visually compelling solutions. Even as an intern, he delivered high-quality work and demonstrated strong potential. With continued polish, he's on track to consistently create impactful design outputs.",
    attribution: "Horizon9 — Advertising Agency",
  },
];

/**
 * Previous professional experience, newest first. Rendered as
 * Date | Role / Organization | Description.
 *
 * No `description` values are supplied for these roles, so the renderer
 * leaves that track empty rather than inventing copy. Adding a description
 * later needs no layout change.
 */
export const previousExperience = [
  {
    period: "Jan 2026 – Present",
    role: "UI/UX Designer Volunteer",
    organization: "Remineralize the Earth",
  },
  {
    period: "Jan – Jul 2026",
    role: "Game UI Artist",
    organization: "Silver Crane Studios",
  },
  {
    period: "Dec 2025 – Present",
    role: "Freelance Product Designer",
    organization: "Confidential Clients",
  },
  {
    period: "May – Aug 2025",
    role: "UI/UX Design Intern",
    organization: "Scorpelo Technologies",
  },
  {
    period: "Sep 2024 – Apr 2025",
    role: "3D Product Animator Intern",
    organization: "Horizon9",
  },
];

/**
 * Bottom marquee. Order is deliberate: AI/ML and Data Science first,
 * Product Design last — it reads as a foundation, not the headline.
 * MarqueeHeading repeats this string, so it carries the separators itself.
 */
export const marquee =
  "AI / ML – Data Science – Systems Thinking – Product Design";
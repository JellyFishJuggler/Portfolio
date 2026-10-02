# Portfolio

Personal site for Srijan Gupta — AI/ML engineer. React + Vite, no UI framework:
the design is CSS Modules driven by a single set of design tokens, and the only
runtime dependencies are React, React Router, Framer Motion, and Lucide icons.

Live at <https://www.srijan.website>.

## Getting started

```bash
npm install
npm run dev      # dev server
npm run build    # generates robots.txt + sitemap.xml, then builds to dist/
npm run preview  # serve the production build
```

Node 20.19+ or 22.12+ (Vite 8's requirement). There is no test runner and no linter configured — the
project is verified by building and by driving the built site in a browser.

## Layout

```
index.html              document shell: meta, OG/Twitter tags, JSON-LD Person
scripts/
  generate-sitemap.mjs  runs on prebuild; writes public/robots.txt + sitemap.xml
src/
  App.jsx               routes, Suspense, ErrorBoundary, skip link
  main.jsx              React root, LazyMotion with the domAnimation features
  components/           layout (PageShell, SiteHeader, ErrorBoundary, SkipLink),
                        home, portfolio, contact, about, ui
  data/                 the content layer: site, projects, about, contact,
                        portfolio, meta
  hooks/                useIntro, useInView, useClock, useTheme, useDocumentMeta,
                        useContactForm, useSmoothScroll, useLoadProgress
  pages/                one file per route
  styles/               theme.css (all tokens), global.css, index.css
public/                 copied verbatim into dist/ — the portrait and the resume
```

`src/index.css` imports Tailwind v4 for its preflight only, with
`source(none)` and explicit `@source` globs. Without the explicit sources, v4
auto-scans the data files and emits utilities for class names that appear in
project prose.

## Adding a project

Add an entry to `projects` in `src/data/projects.js`. The registry is the only
place case studies come from; the grid, the routes, the sitemap and the
next-project link all read it.

A project is **hidden in production** while its `summary` still contains the
literal word `TODO`; in dev everything stays visible so work in progress is easy
to click through. Removing that word publishes it. Verified behaviour:

- the project disappears from `/portfolio` and from the next-project link
- its URL redirects to `/portfolio` instead of rendering
- it drops out of `sitemap.xml`
- the sitemap generator prints a warning naming the exact field

Set `order` to pin a project's position; anything without it sorts after
ordered entries, by declaration order.

Optional cover art goes at `public/img/projects/<slug>/` — none ship today, so
case studies fall back to their generated mark tile.

## Content and configuration

- `src/data/site.js` — name, role, canonical `siteUrl`, timezone, portrait, and
  every social link. Changing `siteUrl` here is what regenerates the sitemap
  and robots.txt; the OG image URL in `index.html` uses the same host.
- `src/data/meta.js` — per-route document titles and descriptions.
- `src/data/about.js`, `src/data/contact.js`, `src/data/portfolio.js` — page
  copy.
- The resume is `public/resume/SRIJAN_RESUME.pdf`, served from
  `/resume/SRIJAN_RESUME.pdf`, referenced only via `site.resume`.
- `.env.example` documents `VITE_CONTACT_ENDPOINT`. Set it to a POST endpoint
  that accepts `{ name, email, message, _subject }` and returns 2xx. Without
  it the contact form falls back to the visitor's mail client.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home — fixed-viewport bento grid, wordmark intro on first visit |
| `/portfolio` | Project listing |
| `/portfolio/:slug` | Case study; unknown or draft slugs redirect to the listing |
| `/about` | About |
| `/contact` | Contact |
| anything else | 404 |

Deep links need an SPA fallback. `vercel.json` already rewrites `/(.*)` to
`/index.html`; on another host add the equivalent.

The home intro is a first-visit animation. `?intro=1` forces it,
`?intro=0` skips it, and `prefers-reduced-motion: reduce` skips it always.

## Deploying

`npm run build` outputs `dist/`. It must be served with a fallback to
`index.html` for the routes above. `public/robots.txt` and
`public/sitemap.xml` are generated at build time and are git-ignored, so a
static host that serves a committed `dist/` needs the build step rather than a
copy.

## Conventions

- Design tokens live in `src/styles/theme.css` and are referenced by name;
  components do not hardcode colours or spacing.
- Comments explain *why* something is the way it is, not what the line does.
- Dark is the default theme. `useTheme` persists the choice to localStorage and
  sets `.light` on `<html>`, which `theme.css` keys the light palette off.
- Motion respects `prefers-reduced-motion`. `Reveal`, `Marquee`, `RollingText`
  and the intro all have a static or skipped path.
- Accessibility: one `<h1>` per page, landmarks on every route, a skip link as
  the first tab stop, and text contrast at or above 4.5:1 in both themes.

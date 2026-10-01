import { PageShell, SiteFooter, SiteHeader } from "../components/layout";
import { MarqueeHeading } from "../components/portfolio";
import {
  AboutHero,
  AboutPortrait,
  CareerTransition,
  EarlierWork,
  PreviousExperience,
} from "../components/about";
import { Reveal } from "../components/ui";
import { useDocumentTitle, useSmoothScroll } from "../hooks";
import { marquee } from "../data/about";
import styles from "./About.module.css";

/**
 * About page.
 *
 * Composition: a two-column editorial grid where the narrative column
 * (hero → career transition → earlier work → previous experience) scrolls
 * while the portrait column stays sticky on the right. The portrait is not
 * in the flow of the text, so the empty space to its left is preserved and
 * the mobile single-column fallback is a plain stack.
 *
 * Order of content is deliberate: current AI/ML direction first, historical
 * design work below it.
 *
 * Note this is a separate page from the legacy static tabs/about.html, which
 * is unrelated and left untouched.
 */
export default function About() {
  useDocumentTitle("About — Srijan Gupta");
  useSmoothScroll();

  return (
    <PageShell constrain>
      <SiteHeader variant="home" />

      {/* Full content width, above the two-column grid: the reveal intro is
          set to a ~1300px measure, which the narrative column (7fr of 12)
          is too narrow to give it. */}
      <AboutHero />

      <main className={styles.layout}>
        <div className={styles.narrative}>
          {/* The sections have their own inView colour lift; Reveal only
              adds the soft rise, and the portrait stays out of it so its
              sticky column keeps the full track height it needs. */}
          <Reveal>
            <CareerTransition />
          </Reveal>
          <Reveal>
            <EarlierWork />
          </Reveal>
          <Reveal>
            <PreviousExperience />
          </Reveal>
        </div>

        <AboutPortrait />
      </main>

      <MarqueeHeading title={marquee} />

      <SiteFooter />
    </PageShell>
  );
}
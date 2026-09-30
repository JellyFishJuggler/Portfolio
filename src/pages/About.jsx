import { PageShell, SiteFooter, SiteHeader } from "../components/layout";
import { MarqueeHeading } from "../components/portfolio";
import {
  AboutHero,
  AboutPortrait,
  CareerTransition,
  EarlierWork,
  PreviousExperience,
} from "../components/about";
import useDocumentTitle from "../hooks/useDocumentTitle";
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

  return (
    <PageShell constrain>
      <SiteHeader variant="home" />

      <main className={styles.layout}>
        <div className={styles.narrative}>
          <AboutHero />
          <CareerTransition />
          <EarlierWork />
          <PreviousExperience />
        </div>

        <AboutPortrait />
      </main>

      <MarqueeHeading title={marquee} />

      <SiteFooter />
    </PageShell>
  );
}
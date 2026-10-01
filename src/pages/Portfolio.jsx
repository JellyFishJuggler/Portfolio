import { PageShell, SiteFooter, SiteHeader } from "../components/layout";
import { ProjectGrid } from "../components/portfolio";
import { PageHeading, Reveal } from "../components/ui";
import { useDocumentTitle, useSmoothScroll } from "../hooks";
import { sortedProjects } from "../data/projects";

export const PORTFOLIO_INTRO =
  "Dive into a few projects that represent my most fulfilling AI and machine learning work";

/**
 * Project listing. Reads the registry and hands it to the grid; all layout
 * lives in the components.
 */
export default function Portfolio() {
  useDocumentTitle("Portfolio — Srijan Gupta");
  useSmoothScroll();

  return (
    <PageShell constrain>
      <SiteHeader variant="home" />

      <PageHeading>{PORTFOLIO_INTRO}</PageHeading>

      <Reveal>
        <ProjectGrid projects={sortedProjects} />
      </Reveal>

      <SiteFooter topSpace={150} />
    </PageShell>
  );
}
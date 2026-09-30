import { PageShell, SiteFooter, SiteHeader } from "../components/layout";
import { ProjectGrid, ProjectTitleBlock } from "../components/portfolio";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { sortedProjects } from "../data/projects";

export const PORTFOLIO_INTRO =
  "Dive into a few projects that represent my most fulfilling AI and machine learning work";

/**
 * Project listing. Reads the registry and hands it to the grid; all layout
 * lives in the components.
 */
export default function Portfolio() {
  useDocumentTitle("Portfolio — Srijan Gupta");

  return (
    <PageShell constrain>
      <SiteHeader variant="home" />

      <ProjectTitleBlock>{PORTFOLIO_INTRO}</ProjectTitleBlock>

      <ProjectGrid projects={sortedProjects} />

      <SiteFooter />
    </PageShell>
  );
}
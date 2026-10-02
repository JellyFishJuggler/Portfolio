import { PageShell, SiteFooter, SiteHeader } from "../components/layout";
import { ProjectGrid } from "../components/portfolio";
import { PageHeading, Reveal } from "../components/ui";
import { useDocumentMeta, useSmoothScroll } from "../hooks";
import { sortedProjects } from "../data/projects";
import { portfolioEmpty, portfolioIntro } from "../data/portfolio";
import { routeMeta } from "../data/meta";

/**
 * Project listing. Reads the registry and hands it to the grid; all layout
 * lives in the components.
 */
export default function Portfolio() {
  useDocumentMeta(routeMeta["/portfolio"]);
  useSmoothScroll();

  return (
    <PageShell constrain>
      <SiteHeader variant="home" />

      <Reveal group={0}>
        <PageHeading>{portfolioIntro}</PageHeading>
      </Reveal>

      <Reveal group={1}>
        <ProjectGrid projects={sortedProjects} emptyMessage={portfolioEmpty} />
      </Reveal>

      <SiteFooter topSpace={150} />
    </PageShell>
  );
}
import { Navigate, useParams } from "react-router-dom";
import { PageShell, SiteFooter, SiteHeader } from "../components/layout";
import {
  ComingSoon,
  MarkTile,
  MetricTiles,
  NextProject,
  ProjectHeader,
  ProjectMeta,
  SectionRenderer,
} from "../components/portfolio";
import { MediaFigure, Reveal } from "../components/ui";
import { useDocumentMeta, useSmoothScroll } from "../hooks";
import { getNextProject, getProject } from "../data/projects";
import { projectMeta } from "../data/meta";

/**
 * Case study for one project. Reads the registry by slug; an unknown slug
 * redirects to the listing rather than rendering an empty page.
 *
 * @param {object} props
 * @param {string} props.slug - project slug from the route.
 */
function CaseStudyView({ slug }) {
  const project = getProject(slug);
  const next = getNextProject(slug);

  useDocumentMeta(projectMeta(project));
  useSmoothScroll();

  if (!project) return <Navigate to="/portfolio" replace />;

  return (
    <PageShell constrain>
      <SiteHeader variant="back" />

      <main id="main" tabIndex={-1}>
        {/* Groups 0-3 are the masthead block; the narrative sections continue
            the cascade, then Next. Deeper blocks (rows, media) keep their own
            scroll reveals inside SectionRenderer. */}
        <Reveal group={0}>
          <ProjectHeader project={project} />
        </Reveal>

        <Reveal group={1}>
          {project.hero ? (
            <MediaFigure src={project.hero} alt={`${project.title} — ${project.category}`} eager />
          ) : (
            <MarkTile mark={project.mark} />
          )}
        </Reveal>

        <Reveal group={2}>
          <ProjectMeta meta={project.meta} stack={project.stack} />
        </Reveal>

        {/* Headline results sit in the masthead. A `metrics` section type also
            exists for metrics that belong partway through the narrative; the
            seed data uses only this one. */}
        <Reveal group={3}>
          <MetricTiles items={project.metrics} />
        </Reveal>

        {project.sections.length === 0 ? (
          <Reveal group={4}>
            <ComingSoon project={project} />
          </Reveal>
        ) : (
          project.sections.map((section, i) => (
            <Reveal key={section.type + i} group={4 + i}>
              <SectionRenderer section={section} />
            </Reveal>
          ))
        )}

        <Reveal group={4 + project.sections.length}>
          <NextProject project={next} />
        </Reveal>
      </main>

      <SiteFooter />
    </PageShell>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  return <CaseStudyView slug={slug} />;
}
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
import useDocumentTitle from "../hooks/useDocumentTitle";
import { getNextProject, getProject } from "../data/projects";

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

  useDocumentTitle(project ? `${project.title} — Srijan Gupta` : "Portfolio — Srijan Gupta");

  if (!project) return <Navigate to="/portfolio" replace />;

  return (
    <PageShell constrain>
      <SiteHeader variant="back" />

      <ProjectHeader project={project} />

      <Reveal>
        {project.hero ? (
          <MediaFigure src={project.hero} alt={`${project.title} — ${project.category}`} eager />
        ) : (
          <MarkTile mark={project.mark} />
        )}
      </Reveal>

      <ProjectMeta meta={project.meta} stack={project.stack} />

      {/* Headline results sit in the masthead. A `metrics` section type also
          exists for metrics that belong partway through the narrative; the
          seed data uses only this one. */}
      <Reveal>
        <MetricTiles items={project.metrics} />
      </Reveal>

      {project.sections.length === 0 ? (
        <ComingSoon project={project} />
      ) : (
        project.sections.map((section, i) => (
          <SectionRenderer key={section.type + i} section={section} />
        ))
      )}

      <NextProject project={next} />

      <SiteFooter />
    </PageShell>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  return <CaseStudyView slug={slug} />;
}
import { MediaFigure, Reveal, SectionRow } from "../ui";
import { CodeBlock } from "./CodeBlock";
import { DecisionList } from "./DecisionList";
import { MarqueeHeading } from "./MarqueeHeading";
import { MetricTiles } from "./MetricTiles";
import { ResultsTable } from "./ResultsTable";

/**
 * Maps a `type` from a project's `sections` array to a component. Adding a
 * new block type means adding one entry here — nothing else in the app
 * needs to change.
 *
 * An unknown type is a data bug, so it warns rather than rendering nothing
 * silently.
 */
export const sectionRegistry = {
  marquee: ({ title, duration }) => <MarqueeHeading title={title} duration={duration} />,

  rows: ({ rows = [] }) =>
    rows.map((row, i) => (
      <Reveal key={row.label ?? i}>
        <SectionRow label={row.label}>{row.body}</SectionRow>
      </Reveal>
    )),

  media: ({ src, path, alt, caption, aspect, fit }) => (
    <Reveal>
      <MediaFigure
        src={src}
        alt={alt}
        caption={caption}
        aspect={aspect}
        fit={fit}
        hint={src ? undefined : path}
      />
    </Reveal>
  ),

  metrics: ({ items = [] }) => (
    <Reveal>
      <MetricTiles items={items} />
    </Reveal>
  ),

  table: ({ caption, columns, rows, highlightRow }) => (
    <Reveal>
      <ResultsTable
        caption={caption}
        columns={columns}
        rows={rows?.map((r, i) => ({ ...r, highlight: r.highlight || i === highlightRow }))}
      />
    </Reveal>
  ),

  code: ({ caption, code, language }) => (
    <Reveal>
      <CodeBlock caption={caption} code={code} language={language} />
    </Reveal>
  ),

  decisions: ({ title, items = [] }) => <DecisionList title={title} items={items} />,
};

/**
 * Renders one section block. Returns null for an unknown type.
 *
 * @param {object} props
 * @param {object} props.section - one block from a project's `sections`.
 */
export function SectionRenderer({ section }) {
  if (!section?.type) return null;

  const render = sectionRegistry[section.type];
  if (!render) {
    console.warn(`[SectionRenderer] unknown section type "${section.type}"`);
    return null;
  }

  const { type, ...rest } = section;
  return render(rest);
}

export default SectionRenderer;
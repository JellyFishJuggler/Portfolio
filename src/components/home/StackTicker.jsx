import { Card, Marquee, Tile } from "../ui";
import { SKILL_BRAND, SKILL_LOGOS } from "../../data/site";

/**
 * Auto-scrolling tools marquee. Tiles with a brand path render a logo;
 * the rest fall back to their name as text.
 *
 * @param {object} props
 * @param {string[]} props.items - skill names, in order.
 */
export function StackTicker({ items }) {
  const tiles = items.map((name) => (
    <Tile key={name} name={name} logoPath={SKILL_LOGOS[name]} fill={SKILL_BRAND[name]} />
  ));

  return (
    <Card frosted>
      <Marquee duration={22} pauseOnHover aria-label={`Stack: ${items.join(", ")}`}>
        {tiles}
      </Marquee>
    </Card>
  );
}

export default StackTicker;

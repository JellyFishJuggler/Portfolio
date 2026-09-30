import { useState } from "react";
import { PageShell, SiteHeader } from "../components/layout";
import { BentoGrid, HeroText, PhotoCard, StackTicker } from "../components/home";
import { VisuallyHidden } from "../components/ui";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { site } from "../data/site";

/**
 * Home. A fixed-viewport bento grid with an oversized wordmark behind it;
 * hovering or focusing a card swaps the wordmark to that card's label.
 */
export default function Home() {
  useDocumentTitle("Srijan Gupta — AI/ML Engineer");
  const [active, setActive] = useState(null);

  return (
    <PageShell compact>
      <SiteHeader variant="name" />

      {/* The wordmark behind the grid is decorative; this is the real h1. */}
      <h1>
        <VisuallyHidden>
          {site.name} — {site.role}
        </VisuallyHidden>
      </h1>

      <HeroText text={active ?? site.name} />

      <BentoGrid
        onActive={setActive}
        photo={<PhotoCard src={site.photo} alt={site.name} />}
        ticker={<StackTicker items={site.stack} />}
      />
    </PageShell>
  );
}

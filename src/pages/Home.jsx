import { useRef, useState } from "react";
import { PageShell, SiteHeader } from "../components/layout";
import { BentoGrid, HeroText, IntroBar, PhotoCard, StackTicker } from "../components/home";
import { VisuallyHidden } from "../components/ui";
import useDocumentMeta from "../hooks/useDocumentMeta";
import useIntro from "../hooks/useIntro";
import { site } from "../data/site";
import { routeMeta } from "../data/meta";

/**
 * Home. A fixed-viewport bento grid with an oversized wordmark behind it;
 * hovering or focusing a card swaps the wordmark to that card's label.
 *
 * On the first visit of a session the wordmark is also the intro: useIntro
 * poses this very element rather than a second copy of the text, and the
 * phase it reports rides on the shell as `data-intro` for the reveal styles.
 */
export default function Home() {
  useDocumentMeta(routeMeta["/"]);
  const [active, setActive] = useState(null);
  const heroRef = useRef(null);
  const barRef = useRef(null);
  const { phase, progress, barTop } = useIntro({ heroRef, barRef });

  /* measuring, loading, exiting: the intro owns the screen, so everything
     that isn't the wordmark or the bar is inert — which is also what stops a
     card hover from swapping the wordmark mid-flight. */
  const running = phase === "measuring" || phase === "loading" || phase === "exiting";
  const bar = phase === "loading" || phase === "exiting";

  return (
    <PageShell compact introPhase={phase}>
      <SiteHeader variant="name" inert={running} />

      {/* The wordmark behind the grid is decorative; this is the real h1. */}
      <h1 inert={running}>
        <VisuallyHidden>
          {site.name} — {site.role}
        </VisuallyHidden>
      </h1>

      <HeroText text={active ?? site.name} heroRef={heroRef} />

      {/* Mounted with the wordmark, not before it: the bar's own fade-in is
          timed from here. */}
      {bar && <IntroBar progress={progress} barRef={barRef} top={barTop} />}

      <BentoGrid
        onActive={running ? undefined : setActive}
        inert={running}
        photo={
          <PhotoCard
            src={site.photo}
            fallbackSrc={site.photoFallback}
            alt={site.name}
            width={832}
            height={1071}
          />
        }
        ticker={<StackTicker items={site.stack} />}
      />
    </PageShell>
  );
}

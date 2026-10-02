import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import { markIntroSeen } from "./hooks/useIntro";

/* Home ships in the entry bundle because it is the landing route and owns the
   intro. Every other page is fetched on demand, so a visitor who never leaves
   the home screen never downloads a case study. */
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const { pathname } = useLocation();

  /* The home intro is a first-visit thing, so a session that starts anywhere
     else counts as having seen it — otherwise landing on home later would
     replay three seconds of animation nobody asked for. No dependency array
     content on purpose: this is the first route of the session, and App
     mounts once. */
  useEffect(() => {
    if (pathname !== "/") markIntroSeen();
  }, []);

  return (
    <>
      <ScrollToTop />
      {/* Each page keeps its own layout, so the gap between routes is meant to
          be empty rather than a placeholder. */}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<CaseStudy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

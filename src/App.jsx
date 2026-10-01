import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import CaseStudy from "./pages/CaseStudy";
import NotFound from "./pages/NotFound";
import { markIntroSeen } from "./hooks/useIntro";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<CaseStudy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

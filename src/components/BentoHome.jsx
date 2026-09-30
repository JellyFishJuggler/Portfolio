import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./bento.css";

/* ---------- content (swap for your centralized content file) ---------- */
export const home = {
  name: "Srijan Gupta",
  role: "AI/ML Engineer",
  location: "Dādri",
  timeZone: "Asia/Kolkata",
  photo: "/img/pfp.png",
  resume: "#", // TODO: ML resume link
  // Drop SVG/PNG paths into `icon` to get logo tiles; without one, the tile shows the name.
  stack: [
    { name: "Python" }, { name: "NumPy" }, { name: "Pandas" }, { name: "scikit-learn" },
    { name: "XGBoost" }, { name: "Streamlit" }, { name: "SQL" }, { name: "Git" },
  ],
};

/* ---------- hooks ---------- */
function useClock(timeZone) {
  const fmt = () =>
    new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone })
      .format(new Date()).toUpperCase();
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, [timeZone]);
  return t;
}

function useTheme() {
  const [light, setLight] = useState(() => {
    try { return localStorage.getItem("theme") === "light"; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    try { localStorage.setItem("theme", light ? "light" : "dark"); } catch {}
  }, [light]);
  return [light, () => setLight((v) => !v)];
}

/* ---------- components ---------- */
export function Header({ name, role, location, timeZone }) {
  const time = useClock(timeZone);
  const [light, toggle] = useTheme();
  return (
    <header className="top">
      <div>{name}</div>
      <div className="role">{role}</div>
      <div className="end">
        {location} • {time}
        <button
          className="theme-dot"
          onClick={toggle}
          aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
        />
      </div>
    </header>
  );
}

/* Text behind the grid. Old text exits upward, new text rises in from below. */
export function HeroText({ text }) {
  return (
    <div className="hero-text" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div
          key={text}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {text}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* Glass + noise card. `label` also drives HeroText on hover/focus. */
export function BentoCard({ label, href, onActive, className = "", children }) {
  const props = onActive && label
    ? {
        onMouseEnter: () => onActive(label),
        onMouseLeave: () => onActive(null),
        onFocus: () => onActive(label),
        onBlur: () => onActive(null),
      }
    : {};
  const inner = children ?? (
    <span className="label">
      {label}
      <ArrowUpRight className="arrow" size={22} strokeWidth={1.6} />
    </span>
  );
  // Swap <a> for react-router's <Link to={href}> for internal routes.
  return href ? (
    <a href={href} className={`bento-card ${className}`} {...props}>{inner}</a>
  ) : (
    <div className={`bento-card ${className}`}>{inner}</div>
  );
}

export function StackTicker({ items }) {
  const loop = [...items, ...items]; // duplicated so the -50% shift loops seamlessly
  return (
    <div className="bento-card">
      <div className="ticker" aria-label={`Stack: ${items.map((i) => i.name).join(", ")}`}>
        <div className="ticker-track">
          {loop.map((it, i) => (
            <div className="tile" key={i} aria-hidden={i >= items.length}>
              {it.icon ? <img src={it.icon} alt="" /> : it.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */
export default function Home() {
  const [active, setActive] = useState(null);
  const text = active ?? home.name;

  return (
    <div className="home">
      <Header {...home} />
      <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {home.name}
      </h1>
      <HeroText text={text} />

      <main className="bento">
        <BentoCard label="About" href="/about" onActive={setActive} />
        <BentoCard label="Portfolio" href="/portfolio" onActive={setActive} className="md-span-3" />

        <BentoCard label="Contact" href="/contact" onActive={setActive} className="span-2" />

        <div className="bento-card photo">
          <img src={home.photo} alt={home.name} />
        </div>

        <div className="stack-col">
          <StackTicker items={home.stack} />
          <BentoCard label="Resume" href={home.resume} onActive={setActive} />
        </div>
      </main>
    </div>
  );
}

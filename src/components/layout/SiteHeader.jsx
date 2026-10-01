import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useClock from "../../hooks/useClock";
import useTheme from "../../hooks/useTheme";
import { site } from "../../data/site";
import { RollingText, ThemeToggle } from "../ui";
import styles from "./SiteHeader.module.css";

/**
 * Site header, fixed to the top of the viewport. The left item is either the
 * name (home) or a back link (portfolio pages); the role sits a fixed gap
 * after it, and the live clock plus the theme switch sit at the right.
 *
 * The back link prefers real history and falls back to /portfolio, so a
 * case study opened cold in a new tab still has somewhere to go.
 *
 * @param {object} props
 * @param {"name"|"home"|"back"} [props.variant="name"] - left item style.
 * @param {string} [props.backLabel="Back"]
 * @param {string} [props.fallbackTo="/portfolio"]
 * @param {boolean} [props.inert=false] - take the header out of play, which
 *   the home intro does while it owns the screen.
 */
export function SiteHeader({
  variant = "name",
  backLabel = "Back",
  fallbackTo = "/portfolio",
  inert = false,
}) {
  const time = useClock(site.timeZone);
  const [, toggle, theme] = useTheme();
  const navigate = useNavigate();

  const goBack = (e) => {
    // A tab opened straight onto this page has no app history to return to.
    if (window.history.state && window.history.length > 1) {
      e.preventDefault();
      navigate(-1);
    }
  };

  let left;
  if (variant === "name") {
    /* The name is not a link, so it rolls on its own hover only, and is
       left pointing where it always pointed (nowhere). */
    left = (
      <RollingText
        text={site.name}
        trigger="self"
        className={styles.name}
      />
    );
  } else {
    /* The roll is reserved for the nav labels the home grid also uses
       ("Home"); the back link reads as chrome, so it stays plain. */
    left = (
      <Link className={styles.back} to="/" onClick={variant === "back" ? goBack : undefined}>
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
        {variant === "back" ? backLabel : <RollingText text="Home" />}
      </Link>
    );
  }

  return (
    <header className={styles.header} inert={inert}>
      <div className={styles.start}>
        {left}
        <span className={styles.role}>{site.role}</span>
      </div>
      <div className={styles.end}>
        {/* Clock only: the old hardcoded city was the developer's, not the
            visitor's, so it's been removed. */}
        <span className={styles.clock} aria-live="off">
          {time}
        </span>
        <ThemeToggle theme={theme} onToggle={toggle} />
      </div>
    </header>
  );
}

export default SiteHeader;

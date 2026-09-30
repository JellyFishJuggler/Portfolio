import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useClock from "../../hooks/useClock";
import useTheme from "../../hooks/useTheme";
import { site } from "../../data/site";
import { cx } from "../../utils/cx";
import styles from "./SiteHeader.module.css";

/**
 * Site header. The left item is either the name (home) or a back link
 * (portfolio pages); the role sits a fixed gap after it, and the live
 * clock plus theme dot sit at the right.
 *
 * The back link prefers real history and falls back to /portfolio, so a
 * case study opened cold in a new tab still has somewhere to go.
 *
 * @param {object} props
 * @param {"name"|"home"|"back"} [props.variant="name"] - left item style.
 * @param {string} [props.backLabel="Back"]
 * @param {string} [props.fallbackTo="/portfolio"]
 */
export function SiteHeader({ variant = "name", backLabel = "Back", fallbackTo = "/portfolio" }) {
  const time = useClock(site.timeZone);
  const [light, toggle] = useTheme();
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
    left = <span className={styles.name}>{site.name}</span>;
  } else {
    left = (
      <Link className={styles.back} to="/" onClick={variant === "back" ? goBack : undefined}>
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
        {variant === "back" ? backLabel : "Home"}
      </Link>
    );
  }

  return (
    <header className={cx(styles.header, styles.full)}>
      <div className={styles.start}>
        {left}
        <span className={styles.role}>{site.role}</span>
      </div>
      <div className={styles.end}>
        <span className={styles.clock} aria-live="off">
          {site.location} • {time}
        </span>
        <button
          className={styles.dot}
          onClick={toggle}
          aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
        />
      </div>
    </header>
  );
}

export default SiteHeader;

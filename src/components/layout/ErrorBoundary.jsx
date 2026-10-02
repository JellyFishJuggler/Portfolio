import { Component } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "./PageShell";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { Card, PageHeading } from "../ui";
import styles from "./ErrorBoundary.module.css";

/**
 * Catches a render-time throw anywhere below it and shows a readable page
 * instead of a blank screen. Without a boundary React unmounts the entire
 * tree, so a single bad render on one route leaves a visitor with nothing at
 * all.
 *
 * Deliberately a class component: `getDerivedStateFromError` and
 * `componentDidCatch` have no hook equivalent.
 *
 * The fallback is a real page in the same shell and tokens as the 404, because
 * it is the page a visitor is most likely to see at the worst moment and it
 * still has to read as part of the site.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    /* Logged rather than swallowed: no error-reporting service is configured,
       and a silent failure is exactly what this exists to prevent. */
    console.error("Route failed to render:", error, info?.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <PageShell constrain>
        <SiteHeader variant="home" />

        <main id="main" tabIndex={-1}>
          <Card size="md" className={styles.card}>
            <p className={styles.code}>Error</p>
            <PageHeading className={styles.heading}>Something broke on this page.</PageHeading>
            <p className={styles.body}>
              The rest of the site is fine. Head back to the portfolio, or reload to try again.
            </p>
            <div className={styles.actions}>
              <Link className={styles.link} to="/portfolio">
                View portfolio
              </Link>
              <button className={styles.link} type="button" onClick={() => window.location.reload()}>
                Reload this page
              </button>
            </div>
          </Card>
        </main>

        <SiteFooter />
      </PageShell>
    );
  }
}

export default ErrorBoundary;

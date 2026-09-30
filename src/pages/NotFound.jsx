import { Link } from "react-router-dom";
import { PageShell, SiteFooter, SiteHeader } from "../components/layout";
import { Card } from "../components/ui";
import useDocumentTitle from "../hooks/useDocumentTitle";
import styles from "./NotFound.module.css";

/**
 * Catch-all route. Reached by any URL the router does not match, including
 * /about and /contact, which are still unresolved pages.
 */
export default function NotFound() {
  useDocumentTitle("Not found — Srijan Gupta");

  return (
    <PageShell constrain>
      <SiteHeader variant="home" />

      <Card size="md" className={styles.card}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page doesn&apos;t exist yet.</h1>
        <p className={styles.body}>
          About and Contact are still to be built. The work so far is on the portfolio.
        </p>
        <Link className={styles.link} to="/portfolio">
          View portfolio
        </Link>
      </Card>

      <SiteFooter />
    </PageShell>
  );
}
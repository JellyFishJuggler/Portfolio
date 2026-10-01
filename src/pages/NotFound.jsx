import { Link } from "react-router-dom";
import { PageShell, SiteFooter, SiteHeader } from "../components/layout";
import { Card } from "../components/ui";
import useDocumentTitle from "../hooks/useDocumentTitle";
import styles from "./NotFound.module.css";

/**
 * Catch-all route. Reached by any URL the router does not match.
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
          This page doesn&apos;t exist. Head back to the portfolio.
        </p>
        <Link className={styles.link} to="/portfolio">
          View portfolio
        </Link>
      </Card>

      <SiteFooter />
    </PageShell>
  );
}
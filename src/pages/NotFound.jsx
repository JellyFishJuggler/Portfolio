import { Link } from "react-router-dom";
import { PageShell, SiteFooter, SiteHeader } from "../components/layout";
import { Card, PageHeading } from "../components/ui";
import useDocumentMeta from "../hooks/useDocumentMeta";
import styles from "./NotFound.module.css";

/**
 * Catch-all route. Reached by any URL the router does not match, and by a
 * project URL whose entry is still a draft — see `getProject`, which returns
 * nothing for those in production so the case-study route redirects here.
 *
 * Laid out like the other section pages: shell, header, one h1, then the
 * pointer onward.
 */
export default function NotFound() {
  useDocumentMeta({
    title: "Not found — Srijan Gupta",
    description: "This page doesn't exist.",
  });

  return (
    <PageShell constrain>
      <SiteHeader variant="home" />

      <Card size="md" className={styles.card}>
        <p className={styles.code}>404</p>
        <PageHeading className={styles.heading}>This page doesn&apos;t exist yet.</PageHeading>
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

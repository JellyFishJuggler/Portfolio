import { PageShell, SiteFooter, SiteHeader } from "../components/layout";
import { PageHeading } from "../components/ui";
import useDocumentTitle from "../hooks/useDocumentTitle";

/**
 * Contact placeholder, completed in a later commit: details column,
 * form card, submit/mailto behaviour and responsive layout.
 */
export default function Contact() {
  useDocumentTitle("Contact — Srijan Gupta");

  return (
    <PageShell constrain>
      <SiteHeader variant="home" />

      <PageHeading>Contact</PageHeading>

      <SiteFooter topSpace={81} />
    </PageShell>
  );
}
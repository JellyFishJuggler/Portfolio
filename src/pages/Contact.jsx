import { ContactDetails, ContactForm } from "../components/contact";
import { PageShell, SiteFooter, SiteHeader } from "../components/layout";
import { Card, PageHeading, Reveal } from "../components/ui";
import { contact } from "../data/contact";
import { useDocumentTitle, useSmoothScroll } from "../hooks";
import styles from "./Contact.module.css";

/**
 * Contact. Two-column layout: phone/email on the left, the form card on
 * the right. Submission goes to VITE_CONTACT_ENDPOINT when configured and
 * falls back to the visitor's mail client otherwise.
 */
export default function Contact() {
  useDocumentTitle("Contact — Srijan Gupta");
  useSmoothScroll();

  return (
    <PageShell constrain>
      <SiteHeader variant="home" />

      <PageHeading>{contact.heading}</PageHeading>

      <Reveal className={styles.grid}>
        <ContactDetails />
        <Card className={styles.card}>
          <ContactForm />
        </Card>
      </Reveal>

      <SiteFooter topSpace={81} />
    </PageShell>
  );
}
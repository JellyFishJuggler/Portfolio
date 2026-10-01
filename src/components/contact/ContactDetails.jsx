import { site } from "../../data/site";
import { ContactItem } from "../ui";
import styles from "./ContactDetails.module.css";

/**
 * The left-hand contact column: Phone then Email, sized down from the
 * footer's defaults so the pair reads as row labels beside the form card.
 */
export function ContactDetails() {
  const { email, phone, phoneHref } = site.contact;

  return (
    <div className={styles.details}>
      <ContactItem label="Phone" value={phone} href={phoneHref} />
      <ContactItem label="Email" value={email} href={`mailto:${email}`} />
    </div>
  );
}

export default ContactDetails;
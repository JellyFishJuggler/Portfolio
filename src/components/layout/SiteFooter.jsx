import { site } from "../../data/site";
import { ContactItem } from "../ui";
import styles from "./SiteFooter.module.css";

/**
 * Contact footer. Email and phone stay selectable so they can be copied;
 * social entries are labelled by platform rather than by handle.
 *
 * `topSpace` is the gap between the page content and the rule, controlled
 * by the page: ~81px on /contact under the form, ~150px on the listing.
 *
 * @param {object} props
 * @param {number} [props.topSpace] - px above the footer rule.
 */
export function SiteFooter({ topSpace }) {
  const { email, phone, phoneHref, github, linkedin, behance, leetcode } = site.contact;

  return (
    <footer
      className={styles.footer}
      style={topSpace ? { "--footer-top": `${topSpace}px` } : undefined}
    >
      <hr className={styles.rule} />
      <div className={styles.grid}>
        <ContactItem label="Email" value={email} href={`mailto:${email}`} roll />
        <ContactItem label="Phone" value={phone} href={phoneHref} roll />
        <ContactItem label="GitHub" value={github.label} href={github.href} title={github.title} roll />
        <ContactItem value={linkedin.label} href={linkedin.href} title={linkedin.title} className={styles.linkedin} roll />
        <ContactItem value={behance.label} href={behance.href} title={behance.title} className={styles.behance} />
        <ContactItem value={leetcode.label} href={leetcode.href} title={leetcode.title} className={styles.leetcode} />
      </div>
    </footer>
  );
}

export default SiteFooter;
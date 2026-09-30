import { site } from "../../data/site";
import { cx } from "../../utils/cx";
import styles from "./SiteFooter.module.css";

/**
 * @param {object} props
 * @param {{label: string, href: string}} [props.phone]
 * @param {{label: string, href: string}} [props.linkedin]
 * @param {{label: string, href: string}} [props.github]
 */
function Item({ label, value, href, className }) {
  return (
    <div className={cx(styles.item, className)}>
      <span className={styles.label}>{label}</span>
      <a className={styles.value} href={href}>
        {value}
      </a>
    </div>
  );
}

/**
 * Contact footer. Values are real links and stay selectable so the email
 * and phone number can be copied.
 */
export function SiteFooter() {
  const { email, phone, github, linkedin } = site.contact;

  return (
    <footer className={styles.footer}>
      <hr className={styles.rule} />
      <div className={styles.grid}>
        <Item label="Email" value={email} href={`mailto:${email}`} />
        <Item label="Phone" value={phone} href="tel:+918510888675" />
        <Item label="GitHub" value={github.label} href={github.href} />
        <Item
          label="LinkedIn"
          value={linkedin.label}
          href={linkedin.href}
          className={styles.linkedin}
        />
      </div>
    </footer>
  );
}

export default SiteFooter;

import { site } from "../../data/site";
import { cx } from "../../utils/cx";
import styles from "./SiteFooter.module.css";

/**
 * A footer cell. `label` is the small grey caption above the value (used for
 * Email and Phone); social profiles omit it, because their value is already
 * the platform name and a second caption would just repeat it.
 *
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} props.value
 * @param {string} props.href
 * @param {string} [props.title] - hover text, used to surface the handle.
 */
function Item({ label, value, href, title, className }) {
  return (
    <div className={cx(styles.item, className)}>
      {label && <span className={styles.label}>{label}</span>}
      <a className={styles.value} href={href} title={title}>
        {value}
      </a>
    </div>
  );
}

/**
 * Contact footer. Email and phone stay selectable so they can be copied;
 * social entries are labelled by platform rather than by handle.
 */
export function SiteFooter() {
  const { email, phone, phoneHref, github, linkedin, behance, leetcode } = site.contact;

  return (
    <footer className={styles.footer}>
      <hr className={styles.rule} />
      <div className={styles.grid}>
        <Item label="Email" value={email} href={`mailto:${email}`} />
        <Item label="Phone" value={phone} href={phoneHref} />
        <Item label="GitHub" value={github.label} href={github.href} title={github.title} />
        <Item value={linkedin.label} href={linkedin.href} title={linkedin.title} className={styles.linkedin} />
        <Item value={behance.label} href={behance.href} title={behance.title} className={styles.behance} />
        <Item value={leetcode.label} href={leetcode.href} title={leetcode.title} className={styles.leetcode} />
      </div>
    </footer>
  );
}

export default SiteFooter;
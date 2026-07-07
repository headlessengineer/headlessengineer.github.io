import Link from 'next/link';
import type { SiteConfig } from '../../types/config';
import styles from './Footer.module.css';

interface FooterProps {
  site: SiteConfig;
}

const STUDIO_HREFS = ['/about', '/services', '/projects', '/articles'];

export function Footer({ site }: FooterProps): React.JSX.Element {
  const studioLinks = site.navigation.filter((item) =>
    STUDIO_HREFS.includes(item.href),
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid} data-testid="footer-grid">
          {/* Col 1: Brand */}
          <div>
            <Link
              href="/"
              className={styles.wordmark}
              style={{ fontSize: '22px' }}
              aria-label="HeadlessEngineer, home"
            >
              <span className={styles.wordHead}>HEADLESS</span>
              <span className={styles.wordTail}>ENGINEER</span>
            </Link>
            <p className={styles.tagline}>{site.tagline}</p>
          </div>

          {/* Col 2: Studio */}
          <div className={styles.col}>
            <span className={styles.colHeading}>Studio</span>
            <ul className={styles.colList}>
              {studioLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div className={styles.col}>
            <span className={styles.colHeading}>Connect</span>
            <ul className={styles.colList}>
              <li>
                <a href={`mailto:${site.author.email}`}>{site.author.email}</a>
              </li>
              <li>
                <a
                  href={site.scheduleCallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Schedule a call (opens in new tab)"
                >
                  Schedule a call
                </a>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in new tab)"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in new tab)"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio / Location */}
          <div className={styles.col}>
            <span className={styles.colHeading}>Studio</span>
            <ul className={styles.colList}>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>{site.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <span className={styles.bottomText}>
            &copy; {new Date().getFullYear()} HeadlessEngineer. All rights reserved.
          </span>
          <span className={styles.bottomText}>
            Founded by {site.author.name}
          </span>
        </div>
      </div>
    </footer>
  );
}

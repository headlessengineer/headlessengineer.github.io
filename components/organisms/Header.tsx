import { Logo } from '../atoms/Logo';
import { NavLinks } from './NavLinks';
import { ThemeSwitcher } from '../atoms/ThemeSwitcher';
import { SkipLink } from '../atoms/SkipLink';
import { ScrollNavCta } from './ScrollNavCta';
import { OffcanvasNav } from './OffcanvasNav';
import type { SiteConfig } from '../../types/config';
import styles from './Header.module.css';

interface HeaderProps {
  site: SiteConfig;
}

export function Header({ site }: HeaderProps) {
  const enabledNav = site.navigation.filter((item) => item.enabled);

  return (
    <>
      <SkipLink />
      <header className={styles.header}>
        <div className={styles.container}>
          <Logo />
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navLinks}>
              <NavLinks items={enabledNav} />
            </ul>
          </nav>
          <div className={styles.navRight}>
            <ThemeSwitcher />
            <ScrollNavCta />
            <OffcanvasNav
              items={enabledNav}
              ctaHref="/contact"
              ctaLabel="Talk to Us"
            />
          </div>
        </div>
      </header>
    </>
  );
}

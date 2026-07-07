'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavLinks.module.css';

interface NavLinksProps {
  items: ReadonlyArray<{ label: string; href: string }>;
}

export function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const isExternal = item.href.startsWith('http');
        const isActive =
          isExternal
            ? false
            : item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              aria-current={isActive ? 'page' : undefined}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import styles from './OffcanvasNav.module.css';

interface OffcanvasNavProps {
  items: ReadonlyArray<{ label: string; href: string }>;
  ctaHref: string;
  ctaLabel: string;
}

export function OffcanvasNav({ items, ctaHref, ctaLabel }: OffcanvasNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    hamburgerRef.current?.focus();
  };

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        ref={hamburgerRef}
        className={styles.hamburger}
        aria-label="Open menu"
        aria-expanded={isOpen}
        onClick={open}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          stroke="currentColor"
          strokeWidth={1.5}
          fill="none"
        >
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        aria-hidden="true"
        onClick={close}
      />

      <nav
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        aria-label="Mobile navigation"
      >
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          aria-label="Close menu"
          onClick={close}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth={1.5}
            fill="none"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <ul className={styles.navList}>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button href={ctaHref} variant="primary">
          {ctaLabel}
        </Button>
      </nav>
    </>
  );
}

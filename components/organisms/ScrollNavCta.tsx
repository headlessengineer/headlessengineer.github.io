'use client';

import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { Button } from '../atoms/Button';
import styles from './ScrollNavCta.module.css';

export function ScrollNavCta(): JSX.Element {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heading = document.getElementById('hero-heading');
    if (!heading) {
      // No hero on this page — CTA always visible; defer to avoid sync setState in effect
      const id = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px' },
    );

    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  return (
    <Button
      href="/contact"
      variant="primary"
      className={visible ? styles.ctaVisible : styles.cta}
    >
      Talk to Us
    </Button>
  );
}

'use client';
import { useState, useEffect, type JSX } from 'react';
import styles from './HeroTaglineRotator.module.css';

interface HeroTaglineRotatorProps {
  taglines: readonly string[];
}

export function HeroTaglineRotator({ taglines }: HeroTaglineRotatorProps): JSX.Element {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (taglines.length === 0) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % taglines.length);
    }, 2800);
    return () => clearInterval(id);
  }, [taglines]);

  const offset = -(index * 24);

  return (
    <div className={styles.rotator}>
      <div
        className={styles.track}
        style={{ transform: `translateY(${offset}px)` }}
      >
        {taglines.map((tagline) => (
          <span key={tagline} className={styles.tagline}>
            {tagline}
          </span>
        ))}
      </div>
    </div>
  );
}

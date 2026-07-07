'use client';
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export function useScrollReveal(
  selector: string,
  staggerMs = 50,
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((item, i) => {
      item.style.animationDelay = `${i * staggerMs}ms`;
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, [selector, staggerMs]);

  return ref;
}

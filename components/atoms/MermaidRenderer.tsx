'use client';

import { useEffect, useRef } from 'react';
import styles from './MermaidRenderer.module.css';

interface MermaidRendererProps {
  chart: string;
}

export function MermaidRenderer({ chart }: MermaidRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    import('mermaid').then(async (mod) => {
      if (cancelled || !ref.current) return;
      mod.default.initialize({ startOnLoad: false, theme: 'dark' });
      const { svg } = await mod.default.render('mermaid-' + Math.random().toString(36).slice(2), chart);
      if (!cancelled && ref.current) ref.current.innerHTML = svg;
    }).catch(() => {
      if (ref.current) ref.current.textContent = chart;
    });
    return () => { cancelled = true; };
  }, [chart]);

  return <div ref={ref} className={styles.mermaid} />;
}

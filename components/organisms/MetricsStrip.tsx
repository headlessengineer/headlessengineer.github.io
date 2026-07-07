'use client';
import type { JSX } from 'react';
import type { MetricItem } from '../../types/config';
import { useScrollReveal } from '../../lib/useScrollReveal';
import styles from './MetricsStrip.module.css';

interface MetricsStripProps {
  metrics: readonly MetricItem[];
}

export function MetricsStrip({ metrics }: MetricsStripProps): JSX.Element {
  const ref = useScrollReveal('.reveal');

  return (
    <section ref={ref} className={styles.strip} aria-label="Studio metrics">
      <div className={styles.container}>
        {metrics.map((metric) => (
          <div key={metric.figure} className={`${styles.metric} reveal`}>
            <span className={styles.figure}>{metric.figure}</span>
            <span className={styles.label}>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

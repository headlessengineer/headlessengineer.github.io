'use client';
import type { JSX } from 'react';
import { CardRows, CardRow } from '../atoms/CardRows';
import { ServiceCard } from '../molecules/ServiceCard';
import type { AboutConfig } from '../../types/config';
import { useScrollReveal } from '../../lib/useScrollReveal';
import styles from './Principles.module.css';

interface PrinciplesProps {
  principles: AboutConfig['principles'];
}

export function Principles({ principles }: PrinciplesProps): JSX.Element {
  const row1 = principles.principles.slice(0, 3);
  const row2 = principles.principles.slice(3, 5);
  const ref = useScrollReveal('.reveal');

  return (
    <section ref={ref} className={styles.section} aria-labelledby="principles-heading" data-section-number="03">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>How We Work</span>
          <h2 id="principles-heading" className={styles.heading}>
            {principles.title}
          </h2>
        </div>
        <CardRows>
          <CardRow cols={3}>
            {row1.map((principle) => (
              <ServiceCard
                key={principle.title}
                title={principle.title}
                description={principle.description}
                value={principle.value}
                className="reveal"
              />
            ))}
          </CardRow>
          <CardRow cols={2}>
            {row2.map((principle) => (
              <ServiceCard
                key={principle.title}
                title={principle.title}
                description={principle.description}
                value={principle.value}
                className="reveal"
              />
            ))}
          </CardRow>
        </CardRows>
      </div>
    </section>
  );
}

'use client';
import type { JSX } from 'react';
import { CardRows, CardRow } from '../atoms/CardRows';
import { ServiceCard } from '../molecules/ServiceCard';
import type { AboutConfig } from '../../types/config';
import { useScrollReveal } from '../../lib/useScrollReveal';
import styles from './Expertise.module.css';

interface ExpertiseProps {
  expertise: AboutConfig['expertise'];
}

export function Expertise({ expertise }: ExpertiseProps): JSX.Element {
  const row1 = expertise.skills.slice(0, 3);
  const row2 = expertise.skills.slice(3, 5);
  const ref = useScrollReveal('.reveal');

  return (
    <section ref={ref} className={styles.section} aria-labelledby="expertise-heading" data-section-number="02">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>{expertise.title}</span>
          <h2 id="expertise-heading" className={styles.heading}>
            {expertise.description}
          </h2>
        </div>
        <CardRows>
          <CardRow cols={3}>
            {row1.map((skill) => (
              <ServiceCard
                key={skill.title}
                title={skill.title}
                description={skill.description}
                value={skill.value}
                className="reveal"
              />
            ))}
          </CardRow>
          <CardRow cols={2}>
            {row2.map((skill) => (
              <ServiceCard
                key={skill.title}
                title={skill.title}
                description={skill.description}
                value={skill.value}
                className="reveal"
              />
            ))}
          </CardRow>
        </CardRows>
      </div>
    </section>
  );
}

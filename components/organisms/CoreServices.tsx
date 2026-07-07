'use client';
import type { JSX } from 'react';
import type { AboutConfig } from '../../types/config';
import { CardRow, CardRows } from '../atoms/CardRows';
import { ServiceCard } from '../molecules/ServiceCard';
import { useScrollReveal } from '../../lib/useScrollReveal';
import styles from './CoreServices.module.css';

interface CoreServicesProps {
  coreServices: AboutConfig['coreServices'];
}

export function CoreServices({ coreServices }: CoreServicesProps): JSX.Element {
  const { title, description, services } = coreServices;
  const ref = useScrollReveal('.reveal');

  return (
    <section ref={ref} className={styles.section} aria-labelledby="core-services-heading" data-section-number="01">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{title}</span>
          <h2 id="core-services-heading" className={styles.heading}>
            {description}
          </h2>
        </header>

        <CardRows>
          <CardRow cols={3}>
            {services.slice(0, 3).map((service) => (
              <ServiceCard
                key={service.title}
                badge={service.badge}
                title={service.title}
                description={service.description}
                value={service.value}
                className="reveal"
              />
            ))}
          </CardRow>
          <CardRow cols={2}>
            {services.slice(3, 5).map((service) => (
              <ServiceCard
                key={service.title}
                badge={service.badge}
                title={service.title}
                description={service.description}
                value={service.value}
                className="reveal"
              />
            ))}
          </CardRow>
        </CardRows>
      </div>
    </section>
  );
}

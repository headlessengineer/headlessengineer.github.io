import type { JSX } from 'react';
import type { AboutConfig } from '../../types/config';
import { CardRow, CardRows } from '../atoms/CardRows';
import { ServiceCard } from '../molecules/ServiceCard';
import styles from './HomeServices.module.css';

interface HomeServicesProps {
  coreServices: AboutConfig['coreServices'];
}

export function HomeServices({ coreServices }: HomeServicesProps): JSX.Element {
  const { title, description, intro, services } = coreServices;

  return (
    <section className={styles.services} aria-labelledby="services-heading" data-section-number="01">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{title}</span>
          <h2 id="services-heading" className={styles.heading}>
            {description}
          </h2>
          {intro && <p className={styles.intro}>{intro}</p>}
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
                href={service.href}
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
                href={service.href}
              />
            ))}
          </CardRow>
        </CardRows>
      </div>
    </section>
  );
}

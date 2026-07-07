import type { JSX } from 'react';
import type { Metadata } from 'next';
import { getConfig } from '../../lib/config-cache';
import { FilterableOfferings } from '../../components/molecules/FilterableOfferings';
import type { Offering } from '../../components/molecules/FilterableOfferings';
import { CTABand } from '../../components/molecules/CTABand';
import type { FilterChip } from '../../components/molecules/FilterChips';
import styles from './services.module.css';

export function generateMetadata(): Metadata {
  const { services } = getConfig();
  return {
    title: services.metadata.title,
    description: services.metadata.description,
    openGraph: {
      title: services.metadata.title,
      description: services.metadata.description,
    },
  };
}

export default function ServicesPage(): JSX.Element {
  const { services } = getConfig();

  const chips: FilterChip[] = [
    { id: 'all', label: 'All' },
    ...services.categories.map((c) => ({ id: c.id, label: c.label })),
  ];

  // href omitted: detail pages are out of scope (non-goal). Reference cards have no card-link.
  const offerings: Offering[] = services.offerings.map((o) => ({
    category: o.category,
    cardProps: {
      badge: o.tag,
      title: o.title,
      description: o.description,
      value: o.value,
      engagement: o.engagement,
    },
  }));

  return (
    <>
      {services.sections.hero.visible && (
        <section className={styles.pageHero} aria-labelledby="services-hero-heading">
          <div className={styles.heroContainer}>
            <span className={styles.eyebrow}>Services</span>
            <h1 id="services-hero-heading" className={styles.heroTitle}>{services.hero.title}</h1>
            <p className={styles.heroBody}>{services.hero.description}</p>
          </div>
        </section>
      )}

      {services.sections.offerings.visible && (
        <section className={styles.offeringsSection} aria-labelledby="offerings-heading">
          <div className={styles.offeringsContainer}>
            <h2 id="offerings-heading" className="sr-only">Service Offerings</h2>
            <FilterableOfferings chips={chips} offerings={offerings} />
          </div>
        </section>
      )}

      {services.sections.cta.visible && (
        <section className={styles.ctaSection} aria-label="Get in touch">
          <div className={styles.ctaContainer}>
            <CTABand
              title={services.cta.title}
              description={services.cta.description}
              buttons={[{ label: 'Get In Touch', href: services.cta.href, variant: 'primary' }]}
            />
          </div>
        </section>
      )}
    </>
  );
}

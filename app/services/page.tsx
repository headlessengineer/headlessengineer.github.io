import type { JSX } from 'react';
import type { Metadata } from 'next';
import { getConfig } from '../../lib/config-cache';
import { FilterableOfferings } from '../../components/molecules/FilterableOfferings';
import type { Offering } from '../../components/molecules/FilterableOfferings';
import { CTABand } from '../../components/molecules/CTABand';
import type { FilterChip } from '../../components/molecules/FilterChips';
import { PageHero } from '../../components/organisms/PageHero';
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
        <PageHero
          eyebrow="Services"
          title={services.hero.title}
          description={services.hero.description}
          headingId="services-hero-heading"
        />
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

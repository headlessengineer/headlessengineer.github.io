import type { JSX } from 'react';
import type { Metadata } from 'next';
import { getConfig } from '../lib/config-cache';
import { Hero } from '../components/organisms/Hero';
import { MetricsStrip } from '../components/organisms/MetricsStrip';
import { HomeServices } from '../components/organisms/HomeServices';
import { TechMarquee } from '../components/organisms/TechMarquee';
import { TestimonialCard } from '../components/molecules/TestimonialCard';
import { CardRows, CardRow } from '../components/atoms/CardRows';
import { Button } from '../components/atoms/Button';
import styles from './home.module.css';

function safeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003C')
    .replace(/>/g, '\\u003E')
    .replace(/\//g, '\\u002F');
}

export function generateMetadata(): Metadata {
  const { site } = getConfig();
  return {
    title: { absolute: site.name },
    description: site.description,
    openGraph: {
      title: site.name,
      description: site.description,
    },
  };
}

export default function HomePage(): JSX.Element {
  const { home, site, about, testimonials } = getConfig();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    description: site.description,
    sameAs: [
      site.social.github,
      site.social.linkedin,
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      {home.sections.hero.visible && <Hero hero={home.hero} availability={site.availability} />}
      {home.sections.metrics.visible && about.metrics.length > 0 && <MetricsStrip metrics={about.metrics} />}
      {home.sections.services.visible && <HomeServices coreServices={about.coreServices} />}
      <TechMarquee />
      {home.sections.testimonials.visible && testimonials.items.length > 0 && (
        <section data-testid="testimonials-section" className={styles.testimonialsSection}>
          <div className={styles.testimonialsContainer}>
            <div className={styles.testimonialsSectionHead}>
              <span className={styles.testimonialsEyebrow}>Social Proof</span>
              <h2 className={styles.testimonialsHeading}>What clients say</h2>
            </div>
            <CardRows>
              <CardRow cols={Math.min(testimonials.items.length, 3) as 1 | 2 | 3}>
                {testimonials.items.map((item) => (
                  <TestimonialCard key={item.id} testimonial={item} />
                ))}
              </CardRow>
            </CardRows>
          </div>
        </section>
      )}
      {home.sections.cta.visible && (
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>{about.cta.title}</h2>
            <hr className={styles.ctaRule} />
            <div className={styles.ctaButtons}>
              {about.cta.buttons.map((btn) => (
                <Button key={btn.href} href={btn.href} variant={btn.variant}>
                  {btn.label}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

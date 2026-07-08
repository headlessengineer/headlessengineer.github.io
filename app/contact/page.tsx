import type { JSX } from 'react';
import type { Metadata } from 'next';
import { getConfig } from '../../lib/config-cache';
import { CardRows, CardRow } from '../../components/atoms/CardRows';
import { MethodCard } from '../../components/molecules/MethodCard';
import { PageHero } from '../../components/organisms/PageHero';
import styles from './contact.module.css';

export function generateMetadata(): Metadata {
  const { contact } = getConfig();
  return {
    title: 'Contact - headlessengineer',
    description: contact.metadata.description,
    openGraph: {
      title: 'Contact - headlessengineer',
      description: contact.metadata.description,
    },
  };
}

export default function ContactPage(): JSX.Element {
  const { contact } = getConfig();

  return (
    <>
      {contact.sections.hero.visible && (
        <PageHero
          eyebrow="Contact"
          title={contact.title}
          description={contact.subtitle}
          headingId="contact-hero-heading"
        />
      )}

      {contact.sections.methods.visible && (
        <section aria-labelledby="methods-heading" className={styles.methodsSection}>
          <div className={styles.methodsContainer}>
            <h2 id="methods-heading" className="sr-only">Contact Methods</h2>
            <CardRows>
              <CardRow cols={2}>
                {contact.methods.slice(0, 2).map((method) => (
                  <MethodCard
                    key={method.title}
                    title={method.title}
                    value={method.value}
                    description={method.description}
                    href={method.href}
                  />
                ))}
              </CardRow>
              <CardRow cols={2}>
                {contact.methods.slice(2, 4).map((method) => (
                  <MethodCard
                    key={method.title}
                    title={method.title}
                    value={method.value}
                    description={method.description}
                    href={method.href}
                  />
                ))}
              </CardRow>
            </CardRows>
          </div>
        </section>
      )}

    </>
  );
}

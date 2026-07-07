'use client';
import type { JSX } from 'react';
import { CardRows, CardRow } from '../atoms/CardRows';
import { CertCard } from '../molecules/CertCard';
import type { AboutConfig } from '../../types/config';
import { useScrollReveal } from '../../lib/useScrollReveal';
import styles from './Certifications.module.css';

interface CertificationsProps {
  certifications: AboutConfig['certifications'];
}

export function Certifications({ certifications }: CertificationsProps): JSX.Element {
  const row1 = certifications.certifications.slice(0, 3);
  const row2 = certifications.certifications.slice(3, 5);
  const ref = useScrollReveal('.reveal');

  return (
    <section ref={ref} className={styles.section} aria-labelledby="certifications-heading" data-section-number="04">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>Credentials</span>
          <h2 id="certifications-heading" className={styles.heading}>
            {certifications.title}
          </h2>
        </div>
        <CardRows>
          <CardRow cols={3}>
            {row1.map((cert) => (
              <CertCard
                key={cert.title}
                title={cert.title}
                value={cert.value}
                description={cert.description}
                href={cert.href}
                className="reveal"
              />
            ))}
          </CardRow>
          <CardRow cols={2}>
            {row2.map((cert) => (
              <CertCard
                key={cert.title}
                title={cert.title}
                value={cert.value}
                description={cert.description}
                href={cert.href}
                className="reveal"
              />
            ))}
          </CardRow>
        </CardRows>
      </div>
    </section>
  );
}

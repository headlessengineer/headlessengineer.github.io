import type { JSX } from 'react';
import type { HeroConfig } from '../../types/config';
import { Button } from '../atoms/Button';
import { CodePanel } from '../atoms/CodePanel';
import { HeroTaglineRotator } from '../atoms/HeroTaglineRotator';
import { AvailabilityBadge } from '../atoms/AvailabilityBadge';
import styles from './Hero.module.css';

interface HeroProps {
  hero: HeroConfig;
  availability?: { open: boolean; label: string };
}

export function Hero({ hero, availability }: HeroProps): JSX.Element {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div>
            {availability && (
              <AvailabilityBadge open={availability.open} label={availability.label} />
            )}
            <span className={styles.eyebrow}>Technology Consultancy</span>
            <HeroTaglineRotator taglines={hero.taglines ?? []} />
            <h1 id="hero-heading" className={styles.display}>
              Tech solutions for business problems.
            </h1>
            {hero.description && (
              <p className={styles.description}>{hero.description}</p>
            )}
            {(hero.cta?.primary || hero.cta?.secondary) && (
              <div className={styles.ctas}>
                {hero.cta?.primary && (
                  <Button href={hero.cta.primary.href}>
                    {hero.cta.primary.label}
                  </Button>
                )}
                {hero.cta?.secondary && (
                  <Button variant="secondary" href={hero.cta.secondary.href}>
                    {hero.cta.secondary.label}
                  </Button>
                )}
              </div>
            )}
          </div>
          <CodePanel />
        </div>
      </div>
    </section>
  );
}

import type { JSX } from 'react';
import styles from './PageHero.module.css';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  headingId?: string;
}

export function PageHero({ eyebrow, title, description, headingId }: PageHeroProps): JSX.Element {
  return (
    <section className={styles.hero} aria-labelledby={headingId}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 id={headingId} className={styles.title}>{title}</h1>
        {description && <p className={styles.body}>{description}</p>}
      </div>
    </section>
  );
}

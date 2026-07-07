import type { JSX } from 'react';
import styles from './TechMarquee.module.css';

const TECHNOLOGIES = [
  'Go', 'Kafka', 'Kubernetes', 'Spryker', 'Magento 2', 'Adobe Commerce', 'AWS',
  'Claude API', 'n8n', 'CrewAI', 'React', 'Next.js', 'PostgreSQL', 'Redis', 'Docker',
];

export function TechMarquee(): JSX.Element {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => (
          <span key={`${tech}-${i}`} className={styles.item}>{tech}</span>
        ))}
      </div>
    </div>
  );
}

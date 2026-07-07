import type { JSX } from 'react';
import Link from 'next/link';
import { Badge } from '../atoms/Badge';
import styles from './ServiceCard.module.css';

export interface ServiceCardProps {
  badge?: string;
  title: string;
  description: string;
  value?: string;
  engagement?: string;
  href?: string;
  className?: string;
}

export function ServiceCard({
  badge,
  title,
  description,
  value,
  engagement,
  href,
  className,
}: ServiceCardProps): JSX.Element {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      {badge && <Badge label={badge} />}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {value && <span className={styles.value}>{value}</span>}
      {engagement && (
        <span className={styles.engagement}>
          <strong>Engagement: </strong>{engagement}
        </span>
      )}
      {href && (
        <Link href={href} className={styles.cardLink} aria-label={`Learn more about ${title}`}>
          Learn more <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

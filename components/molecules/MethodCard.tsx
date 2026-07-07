import type { JSX } from 'react';
import { safeHref } from '../../lib/safeHref';
import styles from './MethodCard.module.css';

export interface MethodCardProps {
  title: string;
  value: string;
  description: string;
  href: string;
}

export function MethodCard({
  title,
  value,
  description,
  href,
}: MethodCardProps): JSX.Element {
  return (
    <a href={safeHref(href)} rel="noopener noreferrer" className={styles.card}>
      <span className={styles.label}>{title}</span>
      <div className={styles.methodValue}>{value}</div>
      <p className={styles.description}>{description}</p>
    </a>
  );
}

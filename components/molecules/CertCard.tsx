import type { JSX } from 'react';
import { safeHref } from '../../lib/safeHref';
import styles from './CertCard.module.css';

export interface CertCardProps {
  title: string;
  value: string;
  description: string;
  href?: string;
  className?: string;
}

export function CertCard({
  title,
  value,
  description,
  href,
  className,
}: CertCardProps): JSX.Element {
  const cls = [styles.card, className].filter(Boolean).join(' ');

  const content = (
    <>
      <span className={styles.label}>{title}</span>
      <div className={styles.certValue}>{value}</div>
      <p className={styles.description}>{description}</p>
    </>
  );

  if (href) {
    return (
      <a href={safeHref(href)} rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }

  return <div className={cls}>{content}</div>;
}

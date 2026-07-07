import type { JSX } from 'react';
import styles from './AvailabilityBadge.module.css';

interface AvailabilityBadgeProps {
  open: boolean;
  label: string;
}

export function AvailabilityBadge({ open, label }: AvailabilityBadgeProps): JSX.Element | null {
  if (!open) return null;

  return (
    <span className={styles.badge}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}

import type { JSX } from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  label: string;
}

export function Badge({ label }: BadgeProps): JSX.Element {
  return <span className={styles.badge}>{label}</span>;
}

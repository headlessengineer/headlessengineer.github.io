import type { ReactNode } from 'react';
import styles from './CardGrid.module.css';

interface CardGridProps {
  children: ReactNode;
  count: number;
}

export function CardGrid({ children, count }: CardGridProps) {
  return (
    <div className={styles.grid} data-count={count}>
      {children}
    </div>
  );
}

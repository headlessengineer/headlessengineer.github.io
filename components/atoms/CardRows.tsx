import type { JSX, ReactNode } from 'react';
import styles from './CardRows.module.css';

type CardRowCols = 1 | 2 | 3;

const colsClass: Record<CardRowCols, string> = {
  1: styles.cols1,
  2: styles.cols2,
  3: styles.cols3,
};

interface CardRowsProps {
  children: ReactNode;
}

interface CardRowProps {
  cols: CardRowCols;
  children: ReactNode;
}

export function CardRows({ children }: CardRowsProps): JSX.Element {
  return <div className={styles.cardRows}>{children}</div>;
}

export function CardRow({ cols, children }: CardRowProps): JSX.Element {
  return (
    <div className={`${styles.cardRow} ${colsClass[cols]}`}>{children}</div>
  );
}

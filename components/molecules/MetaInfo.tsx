import type { ReactNode } from 'react';
import styles from './MetaInfo.module.css';

interface MetaInfoProps {
  items: ReactNode[];
  separator?: string;
}

export function MetaInfo({ items, separator = '•' }: MetaInfoProps) {
  return (
    <div className={styles.meta}>
      {items.map((item, index) => (
        <span key={index}>
          <span className={styles.item}>{item}</span>
          {index < items.length - 1 && <span className={styles.separator}>{separator}</span>}
        </span>
      ))}
    </div>
  );
}

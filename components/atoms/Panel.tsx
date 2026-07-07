import type { JSX, ReactNode } from 'react';
import styles from './Panel.module.css';

interface PanelProps {
  children: ReactNode;
  grid?: boolean;
}

export function Panel({ children, grid }: PanelProps): JSX.Element {
  return (
    <div className={styles.panel}>
      {grid ? <div className={styles.panelGrid}>{children}</div> : children}
    </div>
  );
}

import { Card } from '../atoms/Card';
import styles from './StatsCard.module.css';

interface StatsCardProps {
  label: string;
  value: string | number;
  accent?: boolean;
}

export function StatsCard({ label, value, accent }: StatsCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.stat}>
        <span className={styles.statKey}>{label}</span>
        <span className={`${styles.statVal} ${accent ? styles.accent : ''}`}>
          {value}
        </span>
      </div>
    </Card>
  );
}

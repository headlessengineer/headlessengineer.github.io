import { Card } from '../atoms/Card';
import styles from './VerseCard.module.css';

interface VerseCardProps {
  title: string;
  value: string;
  description: string;
  href?: string;
}

export function VerseCard({ title, value, description, href }: VerseCardProps) {
  return (
    <Card title={title} className={styles.verseCard} href={href === '#' ? undefined : href}>
      <div className={styles.verse}>{value}</div>
      {description && <div className={styles.english}>{description}</div>}
    </Card>
  );
}

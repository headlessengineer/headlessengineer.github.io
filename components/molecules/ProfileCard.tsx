import { Card } from '../atoms/Card';
import styles from './ProfileCard.module.css';

interface ProfileCardProps {
  title: string;
  value: string;
  description: string;
  href?: string;
  target?: string;
}

export function ProfileCard({ title, value, description, href, target }: ProfileCardProps) {
  return (
    <Card href={href === '#' ? undefined : href} title={title} target={target}>
      <div className={styles.value}>{value}</div>
      <div className={styles.description}>{description}</div>
    </Card>
  );
}

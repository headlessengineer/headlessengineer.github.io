import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import styles from './ActionButtons.module.css';
import type { CTAButton } from '../../types/config';

interface ActionButtonsProps {
  buttons: CTAButton[];
  title?: string;
}

export function ActionButtons({ buttons, title }: ActionButtonsProps) {
  return (
    <Card title={title} className={styles.card}>
      <div className={styles.actions}>
        {buttons.map((btn) => (
          <Button key={btn.href} href={btn.href} variant={btn.variant || 'primary'}>
            {btn.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}

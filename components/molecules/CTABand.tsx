import type { JSX } from 'react';
import { Button } from '../atoms/Button';
import styles from './CTABand.module.css';

interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface CTABandProps {
  title: string;
  description: string;
  buttons: CTAButton[];
}

export function CTABand({ title, buttons }: CTABandProps): JSX.Element {
  return (
    <div className={styles.ctaBand}>
      <h2 className={styles.title}>{title}</h2>
      <hr className={styles.rule} />
      <div className={styles.buttonGroup}>
        {buttons.map((btn) => (
          <Button key={btn.href} href={btn.href} variant={btn.variant}>
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

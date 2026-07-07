import type { JSX } from 'react';
import { Button } from '../atoms/Button';
import styles from './ScrollNavCta.module.css';

export function ScrollNavCta(): JSX.Element {
  return (
    <Button href="/contact" variant="primary" className={styles.ctaVisible}>
      Talk to Us
    </Button>
  );
}

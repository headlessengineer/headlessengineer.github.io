import type { JSX } from 'react';
import { CTABand } from '../molecules/CTABand';
import type { AboutConfig } from '../../types/config';
import styles from './CTA.module.css';

interface CTAProps {
  cta: AboutConfig['cta'];
}

export function CTA({ cta }: CTAProps): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <CTABand
          title={cta.title}
          description={cta.description}
          buttons={cta.buttons}
        />
      </div>
    </section>
  );
}

import { getConfig } from '../lib/config-cache';
import { Button } from '../components/atoms/Button';
import styles from './not-found.module.css';

export default function NotFound() {
  const { notFound: cfg } = getConfig();

  return (
    <main>
      <section className={styles.hero} aria-labelledby="error-title">
        <div className={styles.container}>
          <h1 id="error-title" className={styles.title}>
            {cfg.title}
          </h1>
          <p className={styles.tagline}>{cfg.tagline}</p>
          <p className={styles.description}>{cfg.description}</p>
          <div className={styles.actions}>
            {cfg.buttons.map((button) => (
              <Button key={button.label} variant={button.variant} href={button.href}>
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

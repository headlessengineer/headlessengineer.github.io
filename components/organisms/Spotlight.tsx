import styles from './Spotlight.module.css';

interface SpotlightProps {
  label: string;
  title: string;
  description: string;
  href: string;
  linkText?: string;
  reversed?: boolean;
}

export function Spotlight({ title, description, reversed = false }: SpotlightProps) {
  return (
    <section className={styles.section} data-reversed={reversed}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <h5>{description}</h5>
        </div>
      </div>
    </section>
  );
}

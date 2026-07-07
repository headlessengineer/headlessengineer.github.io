import type { TestimonialItem } from '../../types/config';
import styles from './TestimonialCard.module.css';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className={styles.card}>
      <blockquote className={styles.blockquote}>
        <p className={styles.quote}>{testimonial.quote}</p>
        <footer className={styles.footer}>
          <cite className={styles.cite}>
            <span className={styles.author}>{testimonial.author}</span>
            <span className={styles.meta}>{testimonial.role} · {testimonial.company}</span>
          </cite>
        </footer>
      </blockquote>
    </figure>
  );
}

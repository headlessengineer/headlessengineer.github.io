import type { Testimonial } from '../../lib/schemas/testimonial';
import { Card } from '../atoms/Card';
import styles from './TestimonialPageCard.module.css';

interface TestimonialPageCardProps {
  testimonial: Testimonial;
}

export function TestimonialPageCard({ testimonial }: TestimonialPageCardProps) {
  const formattedDate = new Date(testimonial.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card title="Testimonial">
      <h3 className={styles.title}>{testimonial.title}</h3>
      <p className={styles.excerpt}>{testimonial.excerpt}</p>
      <div className={styles.author}>
        <span className={styles.authorName}>{testimonial.author}</span>
        <span className={styles.authorRole}>{testimonial.role}</span>
        <span className={styles.authorCompany}>{testimonial.company}</span>
      </div>
      <div className={styles.meta}>
        <span className={styles.date}>{formattedDate}</span>
      </div>
    </Card>
  );
}

import { TestimonialPageCard } from '../molecules/TestimonialPageCard';
import { CardGrid } from '../molecules/CardGrid';
import { Pagination } from '../atoms/Pagination';
import type { Testimonial } from '../../lib/schemas/testimonial';
import styles from './TestimonialGrid.module.css';

interface TestimonialGridProps {
  testimonials: Testimonial[];
  fullHeight?: boolean;
  currentPage?: number;
  totalPages?: number;
  basePath?: string;
  backLink?: React.ReactNode;
}

export function TestimonialGrid({ testimonials, fullHeight = false, currentPage, totalPages, basePath, backLink }: TestimonialGridProps) {
  return (
    <section className={fullHeight ? styles.sectionFullHeight : styles.section}>
      <div className={styles.container}>
        <CardGrid count={testimonials.length}>
          {testimonials.map((testimonial) => (
            <TestimonialPageCard key={testimonial.slug} testimonial={testimonial} />
          ))}
        </CardGrid>
        {currentPage && totalPages && basePath && (
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
        )}
        {backLink && <div className={styles.backLink}>{backLink}</div>}
      </div>
    </section>
  );
}

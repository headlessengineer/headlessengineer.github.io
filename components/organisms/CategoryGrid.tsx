import { CardGrid } from '../molecules/CardGrid';
import { Pagination } from '../atoms/Pagination';
import styles from './CategoryGrid.module.css';

interface CategoryGridProps {
  categories: string[];
  basePath: string;
  title?: string;
  fullHeight?: boolean;
  currentPage?: number;
  totalPages?: number;
  backLink?: React.ReactNode;
}

export function CategoryGrid({ categories, basePath, fullHeight = false, currentPage, totalPages, backLink }: CategoryGridProps) {
  return (
    <section className={fullHeight ? styles.sectionFullHeight : styles.section}>
      <div className={styles.container}>
        <CardGrid count={categories.length}>
          {categories.map((cat) => (
            <div key={cat}>{cat}</div>
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

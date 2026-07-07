import { PostCard } from '../molecules/PostCard';
import { CardGrid } from '../molecules/CardGrid';
import { Pagination } from '../atoms/Pagination';
import type { Article } from '../../lib/schemas/article';
import styles from './ArticleGrid.module.css';

interface ArticleGridProps {
  articles: Article[];
  fullHeight?: boolean;
  currentPage?: number;
  totalPages?: number;
  basePath?: string;
  backLink?: React.ReactNode;
}

export function ArticleGrid({ articles, fullHeight = false, currentPage, totalPages, basePath, backLink }: ArticleGridProps) {
  return (
    <section className={fullHeight ? styles.sectionFullHeight : styles.section}>
      <div className={styles.container}>
        <CardGrid count={articles.length}>
          {articles.map((article) => (
            <PostCard key={article.slug} article={article} />
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

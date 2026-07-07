import type { Article } from '../../lib/schemas/article';
import { Card } from '../atoms/Card';
import { Tag } from '../atoms/Tag';
import styles from './PostCard.module.css';

interface PostCardProps {
  article: Article;
}

// ISO date strings (YYYY-MM-DD) parse as UTC midnight; UTC timezone prevents
// the displayed date shifting one day back in negative-offset environments.
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function PostCard({ article }: PostCardProps) {
  const formattedDate = dateFormatter.format(new Date(article.publishedAt));

  return (
    <Card href={`/articles/${article.slug}`} title={article.category}>
      <h3 className={styles.title}>{article.title}</h3>
      <p className={styles.excerpt}>{article.excerpt}</p>
      <div className={styles.tags}>
        {article.tags.slice(0, 4).map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
      <div className={styles.meta}>
        <time className={styles.date} dateTime={article.publishedAt}>{formattedDate}</time>
        <span className={styles.separator}>·</span>
        <span className={styles.readingTime}>{article.readingTime} min</span>
      </div>
    </Card>
  );
}

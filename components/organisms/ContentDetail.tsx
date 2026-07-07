import Link from 'next/link';
import { MetaInfo } from '../molecules/MetaInfo';
import { TagList } from '../molecules/TagList';
import { ArticleContent } from '../molecules/ArticleContent';
import { BackLink } from '../atoms/BackLink';
import styles from './ContentDetail.module.css';

interface ContentDetailProps {
  backHref: string;
  backText: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: number;
  category?: string;
  categoryHref?: string;
  author?: string;
  tags?: string[];
  tagsBasePath?: string;
  content: string;
  sidebar?: React.ReactNode;
}

export function ContentDetail({
  backHref,
  backText,
  title,
  excerpt,
  publishedAt,
  updatedAt,
  readingTime,
  category,
  categoryHref,
  author,
  tags,
  tagsBasePath,
  content,
  sidebar,
}: ContentDetailProps) {
  const metaItems: React.ReactNode[] = [];
  if (publishedAt) metaItems.push(publishedAt);
  if (readingTime) metaItems.push(`${readingTime} min read`);
  if (author) metaItems.push(author);
  if (updatedAt && updatedAt !== publishedAt) metaItems.push(`Updated ${updatedAt}`);

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {category && categoryHref && (
            <div className={styles.category}>
              <Link href={categoryHref}>{category}</Link>
            </div>
          )}
          <h1 className={styles.title}>{title}</h1>
          {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
          {metaItems.length > 0 && <MetaInfo items={metaItems} />}
          {tags && tagsBasePath && <TagList tags={tags} basePath={tagsBasePath} />}
        </div>
      </header>
      <div className={styles.body}>
        <div className={styles.bodyContainer}>
          <ArticleContent content={content} />
          {sidebar && <div className={styles.sidebar}>{sidebar}</div>}
          <BackLink href={backHref} text={backText} />
        </div>
      </div>
    </article>
  );
}

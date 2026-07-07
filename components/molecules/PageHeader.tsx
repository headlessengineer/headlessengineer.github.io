import Link from 'next/link';
import { MetaInfo } from './MetaInfo';
import { TagList } from './TagList';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title: string;
  excerpt?: string;
  description?: string; // alias for excerpt
  category?: { name: string; href: string };
  metaItems?: (string | React.ReactNode)[];
  tags?: string[];
  tagBasePath?: string;
}

export function PageHeader({ title, excerpt, description, category, metaItems, tags, tagBasePath }: PageHeaderProps) {
  const subtitle = excerpt ?? description;
  return (
    <header className={styles.header}>
      {category && (
        <div className={styles.category}>
          <Link href={category.href}>{category.name}</Link>
        </div>
      )}
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.excerpt}>{subtitle}</p>}
      {metaItems && <MetaInfo items={metaItems} />}
      {tags && tagBasePath && <TagList tags={tags} basePath={tagBasePath} />}
    </header>
  );
}

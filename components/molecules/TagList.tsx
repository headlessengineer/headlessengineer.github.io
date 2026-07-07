import { Tag } from '../atoms/Tag';
import styles from './TagList.module.css';

interface TagListProps {
  tags: string[];
  basePath?: string;
}

export function TagList({ tags, basePath }: TagListProps) {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <Tag key={tag} label={tag} href={basePath ? `${basePath}/${tag}` : undefined} />
      ))}
    </div>
  );
}

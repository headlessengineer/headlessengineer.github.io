import Link from 'next/link';
import styles from './Tag.module.css';

interface TagProps {
  label: string;
  href?: string;
}

export function Tag({ label, href }: TagProps) {
  if (href) {
    return <Link href={href} className={styles.tag}>{label}</Link>;
  }
  return <span className={styles.tag}>{label}</span>;
}

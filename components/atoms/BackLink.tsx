import Link from 'next/link';
import styles from './BackLink.module.css';

interface BackLinkProps {
  href: string;
  text: string;
}

export function BackLink({ href, text }: BackLinkProps) {
  return (
    <Link href={href} className={styles.backLink}>
      ← {text}
    </Link>
  );
}

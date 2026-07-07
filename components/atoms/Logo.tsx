import Link from 'next/link';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps): React.JSX.Element {
  const linkClass = [styles.wordmark, className].filter(Boolean).join(' ');
  return (
    <Link href="/" className={linkClass} aria-label="HeadlessEngineer, home">
      <span className={styles.wordHead}>HEADLESS</span>
      <span className={styles.wordTail}>
        <span className={styles.swapA}>ENGINEER</span>
        <span className={styles.swapB} aria-hidden="true">ENGINEER</span>
      </span>
    </Link>
  );
}

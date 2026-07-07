import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './Card.module.css';
import { cn } from '../../lib/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  href?: string;
  target?: string;
}

export function Card({ children, title, href, className, target }: CardProps) {
  const cls = cn(styles.card, className);
  const dataTitle = title ? { 'data-title': title } : {};
  if (href) {
    return (
      <Link href={href} className={cls} target={target ?? '_self'} {...dataTitle}>
        {children}
      </Link>
    );
  }
  return (
    <div className={cls} {...dataTitle}>
      {children}
    </div>
  );
}

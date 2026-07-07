import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './Button.module.css';
import { cn } from '../../lib/cn';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  className,
  type = 'button',
  disabled,
  target,
  rel,
}: ButtonProps) {
  const cls = cn(styles.button, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}

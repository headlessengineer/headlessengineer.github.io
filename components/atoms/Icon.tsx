import type { CSSProperties } from 'react';
import styles from './Icon.module.css';

interface IconProps {
  name: 'github' | 'linkedin' | 'twitter' | 'external' | 'arrow-right' | 'arrow-left';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
}

const icons: Record<IconProps['name'], string> = {
  github: 'gh',
  linkedin: 'li',
  twitter: 'x',
  external: '↗',
  'arrow-right': '→',
  'arrow-left': '←',
};

export function Icon({ name, size = 'md', className, style }: IconProps) {
  return (
    <span
      className={`${styles.icon} ${styles[size]} ${className || ''}`}
      style={style}
      aria-hidden="true"
    >
      {icons[name]}
    </span>
  );
}

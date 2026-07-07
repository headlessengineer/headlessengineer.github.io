import type { ReactNode, CSSProperties } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  width?: string;
  id?: string;
}

export function Section({ children, className, style, width, id }: SectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={width ? { maxWidth: width, margin: '0 auto', width: '100%', ...style } : style}
    >
      {children}
    </section>
  );
}

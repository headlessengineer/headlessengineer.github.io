'use client';
import { useEffect } from 'react';
import type { JSX } from 'react';

const BLOG_URL = 'https://blog.headlessengineer.xyz';

export default function ArticlesPage(): JSX.Element {
  useEffect(() => {
    window.location.replace(BLOG_URL);
  }, []);

  return (
    <p style={{ padding: 'var(--sp-xl)', textAlign: 'center' }}>
      Redirecting to{' '}
      <a href={BLOG_URL}>blog.headlessengineer.xyz</a>…
    </p>
  );
}

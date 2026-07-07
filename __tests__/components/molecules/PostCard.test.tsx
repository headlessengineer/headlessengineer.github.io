// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import type { Article } from '../../../lib/schemas/article';
import { PostCard } from '../../../components/molecules/PostCard';

vi.mock('next/link', () => ({
  default: function MockLink({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  },
}));

const mockArticle: Article = {
  title: 'Test Article',
  slug: 'test-article',
  description: 'Full description',
  excerpt: 'Short excerpt',
  publishedAt: '2024-06-05',
  updatedAt: '2024-06-05',
  category: 'Architecture',
  tags: ['go', 'backend'],
  author: 'Karan Popat',
  readingTime: 4,
  seo: {
    metaTitle: 'Test',
    metaDescription: 'Test desc',
    keywords: ['test'],
    canonicalUrl: 'https://headlessengineer.studio/articles/test-article',
    ogImage: '/og.png',
  },
  published: true,
  content: '',
};

describe('PostCard - SPEC-022 AC-5 and AC-6', () => {
  // AC-5: date is wrapped in <time> with dateTime attribute
  it('AC-5: renders a <time> element for the date', () => {
    const { container } = render(<PostCard article={mockArticle} />);
    expect(container.querySelector('time')).not.toBeNull();
  });

  it('AC-5: <time> dateTime attribute equals the ISO date string', () => {
    const { container } = render(<PostCard article={mockArticle} />);
    const time = container.querySelector('time');
    expect(time).toHaveAttribute('dateTime', '2024-06-05');
  });

  it('AC-5: date is formatted as "MMM D, YYYY" via Intl.DateTimeFormat', () => {
    const { container } = render(<PostCard article={mockArticle} />);
    const time = container.querySelector('time');
    // Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'numeric', timeZone:'UTC' })
    // for '2024-06-05' → "Jun 5, 2024"
    expect(time?.textContent).toBe('Jun 5, 2024');
  });

  // AC-6: read-time is displayed as "{n} min"
  it('AC-6: shows readingTime as "{n} min"', () => {
    const { getByText } = render(<PostCard article={mockArticle} />);
    expect(getByText('4 min')).toBeInTheDocument();
  });

  it('AC-6: read-time reflects article.readingTime value', () => {
    const article = { ...mockArticle, readingTime: 9 };
    const { getByText } = render(<PostCard article={article} />);
    expect(getByText('9 min')).toBeInTheDocument();
  });
});

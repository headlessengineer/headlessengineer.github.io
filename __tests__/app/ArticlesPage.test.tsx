// @vitest-environment happy-dom
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { render, screen } from '@testing-library/react';

vi.mock('../../lib/config-cache', () => ({
  getConfig: () => ({
    articles: {
      itemsPerPage: 2,
      metadata: { title: 'Writing - HeadlessEngineer', description: 'Articles' },
      sections: { list: { visible: true } },
    },
  }),
}));

vi.mock('../../lib/articles', () => ({
  getAllArticles: () => [
    { slug: 'a', title: 'Article A', excerpt: 'Excerpt A', publishedAt: '2024-01-03', category: 'cat', tags: [], readingTime: 3, published: true, content: '' },
    { slug: 'b', title: 'Article B', excerpt: 'Excerpt B', publishedAt: '2024-01-02', category: 'cat', tags: [], readingTime: 3, published: true, content: '' },
    { slug: 'c', title: 'Article C', excerpt: 'Excerpt C', publishedAt: '2024-01-01', category: 'cat', tags: [], readingTime: 3, published: true, content: '' },
  ],
}));

vi.mock('../../components/organisms/ArticleGrid', () => ({
  ArticleGrid: ({ articles, currentPage, totalPages }: { articles: unknown[]; currentPage: number; totalPages: number }) =>
    React.createElement('div', {
      'data-testid': 'article-grid',
      'data-page': String(currentPage),
      'data-total': String(totalPages),
      'data-count': String(articles.length),
    }),
}));

const { default: ArticlesPage } = await import('../../app/articles/page');

describe('ArticlesPage — article listing', () => {
  it('renders the ArticleGrid', () => {
    render(<ArticlesPage />);
    expect(screen.getByTestId('article-grid')).toBeInTheDocument();
  });

  it('passes currentPage=1 to ArticleGrid', () => {
    render(<ArticlesPage />);
    expect(screen.getByTestId('article-grid')).toHaveAttribute('data-page', '1');
  });

  it('slices articles to itemsPerPage', () => {
    render(<ArticlesPage />);
    expect(screen.getByTestId('article-grid')).toHaveAttribute('data-count', '2');
  });

  it('computes totalPages from article count and itemsPerPage', () => {
    render(<ArticlesPage />);
    // 3 articles / 2 per page = 2 total pages
    expect(screen.getByTestId('article-grid')).toHaveAttribute('data-total', '2');
  });

  it('is a Server Component — no "use client" directive', () => {
    const src = readFileSync(join(process.cwd(), 'app/articles/page.tsx'), 'utf-8');
    expect(src).not.toContain('"use client"');
    expect(src).not.toContain("'use client'");
  });
});

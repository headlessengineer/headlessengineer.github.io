// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import type { ArticlesConfig } from '../../types/config';
import type { Article } from '../../lib/schemas/article';

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

const MOCK_ARTICLES_CONFIG: ArticlesConfig = {
  sections: { list: { visible: true }, detail: { visible: true } },
  metadata: {
    title: 'Writing - HeadlessEngineer',
    description: 'Notes on e-commerce architecture, distributed systems, and production AI engineering.',
  },
  hero: {
    title: 'Writing',
    description: 'Where we think out loud about backend architecture, migrations, and AI workflows that hold up in production.',
  },
  backLink: { text: 'Back to Writing' },
  topics: ['Architecture'],
  itemsPerPage: 6,
};

function makeMockArticle(i: number): Article {
  return {
    title: `Article ${i}`,
    slug: `article-${i}`,
    description: `Description ${i}`,
    excerpt: `Excerpt ${i}`,
    publishedAt: '2024-06-05',
    updatedAt: '2024-06-05',
    category: 'Architecture',
    tags: ['go'],
    author: 'Karan Popat',
    readingTime: 3,
    seo: {
      metaTitle: `Article ${i}`,
      metaDescription: `Desc ${i}`,
      keywords: ['test'],
      canonicalUrl: `https://headlessengineer.xyz/articles/article-${i}`,
      ogImage: '/og.png',
    },
    published: true,
    content: '',
  };
}

const THREE_ARTICLES = [makeMockArticle(1), makeMockArticle(2), makeMockArticle(3)];

let currentArticles: Article[] = THREE_ARTICLES;

vi.mock('../../lib/config-cache', () => ({
  getConfig: () => ({ articles: MOCK_ARTICLES_CONFIG }),
}));

vi.mock('../../lib/articles', () => ({
  getAllArticles: () => currentArticles,
}));

vi.mock('../../components/organisms/ArticleGrid', () => ({
  ArticleGrid: ({ articles }: { articles: Article[] }) => (
    <div data-testid="article-grid">
      {articles.map((a) => (
        <div key={a.slug} data-testid="article-card" />
      ))}
    </div>
  ),
}));

const { default: ArticlesPage, generateMetadata } = await import('../../app/articles/page');

describe('ArticlesPage - SPEC-022 acceptance criteria', () => {
  beforeEach(() => {
    currentArticles = THREE_ARTICLES;
  });

  // AC-1: PageHero with eyebrow, h1, description
  it('AC-1: renders eyebrow "Writing"', () => {
    render(<ArticlesPage />);
    // PageHeader renders the category name as a link inside <header>
    const header = screen.getByRole('banner');
    expect(header.textContent).toContain('Writing');
  });

  it('AC-1: renders h1 "Writing"', () => {
    render(<ArticlesPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Writing' })).toBeInTheDocument();
  });

  it('AC-1: renders hero description from config', () => {
    render(<ArticlesPage />);
    expect(screen.getByText(MOCK_ARTICLES_CONFIG.hero.description!)).toBeInTheDocument();
  });

  // AC-3: 3 article cards when 3 articles exist
  it('AC-3: article grid is present when articles exist', () => {
    render(<ArticlesPage />);
    expect(screen.getByTestId('article-grid')).toBeInTheDocument();
  });

  it('AC-3: renders 3 article cards', () => {
    render(<ArticlesPage />);
    expect(screen.getAllByTestId('article-card')).toHaveLength(3);
  });

  // AC-7: empty state
  it('AC-7: shows "No articles yet" when articles list is empty', () => {
    currentArticles = [];
    render(<ArticlesPage />);
    expect(screen.getByText(/No articles yet/i)).toBeInTheDocument();
  });

  it('AC-7: empty state includes a link to /contact', () => {
    currentArticles = [];
    render(<ArticlesPage />);
    const link = screen.getByRole('link', { name: /contact/i });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('AC-7: article grid is absent when articles list is empty', () => {
    currentArticles = [];
    render(<ArticlesPage />);
    expect(screen.queryByTestId('article-grid')).not.toBeInTheDocument();
  });

  // AC-9: metadata title from config
  it('AC-9: generateMetadata returns articlesConfig.metadata.title', () => {
    const meta = generateMetadata();
    expect(meta.title).toBe('Writing - HeadlessEngineer');
  });

  it('AC-9: generateMetadata returns articlesConfig.metadata.description', () => {
    const meta = generateMetadata();
    expect(meta.description).toBe(MOCK_ARTICLES_CONFIG.metadata.description);
  });
});

import type { Metadata } from 'next';
import type { JSX } from 'react';
import { getConfig } from '../../lib/config-cache';
import { getAllArticles } from '../../lib/articles';
import { Section } from '../../components/atoms/Section';
import { ArticleGrid } from '../../components/organisms/ArticleGrid';

export function generateMetadata(): Metadata {
  const { articles } = getConfig();
  return {
    title: articles.metadata.title,
    description: articles.metadata.description,
  };
}

export default function ArticlesPage(): JSX.Element {
  const { articles: cfg } = getConfig();
  const all = getAllArticles();
  const totalPages = Math.ceil(all.length / cfg.itemsPerPage);
  const slice = all.slice(0, cfg.itemsPerPage);

  return (
    <Section>
      <ArticleGrid articles={slice} currentPage={1} totalPages={totalPages} basePath="/articles/page" />
    </Section>
  );
}

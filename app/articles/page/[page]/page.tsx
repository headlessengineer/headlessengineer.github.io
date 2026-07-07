import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getConfig } from '../../../../lib/config-cache';
import { getAllArticles } from '../../../../lib/articles';
import { Section } from '../../../../components/atoms/Section';
import { ArticleGrid } from '../../../../components/organisms/ArticleGrid';

export const dynamicParams = false;

export async function generateStaticParams() {
  const cfg = getConfig();
  const total = getAllArticles().length;
  const totalPages = Math.ceil(total / cfg.articles.itemsPerPage);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const { articles } = getConfig();
  return {
    title: `${articles.metadata.title} - Page ${page}`,
    description: articles.metadata.description,
  };
}

export default async function ArticlesPageN({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageStr } = await params;
  const pageNum = parseInt(pageStr, 10);

  const { articles: cfg } = getConfig();
  const all = getAllArticles();
  const totalPages = Math.ceil(all.length / cfg.itemsPerPage);

  if (pageNum < 2 || pageNum > totalPages || isNaN(pageNum)) notFound();

  const start = (pageNum - 1) * cfg.itemsPerPage;
  const slice = all.slice(start, start + cfg.itemsPerPage);

  if (!cfg.sections.list.visible) return null;

  return (
    <Section>
      <ArticleGrid articles={slice} currentPage={pageNum} totalPages={totalPages} basePath="/articles/page" />
    </Section>
  );
}

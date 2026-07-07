import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getConfig } from '../../../../lib/config-cache';
import { getAllArticles, getArticlesByCategory } from '../../../../lib/articles';
import { Section } from '../../../../components/atoms/Section';
import { ArticleGrid } from '../../../../components/organisms/ArticleGrid';

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = getAllArticles();
  const categories = [...new Set(articles.map((a) => a.category))];
  return categories.map((cat) => ({ slug: [cat] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];
  return {
    title: `Category: ${category}`,
    description: `Articles in the ${category} category`,
  };
}

export default async function ArticlesByCategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const category = slug[0];
  const articles = getArticlesByCategory(category);
  if (articles.length === 0) notFound();

  const { articles: cfg } = getConfig();

  return (
    <Section>
      <ArticleGrid articles={articles} basePath="/articles" />
    </Section>
  );
}

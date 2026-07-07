import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticlesByTag } from '../../../../lib/articles';
import { Section } from '../../../../components/atoms/Section';
import { ArticleGrid } from '../../../../components/organisms/ArticleGrid';

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = getAllArticles();
  const tags = [...new Set(articles.flatMap((a) => a.tags))];
  return tags.map((tag) => ({ slug: [tag] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  return {
    title: `Tag: ${tag}`,
    description: `Articles tagged with ${tag}`,
  };
}

export default async function ArticlesByTagPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const tag = slug[0];
  const articles = getArticlesByTag(tag);
  if (articles.length === 0) notFound();

  return (
    <Section>
      <ArticleGrid articles={articles} basePath="/articles" />
    </Section>
  );
}

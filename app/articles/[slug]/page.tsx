import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getConfig } from '../../../lib/config-cache';
import { getAllArticles, getArticleBySlug } from '../../../lib/articles';
import { ContentDetail } from '../../../components/organisms/ContentDetail';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.seo.metaTitle,
    description: article.seo.metaDescription,
    keywords: article.seo.keywords,
    alternates: { canonical: article.seo.canonicalUrl },
    openGraph: {
      title: article.seo.metaTitle,
      description: article.seo.metaDescription,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags,
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { articles: cfg } = getConfig();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { '@type': 'Person', name: article.author },
    keywords: article.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContentDetail
        backHref="/articles"
        backText={cfg.backLink.text}
        title={article.title}
        excerpt={article.description}
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
        readingTime={article.readingTime}
        category={article.category}
        categoryHref={`/articles/category/${article.category}`}
        author={article.author}
        tags={article.tags}
        tagsBasePath="/articles/tag"
        content={article.content}
      />
    </>
  );
}

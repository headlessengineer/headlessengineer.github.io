import type { Metadata } from 'next';
import Link from 'next/link';
import { getConfig } from '../../lib/config-cache';
import { getAllArticles } from '../../lib/articles';
import { PageHeader } from '../../components/molecules/PageHeader';
import { ArticleGrid } from '../../components/organisms/ArticleGrid';
import styles from './articles.module.css';

export function generateMetadata(): Metadata {
  const { articles } = getConfig();
  return {
    title: articles.metadata.title,
    description: articles.metadata.description,
  };
}

export default function ArticlesPage() {
  const { articles: cfg } = getConfig();
  const all = getAllArticles();
  const totalPages = Math.ceil(all.length / cfg.itemsPerPage);
  const page = all.slice(0, cfg.itemsPerPage);

  if (!cfg.sections.list.visible) return null;

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.heroContainer}>
          <PageHeader
            category={{ name: 'Writing', href: '/articles' }}
            title={cfg.hero.title}
            description={cfg.hero.description}
          />
        </div>
      </section>
      {page.length > 0 ? (
        <ArticleGrid articles={page} currentPage={1} totalPages={totalPages} basePath="/articles/page" />
      ) : (
        <p>
          No articles yet.{' '}
          <Link href="/contact">Get in contact</Link>
        </p>
      )}
    </>
  );
}

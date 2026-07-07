import type { Metadata } from 'next';
import Link from 'next/link';
import { getConfig } from '../../lib/config-cache';
import { getAllProjects } from '../../lib/projects';
import { PageHeader } from '../../components/molecules/PageHeader';
import { ProjectGrid } from '../../components/organisms/ProjectGrid';
import styles from './work.module.css';

export function generateMetadata(): Metadata {
  const { projects } = getConfig();
  return {
    title: projects.metadata.title,
    description: projects.metadata.description,
  };
}

export default function WorkPage() {
  const { projects: cfg } = getConfig();
  const all = getAllProjects();
  const totalPages = Math.ceil(all.length / cfg.itemsPerPage);
  const page = all.slice(0, cfg.itemsPerPage);

  if (!cfg.sections.list.visible) return null;

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.heroContainer}>
          <PageHeader
            category={{ name: 'Work', href: '/work' }}
            title="Selected Work"
            description={cfg.hero.description}
          />
        </div>
      </section>
      {page.length > 0 ? (
        <ProjectGrid projects={page} currentPage={1} totalPages={totalPages} basePath="/work/page" />
      ) : (
        <p>
          No projects yet.{' '}
          <Link href="/contact">Get in contact</Link>
        </p>
      )}
    </>
  );
}

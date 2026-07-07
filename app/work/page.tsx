import type { Metadata } from 'next';
import { getConfig } from '../../lib/config-cache';
import { getAllProjects } from '../../lib/projects';
import { PageHero } from '../../components/organisms/PageHero';
import { ProjectGrid } from '../../components/organisms/ProjectGrid';
import { Button } from '../../components/atoms/Button';
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
      <PageHero
        eyebrow="Work"
        title="Selected Work"
        description={cfg.hero.description}
      />
      {page.length > 0 ? (
        <ProjectGrid projects={page} currentPage={1} totalPages={totalPages} basePath="/work/page" />
      ) : (
        <section className={styles.emptyState}>
          <div className={styles.emptyContainer}>
            <p className={styles.emptyHeading}>No projects yet</p>
            <p className={styles.emptyBody}>Case studies and open-source work coming soon.</p>
            <Button href="/contact">Get in contact</Button>
          </div>
        </section>
      )}
    </>
  );
}

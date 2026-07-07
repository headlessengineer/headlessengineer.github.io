import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getConfig } from '../../../../lib/config-cache';
import { getAllProjects } from '../../../../lib/projects';
import { Section } from '../../../../components/atoms/Section';
import { ProjectGrid } from '../../../../components/organisms/ProjectGrid';

export const dynamicParams = false;

export async function generateStaticParams() {
  const cfg = getConfig();
  const total = getAllProjects().length;
  const totalPages = Math.ceil(total / cfg.projects.itemsPerPage);
  // Must return at least one entry for output: export to accept a dynamic route.
  // The page component calls notFound() for params that exceed the real page count.
  if (totalPages <= 1) return [{ page: '2' }];
  return Array.from({ length: totalPages - 1 }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const { projects } = getConfig();
  return {
    title: `${projects.metadata.title} - Page ${page}`,
    description: projects.metadata.description,
  };
}

export default async function ProjectsPageN({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageStr } = await params;
  const pageNum = parseInt(pageStr, 10);

  const { projects: cfg } = getConfig();
  const all = getAllProjects();
  const totalPages = Math.ceil(all.length / cfg.itemsPerPage);

  if (pageNum < 2 || pageNum > totalPages || isNaN(pageNum)) notFound();

  const start = (pageNum - 1) * cfg.itemsPerPage;
  const slice = all.slice(start, start + cfg.itemsPerPage);

  if (!cfg.sections.list.visible) return null;

  return (
    <Section>
      <ProjectGrid projects={slice} currentPage={pageNum} totalPages={totalPages} basePath="/projects/page" />
    </Section>
  );
}

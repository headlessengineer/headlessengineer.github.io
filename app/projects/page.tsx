import type { Metadata } from 'next';
import { getConfig } from '../../lib/config-cache';
import { getAllProjects } from '../../lib/projects';
import { Section } from '../../components/atoms/Section';
import { ProjectGrid } from '../../components/organisms/ProjectGrid';

export function generateMetadata(): Metadata {
  const { projects } = getConfig();
  return {
    title: projects.metadata.title,
    description: projects.metadata.description,
  };
}

export default function ProjectsPage() {
  const { projects: cfg } = getConfig();
  const all = getAllProjects();
  const totalPages = Math.ceil(all.length / cfg.itemsPerPage);
  const page = all.slice(0, cfg.itemsPerPage);

  if (!cfg.sections.list.visible) return null;

  return (
    <Section>
      <ProjectGrid projects={page} currentPage={1} totalPages={totalPages} basePath="/projects/page" />
    </Section>
  );
}

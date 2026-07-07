import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getConfig } from '../../../../lib/config-cache';
import { getAllProjects, getProjectsByTag } from '../../../../lib/projects';
import { Section } from '../../../../components/atoms/Section';
import { ProjectGrid } from '../../../../components/organisms/ProjectGrid';

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = getAllProjects();
  const tags = [...new Set(projects.flatMap((p) => p.tags))];
  return tags.map((tag) => ({ slug: [tag] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  return {
    title: `Tag: ${tag}`,
    description: `Projects tagged with ${tag}`,
  };
}

export default async function ProjectsByTagPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const tag = slug[0];
  const projects = getProjectsByTag(tag);
  if (projects.length === 0) notFound();

  const { projects: cfg } = getConfig();

  return (
    <Section>
      <ProjectGrid projects={projects} basePath="/projects" />
    </Section>
  );
}

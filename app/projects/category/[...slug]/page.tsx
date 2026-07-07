import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectsByCategory } from '../../../../lib/projects';
import { Section } from '../../../../components/atoms/Section';
import { ProjectGrid } from '../../../../components/organisms/ProjectGrid';

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = getAllProjects();
  const categories = [...new Set(projects.map((p) => p.category))];
  return categories.map((cat) => ({ slug: [cat] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];
  return {
    title: `Category: ${category}`,
    description: `Projects in the ${category} category`,
  };
}

export default async function ProjectsByCategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const category = slug[0];
  const projects = getProjectsByCategory(category);
  if (projects.length === 0) notFound();

  return (
    <Section>
      <ProjectGrid projects={projects} basePath="/projects" />
    </Section>
  );
}

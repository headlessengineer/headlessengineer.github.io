import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getConfig } from '../../../lib/config-cache';
import { getAllProjects, getProjectBySlug } from '../../../lib/projects';
import { Section } from '../../../components/atoms/Section';
import { ContentDetail } from '../../../components/organisms/ContentDetail';
import { StatsGrid } from '../../../components/organisms/StatsGrid';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.seo.metaTitle,
    description: project.seo.metaDescription,
    keywords: project.seo.keywords,
    alternates: { canonical: project.seo.canonicalUrl },
    openGraph: {
      title: project.seo.metaTitle,
      description: project.seo.metaDescription,
      type: 'website',
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { projects: cfg } = getConfig();

  return (
    <Section>
      <ContentDetail
        backHref="/projects"
        backText={cfg.backLink.text}
        title={project.title}
        excerpt={project.description}
        category={project.category}
        categoryHref={`/projects/category/${project.category}`}
        tags={project.tags}
        tagsBasePath="/projects/tag"
        content={project.content}
        sidebar={<StatsGrid project={project} />}
      />
    </Section>
  );
}

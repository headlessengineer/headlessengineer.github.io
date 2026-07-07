import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getConfig } from '../../../../lib/config-cache';
import { getAllTestimonials } from '../../../../lib/testimonials';
import { Section } from '../../../../components/atoms/Section';
import { TestimonialGrid } from '../../../../components/organisms/TestimonialGrid';

export const dynamicParams = false;

export async function generateStaticParams() {
  const cfg = getConfig();
  const total = getAllTestimonials().length;
  const totalPages = Math.ceil(total / cfg.testimonials.itemsPerPage);
  // Must return at least one entry for output: export to accept a dynamic route.
  // The page component calls notFound() for params that exceed the real page count.
  if (totalPages <= 1) return [{ page: '2' }];
  return Array.from({ length: totalPages - 1 }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const { testimonials } = getConfig();
  return {
    title: `${testimonials.metadata.title} - Page ${page}`,
    description: testimonials.metadata.description,
  };
}

export default async function TestimonialsPageN({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageStr } = await params;
  const pageNum = parseInt(pageStr, 10);

  const { testimonials: cfg } = getConfig();
  const all = getAllTestimonials();
  const totalPages = Math.ceil(all.length / cfg.itemsPerPage);

  if (pageNum < 2 || pageNum > totalPages || isNaN(pageNum)) notFound();

  const start = (pageNum - 1) * cfg.itemsPerPage;
  const slice = all.slice(start, start + cfg.itemsPerPage);

  if (!cfg.sections.list.visible) return null;

  return (
    <Section>
      <TestimonialGrid testimonials={slice} currentPage={pageNum} totalPages={totalPages} basePath="/testimonials" />
    </Section>
  );
}

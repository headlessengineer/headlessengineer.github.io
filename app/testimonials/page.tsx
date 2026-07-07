import type { Metadata } from 'next';
import { getConfig } from '../../lib/config-cache';
import { getAllTestimonials } from '../../lib/testimonials';
import { Section } from '../../components/atoms/Section';
import { TestimonialGrid } from '../../components/organisms/TestimonialGrid';

export function generateMetadata(): Metadata {
  const { testimonials } = getConfig();
  return {
    title: testimonials.metadata.title,
    description: testimonials.metadata.description,
  };
}

export default function TestimonialsPage() {
  const { testimonials: cfg } = getConfig();
  const all = getAllTestimonials();
  const totalPages = Math.ceil(all.length / cfg.itemsPerPage);
  const page = all.slice(0, cfg.itemsPerPage);

  if (!cfg.sections.list.visible) return null;

  return (
    <Section>
      <TestimonialGrid testimonials={page} currentPage={1} totalPages={totalPages} basePath="/testimonials" />
    </Section>
  );
}

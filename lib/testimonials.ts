import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { TestimonialSchema, type Testimonial } from './schemas/testimonial';

const CONTENT_DIR = path.join(process.cwd(), 'content/testimonials');

function parseTestimonial(filePath: string): Testimonial | null {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const result = TestimonialSchema.safeParse(data);
  if (!result.success) return null;
  if (!result.data.published) return null;
  return { ...result.data, content };
}

let _cache: Testimonial[] | null = null;

export function getAllTestimonials(): Testimonial[] {
  if (_cache) return _cache;
  _cache = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parseTestimonial(path.join(CONTENT_DIR, f)))
    .filter((t): t is Testimonial => t !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return _cache;
}

export function getTestimonialBySlug(slug: string): Testimonial | undefined {
  return getAllTestimonials().find((t) => t.slug === slug);
}

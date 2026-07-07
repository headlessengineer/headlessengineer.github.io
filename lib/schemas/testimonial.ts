import { z } from 'zod';

export const TestimonialSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  author: z.string(),
  role: z.string(),
  company: z.string(),
  publishedAt: z.string(),
  published: z.boolean().default(true),
});

export type Testimonial = z.infer<typeof TestimonialSchema> & { content: string };

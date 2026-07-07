import { z } from 'zod';

export const ArticleSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be lowercase alphanumeric with hyphens'),
  description: z.string(),
  excerpt: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string(),
  category: z.string(),
  tags: z.array(z.string()).min(1).max(10),
  author: z.string(),
  readingTime: z.number().int(),
  seo: z.object({
    metaTitle: z.string(),
    metaDescription: z.string(),
    keywords: z.array(z.string()),
    canonicalUrl: z.string(),
    ogImage: z.string(),
  }),
  subcategory: z.string().optional(),
  published: z.boolean().default(true),
});

export type Article = z.infer<typeof ArticleSchema> & { content: string };

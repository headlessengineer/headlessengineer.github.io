import { z } from 'zod';

export const ProjectSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be lowercase alphanumeric with hyphens'),
  description: z.string(),
  excerpt: z.string(),
  category: z.string(),
  status: z.enum(['active', 'beta', 'stable', 'archived']),
  license: z.string(),
  lastCommit: z.string(),
  tags: z.array(z.string()),
  seo: z.object({
    metaTitle: z.string(),
    metaDescription: z.string(),
    keywords: z.array(z.string()),
    canonicalUrl: z.string(),
    ogImage: z.string(),
  }),
  stats: z.object({
    stars: z.number().optional(),
    forks: z.number().optional(),
    contributors: z.number().optional(),
    version: z.string().optional(),
    buildStatus: z.string().optional(),
    coverage: z.union([z.string(), z.number()]).transform(String).optional(),
  }).optional(),
  links: z.object({
    github: z.string().optional(),
    demo: z.string().optional(),
    docs: z.string().optional(),
    npm: z.string().optional(),
    crates: z.string().optional(),
  }).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().default(true),
});

export type Project = z.infer<typeof ProjectSchema> & { content: string };

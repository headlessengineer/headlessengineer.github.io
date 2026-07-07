import type { MetadataRoute } from 'next';
import { getAllArticles } from '../lib/articles';
import { getAllProjects } from '../lib/projects';

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://popatkaran.github.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1 },
    { url: `${BASE_URL}/about`, priority: 0.9 },
    { url: `${BASE_URL}/contact`, priority: 0.8 },
    { url: `${BASE_URL}/articles`, priority: 0.8 },
    { url: `${BASE_URL}/projects`, priority: 0.8 },
    { url: `${BASE_URL}/testimonials`, priority: 0.7 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${BASE_URL}/articles/${a.slug}`,
    lastModified: a.updatedAt,
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...projectRoutes];
}

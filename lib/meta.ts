import { getAllArticles } from './articles';
import { getAllProjects } from './projects';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://headlessengineer.github.io';

export function generateSitemap(): string {
  const staticRoutes = ['/', '/about', '/contact', '/articles', '/projects', '/testimonials'];

  const articleUrls = getAllArticles().map(
    (a) => `  <url><loc>${BASE_URL}/articles/${encodeURIComponent(a.slug)}</loc><lastmod>${a.updatedAt}</lastmod></url>`
  );

  const projectUrls = getAllProjects().map(
    (p) => `  <url><loc>${BASE_URL}/projects/${encodeURIComponent(p.slug)}</loc></url>`
  );

  const staticUrls = staticRoutes.map(
    (r) => `  <url><loc>${BASE_URL}${r}</loc></url>`
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...articleUrls, ...projectUrls].join('\n')}
</urlset>`;
}

export function generateRobots(): string {
  return `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml`;
}

export function generateManifest() {
  return {
    name: 'headlessengineer',
    short_name: 'HE',
    description: 'Tech solutions for business problems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#009999',
    icons: [
      { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

export function generateRssFeed(): string {
  const articles = getAllArticles().slice(0, 20);
  const items = articles
    .map(
      (a) => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${BASE_URL}/articles/${encodeURIComponent(a.slug)}</link>
      <guid>${BASE_URL}/articles/${encodeURIComponent(a.slug)}</guid>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${a.excerpt}]]></description>
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>headlessengineer</title>
    <link>${BASE_URL}</link>
    <description>Tech solutions for business problems.</description>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

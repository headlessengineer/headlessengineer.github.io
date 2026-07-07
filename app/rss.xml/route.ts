import { generateRssFeed } from '../../lib/meta';

export const dynamic = 'force-static';

export function GET() {
  const feed = generateRssFeed();
  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

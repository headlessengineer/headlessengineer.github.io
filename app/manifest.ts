import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Karan Popat',
    short_name: 'popatkaran',
    description: 'Lead Software Engineer & Tech Architect',
    start_url: '/',
    display: 'standalone',
    background_color: '#0e0f0e',
    theme_color: '#50C878',
    icons: [
      { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

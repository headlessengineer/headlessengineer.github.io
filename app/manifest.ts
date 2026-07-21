import type { MetadataRoute } from 'next';
import { BRAND_COLORS } from '@/config/theme';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HeadlessEngineer',
    short_name: 'headlessengineer',
    description: 'the head your problem needs.',
    start_url: '/',
    display: 'standalone',
    background_color: BRAND_COLORS.bgDark,
    theme_color: BRAND_COLORS.accent,
    icons: [
      { src: '/icon.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

import type { LayoutConfig } from '../types/config';

/**
 * Layout Configuration
 *
 * mainWidth - width of <main> on desktop, as a CSS value.
 *             Mobile always overrides to 100vw.
 *             Change this one value to resize all pages at once.
 *
 * Per-page section widths are configured in each page's config file
 * under a `sections` key.
 */
export const layoutConfig: LayoutConfig = {} as const;

const ALLOWED_SCHEMES = new Set(['https:', 'http:', 'mailto:', 'tel:']);

export function safeHref(href: string): string {
  if (href.startsWith('/')) return href;
  try {
    const { protocol } = new URL(href);
    return ALLOWED_SCHEMES.has(protocol) ? href : '#';
  } catch {
    return '#';
  }
}

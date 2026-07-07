'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function getPageClass(pathname: string): string {
  if (pathname === '/') return 'page-home';
  return 'page' + pathname.replace(/\//g, '-').replace(/-+$/, '');
}

export default function PageClass() {
  const pathname = usePathname();

  useEffect(() => {
    const cls = getPageClass(pathname);
    const html = document.documentElement;
    html.classList.forEach((c) => { if (c.startsWith('page-')) html.classList.remove(c); });
    html.classList.add(cls);
  }, [pathname]);

  return null;
}

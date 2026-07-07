// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { NavLinks } from '../../components/organisms/NavLinks';
import { usePathname } from 'next/navigation';

vi.mock('next/link', () => ({
  default: function MockLink({
    href,
    className,
    children,
    ...rest
  }: {
    href: string;
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  },
}));

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Studio', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/projects' },
  { label: 'Writing', href: '/articles' },
  { label: 'Contact', href: '/contact' },
];

describe('NavLinks - SPEC-006 acceptance criteria', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/');
  });

  it('AC-1: renders all six navigation items with correct labels and hrefs', () => {
    render(<NavLinks items={NAV_ITEMS} />);

    expect(screen.getAllByRole('link')).toHaveLength(6);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Studio' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services');
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: 'Writing' })).toHaveAttribute('href', '/articles');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('AC-7: active link gets navLinkActive class and aria-current="page" for current route', () => {
    vi.mocked(usePathname).mockReturnValue('/about');
    render(<NavLinks items={NAV_ITEMS} />);

    const studioLink = screen.getByRole('link', { name: 'Studio' });
    expect(studioLink.className).toContain('navLinkActive');
    expect(studioLink).toHaveAttribute('aria-current', 'page');
  });
});

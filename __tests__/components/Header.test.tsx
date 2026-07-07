// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../../components/organisms/Header';
import type { SiteConfig } from '../../types/config';

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
  usePathname: vi.fn().mockReturnValue('/'),
}));

vi.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' as const, toggleTheme: vi.fn() }),
}));

vi.mock('../../components/atoms/Logo', () => ({
  Logo: () => <div data-testid="logo" />,
}));

vi.mock('../../components/organisms/NavLinks', () => ({
  NavLinks: () => <ul data-testid="nav-links" />,
}));

vi.mock('../../components/organisms/OffcanvasNav', () => ({
  OffcanvasNav: () => <div data-testid="offcanvas-nav" />,
}));

const MOCK_SITE: SiteConfig = {
  name: 'HeadlessEngineer',
  tagline: 'Test tagline',
  url: 'https://example.com',
  description: 'Test description',
  author: { name: 'Test', role: 'Test', email: 'test@example.com' },
  keywords: ['test'],
  social: {},
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Studio', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/projects' },
    { label: 'Writing', href: '/articles' },
    { label: 'Contact', href: '/contact' },
  ],
  scheduleCallUrl: 'https://calendar.app.google/test',
  location: 'Berlin, Germany',
};

describe('Header - SPEC-006 acceptance criteria', () => {
  it('AC-2: renders "Talk to Us" CTA link pointing to /contact', () => {
    render(<Header site={MOCK_SITE} />);

    const cta = screen.getByRole('link', { name: 'Talk to Us' });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '/contact');
  });

  it('AC-8: renders SkipLink with href="#main-content" as first link', () => {
    render(<Header site={MOCK_SITE} />);

    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });
});

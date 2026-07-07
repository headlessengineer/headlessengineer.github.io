// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as fs from 'fs';
import * as path from 'path';
import { OffcanvasNav } from '../../components/organisms/OffcanvasNav';

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

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Studio', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/projects' },
  { label: 'Writing', href: '/articles' },
  { label: 'Contact', href: '/contact' },
];

const DEFAULT_PROPS = {
  items: NAV_ITEMS,
  ctaHref: '/contact',
  ctaLabel: 'Talk to Us',
};

describe('OffcanvasNav - SPEC-006 acceptance criteria', () => {
  it('AC-3: renders hamburger button with correct aria-label and aria-expanded=false', () => {
    render(<OffcanvasNav {...DEFAULT_PROPS} />);

    const hamburger = screen.getByRole('button', { name: 'Open menu' });
    expect(hamburger).toBeInTheDocument();
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('AC-4: clicking hamburger opens panel and moves focus to close button', () => {
    render(<OffcanvasNav {...DEFAULT_PROPS} />);

    const hamburger = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(hamburger);

    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    const closeButton = screen.getByRole('button', { name: 'Close menu' });
    expect(document.activeElement).toBe(closeButton);
  });

  it('AC-5: pressing Escape closes panel and returns focus to hamburger', () => {
    render(<OffcanvasNav {...DEFAULT_PROPS} />);

    const hamburger = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(document.activeElement).toBe(hamburger);
  });

  it('AC-6: clicking backdrop closes panel', () => {
    const { container } = render(<OffcanvasNav {...DEFAULT_PROPS} />);

    const hamburger = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    const backdrop = container.querySelector('.backdrop') as HTMLElement;
    expect(backdrop).toBeInTheDocument();
    fireEvent.click(backdrop);

    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('AC-9: CSS file contains prefers-reduced-motion block with transition: none', () => {
    const cssPath = path.resolve(
      'components/organisms/OffcanvasNav.module.css',
    );
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('prefers-reduced-motion');
    expect(css).toContain('transition: none');
  });
});

// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { servicesConfig } from '../../config/services';

const css = readFileSync(
  join(process.cwd(), 'app/services/services.module.css'),
  'utf-8',
);

const pageHeroCss = readFileSync(
  join(process.cwd(), 'components/organisms/PageHero.module.css'),
  'utf-8',
);

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

vi.mock('../../components/molecules/FilterableOfferings', () => ({
  FilterableOfferings: ({
    chips,
    offerings,
  }: {
    chips: Array<{ id: string; label: string }>;
    offerings: Array<{ category: string; cardProps: { badge: string; engagement: string } }>;
  }) =>
    React.createElement('div', {
      'data-testid': 'filterable-offerings',
      'data-chip-count': String(chips.length),
      'data-offering-count': String(offerings.length),
      'data-first-chip-id': chips[0]?.id ?? '',
      'data-first-badge': offerings[0]?.cardProps?.badge ?? '',
      'data-first-engagement': offerings[0]?.cardProps?.engagement ?? '',
    }),
}));

vi.mock('../../components/molecules/CTABand', () => ({
  CTABand: ({
    title,
    description,
    buttons,
  }: {
    title: string;
    description: string;
    buttons: Array<{ label: string; href: string }>;
  }) =>
    React.createElement(
      'div',
      { 'data-testid': 'cta-band' },
      React.createElement('h2', null, title),
      React.createElement('p', null, description),
      ...buttons.map((b) => React.createElement('a', { key: b.href, href: b.href }, b.label)),
    ),
}));

vi.mock('../../lib/config-cache', () => ({
  getConfig: () => ({ services: servicesConfig }),
}));

const { default: ServicesPage } = await import('../../app/services/page');

describe('ServicesPage - SPEC-020 acceptance criteria', () => {
  // ── AC1: page hero content ────────────────────────────────────────────

  it('AC1: eyebrow span reads "Services"', () => {
    render(<ServicesPage />);
    expect(screen.getByText('Services', { selector: 'span' })).toBeInTheDocument();
  });

  it('AC1: h1 renders servicesConfig.hero.title', () => {
    render(<ServicesPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: servicesConfig.hero.title }),
    ).toBeInTheDocument();
  });

  it('AC1: hero body renders servicesConfig.hero.description', () => {
    render(<ServicesPage />);
    expect(screen.getByText(servicesConfig.hero.description)).toBeInTheDocument();
  });

  it('AC1: CSS declares max-width var(--max-width) on heroContainer', () => {
    expect(css).toContain('var(--max-width)');
  });

  // ── AC2: chips - "All" prepended ──────────────────────────────────────

  it('AC2: chips[0] is the "All" chip', () => {
    render(<ServicesPage />);
    const fo = screen.getByTestId('filterable-offerings');
    expect(fo.getAttribute('data-first-chip-id')).toBe('all');
  });

  it('AC2: all 5 chips passed (All + 4 categories)', () => {
    render(<ServicesPage />);
    const fo = screen.getByTestId('filterable-offerings');
    expect(fo.getAttribute('data-chip-count')).toBe('5');
  });

  it('AC2: all 7 offerings passed to FilterableOfferings', () => {
    render(<ServicesPage />);
    const fo = screen.getByTestId('filterable-offerings');
    expect(fo.getAttribute('data-offering-count')).toBe('7');
  });

  // ── AC5: data mapping ─────────────────────────────────────────────────

  it('AC5: first offering badge maps from tag field', () => {
    render(<ServicesPage />);
    const fo = screen.getByTestId('filterable-offerings');
    expect(fo.getAttribute('data-first-badge')).toBe(servicesConfig.offerings[0].tag);
  });

  it('AC5: first offering engagement is passed through', () => {
    render(<ServicesPage />);
    const fo = screen.getByTestId('filterable-offerings');
    expect(fo.getAttribute('data-first-engagement')).toBe(servicesConfig.offerings[0].engagement);
  });

  // ── AC7: CTA band ─────────────────────────────────────────────────────

  it('AC7: CTA renders "Not sure which fits?"', () => {
    render(<ServicesPage />);
    expect(screen.getByText('Not sure which fits?')).toBeInTheDocument();
  });

  it('AC7: CTA "Get In Touch" link points to /contact', () => {
    render(<ServicesPage />);
    const link = screen.getByRole('link', { name: 'Get In Touch' });
    expect(link).toHaveAttribute('href', '/contact');
  });

  // ── Source: Server Component ──────────────────────────────────────────

  it('source has no "use client" directive', () => {
    const src = readFileSync(join(process.cwd(), 'app/services/page.tsx'), 'utf-8');
    expect(src).not.toContain('"use client"');
    expect(src).not.toContain("'use client'");
  });

  // ── CSS: token usage ──────────────────────────────────────────────────

  it('CSS: offeringsSection uses var(--surface)', () => {
    expect(css).toContain('var(--surface)');
  });

  it('CSS: mobile media query at 768px', () => {
    expect(pageHeroCss).toMatch(/@media[^{]*max-width[^{]*768px/);
  });
});

// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { CTA } from '../../components/organisms/CTA';
import type { AboutConfig } from '../../types/config';

const css = readFileSync(
  join(process.cwd(), 'components/organisms/CTA.module.css'),
  'utf-8',
);
const src = readFileSync(
  join(process.cwd(), 'components/organisms/CTA.tsx'),
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

const CTA_DATA: AboutConfig['cta'] = {
  title: 'Have a Problem Worth Solving?',
  description:
    "Whether it's a strategy question, an architecture that needs to hold up - we're happy to talk.",
  buttons: [
    { label: 'Get In Touch', href: '/contact', variant: 'primary' },
    { label: 'Read Our Writing', href: '/articles', variant: 'secondary' },
  ],
};

describe('CTA - SPEC-019 acceptance criteria', () => {
  // ── AC5: CTABand renders with correct content ─────────────────────────

  it('AC5: renders CTA title as h2', () => {
    render(<CTA cta={CTA_DATA} />);
    expect(
      screen.getByRole('heading', { level: 2, name: CTA_DATA.title }),
    ).toBeInTheDocument();
  });

  it('AC5: renders CTA description', () => {
    render(<CTA cta={CTA_DATA} />);
    expect(screen.getByText(CTA_DATA.description)).toBeInTheDocument();
  });

  it('AC5: renders two buttons', () => {
    render(<CTA cta={CTA_DATA} />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('AC5: "Get In Touch" button links to /contact', () => {
    render(<CTA cta={CTA_DATA} />);
    expect(screen.getByRole('link', { name: 'Get In Touch' })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('AC5: "Read Our Writing" button links to /articles', () => {
    render(<CTA cta={CTA_DATA} />);
    expect(
      screen.getByRole('link', { name: 'Read Our Writing' }),
    ).toHaveAttribute('href', '/articles');
  });

  // ── CSS contract ──────────────────────────────────────────────────────

  it('CSS: .section uses var(--sp-4xl) padding', () => {
    expect(css).toContain('var(--sp-4xl)');
  });

  it('CSS: mobile media query present at 768px', () => {
    expect(css).toMatch(/@media[^{]*max-width[^{]*768px/);
    expect(css).toContain('var(--sp-3xl)');
  });

  // ── Source: Server Component ──────────────────────────────────────────

  it('source has no "use client" directive', () => {
    expect(src).not.toContain('"use client"');
    expect(src).not.toContain("'use client'");
  });

  // ── Accessibility ─────────────────────────────────────────────────────

  it('zero axe-core accessibility violations', async () => {
    const { container } = render(<CTA cta={CTA_DATA} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

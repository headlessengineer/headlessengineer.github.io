// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { HomeServices } from '../../components/organisms/HomeServices';
import type { AboutConfig } from '../../types/config';

const css = readFileSync(
  join(process.cwd(), 'components/organisms/HomeServices.module.css'),
  'utf-8',
);
const src = readFileSync(
  join(process.cwd(), 'components/organisms/HomeServices.tsx'),
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

const CORE_SERVICES: AboutConfig['coreServices'] = {
  title: 'How We Help',
  description: "Problems we're built to solve",
  services: [
    {
      title: 'Service One',
      description: 'Desc one',
      value: 'Value one',
      href: '/services',
    },
    {
      title: 'Service Two',
      description: 'Desc two',
      value: 'Value two',
      href: '/services',
    },
    {
      title: 'Service Three',
      description: 'Desc three',
      value: 'Value three',
      href: '/services',
    },
    {
      title: 'Service Four',
      description: 'Desc four',
      value: 'Value four',
      href: '/services',
    },
    {
      title: 'Service Five',
      description: 'Desc five',
      value: 'Value five',
      href: '/services',
    },
  ],
};

describe('HomeServices - SPEC-016 acceptance criteria', () => {
  // ── AC1: section renders with --surface background ────────────────────

  it('AC1: renders a <section> element', () => {
    const { container } = render(<HomeServices coreServices={CORE_SERVICES} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('AC1: CSS declares background-color var(--surface) on .services', () => {
    expect(css).toContain('var(--surface)');
  });

  // ── AC2: 5 service cards rendered in 3+2 row split ───────────────────

  it('AC2: renders exactly 5 service cards total', () => {
    render(<HomeServices coreServices={CORE_SERVICES} />);
    const links = screen.getAllByRole('link', { name: /Learn more/ });
    expect(links).toHaveLength(5);
  });

  it('AC2: first CardRow (cols=3) contains 3 service card links', () => {
    const { container } = render(<HomeServices coreServices={CORE_SERVICES} />);
    const row3 = container.querySelector('.cols3');
    expect(row3?.querySelectorAll('a[href="/services"]')).toHaveLength(3);
  });

  it('AC2: second CardRow (cols=2) contains 2 service card links', () => {
    const { container } = render(<HomeServices coreServices={CORE_SERVICES} />);
    const row2 = container.querySelector('.cols2');
    expect(row2?.querySelectorAll('a[href="/services"]')).toHaveLength(2);
  });

  // ── AC3: each card links to /services ─────────────────────────────────

  it('AC3: all "Learn more →" links have href="/services"', () => {
    render(<HomeServices coreServices={CORE_SERVICES} />);
    const links = screen.getAllByRole('link', { name: /Learn more/ });
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '/services');
    });
  });

  // ── AC4: section landmark + heading ──────────────────────────────────

  it('AC4: section has aria-labelledby="services-heading"', () => {
    const { container } = render(<HomeServices coreServices={CORE_SERVICES} />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'services-heading');
  });

  it('AC4: h2 has id="services-heading"', () => {
    render(<HomeServices coreServices={CORE_SERVICES} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveAttribute('id', 'services-heading');
  });

  it('AC4: h2 text equals coreServices.description', () => {
    render(<HomeServices coreServices={CORE_SERVICES} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(CORE_SERVICES.description);
  });

  // ── AC4: eyebrow text ─────────────────────────────────────────────────

  it('AC4: eyebrow renders coreServices.title text', () => {
    render(<HomeServices coreServices={CORE_SERVICES} />);
    expect(screen.getByText('How We Help')).toBeInTheDocument();
  });

  // ── AC6: mobile padding ───────────────────────────────────────────────

  it('AC6: CSS contains var(--sp-3xl) inside a max-width: 768px media query', () => {
    expect(css).toMatch(/@media[^{]*max-width[^{]*768px/);
    expect(css).toContain('var(--sp-3xl)');
  });

  // ── Source: Server Component ──────────────────────────────────────────

  it('source has no "use client" directive - is a Server Component', () => {
    expect(src).not.toContain('"use client"');
    expect(src).not.toContain("'use client'");
  });

  // ── CSS: section padding ──────────────────────────────────────────────

  it('CSS: .services uses var(--sp-4xl) padding', () => {
    expect(css).toContain('var(--sp-4xl)');
  });

  // ── Accessibility ─────────────────────────────────────────────────────

  it('zero axe-core accessibility violations', async () => {
    const { container } = render(<HomeServices coreServices={CORE_SERVICES} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

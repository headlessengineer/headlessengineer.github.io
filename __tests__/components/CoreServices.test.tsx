// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { CoreServices } from '../../components/organisms/CoreServices';
import type { AboutConfig } from '../../types/config';

const css = readFileSync(
  join(process.cwd(), 'components/organisms/CoreServices.module.css'),
  'utf-8',
);
const src = readFileSync(
  join(process.cwd(), 'components/organisms/CoreServices.tsx'),
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
    { badge: 'Strategy', title: 'Service One', description: 'Desc one', value: 'Value one', href: '/services' },
    { badge: 'Architecture', title: 'Service Two', description: 'Desc two', value: 'Value two', href: '/services' },
    { badge: 'Build', title: 'Service Three', description: 'Desc three', value: 'Value three', href: '/services' },
    { badge: 'Migration', title: 'Service Four', description: 'Desc four', value: 'Value four', href: '/services' },
    { badge: 'AI', title: 'Service Five', description: 'Desc five', value: 'Value five', href: '/services' },
  ],
};

describe('CoreServices - SPEC-017 acceptance criteria', () => {
  // ── AC3: section background ───────────────────────────────────────────

  it('AC3: CSS declares background-color var(--surface) on .section', () => {
    expect(css).toContain('var(--surface)');
  });

  // ── AC3: 5 cards in 3+2 layout ───────────────────────────────────────

  it('AC3: renders exactly 5 service card headings', () => {
    render(<CoreServices coreServices={CORE_SERVICES} />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(5);
  });

  it('AC3: first CardRow (cols=3) has 3 cards', () => {
    const { container } = render(<CoreServices coreServices={CORE_SERVICES} />);
    const row3 = container.querySelector('.cols3');
    expect(row3?.querySelectorAll('.card')).toHaveLength(3);
  });

  it('AC3: second CardRow (cols=2) has 2 cards', () => {
    const { container } = render(<CoreServices coreServices={CORE_SERVICES} />);
    const row2 = container.querySelector('.cols2');
    expect(row2?.querySelectorAll('.card')).toHaveLength(2);
  });

  it('AC3: no "Learn more →" links rendered', () => {
    render(<CoreServices coreServices={CORE_SERVICES} />);
    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });

  // ── AC4: aria landmark + heading ──────────────────────────────────────

  it('AC4: section has aria-labelledby="core-services-heading"', () => {
    const { container } = render(<CoreServices coreServices={CORE_SERVICES} />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'core-services-heading');
  });

  it('AC4: h2 has id="core-services-heading"', () => {
    render(<CoreServices coreServices={CORE_SERVICES} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveAttribute('id', 'core-services-heading');
  });

  it('AC4: h2 text equals coreServices.description', () => {
    render(<CoreServices coreServices={CORE_SERVICES} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(CORE_SERVICES.description);
  });

  it('AC4: eyebrow renders coreServices.title', () => {
    render(<CoreServices coreServices={CORE_SERVICES} />);
    expect(screen.getByText('How We Help')).toBeInTheDocument();
  });

  // ── CSS contract ──────────────────────────────────────────────────────

  it('CSS: .section uses var(--sp-4xl) padding', () => {
    expect(css).toContain('var(--sp-4xl)');
  });

  it('CSS: mobile media query contains var(--sp-3xl)', () => {
    expect(css).toMatch(/@media[^{]*max-width[^{]*768px/);
    expect(css).toContain('var(--sp-3xl)');
  });

  // ── Source: Client Component ─────────────────────────────────────────

  it('source has "use client" directive (scroll-reveal requires client)', () => {
    expect(src).toMatch(/"use client"|'use client'/);
  });

  // ── Accessibility ─────────────────────────────────────────────────────

  it('zero axe-core accessibility violations', async () => {
    const { container } = render(<CoreServices coreServices={CORE_SERVICES} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

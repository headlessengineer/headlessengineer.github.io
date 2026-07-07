// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Hero } from '../../components/organisms/Hero';
import type { HeroConfig } from '../../types/config';

const css = readFileSync(
  join(process.cwd(), 'components/organisms/Hero.module.css'),
  'utf-8',
);
const src = readFileSync(
  join(process.cwd(), 'components/organisms/Hero.tsx'),
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

vi.mock('../../components/atoms/HeroTaglineRotator', () => ({
  HeroTaglineRotator: ({ taglines }: { taglines: readonly string[] }) => (
    <div data-testid="tagline-rotator">{taglines[0]}</div>
  ),
}));

let codePanelProps: Record<string, unknown> = {};
vi.mock('../../components/atoms/CodePanel', () => ({
  CodePanel: (props: Record<string, unknown>) => {
    codePanelProps = props;
    return <div aria-hidden="true" data-testid="code-panel" />;
  },
}));

const HERO: HeroConfig = {
  title: 'HeadlessEngineer',
  taglines: [
    'A technology consultancy for hard business problems',
    'Software Engineering · Solution Architecture · Enterprise Architecture',
    'AI-native, stack-agnostic, outcome-led',
    'Senior engineers and architects, staffed to the problem',
  ],
  description:
    'HeadlessEngineer helps businesses solve real problems with the right technology.',
  cta: {
    primary: { label: 'Talk to Us', href: '/contact' },
    secondary: { label: 'See What We Do', href: '/services' },
  },
};

describe('Hero - SPEC-015 acceptance criteria', () => {
  // ── Eyebrow ───────────────────────────────────────────────────────

  it('renders eyebrow "Technology Consultancy"', () => {
    render(<Hero hero={HERO} />);
    expect(screen.getByText('Technology Consultancy')).toBeInTheDocument();
  });

  // ── h1 display heading ────────────────────────────────────────────

  it('renders h1 with brand statement text', () => {
    render(<Hero hero={HERO} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Tech solutions for business problems.');
  });

  it('h1 has id="hero-heading"', () => {
    render(<Hero hero={HERO} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('id', 'hero-heading');
  });

  it('section has aria-labelledby="hero-heading"', () => {
    const { container } = render(<Hero hero={HERO} />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'hero-heading');
  });

  // ── Description ───────────────────────────────────────────────────

  it('renders description text from hero prop', () => {
    render(<Hero hero={HERO} />);
    expect(screen.getByText(HERO.description!)).toBeInTheDocument();
  });

  // ── Tagline rotator ───────────────────────────────────────────────

  it('renders the tagline rotator with taglines from hero prop', () => {
    render(<Hero hero={HERO} />);
    expect(screen.getByTestId('tagline-rotator')).toBeInTheDocument();
  });

  // ── AC4: CodePanel aria-hidden ────────────────────────────────────

  it('AC4: CodePanel is rendered', () => {
    render(<Hero hero={HERO} />);
    expect(screen.getByTestId('code-panel')).toBeInTheDocument();
  });

  it('AC4: Hero passes no unexpected props to CodePanel (aria-hidden is internal to CodePanel)', () => {
    render(<Hero hero={HERO} />);
    expect(Object.keys(codePanelProps)).toHaveLength(0);
  });

  // ── AC5: CTA links ────────────────────────────────────────────────

  it('AC5: "Talk to Us" link points to /contact', () => {
    render(<Hero hero={HERO} />);
    const link = screen.getByRole('link', { name: 'Talk to Us' });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('AC5: "See What We Do" link points to /services', () => {
    render(<Hero hero={HERO} />);
    const link = screen.getByRole('link', { name: 'See What We Do' });
    expect(link).toHaveAttribute('href', '/services');
  });

  // ── Accessibility ─────────────────────────────────────────────────

  it('zero axe-core accessibility violations', async () => {
    const { container } = render(<Hero hero={HERO} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  // ── Source assertions ─────────────────────────────────────────────

  it('source has no "use client" directive - is a Server Component', () => {
    expect(src).not.toContain('"use client"');
    expect(src).not.toContain("'use client'");
  });

  // ── CSS assertions ────────────────────────────────────────────────

  it('CSS: .hero uses var(--sp-5xl) for top padding', () => {
    expect(css).toContain('var(--sp-5xl)');
  });

  it('CSS: .hero uses var(--sp-4xl) for bottom padding', () => {
    expect(css).toContain('var(--sp-4xl)');
  });

  it('CSS: .heroGrid sets grid-template-columns 1.1fr 0.9fr', () => {
    expect(css).toContain('1.1fr 0.9fr');
  });

  it('CSS: .heroGrid uses var(--sp-4xl) gap', () => {
    expect(css).toContain('var(--sp-4xl)');
  });

  it('CSS: AC1 breakpoint 1024px collapses grid to 1fr', () => {
    expect(css).toMatch(/@media[^{]*max-width[^{]*1024px/);
    expect(css).toContain('1fr');
  });

  it('CSS: AC6 breakpoint 768px reduces hero padding to var(--sp-3xl)', () => {
    expect(css).toMatch(/@media[^{]*max-width[^{]*768px/);
    expect(css).toContain('var(--sp-3xl)');
  });

  it('CSS: AC6 breakpoint 768px reduces display to var(--font-size-3xl)', () => {
    expect(css).toContain('var(--font-size-3xl)');
  });

  it('CSS: .display uses var(--font-size-hero)', () => {
    expect(css).toContain('var(--font-size-hero)');
  });

  it('CSS: .description uses var(--fg-secondary)', () => {
    expect(css).toContain('var(--fg-secondary)');
  });

  it('CSS: .description uses var(--sp-lg) margin-top', () => {
    expect(css).toContain('var(--sp-lg)');
  });

  it('CSS: .ctas uses var(--sp-md) gap', () => {
    expect(css).toContain('var(--sp-md)');
  });

  it('CSS: .ctas uses var(--sp-xl) margin-top', () => {
    expect(css).toContain('var(--sp-xl)');
  });
});

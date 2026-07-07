// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Principles } from '../../components/organisms/Principles';
import type { AboutConfig } from '../../types/config';

const css = readFileSync(
  join(process.cwd(), 'components/organisms/Principles.module.css'),
  'utf-8',
);
const src = readFileSync(
  join(process.cwd(), 'components/organisms/Principles.tsx'),
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

const PRINCIPLES: AboutConfig['principles'] = {
  title: "What It's Like to Work With Us",
  description: 'How we approach the work - what you can expect',
  principles: [
    { title: 'Principle One', description: 'Desc one', value: 'Value one', href: '#' },
    { title: 'Principle Two', description: 'Desc two', value: 'Value two', href: '#' },
    { title: 'Principle Three', description: 'Desc three', value: 'Value three', href: '#' },
    { title: 'Principle Four', description: 'Desc four', value: 'Value four', href: '#' },
    { title: 'Principle Five', description: 'Desc five', value: 'Value five', href: '#' },
  ],
};

describe('Principles - SPEC-018 acceptance criteria', () => {
  // ── AC3: plain section (no --surface) ────────────────────────────────

  it('AC3: CSS does not declare var(--surface) background', () => {
    expect(css).not.toContain('var(--surface)');
  });

  // ── AC3: 5 cards in 3+2 layout ───────────────────────────────────────

  it('AC3: renders exactly 5 principle card headings', () => {
    render(<Principles principles={PRINCIPLES} />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(5);
  });

  it('AC3: first CardRow (cols=3) contains 3 cards', () => {
    const { container } = render(<Principles principles={PRINCIPLES} />);
    const row3 = container.querySelector('.cols3');
    expect(row3?.querySelectorAll('.card')).toHaveLength(3);
  });

  it('AC3: second CardRow (cols=2) contains 2 cards', () => {
    const { container } = render(<Principles principles={PRINCIPLES} />);
    const row2 = container.querySelector('.cols2');
    expect(row2?.querySelectorAll('.card')).toHaveLength(2);
  });

  // ── AC4: no badge, no links ───────────────────────────────────────────

  it('AC4: no badge element rendered in any card', () => {
    const { container } = render(<Principles principles={PRINCIPLES} />);
    expect(container.querySelectorAll('.badge')).toHaveLength(0);
  });

  it('AC4: no links rendered', () => {
    render(<Principles principles={PRINCIPLES} />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  // ── AC5: aria landmark + heading ──────────────────────────────────────

  it('AC5: section has aria-labelledby="principles-heading"', () => {
    const { container } = render(<Principles principles={PRINCIPLES} />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'principles-heading');
  });

  it('AC5: h2 has id="principles-heading"', () => {
    render(<Principles principles={PRINCIPLES} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveAttribute('id', 'principles-heading');
  });

  it('AC5: h2 text equals principles.title', () => {
    render(<Principles principles={PRINCIPLES} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(PRINCIPLES.title);
  });

  it('AC5: eyebrow renders hardcoded "How We Work"', () => {
    render(<Principles principles={PRINCIPLES} />);
    expect(screen.getByText('How We Work')).toBeInTheDocument();
  });

  // ── CSS contract ──────────────────────────────────────────────────────

  it('CSS: .section uses var(--sp-4xl) padding', () => {
    expect(css).toContain('var(--sp-4xl)');
  });

  it('CSS: mobile media query present at 768px', () => {
    expect(css).toMatch(/@media[^{]*max-width[^{]*768px/);
    expect(css).toContain('var(--sp-3xl)');
  });

  // ── Source: Client Component ─────────────────────────────────────────

  it('source has "use client" directive (scroll-reveal requires client)', () => {
    expect(src).toMatch(/"use client"|'use client'/);
  });

  // ── Accessibility ─────────────────────────────────────────────────────

  it('zero axe-core accessibility violations', async () => {
    const { container } = render(<Principles principles={PRINCIPLES} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

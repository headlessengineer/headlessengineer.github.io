// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Expertise } from '../../components/organisms/Expertise';
import type { AboutConfig } from '../../types/config';

const css = readFileSync(
  join(process.cwd(), 'components/organisms/Expertise.module.css'),
  'utf-8',
);
const src = readFileSync(
  join(process.cwd(), 'components/organisms/Expertise.tsx'),
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

const EXPERTISE: AboutConfig['expertise'] = {
  title: 'Where We Go Deep',
  description: 'Domains we bring genuine judgment to - and the disciplines we staff around them',
  skills: [
    { title: 'Skill One', description: 'Desc one', value: 'Value one', href: '#' },
    { title: 'Skill Two', description: 'Desc two', value: 'Value two', href: '#' },
    { title: 'Skill Three', description: 'Desc three', value: 'Value three', href: '#' },
    { title: 'Skill Four', description: 'Desc four', value: 'Value four', href: '#' },
    { title: 'Skill Five', description: 'Desc five', value: 'Value five', href: '#' },
  ],
};

describe('Expertise - SPEC-018 acceptance criteria', () => {
  // ── AC1: section-alt background ───────────────────────────────────────

  it('AC1: CSS declares background-color var(--surface) on .section', () => {
    expect(css).toContain('var(--surface)');
  });

  // ── AC1: 5 cards in 3+2 layout ───────────────────────────────────────

  it('AC1: renders exactly 5 skill card headings', () => {
    render(<Expertise expertise={EXPERTISE} />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(5);
  });

  it('AC1: first CardRow (cols=3) contains 3 cards', () => {
    const { container } = render(<Expertise expertise={EXPERTISE} />);
    const row3 = container.querySelector('.cols3');
    expect(row3?.querySelectorAll('.card')).toHaveLength(3);
  });

  it('AC1: second CardRow (cols=2) contains 2 cards', () => {
    const { container } = render(<Expertise expertise={EXPERTISE} />);
    const row2 = container.querySelector('.cols2');
    expect(row2?.querySelectorAll('.card')).toHaveLength(2);
  });

  // ── AC2: no badge, no links ───────────────────────────────────────────

  it('AC2: no badge element rendered in any card', () => {
    const { container } = render(<Expertise expertise={EXPERTISE} />);
    expect(container.querySelectorAll('.badge')).toHaveLength(0);
  });

  it('AC2: no links rendered', () => {
    render(<Expertise expertise={EXPERTISE} />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  // ── AC5: aria landmark + heading ──────────────────────────────────────

  it('AC5: section has aria-labelledby="expertise-heading"', () => {
    const { container } = render(<Expertise expertise={EXPERTISE} />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'expertise-heading');
  });

  it('AC5: h2 has id="expertise-heading"', () => {
    render(<Expertise expertise={EXPERTISE} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveAttribute('id', 'expertise-heading');
  });

  it('AC5: h2 text equals expertise.description', () => {
    render(<Expertise expertise={EXPERTISE} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(EXPERTISE.description);
  });

  it('AC5: eyebrow renders expertise.title', () => {
    render(<Expertise expertise={EXPERTISE} />);
    expect(screen.getByText(EXPERTISE.title)).toBeInTheDocument();
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
    const { container } = render(<Expertise expertise={EXPERTISE} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

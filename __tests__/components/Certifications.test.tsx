// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Certifications } from '../../components/organisms/Certifications';
import type { AboutConfig } from '../../types/config';

const css = readFileSync(
  join(process.cwd(), 'components/organisms/Certifications.module.css'),
  'utf-8',
);
const src = readFileSync(
  join(process.cwd(), 'components/organisms/Certifications.tsx'),
  'utf-8',
);

vi.mock('../../lib/safeHref', () => ({
  safeHref: (href: string) => href,
}));

const CERTIFICATIONS: AboutConfig['certifications'] = {
  title: 'Credentials Behind the Work',
  description: "Formal recognition backing the studio's expertise",
  certifications: [
    { title: 'Anthropic', value: 'Claude Code in Action', description: 'Issued March 2026', href: 'https://verify.skilljar.com/c/i8k65e9m6btx' },
    { title: 'Accenture', value: 'Reinvention with Agentic AI', description: 'Issued March 2026', href: 'https://www.credly.com/badges/560b9718' },
    { title: 'Adobe', value: 'Adobe Certified Professional', description: 'Issued March 2019' },
    { title: 'Spryker', value: 'Certified Foundations Developer', description: 'Issued September 2022' },
    { title: 'AWS', value: 'AWS Cloud Quest', description: 'Issued April 2023', href: 'https://www.credly.com/badges/9560176f' },
  ],
};

describe('Certifications - SPEC-019 acceptance criteria', () => {
  // ── AC3: conditional a/div rendering ─────────────────────────────────

  it('AC3: cards with href render as <a> elements', () => {
    const { container } = render(<Certifications certifications={CERTIFICATIONS} />);
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(3);
  });

  it('AC3: cards without href render as <div> elements (not <a>)', () => {
    const { container } = render(<Certifications certifications={CERTIFICATIONS} />);
    const cards = container.querySelectorAll('.card');
    const divCards = Array.from(cards).filter((c) => c.tagName === 'DIV');
    expect(divCards).toHaveLength(2);
  });

  // ── AC4: 5 cards in 3+2 layout ───────────────────────────────────────

  it('AC4: renders 5 certification cards total', () => {
    const { container } = render(<Certifications certifications={CERTIFICATIONS} />);
    expect(container.querySelectorAll('.card')).toHaveLength(5);
  });

  it('AC4: first CardRow (cols=3) contains 3 cards', () => {
    const { container } = render(<Certifications certifications={CERTIFICATIONS} />);
    expect(container.querySelector('.cols3')?.querySelectorAll('.card')).toHaveLength(3);
  });

  it('AC4: second CardRow (cols=2) contains 2 cards', () => {
    const { container } = render(<Certifications certifications={CERTIFICATIONS} />);
    expect(container.querySelector('.cols2')?.querySelectorAll('.card')).toHaveLength(2);
  });

  it('AC4: section has aria-labelledby="certifications-heading"', () => {
    const { container } = render(<Certifications certifications={CERTIFICATIONS} />);
    expect(container.querySelector('section')).toHaveAttribute(
      'aria-labelledby',
      'certifications-heading',
    );
  });

  it('AC4: h2 has id="certifications-heading"', () => {
    render(<Certifications certifications={CERTIFICATIONS} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute(
      'id',
      'certifications-heading',
    );
  });

  it('AC4: h2 text equals certifications.title', () => {
    render(<Certifications certifications={CERTIFICATIONS} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      CERTIFICATIONS.title,
    );
  });

  it('AC4: eyebrow renders hardcoded "Credentials"', () => {
    render(<Certifications certifications={CERTIFICATIONS} />);
    expect(screen.getByText('Credentials')).toBeInTheDocument();
  });

  // ── CSS contract ──────────────────────────────────────────────────────

  it('CSS: .section uses var(--sp-4xl) padding', () => {
    expect(css).toContain('var(--sp-4xl)');
  });

  it('CSS: mobile media query present at 768px', () => {
    expect(css).toMatch(/@media[^{]*max-width[^{]*768px/);
    expect(css).toContain('var(--sp-3xl)');
  });

  it('CSS: no var(--surface) - plain section', () => {
    expect(css).not.toContain('var(--surface)');
  });

  // ── Source: Client Component ─────────────────────────────────────────

  it('source has "use client" directive (scroll-reveal requires client)', () => {
    expect(src).toMatch(/"use client"|'use client'/);
  });

  // ── Accessibility ─────────────────────────────────────────────────────

  it('zero axe-core accessibility violations', async () => {
    const { container } = render(<Certifications certifications={CERTIFICATIONS} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { contactConfig } from '../../config/contact';

const css = readFileSync(
  join(process.cwd(), 'app/contact/contact.module.css'),
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

vi.mock('../../components/molecules/ContactForm', () => ({
  ContactForm: () => React.createElement('div', { 'data-testid': 'contact-form' }),
}));

vi.mock('../../lib/config-cache', () => ({
  getConfig: () => ({ contact: contactConfig }),
}));

const { default: ContactPage } = await import('../../app/contact/page');

describe('ContactPage - SPEC-021 acceptance criteria', () => {
  // ── AC1: hero content ─────────────────────────────────────────────────

  it('AC1: eyebrow span reads "Contact"', () => {
    render(<ContactPage />);
    expect(screen.getByText('Contact', { selector: 'span' })).toBeInTheDocument();
  });

  it('AC1: h1 renders contactConfig.title', () => {
    render(<ContactPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: contactConfig.title }),
    ).toBeInTheDocument();
  });

  it('AC1: hero body renders contactConfig.subtitle', () => {
    render(<ContactPage />);
    expect(screen.getByText(contactConfig.subtitle)).toBeInTheDocument();
  });

  it('AC1: CSS declares max-width var(--max-width) on hero container', () => {
    expect(css).toContain('var(--max-width)');
  });

  it('AC1: CSS uses var(--font-size-lg) for hero body', () => {
    expect(pageHeroCss).toContain('var(--font-size-lg)');
  });

  // ── AC2: method cards as <a> links ────────────────────────────────────

  it('AC2: all 4 method hrefs are present in the DOM', () => {
    const { container } = render(<ContactPage />);
    contactConfig.methods.forEach((method) => {
      expect(container.querySelector(`a[href="${method.href}"]`)).toBeTruthy();
    });
  });

  it('AC2: exactly 4 method link elements rendered', () => {
    const { container } = render(<ContactPage />);
    const methodLinks = contactConfig.methods.map((m) =>
      container.querySelector(`a[href="${m.href}"]`),
    );
    expect(methodLinks.filter(Boolean)).toHaveLength(4);
  });

  // ── AC3: email href is mailto ─────────────────────────────────────────

  it('AC3: email method href starts with mailto:', () => {
    expect(contactConfig.methods[0].href).toMatch(/^mailto:/);
  });

  it('AC3: mailto href is rendered in the DOM', () => {
    const { container } = render(<ContactPage />);
    const emailLink = container.querySelector('a[href^="mailto:"]');
    expect(emailLink).toBeTruthy();
  });

  // ── AC9: 2+2 CardRow layout ───────────────────────────────────────────

  it('AC9: methods section has exactly 2 CardRow containers', () => {
    const { container } = render(<ContactPage />);
    const rows = container.querySelectorAll('[class*="cardRow"]:not([class*="cardRows"])');
    expect(rows).toHaveLength(2);
  });

  it('AC9: first CardRow has 2 children', () => {
    const { container } = render(<ContactPage />);
    const rows = container.querySelectorAll('[class*="cardRow"]:not([class*="cardRows"])');
    expect(rows[0].childElementCount).toBe(2);
  });

  it('AC9: second CardRow has 2 children', () => {
    const { container } = render(<ContactPage />);
    const rows = container.querySelectorAll('[class*="cardRow"]:not([class*="cardRows"])');
    expect(rows[1].childElementCount).toBe(2);
  });

  // ── Server Component invariant ────────────────────────────────────────

  it('source has no "use client" directive', () => {
    const src = readFileSync(join(process.cwd(), 'app/contact/page.tsx'), 'utf-8');
    expect(src).not.toContain('"use client"');
    expect(src).not.toContain("'use client'");
  });

  // ── CSS token usage ───────────────────────────────────────────────────

  it('CSS: methods section uses var(--surface)', () => {
    expect(css).toContain('var(--surface)');
  });

  it('CSS: mobile media query at 768px', () => {
    expect(pageHeroCss).toMatch(/@media[^{]*max-width[^{]*768px/);
  });

});

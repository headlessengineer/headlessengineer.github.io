// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { render } from '@testing-library/react';
import { MethodCard } from '../../../components/molecules/MethodCard';

const css = readFileSync(
  join(process.cwd(), 'components/molecules/MethodCard.module.css'),
  'utf-8',
);

const src = readFileSync(
  join(process.cwd(), 'components/molecules/MethodCard.tsx'),
  'utf-8',
);

const baseProps = {
  title: 'Email',
  value: 'contact@headlessengineer.xyz',
  description: 'Send us a message directly',
  href: 'mailto:contact@headlessengineer.xyz',
};

describe('MethodCard - SPEC-014 acceptance criteria', () => {
  // AC-1 - root is <a> with correct href
  it('AC-1: root element is an <a>', () => {
    const { container } = render(<MethodCard {...baseProps} />);
    expect(container.firstChild?.nodeName).toBe('A');
  });

  it('AC-1: <a> has href matching the prop', () => {
    const { container } = render(<MethodCard {...baseProps} />);
    expect(container.firstChild).toHaveAttribute(
      'href',
      'mailto:contact@headlessengineer.xyz',
    );
  });

  // AC-2 - <span> with title text
  it('AC-2: renders a <span> descendant with title text', () => {
    const { container } = render(<MethodCard {...baseProps} />);
    const span = container.querySelector('span');
    expect(span).not.toBeNull();
    expect(span!.textContent).toBe('Email'); // guarded by preceding not.toBeNull()
  });

  // AC-3 - .methodValue CSS tokens
  it('AC-3: CSS .methodValue contains var(--primary)', () => {
    expect(css).toContain('var(--primary)');
  });

  it('AC-3: CSS .methodValue contains var(--font-weight-bold)', () => {
    expect(css).toContain('var(--font-weight-bold)');
  });

  it('AC-3: CSS .methodValue contains var(--font-size-lg)', () => {
    expect(css).toContain('var(--font-size-lg)');
  });

  it('AC-3: CSS .methodValue contains word-break: break-word', () => {
    expect(css).toContain('word-break: break-word');
  });

  // AC-4 - <p> with description text
  it('AC-4: renders a <p> descendant with description text', () => {
    const { container } = render(<MethodCard {...baseProps} />);
    const p = container.querySelector('p');
    expect(p).not.toBeNull();
    expect(p!.textContent).toBe('Send us a message directly'); // guarded by preceding not.toBeNull()
  });

  // AC-5 - card shell CSS tokens
  it('AC-5: CSS .card contains var(--surface-card)', () => {
    expect(css).toContain('var(--surface-card)');
  });

  it('AC-5: CSS .card contains var(--r-lg)', () => {
    expect(css).toContain('var(--r-lg)');
  });

  it('AC-5: CSS .card contains var(--sp-lg)', () => {
    expect(css).toContain('var(--sp-lg)');
  });

  // AC-6 - description color token
  it('AC-6: CSS .description contains var(--fg-secondary)', () => {
    expect(css).toContain('var(--fg-secondary)');
  });

  // AC-12 - focus ring not suppressed (global :focus-visible in globals.css provides it)
  it('AC-12: CSS module does not suppress focus outline', () => {
    expect(css).not.toContain('outline: none');
    expect(css).not.toContain('outline: 0');
  });

  // AC-15 - unsafe href schemes are blocked
  it('AC-15: javascript: href renders as #', () => {
    const { container } = render(
      <MethodCard
        title="Hack"
        value="click me"
        description="bad"
        href="javascript:alert(1)"
      />,
    );
    expect(container.firstChild).toHaveAttribute('href', '#');
  });

  it('AC-15: https: href passes through unchanged', () => {
    const { container } = render(
      <MethodCard
        title="Site"
        value="example.com"
        description="ok"
        href="https://example.com"
      />,
    );
    expect(container.firstChild).toHaveAttribute('href', 'https://example.com');
  });

  // AC-13 - Server Component (no "use client")
  it('AC-13: source file does not contain "use client"', () => {
    expect(src).not.toContain('"use client"');
  });

  // AC-14 - no raw hex values in CSS module
  it('AC-14: CSS module contains no raw hex color values', () => {
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,6}\b/);
  });
});

// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { render } from '@testing-library/react';
import { CertCard } from '../../../components/molecules/CertCard';

const css = readFileSync(
  join(process.cwd(), 'components/molecules/CertCard.module.css'),
  'utf-8',
);

const src = readFileSync(
  join(process.cwd(), 'components/molecules/CertCard.tsx'),
  'utf-8',
);

const baseProps = {
  title: 'Anthropic',
  value: 'Claude Code in Action',
  description: 'Issued March 2026 · Credential ID: i8k65e9m6btx',
};

describe('CertCard - SPEC-014 acceptance criteria', () => {
  // AC-7 - with href → <a>
  it('AC-7: with href, root element is an <a>', () => {
    const { container } = render(
      <CertCard
        {...baseProps}
        href="https://verify.skilljar.com/c/i8k65e9m6btx"
      />,
    );
    expect(container.firstChild?.nodeName).toBe('A');
  });

  it('AC-7: with href, <a> has href attribute matching the prop', () => {
    const url = 'https://verify.skilljar.com/c/i8k65e9m6btx';
    const { container } = render(<CertCard {...baseProps} href={url} />);
    expect(container.firstChild).toHaveAttribute('href', url);
  });

  // AC-8 - without href → <div>
  it('AC-8: without href, root element is a <div>', () => {
    const { container } = render(<CertCard {...baseProps} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  // AC-9 - .certValue CSS tokens
  it('AC-9: CSS .certValue contains var(--fg)', () => {
    expect(css).toContain('var(--fg)');
  });

  it('AC-9: CSS .certValue contains var(--font-weight-bold)', () => {
    expect(css).toContain('var(--font-weight-bold)');
  });

  // AC-10 - .label CSS tokens
  it('AC-10: CSS .label contains var(--fg-muted)', () => {
    expect(css).toContain('var(--fg-muted)');
  });

  it('AC-10: CSS .label contains var(--sp-xs) for margin-bottom', () => {
    expect(css).toContain('var(--sp-xs)');
  });

  // AC-11 - <p> with description text
  it('AC-11: renders a <p> descendant with description text', () => {
    const { container } = render(<CertCard {...baseProps} />);
    const p = container.querySelector('p');
    expect(p).not.toBeNull();
    expect(p!.textContent).toBe( // guarded by preceding not.toBeNull()
      'Issued March 2026 · Credential ID: i8k65e9m6btx',
    );
  });

  // AC-12 - focus ring not suppressed (global :focus-visible in globals.css provides it)
  it('AC-12: CSS module does not suppress focus outline', () => {
    expect(css).not.toContain('outline: none');
    expect(css).not.toContain('outline: 0');
  });

  // AC-15 - unsafe href schemes are blocked
  it('AC-15: javascript: href renders as #', () => {
    const { container } = render(
      <CertCard
        title="Hack"
        value="bad cert"
        description="bad"
        href="javascript:alert(1)"
      />,
    );
    expect(container.firstChild).toHaveAttribute('href', '#');
  });

  it('AC-15: https: href passes through unchanged', () => {
    const url = 'https://verify.skilljar.com/c/i8k65e9m6btx';
    const { container } = render(<CertCard {...baseProps} href={url} />);
    expect(container.firstChild).toHaveAttribute('href', url);
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

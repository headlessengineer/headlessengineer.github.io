// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { CodePanel } from '../../../components/atoms/CodePanel';

const css = readFileSync(
  join(process.cwd(), 'components/atoms/CodePanel.module.css'),
  'utf-8',
);

const src = readFileSync(
  join(process.cwd(), 'components/atoms/CodePanel.tsx'),
  'utf-8',
);

describe('CodePanel - SPEC-013 acceptance criteria', () => {
  // AC1 - outer wrapper is aria-hidden
  it('AC1: outer wrapper has aria-hidden="true"', () => {
    const { container } = render(<CodePanel />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  // AC2 - typing area pre element present
  it('AC2: .typingArea pre element is rendered', () => {
    const { container } = render(<CodePanel />);
    expect(container.querySelector('.typingArea')).not.toBeNull();
  });

  // AC3 - function call syntax defined in source CODE constant
  it('AC3: source CODE constant contains function call syntax', () => {
    expect(src).toMatch(/adopt\(|staff\(/);
  });

  // AC4 - string literal defined in source CODE constant
  it('AC4: source CODE constant contains string literal content', () => {
    expect(src).toContain('business, not technical');
  });

  // AC5 - comment defined in source CODE constant
  it('AC5: source CODE constant contains comment syntax', () => {
    expect(src).toContain('//');
  });

  // AC6 - source imports useTypingAnimation hook
  it('AC6: source uses useTypingAnimation hook', () => {
    expect(src).toContain('useTypingAnimation');
  });

  // AC7 - exactly three header dots
  it('AC7: exactly three .codeDot spans inside .codePanelHeader', () => {
    const { container } = render(<CodePanel />);
    const header = container.querySelector('.codePanelHeader');
    expect(header).not.toBeNull();
    // non-null: presence asserted on the line above
    const dots = header!.querySelectorAll('.codeDot');
    expect(dots).toHaveLength(3);
  });

  // AC8 - axe-core reports zero violations
  it('AC8: no axe-core accessibility violations', async () => {
    const { container } = render(<CodePanel />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  // AC9 - Client Component (typing animation requires client)
  it('AC9: source file has "use client" directive (typing animation requires client)', () => {
    expect(src).toMatch(/"use client"|'use client'/);
  });

  // CSS token supplementary assertions
  it('CSS: panel background uses var(--elevated)', () => {
    expect(css).toContain('var(--elevated)');
  });

  it('CSS: panel border-radius uses var(--r-lg)', () => {
    expect(css).toContain('var(--r-lg)');
  });

  it('CSS: panel padding uses var(--sp-lg)', () => {
    expect(css).toContain('var(--sp-lg)');
  });

  it('CSS: .kw color uses var(--primary)', () => {
    expect(css).toContain('var(--primary)');
  });

  it('CSS: .cm color uses var(--fg-muted)', () => {
    expect(css).toContain('var(--fg-muted)');
  });

  it('CSS: .op color uses var(--fg-secondary)', () => {
    expect(css).toContain('var(--fg-secondary)');
  });

  it('CSS: header margin-bottom uses var(--sp-md)', () => {
    expect(css).toContain('var(--sp-md)');
  });

  it('CSS: header opacity uses var(--op-muted)', () => {
    expect(css).toContain('var(--op-muted)');
  });

  it('CSS: dot border-radius uses var(--r-full)', () => {
    expect(css).toContain('var(--r-full)');
  });
});

// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render } from '@testing-library/react';
import { Panel } from '../../../components/atoms/Panel';

const css = readFileSync(
  join(process.cwd(), 'components/atoms/Panel.module.css'),
  'utf-8',
);

describe('Panel - SPEC-009 acceptance criteria', () => {
  // AC1 - panel class and surface styles
  it('AC1: renders with panel class', () => {
    const { container } = render(<Panel><div>content</div></Panel>);
    expect(container.firstChild).toHaveClass('panel');
  });

  it('AC1: CSS sets background to var(--surface-card)', () => {
    expect(css).toContain('var(--surface-card)');
  });

  it('AC1: CSS sets border-radius to var(--r-xl)', () => {
    expect(css).toContain('var(--r-xl)');
  });

  it('AC1: CSS sets padding to var(--sp-3xl)', () => {
    expect(css).toContain('var(--sp-3xl)');
  });

  // AC2 - grid=true renders panelGrid wrapper with correct columns
  it('AC2: grid=true renders inner panelGrid wrapper', () => {
    const { container } = render(
      <Panel grid>
        <div>left</div>
        <div>right</div>
      </Panel>,
    );
    const inner = container.firstChild?.firstChild as HTMLElement;
    expect(inner).toHaveClass('panelGrid');
  });

  it('AC2: CSS sets grid-template-columns to 0.9fr 1.1fr', () => {
    expect(css).toContain('0.9fr 1.1fr');
  });

  // AC3 - media query collapse
  it('AC3: CSS has @media max-width 1024px override to 1fr', () => {
    expect(css).toMatch(/@media[^{]*max-width[^{]*1024px/);
    expect(css).toContain('1fr');
  });

  // AC4 - no grid prop → no panelGrid in DOM
  it('AC4: no grid prop → no panelGrid element in DOM', () => {
    const { container } = render(
      <Panel>
        <div>content</div>
      </Panel>,
    );
    expect(container.querySelector('.panelGrid')).toBeNull();
  });

  // AC5 - panelGrid CSS has gap and align-items
  it('AC5: CSS sets gap to var(--sp-2xl)', () => {
    expect(css).toContain('var(--sp-2xl)');
  });

  it('AC5: CSS sets align-items to start', () => {
    expect(css).toContain('align-items: start');
  });

  // children rendered in both modes
  it('renders children without grid prop', () => {
    const { getByText } = render(<Panel><div>hello</div></Panel>);
    expect(getByText('hello')).toBeInTheDocument();
  });

  it('renders children with grid prop', () => {
    const { getByText } = render(
      <Panel grid>
        <div>left</div>
        <div>right</div>
      </Panel>,
    );
    expect(getByText('left')).toBeInTheDocument();
    expect(getByText('right')).toBeInTheDocument();
  });
});

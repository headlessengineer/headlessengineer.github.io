// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterChips } from '../../../components/molecules/FilterChips';
import type { FilterChip } from '../../../components/molecules/FilterChips';

const css = readFileSync(
  join(process.cwd(), 'components/molecules/FilterChips.module.css'),
  'utf-8',
);

const CHIPS: FilterChip[] = [
  { id: 'all', label: 'All' },
  { id: 'strategy', label: 'Strategy & Architecture' },
  { id: 'build', label: 'Build & Delivery' },
];

describe('FilterChips - SPEC-012 acceptance criteria', () => {
  // AC8 - container ARIA roles
  it('AC8: container has role="group" and aria-label="Filter by category"', () => {
    const { container } = render(
      <FilterChips chips={CHIPS} activeId="all" onChange={vi.fn()} />,
    );
    const group = container.firstChild as HTMLElement;
    expect(group.getAttribute('role')).toBe('group');
    expect(group.getAttribute('aria-label')).toBe('Filter by category');
  });

  // AC5 - keyboard accessibility: chips are native buttons
  it('AC5: every chip renders as <button type="button">', () => {
    render(<FilterChips chips={CHIPS} activeId="all" onChange={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(CHIPS.length);
    buttons.forEach((btn) => {
      expect(btn.tagName).toBe('BUTTON');
      expect(btn).toHaveAttribute('type', 'button');
    });
  });

  // AC7 - active chip class and aria-pressed from props
  it('AC7: active chip (activeId="all") has aria-pressed="true"', () => {
    render(<FilterChips chips={CHIPS} activeId="all" onChange={vi.fn()} />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('AC7: inactive chips have aria-pressed="false"', () => {
    render(<FilterChips chips={CHIPS} activeId="all" onChange={vi.fn()} />);
    const strategyBtn = screen.getByRole('button', { name: 'Strategy & Architecture' });
    const buildBtn = screen.getByRole('button', { name: 'Build & Delivery' });
    expect(strategyBtn).toHaveAttribute('aria-pressed', 'false');
    expect(buildBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('AC7: active chip has chipActive CSS class', () => {
    render(<FilterChips chips={CHIPS} activeId="strategy" onChange={vi.fn()} />);
    const strategyBtn = screen.getByRole('button', { name: 'Strategy & Architecture' });
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(strategyBtn).toHaveClass('chipActive');
    expect(allBtn).not.toHaveClass('chipActive');
  });

  it('AC7: onChange is called with the chip id when clicked', () => {
    const onChange = vi.fn();
    render(<FilterChips chips={CHIPS} activeId="all" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Strategy & Architecture' }));
    expect(onChange).toHaveBeenCalledWith('strategy');
  });

  // AC6 - CSS transition tokens present (global reduced-motion rule suppresses them)
  it('AC6: CSS contains var(--dur-fast) for transition', () => {
    expect(css).toContain('var(--dur-fast)');
  });

  it('AC6: CSS contains var(--ease-out) for transition', () => {
    expect(css).toContain('var(--ease-out)');
  });

  // CSS token integrity
  it('CSS uses var(--elevated) for inactive chip background', () => {
    expect(css).toContain('var(--elevated)');
  });

  it('CSS uses var(--primary) for active chip background', () => {
    expect(css).toContain('var(--primary)');
  });

  it('CSS uses var(--r-full) for border-radius', () => {
    expect(css).toContain('var(--r-full)');
  });

  it('CSS uses var(--sp-sm) for filter row gap', () => {
    expect(css).toContain('var(--sp-sm)');
  });

  it('CSS uses var(--sp-2xl) for filter row margin-bottom', () => {
    expect(css).toContain('var(--sp-2xl)');
  });
});

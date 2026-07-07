// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterableOfferings } from '../../../components/molecules/FilterableOfferings';
import type { FilterChip } from '../../../components/molecules/FilterChips';
import type { Offering } from '../../../components/molecules/FilterableOfferings';

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

const CHIPS: FilterChip[] = [
  { id: 'all', label: 'All' },
  { id: 'strategy', label: 'Strategy & Architecture' },
  { id: 'build', label: 'Build & Delivery' },
];

const OFFERINGS: Offering[] = [
  {
    category: 'strategy',
    cardProps: { title: 'Tech Strategy', description: 'Strategy desc' },
  },
  {
    category: 'strategy',
    cardProps: { title: 'Solution Architecture', description: 'Architecture desc' },
  },
  {
    category: 'build',
    cardProps: { title: 'Custom Engineering', description: 'Build desc' },
  },
];

describe('FilterableOfferings - SPEC-012 acceptance criteria', () => {
  // AC1 - initial state: "All" active
  it('AC1: on mount, "All" chip has aria-pressed="true"', () => {
    render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('AC1: on mount, category chips have aria-pressed="false"', () => {
    render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    expect(
      screen.getByRole('button', { name: 'Strategy & Architecture' }),
    ).toHaveAttribute('aria-pressed', 'false');
    expect(
      screen.getByRole('button', { name: 'Build & Delivery' }),
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('AC1: on mount, all cards are visible in the DOM', () => {
    const { container } = render(
      <FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />,
    );
    expect(container.querySelectorAll('[data-category]')).toHaveLength(
      OFFERINGS.length,
    );
  });

  // AC2 - clicking a category chip
  it('AC2: clicking category chip makes it aria-pressed="true"', () => {
    render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    const strategyBtn = screen.getByRole('button', { name: 'Strategy & Architecture' });
    fireEvent.click(strategyBtn);
    expect(strategyBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('AC2: clicking category chip makes "All" chip aria-pressed="false"', () => {
    render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Strategy & Architecture' }));
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  // AC3 - filter shows only matching cards
  it('AC3: after clicking "Strategy & Architecture", only strategy cards are visible', () => {
    const { container } = render(
      <FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Strategy & Architecture' }));
    const visibleCards = container.querySelectorAll('[data-category="strategy"]');
    const buildCards = container.querySelectorAll('[data-category="build"]');
    expect(visibleCards).toHaveLength(2);
    expect(buildCards).toHaveLength(0);
  });

  it('AC3: filtered-out card title is not present in DOM', () => {
    render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Strategy & Architecture' }));
    expect(screen.queryByText('Custom Engineering')).not.toBeInTheDocument();
  });

  // AC4 - clicking "All" restores all cards
  it('AC4: clicking "All" after a category filter shows all cards', () => {
    const { container } = render(
      <FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Strategy & Architecture' }));
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(container.querySelectorAll('[data-category]')).toHaveLength(
      OFFERINGS.length,
    );
  });

  it('AC4: after resetting to "All", all card titles are in the DOM', () => {
    render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Build & Delivery' }));
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Tech Strategy')).toBeInTheDocument();
    expect(screen.getByText('Custom Engineering')).toBeInTheDocument();
  });
});

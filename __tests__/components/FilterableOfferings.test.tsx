// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterableOfferings } from '../../components/molecules/FilterableOfferings';
import type { Offering } from '../../components/molecules/FilterableOfferings';
import type { FilterChip } from '../../components/molecules/FilterChips';

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
  { id: 'ai', label: 'AI & Automation' },
  { id: 'leadership', label: 'Leadership & Team' },
];

const OFFERINGS: Offering[] = [
  // 3 strategy
  {
    category: 'strategy',
    cardProps: { badge: 'Strategy', title: 'Tech Strategy', description: 'Desc 1', value: 'Val 1', engagement: 'Eng 1' },
  },
  {
    category: 'strategy',
    cardProps: { badge: 'Architecture', title: 'Solution Arch', description: 'Desc 2', value: 'Val 2', engagement: 'Eng 2' },
  },
  {
    category: 'strategy',
    cardProps: { badge: 'Architecture', title: 'Enterprise Arch', description: 'Desc 3', value: 'Val 3', engagement: 'Eng 3' },
  },
  // 2 build
  {
    category: 'build',
    cardProps: { badge: 'Build', title: 'Custom Eng', description: 'Desc 4', value: 'Val 4', engagement: 'Eng 4' },
  },
  {
    category: 'build',
    cardProps: { badge: 'Migration', title: 'Platform Mod', description: 'Desc 5', value: 'Val 5', engagement: 'Eng 5' },
  },
  // 1 ai
  {
    category: 'ai',
    cardProps: { badge: 'AI', title: 'AI Consulting', description: 'Desc 6', value: 'Val 6', engagement: 'Eng 6' },
  },
  // 2 leadership
  {
    category: 'leadership',
    cardProps: { badge: 'Leadership', title: 'Fractional CTO', description: 'Desc 7', value: 'Val 7', engagement: 'Eng 7' },
  },
  {
    category: 'leadership',
    cardProps: { badge: 'Team', title: 'Team Augmentation', description: 'Desc 8', value: 'Val 8', engagement: 'Eng 8' },
  },
];

describe('FilterableOfferings - SPEC-020 acceptance criteria', () => {
  // ── AC2: all 8 visible on load ────────────────────────────────────────

  it('AC2: renders all 8 offerings when "All" is active', () => {
    const { container } = render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    expect(container.querySelectorAll('[data-category]')).toHaveLength(8);
  });

  it('AC2: "All" chip has aria-pressed="true" on initial render', () => {
    render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
  });

  // ── AC3: strategy filter → 3 cards ───────────────────────────────────

  it('AC3: clicking "Strategy & Architecture" shows 3 cards', () => {
    const { container } = render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Strategy & Architecture' }));
    expect(container.querySelectorAll('[data-category]')).toHaveLength(3);
  });

  it('AC3: filtered cards all have data-category="strategy"', () => {
    const { container } = render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Strategy & Architecture' }));
    const cards = container.querySelectorAll('[data-category]');
    cards.forEach((card) => expect(card.getAttribute('data-category')).toBe('strategy'));
  });

  // ── AC4: "All" resets to 8 cards ─────────────────────────────────────

  it('AC4: clicking "All" after filter shows all 8 cards again', () => {
    const { container } = render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Strategy & Architecture' }));
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(container.querySelectorAll('[data-category]')).toHaveLength(8);
  });

  // ── AC6: aria-pressed reflects active state ───────────────────────────

  it('AC6: after clicking "Strategy", "Strategy" chip is aria-pressed=true', () => {
    render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Strategy & Architecture' }));
    expect(screen.getByRole('button', { name: 'Strategy & Architecture' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('AC6: after clicking "Strategy", "All" chip is aria-pressed=false', () => {
    render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Strategy & Architecture' }));
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('AC6: all inactive chips have aria-pressed=false on initial render', () => {
    render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    const inactiveLabels = ['Strategy & Architecture', 'Build & Delivery', 'AI & Automation', 'Leadership & Team'];
    inactiveLabels.forEach((label) => {
      expect(screen.getByRole('button', { name: label })).toHaveAttribute('aria-pressed', 'false');
    });
  });

  // ── AC8: row-balanced layout in "All" view ────────────────────────────

  it('AC8: "All" view renders exactly 3 card rows', () => {
    const { container } = render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    expect(container.querySelectorAll('[class*="cardRow"]:not([class*="cardRows"])')).toHaveLength(3);
  });

  it('AC8: first row has 3 children', () => {
    const { container } = render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    const rows = container.querySelectorAll('[class*="cardRow"]:not([class*="cardRows"])');
    expect(rows[0].childElementCount).toBe(3);
  });

  it('AC8: second row has 3 children', () => {
    const { container } = render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    const rows = container.querySelectorAll('[class*="cardRow"]:not([class*="cardRows"])');
    expect(rows[1].childElementCount).toBe(3);
  });

  it('AC8: third row has 2 children', () => {
    const { container } = render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    const rows = container.querySelectorAll('[class*="cardRow"]:not([class*="cardRows"])');
    expect(rows[2].childElementCount).toBe(2);
  });

  it('AC8: "Build" filter produces 1 row with 2 children', () => {
    const { container } = render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    fireEvent.click(screen.getByRole('button', { name: 'Build & Delivery' }));
    const rows = container.querySelectorAll('[class*="cardRow"]:not([class*="cardRows"])');
    expect(rows).toHaveLength(1);
    expect(rows[0].childElementCount).toBe(2);
  });

  it('AC8: "AI" filter produces 1 row with 1 child', () => {
    const { container } = render(<FilterableOfferings chips={CHIPS} offerings={OFFERINGS} />);
    fireEvent.click(screen.getByRole('button', { name: 'AI & Automation' }));
    const rows = container.querySelectorAll('[class*="cardRow"]:not([class*="cardRows"])');
    expect(rows).toHaveLength(1);
    expect(rows[0].childElementCount).toBe(1);
  });
});

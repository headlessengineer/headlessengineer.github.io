// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Logo } from '../../components/atoms/Logo';

vi.mock('next/link', () => ({
  default: function Link({
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

describe('Logo - SPEC-005 acceptance criteria', () => {
  it('AC-4: link has aria-label "HeadlessEngineer, home"', () => {
    render(<Logo />);
    expect(
      screen.getByRole('link', { name: 'HeadlessEngineer, home' }),
    ).toBeInTheDocument();
  });

  it('AC-1: HEADLESS is in a span with class wordHead', () => {
    const { container } = render(<Logo />);
    const wordHead = container.querySelector('.wordHead');
    expect(wordHead).toBeInTheDocument();
    expect(wordHead).toHaveTextContent('HEADLESS');
  });

  it('AC-1: wordTail contains .swapA and .swapB child spans', () => {
    const { container } = render(<Logo />);
    const wordTail = container.querySelector('.wordTail');
    expect(wordTail).toBeInTheDocument();
    // non-null: guaranteed by the toBeInTheDocument assertion above
    const swapA = wordTail!.querySelector('.swapA');
    const swapB = wordTail!.querySelector('.swapB');
    expect(swapA).toBeInTheDocument();
    expect(swapB).toBeInTheDocument();
    expect(swapA).not.toHaveAttribute('aria-hidden');
  });

  it('AC-4: the duplicate ENGINEER span has aria-hidden="true"', () => {
    const { container } = render(<Logo />);
    const hiddenSpan = container.querySelector('[aria-hidden="true"]');
    expect(hiddenSpan).toBeInTheDocument();
    expect(hiddenSpan).toHaveTextContent('ENGINEER');
  });

  it('AC-7: optional className is applied to the link element', () => {
    render(<Logo className="footer-logo" />);
    const link = screen.getByRole('link');
    expect(link.className).toContain('footer-logo');
  });
});

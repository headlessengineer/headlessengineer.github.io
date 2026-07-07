// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render } from '@testing-library/react';
import { ServiceCard } from '../../../components/molecules/ServiceCard';

const css = readFileSync(
  join(process.cwd(), 'components/molecules/ServiceCard.module.css'),
  'utf-8',
);

const baseProps = {
  title: 'Technology Strategy',
  description: 'We assess what you have.',
};

describe('ServiceCard - SPEC-011 acceptance criteria', () => {
  // AC1 - badge renders before h3
  it('AC1: badge prop renders Badge element before h3', () => {
    const { container } = render(
      <ServiceCard {...baseProps} badge="Strategy" />,
    );
    const badge = container.querySelector('.badge');
    const h3 = container.querySelector('h3');
    expect(badge).not.toBeNull();
    expect(h3).not.toBeNull();
    // badge must precede h3 in DOM order
    expect(
      badge!.compareDocumentPosition(h3!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  // AC2 - engagement with bold prefix
  it('AC2: engagement renders with bold "Engagement: " prefix', () => {
    const { container } = render(
      <ServiceCard {...baseProps} engagement="Discovery sprint (2–4 weeks)" />,
    );
    const strong = container.querySelector('strong');
    expect(strong).not.toBeNull();
    expect(strong!.textContent).toMatch(/Engagement/i);
  });

  it('AC2: engagement value text is present', () => {
    const { getByText } = render(
      <ServiceCard {...baseProps} engagement="Discovery sprint (2–4 weeks)" />,
    );
    expect(getByText(/Discovery sprint/)).toBeInTheDocument();
  });

  // AC3 - href renders cardLink
  it('AC3: href renders cardLink with "Learn more →" text', () => {
    const { container } = render(
      <ServiceCard {...baseProps} href="/services/strategy" />,
    );
    const link = container.querySelector('.cardLink');
    expect(link).not.toBeNull();
    expect(link!.textContent).toContain('Learn more');
  });

  // AC4 - absent elements when props omitted
  it('AC4: no badge prop → no badge element in DOM', () => {
    const { container } = render(<ServiceCard {...baseProps} />);
    expect(container.querySelector('.badge')).toBeNull();
  });

  it('AC4: no href prop → no cardLink element in DOM', () => {
    const { container } = render(<ServiceCard {...baseProps} />);
    expect(container.querySelector('.cardLink')).toBeNull();
  });

  // AC5 - card container CSS
  it('AC5: container has card class', () => {
    const { container } = render(<ServiceCard {...baseProps} />);
    expect(container.firstChild).toHaveClass('card');
  });

  it('AC5: CSS card has --surface-card', () => {
    expect(css).toContain('var(--surface-card)');
  });

  it('AC5: CSS card has --r-lg', () => {
    expect(css).toContain('var(--r-lg)');
  });

  it('AC5: CSS card has --sp-lg', () => {
    expect(css).toContain('var(--sp-lg)');
  });

  // AC6 - value span
  it('AC6: value prop renders span with value class', () => {
    const { container } = render(
      <ServiceCard {...baseProps} value="System Design · API-First Design" />,
    );
    expect(container.querySelector('.value')).not.toBeNull();
  });

  it('AC6: CSS value uses --fg-secondary for AAA contrast', () => {
    expect(css).toContain('var(--fg-secondary)');
  });

  it('AC6: CSS value has display block', () => {
    expect(css).toContain('display: block');
  });

  // general structure
  it('renders title as h3', () => {
    const { getByRole } = render(<ServiceCard {...baseProps} />);
    expect(getByRole('heading', { level: 3 })).toHaveTextContent('Technology Strategy');
  });

  it('renders description text', () => {
    const { getByText } = render(<ServiceCard {...baseProps} />);
    expect(getByText('We assess what you have.')).toBeInTheDocument();
  });
});

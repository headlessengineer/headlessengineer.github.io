// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import type { TestimonialItem } from '../../../types/config';
import { TestimonialCard } from '../../../components/molecules/TestimonialCard';

const mockItem: TestimonialItem = {
  id: 'test-1',
  quote: 'Exceptional work, delivered on time.',
  author: 'Jane Smith',
  role: 'CTO',
  company: 'Acme Corp',
};

describe('TestimonialCard - SPEC-023 AC-3 and AC-4', () => {
  // AC-3: blockquote / cite / footer semantic structure
  it('AC-3: renders a <blockquote> element', () => {
    const { container } = render(<TestimonialCard testimonial={mockItem} />);
    expect(container.querySelector('blockquote')).not.toBeNull();
  });

  it('AC-3: quote text is inside the <blockquote>', () => {
    const { container } = render(<TestimonialCard testimonial={mockItem} />);
    const bq = container.querySelector('blockquote');
    expect(bq?.textContent).toContain(mockItem.quote);
  });

  it('AC-3: renders a <footer> inside the <blockquote>', () => {
    const { container } = render(<TestimonialCard testimonial={mockItem} />);
    const footer = container.querySelector('blockquote footer');
    expect(footer).not.toBeNull();
  });

  it('AC-3: renders a <cite> inside the <footer>', () => {
    const { container } = render(<TestimonialCard testimonial={mockItem} />);
    const cite = container.querySelector('blockquote footer cite');
    expect(cite).not.toBeNull();
  });

  // AC-4: all required fields visible
  it('AC-4: renders quote text', () => {
    const { getByText } = render(<TestimonialCard testimonial={mockItem} />);
    expect(getByText(mockItem.quote)).toBeInTheDocument();
  });

  it('AC-4: renders author name', () => {
    const { getByText } = render(<TestimonialCard testimonial={mockItem} />);
    expect(getByText(mockItem.author)).toBeInTheDocument();
  });

  it('AC-4: renders role', () => {
    const { container } = render(<TestimonialCard testimonial={mockItem} />);
    expect(container.textContent).toContain(mockItem.role);
  });

  it('AC-4: renders company', () => {
    const { container } = render(<TestimonialCard testimonial={mockItem} />);
    expect(container.textContent).toContain(mockItem.company);
  });
});

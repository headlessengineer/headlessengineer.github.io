// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render } from '@testing-library/react';
import { Badge } from '../../../components/atoms/Badge';

const css = readFileSync(
  join(process.cwd(), 'components/atoms/Badge.module.css'),
  'utf-8',
);

describe('Badge - SPEC-011 acceptance criteria', () => {
  it('renders label text', () => {
    const { getByText } = render(<Badge label="Strategy" />);
    expect(getByText('Strategy')).toBeInTheDocument();
  });

  it('renders with badge class', () => {
    const { container } = render(<Badge label="Strategy" />);
    expect(container.firstChild).toHaveClass('badge');
  });

  it('CSS has --elevated background', () => {
    expect(css).toContain('var(--elevated)');
  });

  it('CSS has --fg-secondary color', () => {
    expect(css).toContain('var(--fg-secondary)');
  });

  it('CSS has --r-sm border-radius', () => {
    expect(css).toContain('var(--r-sm)');
  });
});

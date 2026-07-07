// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { CardRows, CardRow } from '../../../components/atoms/CardRows';

// AC2 and AC3 (viewport breakpoints) cannot be verified at unit level - jsdom does
// not evaluate @media rules. Those criteria are gated on human visual review at
// page-build time (US-009 through US-014).

describe('CardRow - SPEC-008 acceptance criteria', () => {
  it('applies cols3 class when cols={3}', () => {
    const { container } = render(
      <CardRow cols={3}>
        <div>a</div>
      </CardRow>,
    );
    expect(container.firstChild).toHaveClass('cols3');
  });

  it('applies cols2 class when cols={2}', () => {
    const { container } = render(
      <CardRow cols={2}>
        <div>a</div>
      </CardRow>,
    );
    expect(container.firstChild).toHaveClass('cols2');
  });

  it('AC6: applies cols1 class when cols={1}', () => {
    const { container } = render(
      <CardRow cols={1}>
        <div>a</div>
      </CardRow>,
    );
    expect(container.firstChild).toHaveClass('cols1');
  });

  it('always applies cardRow base class', () => {
    const { container } = render(
      <CardRow cols={3}>
        <div>a</div>
      </CardRow>,
    );
    expect(container.firstChild).toHaveClass('cardRow');
  });

  it('renders children inside the grid', () => {
    const { getByText } = render(
      <CardRow cols={3}>
        <div>card-one</div>
        <div>card-two</div>
        <div>card-three</div>
      </CardRow>,
    );
    expect(getByText('card-one')).toBeInTheDocument();
    expect(getByText('card-two')).toBeInTheDocument();
    expect(getByText('card-three')).toBeInTheDocument();
  });

  it('AC5: cols outside [1,2,3] is a TypeScript compile error', () => {
    // @ts-expect-error - cols={4} must be rejected by the CardRowCols union type
    const _unused = <CardRow cols={4}><div /></CardRow>;
    void _unused;
  });
});

describe('CardRows - SPEC-008 acceptance criteria', () => {
  it('AC4: applies cardRows class on the flex container', () => {
    const { container } = render(
      <CardRows>
        <CardRow cols={3}>
          <div>a</div>
        </CardRow>
      </CardRows>,
    );
    expect(container.firstChild).toHaveClass('cardRows');
  });

  it('AC4: renders children inside the flex container', () => {
    const { getByText } = render(
      <CardRows>
        <CardRow cols={2}>
          <div>row-child</div>
        </CardRow>
      </CardRows>,
    );
    expect(getByText('row-child')).toBeInTheDocument();
  });
});

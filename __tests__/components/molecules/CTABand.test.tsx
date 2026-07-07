// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render } from '@testing-library/react';
import { CTABand } from '../../../components/molecules/CTABand';

const css = readFileSync(
  join(process.cwd(), 'components/molecules/CTABand.module.css'),
  'utf-8',
);

const defaultButtons = [
  { label: 'Get In Touch', href: '/contact', variant: 'primary' as const },
  { label: 'See What We Do', href: '/services', variant: 'secondary' as const },
];

describe('CTABand - SPEC-010 acceptance criteria', () => {
  // AC1 - container surface
  it('AC1: renders ctaBand class on container', () => {
    const { container } = render(
      <CTABand title="Title" description="Desc" buttons={defaultButtons} />,
    );
    expect(container.firstChild).toHaveClass('ctaBand');
  });

  it('AC1: CSS has text-align center', () => {
    expect(css).toContain('text-align: center');
  });

  // AC2 - description
  it('AC2: description paragraph has description class', () => {
    const { container } = render(
      <CTABand title="Title" description="Body copy" buttons={defaultButtons} />,
    );
    const p = container.querySelector('p');
    expect(p).toHaveClass('description');
  });

  it('AC2: CSS description has max-width 560px', () => {
    expect(css).toContain('560px');
  });

  it('AC2: CSS description has --fg-secondary color', () => {
    expect(css).toContain('var(--fg-secondary)');
  });

  it('AC2: CSS description has margin with --sp-xl', () => {
    expect(css).toContain('var(--sp-xl)');
  });

  // AC3 - primary button
  it('AC3: primary variant button renders with primary class', () => {
    const { getByText } = render(
      <CTABand
        title="Title"
        description="Desc"
        buttons={[{ label: 'Primary CTA', href: '/contact', variant: 'primary' }]}
      />,
    );
    expect(getByText('Primary CTA').closest('a')).toHaveClass('primary');
  });

  // AC4 - secondary button
  it('AC4: secondary variant button renders with secondary class', () => {
    const { getByText } = render(
      <CTABand
        title="Title"
        description="Desc"
        buttons={[{ label: 'Ghost CTA', href: '/services', variant: 'secondary' }]}
      />,
    );
    expect(getByText('Ghost CTA').closest('a')).toHaveClass('secondary');
  });

  // AC5 - button group
  it('AC5: button group wrapper has buttonGroup class', () => {
    const { container } = render(
      <CTABand title="Title" description="Desc" buttons={defaultButtons} />,
    );
    expect(container.querySelector('.buttonGroup')).not.toBeNull();
  });

  it('AC5: CSS buttonGroup has display flex', () => {
    expect(css).toContain('display: flex');
  });

  it('AC5: CSS buttonGroup has --sp-md gap', () => {
    expect(css).toContain('var(--sp-md)');
  });

  it('AC5: CSS buttonGroup has flex-wrap wrap', () => {
    expect(css).toContain('flex-wrap: wrap');
  });

  it('AC5: CSS buttonGroup has justify-content center', () => {
    expect(css).toContain('justify-content: center');
  });

  // AC6 - heading
  it('AC6: renders h2 with title text', () => {
    const { getByRole } = render(
      <CTABand title="Have a problem worth solving?" description="Desc" buttons={defaultButtons} />,
    );
    expect(getByRole('heading', { level: 2 })).toHaveTextContent('Have a problem worth solving?');
  });

  // children rendered
  it('renders description text', () => {
    const { getByText } = render(
      <CTABand title="Title" description="Contact us today" buttons={defaultButtons} />,
    );
    expect(getByText('Contact us today')).toBeInTheDocument();
  });

  it('renders all button labels', () => {
    const { getByText } = render(
      <CTABand title="Title" description="Desc" buttons={defaultButtons} />,
    );
    expect(getByText('Get In Touch')).toBeInTheDocument();
    expect(getByText('See What We Do')).toBeInTheDocument();
  });
});

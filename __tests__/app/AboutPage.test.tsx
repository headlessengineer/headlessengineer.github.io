// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import React from 'react';
import { render, screen } from '@testing-library/react';
import type { AboutConfig } from '../../types/config';

const css = readFileSync(
  join(process.cwd(), 'app/about/about.module.css'),
  'utf-8',
);

vi.mock('../../lib/safeHref', () => ({
  safeHref: (href: string) => href,
}));

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

vi.mock('../../components/organisms/CoreServices', () => ({
  CoreServices: () => (
    <section
      data-testid="core-services-section"
      aria-labelledby="core-services-heading"
    >
      <h2 id="core-services-heading">Problems we&apos;re built to solve</h2>
    </section>
  ),
}));

// Stub out remaining organisms so page renders without real implementations
vi.mock('../../components/organisms/Expertise', () => ({
  Expertise: () => <section data-testid="expertise-section" />,
}));
vi.mock('../../components/organisms/Principles', () => ({
  Principles: () => <section data-testid="principles-section" />,
}));
vi.mock('../../components/organisms/Certifications', () => ({
  Certifications: () => <section data-testid="certifications-section" />,
}));
vi.mock('../../components/organisms/CTA', () => ({
  CTA: () => <section data-testid="cta-section" />,
}));

const MOCK_ABOUT: AboutConfig = {
  sections: {
    hero:           { visible: true },
    coreServices:   { visible: true },
    howWeWork:      { visible: true },
    expertise:      { visible: true },
    principles:     { visible: true },
    founder:        { visible: true },
    certifications: { visible: true },
    cta:            { visible: true },
  },
  metadata: { description: 'About' },
  hero: {
    title: 'Who Is HeadlessEngineer?',
    subtitle: 'A consultancy built for real problems.',
  },
  coreServices: {
    title: 'How We Help',
    description: "Problems we're built to solve",
    services: [],
  },
  howWeWork: {
    title: "How We're Staffed",
    description: 'A core of senior judgment, a network built to scale',
    content: 'HeadlessEngineer runs on a core-plus-network model.',
  },
  expertise: { title: 'Expertise', description: 'Desc', skills: [] },
  principles: { title: 'Principles', description: 'Desc', principles: [] },
  founder: { title: 'Founder', name: 'Karan Popat', role: 'Lead', bio: 'Bio', href: '/about' },
  certifications: { title: 'Certs', description: 'Desc', certifications: [] },
  metrics: [],
  cta: {
    title: 'Have a Problem Worth Solving?',
    description: 'Reach out.',
    buttons: [
      { label: 'Get In Touch', href: '/contact', variant: 'primary' },
      { label: 'Read Our Writing', href: '/articles', variant: 'secondary' },
    ],
  },
};

vi.mock('../../lib/config-cache', () => ({
  getConfig: () => ({ about: MOCK_ABOUT }),
}));

const { default: AboutPage } = await import('../../app/about/page');

describe('AboutPage - SPEC-017 + SPEC-019 acceptance criteria (page-level)', () => {
  // ── AC1: page-hero content ────────────────────────────────────────────

  it('AC1: eyebrow reads "Studio"', () => {
    render(<AboutPage />);
    expect(screen.getByText('Studio')).toBeInTheDocument();
  });

  it('AC1: h1 reads about.hero.title', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Who Is HeadlessEngineer?' }),
    ).toBeInTheDocument();
  });

  // ── AC2: hero container max-width ─────────────────────────────────────

  it('AC2: CSS declares max-width 860px on .heroContainer', () => {
    expect(css).toContain('860px');
  });

  // ── AC5: howWeWork section heading ────────────────────────────────────

  it('AC5: howWeWork h2 renders howWeWork.description', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'A core of senior judgment, a network built to scale',
      }),
    ).toBeInTheDocument();
  });

  // ── SPEC-019 AC1: founder name and CSS tokens ─────────────────────────

  it('SPEC-019 AC1: founder name renders', () => {
    render(<AboutPage />);
    expect(screen.getByText(MOCK_ABOUT.founder.name)).toBeInTheDocument();
  });

  it('SPEC-019 AC1: founder role renders', () => {
    render(<AboutPage />);
    expect(screen.getByText(MOCK_ABOUT.founder.role)).toBeInTheDocument();
  });

  it('SPEC-019 AC1: founder bio renders', () => {
    render(<AboutPage />);
    expect(screen.getByText(MOCK_ABOUT.founder.bio)).toBeInTheDocument();
  });

  it('SPEC-019 AC1: founder section eyebrow reads "Behind the Studio"', () => {
    render(<AboutPage />);
    expect(screen.getByText('Behind the Studio')).toBeInTheDocument();
  });

  it('SPEC-019 AC1: CSS declares 20px for .founderName', () => {
    expect(css).toContain('20px');
  });

  it('SPEC-019 AC1: CSS declares var(--primary) for .founderRole', () => {
    expect(css).toContain('var(--primary)');
  });

  // ── SPEC-019 AC2: LinkedIn link ───────────────────────────────────────

  it('SPEC-019 AC2: LinkedIn link has correct href', () => {
    render(<AboutPage />);
    const link = screen.getByRole('link', { name: /LinkedIn/i });
    expect(link).toHaveAttribute('href', MOCK_ABOUT.founder.href);
  });

  it('SPEC-019 AC2: LinkedIn link has rel="noopener noreferrer"', () => {
    render(<AboutPage />);
    const link = screen.getByRole('link', { name: /LinkedIn/i });
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

// @vitest-environment happy-dom
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import type { AboutConfig, HomeConfig, SiteConfig } from '../../types/config';

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

vi.mock('../../components/organisms/Hero', () => ({
  Hero: () => <section data-testid="hero-section" aria-label="hero" />,
}));

vi.mock('../../components/organisms/HomeServices', () => ({
  HomeServices: () => (
    <section data-testid="services-section" aria-labelledby="services-heading">
      <h2 id="services-heading">Services</h2>
    </section>
  ),
}));

const MOCK_HOME: HomeConfig = {
  sections: {
    hero:         { visible: true },
    services:     { visible: true },
    testimonials: { visible: true },
    cta:          { visible: true },
  },
  metadata: { title: 'Home', description: 'Home page' },
  hero: {
    title: 'HeadlessEngineer',
    taglines: [],
    description: 'Test description',
    cta: {
      primary: { label: 'Talk to Us', href: '/contact' },
      secondary: { label: 'See What We Do', href: '/services' },
    },
  },
};

const MOCK_SITE: SiteConfig = {
  name: 'HeadlessEngineer',
  tagline: 'Tech solutions for business problems',
  description: 'Test description',
  url: 'https://headlessengineer.com',
  author: { name: 'Karan Popat', role: 'Founder', email: 'k@test.com' },
  keywords: [],
  social: { github: '', linkedin: '' },
  navigation: [],
  scheduleCallUrl: '',
  location: 'London',
};

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
  hero: { title: 'Who Is HeadlessEngineer?', subtitle: 'Subtitle' },
  coreServices: {
    title: 'How We Help',
    description: "Problems we're built to solve",
    services: [],
  },
  howWeWork: { title: 'How We Work', description: 'Desc', content: 'Content' },
  expertise: { title: 'Expertise', description: 'Desc', skills: [] },
  principles: { title: 'Principles', description: 'Desc', principles: [] },
  founder: {
    title: 'Founder',
    name: 'Karan Popat',
    role: 'Lead',
    bio: 'Bio',
    href: '/about',
  },
  certifications: { title: 'Certs', description: 'Desc', certifications: [] },
  metrics: [],
  cta: {
    title: 'Have a Problem Worth Solving?',
    description: 'Whether it\'s a strategy question, reach out.',
    buttons: [
      { label: 'Get In Touch', href: '/contact', variant: 'primary' },
      { label: 'Read Our Writing', href: '/articles', variant: 'secondary' },
    ],
  },
};

vi.mock('../../lib/config-cache', () => ({
  getConfig: () => ({
    home: MOCK_HOME,
    site: MOCK_SITE,
    about: MOCK_ABOUT,
    // empty items: testimonials section omitted, keeping 3-section structure
    testimonials: {
      sections: { list: { visible: true } }, metadata: { title: '', description: '' },
      hero: { title: '' }, backLink: { text: '' }, itemsPerPage: 3, items: [],
    },
  }),
}));

// Import after mocks are set up
const { default: HomePage } = await import('../../app/page');

describe('HomePage - SPEC-016 acceptance criteria (page-level)', () => {
  // ── AC1: section DOM order ────────────────────────────────────────────

  it('AC1: renders three sections in order: hero → services → CTA band', () => {
    const { container } = render(<HomePage />);
    const sections = container.querySelectorAll('section');
    expect(sections).toHaveLength(3);
    expect(sections[0]).toHaveAttribute('data-testid', 'hero-section');
    expect(sections[1]).toHaveAttribute('data-testid', 'services-section');
    // third section is the CTA wrapper (no testid - it's an inline wrapper)
    expect(sections[2]).not.toHaveAttribute('data-testid');
  });

  // ── AC5: CTABand content ──────────────────────────────────────────────

  it('AC5: CTA band renders title "Have a Problem Worth Solving?"', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: 'Have a Problem Worth Solving?' }),
    ).toBeInTheDocument();
  });

  it('AC5: "Get In Touch" link points to /contact', () => {
    render(<HomePage />);
    const link = screen.getByRole('link', { name: 'Get In Touch' });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('AC5: "Read Our Writing" link points to /articles', () => {
    render(<HomePage />);
    const link = screen.getByRole('link', { name: 'Read Our Writing' });
    expect(link).toHaveAttribute('href', '/articles');
  });
});

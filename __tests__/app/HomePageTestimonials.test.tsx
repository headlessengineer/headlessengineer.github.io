// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import type { AboutConfig, HomeConfig, SiteConfig, TestimonialsConfig, TestimonialItem } from '../../types/config';

vi.mock('next/link', () => ({
  default: function MockLink({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) {
    return <a href={href} className={className}>{children}</a>;
  },
}));

vi.mock('../../components/organisms/Hero', () => ({
  Hero: () => <section data-testid="hero-section" />,
}));

vi.mock('../../components/organisms/HomeServices', () => ({
  HomeServices: () => <section data-testid="services-section" />,
}));

vi.mock('../../components/molecules/CTABand', () => ({
  CTABand: () => <div data-testid="cta-band" />,
}));

vi.mock('../../components/molecules/TestimonialCard', () => ({
  TestimonialCard: ({ testimonial }: { testimonial: TestimonialItem }) => (
    <div data-testid="testimonial-card">{testimonial.author}</div>
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
  hero: { title: 'HeadlessEngineer', taglines: [], description: 'Desc' },
};

const MOCK_SITE: SiteConfig = {
  name: 'HeadlessEngineer',
  tagline: 'Tagline',
  description: 'Desc',
  url: 'https://headlessengineer.xyz',
  author: { name: 'Karan Popat', role: 'Founder', email: 'k@test.com' },
  keywords: [],
  social: {},
  navigation: [],
  scheduleCallUrl: '',
  location: 'Berlin',
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
  coreServices: { title: 'Services', description: 'Desc', services: [] },
  howWeWork: { title: 'How We Work', description: 'Desc', content: 'Content' },
  expertise: { title: 'Expertise', description: 'Desc', skills: [] },
  principles: { title: 'Principles', description: 'Desc', principles: [] },
  founder: { title: 'Founder', name: 'Karan Popat', role: 'Lead', bio: 'Bio', href: '/about' },
  certifications: { title: 'Certs', description: 'Desc', certifications: [] },
  metrics: [],
  cta: {
    title: 'CTA Title',
    description: 'CTA Desc',
    buttons: [{ label: 'Contact', href: '/contact', variant: 'primary' }],
  },
};

const THREE_ITEMS: TestimonialItem[] = [
  { id: '1', quote: 'Great work', author: 'Alice', role: 'CTO', company: 'Acme' },
  { id: '2', quote: 'Excellent', author: 'Bob', role: 'VP', company: 'Corp' },
  { id: '3', quote: 'Fantastic', author: 'Carol', role: 'CPO', company: 'Ltd' },
];

const MOCK_TESTIMONIALS_BASE: TestimonialsConfig = {
  sections: { list: { visible: true } },
  metadata: { title: 'Testimonials', description: 'Desc' },
  hero: { title: 'Testimonials', description: 'Desc' },
  backLink: { text: 'Back' },
  itemsPerPage: 3,
  items: THREE_ITEMS,
};

let currentItems: TestimonialItem[] = THREE_ITEMS;

vi.mock('../../lib/config-cache', () => ({
  getConfig: () => ({
    home: MOCK_HOME,
    site: MOCK_SITE,
    about: MOCK_ABOUT,
    testimonials: { ...MOCK_TESTIMONIALS_BASE, items: currentItems },
  }),
}));

const { default: HomePage } = await import('../../app/page');

describe('HomePage testimonials section - SPEC-023 acceptance criteria', () => {
  beforeEach(() => {
    currentItems = THREE_ITEMS;
  });

  // AC-1: section renders when items exist
  it('AC-1: testimonials section is present when items exist', () => {
    render(<HomePage />);
    expect(screen.getByTestId('testimonials-section')).toBeInTheDocument();
  });

  // AC-2: section absent when items empty
  it('AC-2: testimonials section is absent when items is empty', () => {
    currentItems = [];
    render(<HomePage />);
    expect(screen.queryByTestId('testimonials-section')).not.toBeInTheDocument();
  });

  // AC-5: 3 items → CardRow with cols3 class
  it('AC-5: 3 items render inside a cols3 grid row', () => {
    const { container } = render(<HomePage />);
    expect(container.querySelector('.cols3')).not.toBeNull();
  });

  it('AC-5: 3 testimonial cards are rendered', () => {
    render(<HomePage />);
    expect(screen.getAllByTestId('testimonial-card')).toHaveLength(3);
  });

  // AC-6: section heading
  it('AC-6: eyebrow contains "Social Proof"', () => {
    render(<HomePage />);
    expect(screen.getByText(/Social Proof/i)).toBeInTheDocument();
  });

  it('AC-6: h2 reads "What clients say"', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { level: 2, name: /What clients say/i }),
    ).toBeInTheDocument();
  });
});

// @vitest-environment happy-dom
import { readFileSync } from 'fs';
import { join } from 'path';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from '../../components/organisms/Footer';
import type { SiteConfig } from '../../types/config';

const mockSite: SiteConfig = {
  name: 'HeadlessEngineer',
  tagline: 'Tech solutions for business problems.',
  url: 'https://headlessengineer.studio',
  description: 'Test description',
  author: {
    name: 'Karan Popat',
    role: 'Founder & Lead Architect',
    email: 'hello@headlessengineer.studio',
  },
  keywords: [],
  social: {
    github: 'https://github.com/headlessengineer',
    linkedin: 'https://linkedin.com/in/popatkaran',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Studio', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/projects' },
    { label: 'Writing', href: '/articles' },
    { label: 'Contact', href: '/contact' },
  ],
  scheduleCallUrl: 'https://calendar.app.google/test123',
  location: 'Berlin, Germany',
};

const CSS_PATH = join(
  process.cwd(),
  'components/organisms/Footer.module.css',
);

describe('Footer - SPEC-007 acceptance criteria', () => {
  // ── AC-1: 4-column grid structure ─────────────────────────────────────────
  it('AC-1: renders 4 direct children in the grid container', () => {
    render(<Footer site={mockSite} />);
    const grid = document.querySelector('[data-testid="footer-grid"]');
    expect(grid).not.toBeNull();
    expect(grid!.children).toHaveLength(4);
  });

  // ── AC-4: Brand column - wordmark + tagline ────────────────────────────────
  it('AC-4: renders wordmark link with correct aria-label', () => {
    render(<Footer site={mockSite} />);
    const link = screen.getByRole('link', { name: /headlessengineer.*home/i });
    expect(link).toBeInTheDocument();
  });

  it('AC-4: renders HEADLESS and ENGINEER spans inside the wordmark', () => {
    render(<Footer site={mockSite} />);
    expect(screen.getByText('HEADLESS')).toBeInTheDocument();
    expect(screen.getByText('ENGINEER')).toBeInTheDocument();
  });

  it('AC-4: wordmark wrapper has font-size 22px inline style', () => {
    render(<Footer site={mockSite} />);
    const link = screen.getByRole('link', { name: /headlessengineer.*home/i });
    expect(link).toHaveStyle({ fontSize: '22px' });
  });

  it('AC-4: renders site tagline in brand column', () => {
    render(<Footer site={mockSite} />);
    expect(screen.getByText(mockSite.tagline)).toBeInTheDocument();
  });

  // ── AC-5: Connect column links ─────────────────────────────────────────────
  it('AC-5: email link uses mailto href', () => {
    render(<Footer site={mockSite} />);
    const link = document.querySelector('a[href="mailto:hello@headlessengineer.studio"]');
    expect(link).not.toBeNull();
  });

  it('AC-5: schedule link uses site.scheduleCallUrl', () => {
    render(<Footer site={mockSite} />);
    const link = document.querySelector(`a[href="${mockSite.scheduleCallUrl}"]`);
    expect(link).not.toBeNull();
  });

  it('AC-5: LinkedIn link uses site.social.linkedin', () => {
    render(<Footer site={mockSite} />);
    const link = document.querySelector(`a[href="${mockSite.social.linkedin}"]`);
    expect(link).not.toBeNull();
  });

  it('AC-5: GitHub link uses site.social.github', () => {
    render(<Footer site={mockSite} />);
    const link = document.querySelector(`a[href="${mockSite.social.github}"]`);
    expect(link).not.toBeNull();
  });

  // ── AC-6: Bottom bar ───────────────────────────────────────────────────────
  it('AC-6: renders copyright text with current year', () => {
    render(<Footer site={mockSite} />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year} HeadlessEngineer`))).toBeInTheDocument();
  });

  it('AC-6: renders "Founded by Karan Popat"', () => {
    render(<Footer site={mockSite} />);
    expect(screen.getByText('Founded by Karan Popat')).toBeInTheDocument();
  });

  // ── AC-2/3/7/8/9: CSS file assertions ─────────────────────────────────────
  it('AC-2: CSS has 2-column breakpoint at max-width 1024px', () => {
    const css = readFileSync(CSS_PATH, 'utf8');
    expect(css).toMatch(/@media[^{]*max-width:\s*1024px/);
    const mediaBlock = css.slice(css.search(/@media[^{]*max-width:\s*1024px/));
    expect(mediaBlock).toMatch(/grid-template-columns:\s*1fr\s+1fr/);
  });

  it('AC-3: CSS has 1-column breakpoint at max-width 480px', () => {
    const css = readFileSync(CSS_PATH, 'utf8');
    expect(css).toMatch(/@media[^{]*max-width:\s*480px/);
    const mediaBlock = css.slice(css.search(/@media[^{]*max-width:\s*480px/));
    expect(mediaBlock).toMatch(/grid-template-columns:\s*1fr\b/);
  });

  it('AC-7: CSS has :focus-visible rule', () => {
    const css = readFileSync(CSS_PATH, 'utf8');
    expect(css).toMatch(/:focus-visible/);
  });

  it('AC-8: CSS has hover transition using --dur-fast and --ease-out', () => {
    const css = readFileSync(CSS_PATH, 'utf8');
    expect(css).toMatch(/var\(--dur-fast\)/);
    expect(css).toMatch(/var\(--ease-out\)/);
  });

  it('AC-9: CSS uses no raw hex colour values', () => {
    const css = readFileSync(CSS_PATH, 'utf8');
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,6}\b/);
  });
});

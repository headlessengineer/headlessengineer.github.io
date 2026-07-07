import { describe, it, expect } from 'vitest';
import { siteConfig } from '../../config/site';

describe('siteConfig - SPEC-001 acceptance criteria', () => {
  it('AC-1: name is "HeadlessEngineer" and tagline is the full rebranded copy', () => {
    expect(siteConfig.name).toBe('HeadlessEngineer');
    expect(siteConfig.tagline).toBe('Engineered for the problem.');
  });

  it('AC-3: navigation has exactly 6 items with correct labels and hrefs in order', () => {
    expect(siteConfig.navigation).toEqual([
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Work', href: '/work' },
      { label: 'Writing', href: '/articles' },
      { label: 'Contact', href: '/contact' },
    ]);
  });

  it('AC-4a: LinkedIn social link matches site.json', () => {
    expect(siteConfig.social.linkedin).toBe('https://linkedin.com/in/popatkaran');
  });

  it('AC-4b: GitHub social link matches site.json', () => {
    expect(siteConfig.social.github).toBe('https://github.com/headlessengineer');
  });
});

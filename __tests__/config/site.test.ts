import { describe, it, expect } from 'vitest';
import { siteConfig } from '../../config/site';

describe('siteConfig - SPEC-001 acceptance criteria', () => {
  it('AC-1: name is "HeadlessEngineer" and tagline is the full rebranded copy', () => {
    expect(siteConfig.name).toBe('HeadlessEngineer');
    expect(siteConfig.tagline).toBe('the head your problem needs.');
  });

  it('AC-3: navigation has exactly 6 items with correct labels, hrefs, and enabled flags in order', () => {
    expect(siteConfig.navigation).toEqual([
      { label: 'Home', href: '/', enabled: true },
      { label: 'About', href: '/about', enabled: true },
      { label: 'Services', href: '/services', enabled: true },
      { label: 'Work', href: '/work', enabled: false },
      { label: 'Writing', href: '/articles', enabled: false },
      { label: 'Contact', href: '/contact', enabled: true },
    ]);
  });

  it('AC-4a: LinkedIn social link matches site.json', () => {
    expect(siteConfig.social.linkedin).toBe('https://linkedin.com/in/headlessengineer');
  });

  it('AC-4b: GitHub social link matches site.json', () => {
    expect(siteConfig.social.github).toBe('https://github.com/headlessengineer');
  });
});

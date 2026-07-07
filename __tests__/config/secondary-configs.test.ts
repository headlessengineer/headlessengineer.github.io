import { describe, it, expect } from 'vitest';
import { articlesConfig } from '../../config/articles';
import { projectsConfig } from '../../config/projects';
import { testimonialsConfig } from '../../config/testimonials';
import { notFoundConfig } from '../../config/notfound';

describe('articlesConfig - SPEC-003 AC-2, AC-4', () => {
  it('AC-2: topics has exactly 4 items with correct values in order', () => {
    expect(articlesConfig.topics).toEqual([
      'Architecture',
      'Spryker & Magento',
      'Go & Microservices',
      'AI Engineering',
    ]);
  });

  it('AC-4: metadata.title is "Writing - HeadlessEngineer"', () => {
    expect(articlesConfig.metadata.title).toBe('Writing - HeadlessEngineer');
  });
});

describe('projectsConfig - SPEC-003 AC-3, AC-5', () => {
  it('AC-3: categories has exactly 3 items with correct values in order', () => {
    expect(projectsConfig.categories).toEqual([
      'Case Study',
      'Open Source',
      'Experiment',
    ]);
  });

  it('AC-5: metadata.title is "Work - HeadlessEngineer"', () => {
    expect(projectsConfig.metadata.title).toBe('Work - HeadlessEngineer');
  });
});

describe('testimonialsConfig - SPEC-003 AC-6', () => {
  it('AC-6: metadata.title is "Testimonials - HeadlessEngineer"', () => {
    expect(testimonialsConfig.metadata.title).toBe('Testimonials - HeadlessEngineer');
  });
});

describe('notFoundConfig - SPEC-003 AC-7 (regression guard)', () => {
  it('AC-7: tagline is "Page not found"', () => {
    expect(notFoundConfig.tagline).toBe('Page not found');
  });
});

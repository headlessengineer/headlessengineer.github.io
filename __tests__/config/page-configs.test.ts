import { describe, it, expect } from 'vitest';
import { homeConfig } from '../../config/home';
import { aboutConfig } from '../../config/about';
import { servicesConfig } from '../../config/services';
import { contactConfig } from '../../config/contact';

describe('homeConfig - SPEC-002 AC-5', () => {
  it('AC-5: metadata.title is the HeadlessEngineer consultancy title', () => {
    expect(homeConfig.metadata.title).toBe(
      'HeadlessEngineer - Technology Consultancy for Hard Business Problems',
    );
  });
});

describe('aboutConfig - SPEC-002 AC-2, AC-6', () => {
  it('AC-2: founder.name is "Karan Popat"', () => {
    expect(aboutConfig.founder.name).toBe('Karan Popat');
  });

  it('AC-6: howWeWork.title is "How We\'re Staffed"', () => {
    expect(aboutConfig.howWeWork.title).toBe("How We're Staffed");
  });
});

describe('servicesConfig - SPEC-002 AC-3, AC-7', () => {
  it('AC-3: offerings has exactly 8 items', () => {
    expect(servicesConfig.offerings).toHaveLength(8);
  });

  it('AC-3: every offering has all required fields', () => {
    const requiredFields = ['id', 'category', 'tag', 'title', 'value', 'description', 'engagement', 'href'] as const;
    for (const offering of servicesConfig.offerings) {
      for (const field of requiredFields) {
        expect(offering[field], `offering "${offering.id}" missing field "${field}"`).toBeTruthy();
      }
    }
  });

  it('AC-7: categories has exactly 4 items with correct ids in order', () => {
    expect(servicesConfig.categories).toHaveLength(4);
    expect(servicesConfig.categories.map((c) => c.id)).toEqual([
      'strategy',
      'build',
      'ai',
      'leadership',
    ]);
  });
});

describe('contactConfig - SPEC-002 AC-4', () => {
  it('AC-4: methods has exactly 4 items', () => {
    expect(contactConfig.methods).toHaveLength(4);
  });
});

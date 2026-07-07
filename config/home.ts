import type { HomeConfig } from '../types/config';

export const homeConfig = {
  sections: {
    hero:         { visible: true },
    services:     { visible: true },
    testimonials: { visible: true },
    cta:          { visible: true },
  },
  metadata: {
    title: 'HeadlessEngineer - Technology Consultancy for Hard Business Problems',
    description:
      'headlessengineer is a technology consultancy that solves business problems with the right technology - software engineering, solution architecture, enterprise architecture, and AI.',
  },
  hero: {
    title: 'headlessengineer',
    taglines: [
      'A technology consultancy for hard business problems',
      'Software Engineering · Solution Architecture · Enterprise Architecture',
      'AI-native, stack-agnostic, outcome-led',
      'Senior engineers and architects, staffed to the problem',
    ],
    description:
      'headlessengineer helps businesses solve real problems with the right technology - not just the technology we happen to know best. We work across software engineering, solution architecture, and enterprise architecture, and bring in specialist engineers as an engagement demands it. From platform modernisation to AI-native automation to the technical leadership that makes an engineering org move faster, we start with the business problem and work backward to the stack.',
    cta: {
      primary: { label: 'Describe Your Problem', href: '/contact' },
      secondary: { label: 'See What We Do', href: '/services' },
    },
  },
} as const satisfies HomeConfig;

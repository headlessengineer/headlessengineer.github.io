import type { SiteConfig } from '../types/config';

export const siteConfig: SiteConfig = {
  name: 'HeadlessEngineer',

  tagline: 'Engineered for the problem.',

  url: 'https://headlessengineer.xyz',

  description:
    'headlessengineer is a technology consultancy that solves business problems with the right technology - software engineering, solution architecture, enterprise architecture, and AI.',

  author: {
    name: 'HeadlessEngineer',
    role: 'Lead Architect',
    email: 'contact@headlessengineer.xyz',
  },

  keywords: [
    'headlessengineer',
    'technology consultancy',
    'solution architecture',
    'enterprise architecture',
    'software engineering',
    'e-commerce architecture',
    'Spryker',
    'Magento',
    'Go microservices',
    'AI workflows',
    'digital transformation',
    'fractional CTO',
    'Berlin',
  ],

  social: {
    github: 'https://github.com/headlessengineer',
    linkedin: 'https://linkedin.com/in/popatkaran',
    twitter: '@headlessengineer',
  },

  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'Writing', href: '/articles' },
    { label: 'Contact', href: '/contact' },
  ],

  scheduleCallUrl: 'https://calendar.app.google/VDfc1ju38MvMMucKA',

  location: 'Berlin, Germany',

  availability: {
    open: true,
    label: 'Taking new clients from Q3 2026',
  },
};

import type { TestimonialsConfig } from '../types/config';

export const testimonialsConfig: TestimonialsConfig = {
  sections: {
    list: { visible: true },
  },
  metadata: {
    title: 'Testimonials - HeadlessEngineer',
    description: "What it's like to work with the studio.",
  },
  hero: {
    title: 'Testimonials',
    description: "Feedback from people we've worked with.",
  },
  backLink: {
    text: 'Back to Testimonials',
  },
  itemsPerPage: 3,
  items: [
    {
      id: 'testimonial-1',
      quote:
        'Karan took ownership of a messy Spryker migration and delivered a clean, documented outcome on time. Rare to find someone who can both architect and ship.',
      author: 'Stefan Meier',
      role: 'VP Engineering',
      company: 'REWE Digital',
    },
    {
      id: 'testimonial-2',
      quote:
        'The AI workflow he built for our content team cut review cycles from three days to four hours. Practical, not flashy - exactly what we needed.',
      author: 'Priya Nair',
      role: 'Head of Product',
      company: 'Limango',
    },
    {
      id: 'testimonial-3',
      quote:
        'headlessengineer helped us design a service mesh that actually matched our traffic patterns. The documentation alone saved us weeks of onboarding.',
      author: 'Marco Bianchi',
      role: 'CTO',
      company: 'Commercetools Partner',
    },
  ],
};

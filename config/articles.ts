import type { ArticlesConfig } from '../types/config';

export const articlesConfig: ArticlesConfig = {
  sections: {
    list:   { visible: true },
    detail: { visible: true },
  },
  metadata: {
    title: 'Writing - headlessengineer',
    description: 'Notes on e-commerce architecture, distributed systems, and production AI engineering.',
  },
  hero: {
    title: 'Writing',
    description: 'Where we think out loud about backend architecture, migrations, and AI workflows that hold up in production.',
  },
  backLink: {
    text: 'Back to Writing',
  },
  topics: ['Architecture', 'Spryker & Magento', 'Go & Microservices', 'AI Engineering'],
  itemsPerPage: 6,
};

import type { ProjectsConfig } from '../types/config';

export const projectsConfig: ProjectsConfig = {
  sections: {
    list:   { visible: true },
    detail: { visible: true },
  },
  metadata: {
    title: 'Work - headlessengineer',
    description: 'Case studies and engineering work from the studio.',
  },
  hero: {
    title: 'Work',
    description: 'Case studies from client engagements, plus open-source and experimental projects.',
  },
  backLink: {
    text: 'Back to Work',
  },
  categories: ['Case Study', 'Open Source', 'Experiment'],
  itemsPerPage: 9,
};

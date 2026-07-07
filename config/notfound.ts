import type { NotFoundConfig } from '../types/config';

export const notFoundConfig: NotFoundConfig = {
  title: '404',
  tagline: 'Page not found',
  description: "The page you're looking for doesn't exist.",
  buttons: [
    { label: 'Go Home', href: '/', variant: 'primary' },
  ],
};

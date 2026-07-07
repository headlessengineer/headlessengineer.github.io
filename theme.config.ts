import type { HeadlessEngineerConfig } from './types/config';
import { siteConfig } from './config/site';
import { layoutConfig } from './config/layout';
import { themeConfig } from './config/theme';
import { homeConfig } from './config/home';
import { aboutConfig } from './config/about';
import { articlesConfig } from './config/articles';
import { projectsConfig } from './config/projects';
import { servicesConfig } from './config/services';
import { contactConfig } from './config/contact';
import { testimonialsConfig } from './config/testimonials';
import { notFoundConfig } from './config/notfound';

const themeFullConfig: HeadlessEngineerConfig = {
  site: siteConfig,
  layout: layoutConfig,
  theme: themeConfig,
  home: homeConfig,
  about: aboutConfig,
  articles: articlesConfig,
  projects: projectsConfig,
  services: servicesConfig,
  contact: contactConfig,
  testimonials: testimonialsConfig,
  notFound: notFoundConfig,
};

export default themeFullConfig;

export type ThemeName = 'light' | 'dark';

export interface SectionConfig {
  visible: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  url: string;
  description: string;
  author: { name: string; role: string; email: string };
  keywords: string[];
  social: { github?: string; linkedin?: string; twitter?: string };
  navigation: { label: string; href: string; enabled: boolean }[];
  scheduleCallUrl: string;
  location: string;
}

export interface MetricItem {
  figure: string;
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LayoutConfig {
  // reserved for future layout tokens
}

export interface ThemeConfig {
  activeLight: ThemeName;
  activeDark: ThemeName;
}

export interface HeroConfig {
  title: string;
  taglines?: string[];
  description?: string;
  subtitle?: string;
  cta?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}

export interface HomeMeta {
  title: string;
  description: string;
}

export interface HomeConfig {
  sections: Record<string, SectionConfig>;
  metadata: HomeMeta;
  hero: HeroConfig;
}

export interface ServiceItem {
  title: string;
  value: string;
  description: string;
  href: string;
  badge?: string;
}

export interface SkillItem {
  title: string;
  value: string;
  description: string;
  href: string;
}

export interface PrincipleItem {
  title: string;
  value: string;
  description: string;
  href: string;
}

export interface CertificationItem {
  title: string;
  value: string;
  description: string;
  href?: string;
}

export interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface HowWeWorkConfig {
  title: string;
  description: string;
  content: string;
}

export interface FounderConfig {
  title: string;
  name: string;
  role: string;
  bio: string;
  href: string;
}

export interface AboutConfig {
  sections: Record<string, SectionConfig>;
  metadata: { description: string };
  hero: { title: string; subtitle: string };
  coreServices: { title: string; description: string; intro?: string; services: ServiceItem[] };
  howWeWork: HowWeWorkConfig;
  expertise: { title: string; description: string; skills: SkillItem[] };
  principles: { title: string; description: string; principles: PrincipleItem[] };
  founder: FounderConfig;
  certifications: { title: string; description: string; certifications: CertificationItem[] };
  metrics: MetricItem[];
  cta: { title: string; description: string; buttons: CTAButton[] };
}

export interface ContactMethod {
  title: string;
  value: string;
  description: string;
  href: string;
}

export interface ContactConfig {
  sections: Record<string, SectionConfig>;
  metadata: { description: string };
  title: string;
  subtitle: string;
  methods: ContactMethod[];
}

export interface ArticlesConfig {
  sections: Record<string, SectionConfig>;
  hero: { title: string; description?: string };
  metadata: { title: string; description: string };
  backLink: { text: string };
  topics: string[];
  itemsPerPage: number;
}

export interface ProjectsConfig {
  sections: Record<string, SectionConfig>;
  hero: { title: string; description?: string };
  metadata: { title: string; description: string };
  backLink: { text: string };
  categories: string[];
  itemsPerPage: number;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface TestimonialsConfig {
  sections: Record<string, SectionConfig>;
  hero: { title: string; description?: string };
  metadata: { title: string; description: string };
  backLink: { text: string };
  itemsPerPage: number;
  items: TestimonialItem[];
}

export interface NotFoundConfig {
  title: string;
  tagline: string;
  description: string;
  buttons: CTAButton[];
}

export interface ServiceCategory {
  id: string;
  label: string;
}

export interface ServiceOffering {
  id: string;
  category: string;
  tag: string;
  title: string;
  value: string;
  description: string;
  engagement: string;
  href: string;
}

export interface ServicesCTA {
  title: string;
  description: string;
  href: string;
}

export interface ServicesConfig {
  sections: Record<string, SectionConfig>;
  metadata: { title: string; description: string };
  hero: { title: string; description: string };
  backLink: { text: string };
  categories: ServiceCategory[];
  offerings: ServiceOffering[];
  cta: ServicesCTA;
}

export interface HeadlessEngineerConfig {
  site: SiteConfig;
  layout: LayoutConfig;
  theme: ThemeConfig;
  home: HomeConfig;
  about: AboutConfig;
  articles: ArticlesConfig;
  projects: ProjectsConfig;
  services: ServicesConfig;
  contact: ContactConfig;
  testimonials: TestimonialsConfig;
  notFound: NotFoundConfig;
}

/** @deprecated Use HeadlessEngineerConfig */
export type TerminalBirdConfig = HeadlessEngineerConfig;

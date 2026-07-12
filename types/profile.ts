export type ProfileType = 'founder' | 'engineer' | 'strategist' | 'delivery';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  displayName: string;
  role: string;
  location: string;
  email: string;
  github: string | null;
  linkedin: string | null;
  website: string | null;
  photo: string | null;
  yearsExperience: number;
}

export interface AboutInfo {
  paragraphs: string[];
  callout: string | null;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Education {
  degree: string | null;
  institution: string | null;
  years: string | null;
  grade: string | null;
}

export interface Language {
  name: string;
  level: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
}

// ── Founder ───────────────────────────────────────────────────────────────────

export interface CapabilityGroup {
  area: string;
  items: string[];
}

export interface WorkItem {
  name: string;
  context: string;
  stack: string;
  outcome: string;
}

export interface FounderProfile {
  id: string;
  profileType: 'founder';
  personal: PersonalInfo;
  about: AboutInfo;
  metrics: Metric[];
  philosophy: string[];
  capabilities: CapabilityGroup[];
  work: WorkItem[];
  experience: ExperienceItem[];
  certifications: Certification[];
  education: Education[];
  languages: Language[];
}

// ── Engineer ──────────────────────────────────────────────────────────────────

export interface StackGroup {
  group: string;
  chips: string[];
}

export interface ProjectItem {
  name: string;
  role: string;
  stack: string;
  description: string;
  outcome: string;
}

export interface EngineerProfile {
  id: string;
  profileType: 'engineer';
  personal: PersonalInfo;
  about: AboutInfo;
  metrics: Metric[];
  stack: StackGroup[];
  practices: string[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  certifications: Certification[];
  education: Education[];
  languages: Language[];
}

// ── Strategist ────────────────────────────────────────────────────────────────

export interface EngagementItem {
  context: string;
  challenge: string;
  outcome: string;
}

export interface StrategistProfile {
  id: string;
  profileType: 'strategist';
  personal: PersonalInfo;
  about: AboutInfo;
  metrics: Metric[];
  expertise: string[];
  sectors: string[];
  engagements: EngagementItem[];
  perspective: string;
  certifications: Certification[];
  education: Education[];
  languages: Language[];
}

// ── Delivery ──────────────────────────────────────────────────────────────────

export interface DeliveryItem {
  name: string;
  scope: string;
  tech: string;
  outcome: string;
}

export interface DeliveryProfile {
  id: string;
  profileType: 'delivery';
  personal: PersonalInfo;
  about: AboutInfo;
  metrics: Metric[];
  domains: string[];
  deliveries: DeliveryItem[];
  experience: ExperienceItem[];
  certifications: Certification[];
  education: Education[];
  languages: Language[];
}

// ── Union ─────────────────────────────────────────────────────────────────────

export type Profile =
  | FounderProfile
  | EngineerProfile
  | StrategistProfile
  | DeliveryProfile;

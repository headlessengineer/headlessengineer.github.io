import type { ContactConfig } from '../types/config';

export const contactConfig = {
  sections: {
    hero:    { visible: true },
    methods: { visible: true },
    form:    { visible: true },
  },
  metadata: {
    description:
      'Get in touch with headlessengineer - open to technology strategy, architecture, engineering, AI, and fractional leadership engagements.',
  },
  title: "HAVE A PROBLEM WORTH SOLVING?",
  subtitle:
    "Whether it's a business problem without a clear technical answer yet, an architecture that needs to hold up, a platform stuck on legacy tech, or a team that needs senior judgment - we're happy to talk it through.",
  methods: [
    {
      title: 'Email',
      value: 'contact@headlessengineer.xyz',
      description: 'Send us a message directly',
      href: 'mailto:contact@headlessengineer.xyz',
    },
    {
      title: 'Schedule a call',
      value: 'Booking page',
      description: 'Find a time that works for both of us',
      href: 'https://calendar.app.google/VDfc1ju38MvMMucKA',
    },
    {
      title: 'LinkedIn',
      value: 'linkedin.com/in/popatkaran',
      description: 'Connect on LinkedIn',
      href: 'https://linkedin.com/in/popatkaran',
    },
    {
      title: 'GitHub',
      value: 'github.com/headlessengineer',
      description: 'Browse our open-source work',
      href: 'https://github.com/headlessengineer',
    },
  ],
} as const satisfies ContactConfig;

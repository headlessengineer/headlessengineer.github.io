import type { ServicesConfig } from '../types/config';

export const servicesConfig = {
  sections: {
    hero:      { visible: true },
    offerings: { visible: true },
    cta:       { visible: true },
  },

  metadata: {
    title: 'Services - headlessengineer',
    description:
      'Technology consulting services: strategy, architecture, engineering, AI, and technical leadership.',
  },

  hero: {
    title: 'Services',
    description:
      'We scope engagements around the business outcome, then staff them with the right discipline - strategist, architect, engineer, or all three.',
  },

  backLink: {
    text: 'Back to Services',
  },

  categories: [
    { id: 'strategy', label: 'Strategy & Architecture' },
    { id: 'build', label: 'Build & Delivery' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'leadership', label: 'Leadership & Team' },
  ],

  offerings: [
    {
      id: 'technology-strategy',
      category: 'strategy',
      tag: 'Strategy',
      title: 'Technology Strategy & Discovery',
      value: 'Technology Audits · Build vs Buy · Roadmapping',
      description:
        "We assess what you have, diagnose what's actually broken, and design a pragmatic technology roadmap - grounded in your budget, timeline, and team, not a vendor's product line.",
      engagement: 'Discovery sprint (2–4 weeks) or ongoing advisory',
      href: '/services/technology-strategy',
    },
    {
      id: 'solution-architecture',
      category: 'strategy',
      tag: 'Architecture',
      title: 'Solution Architecture',
      value: 'System Design · API-First Design · Domain-Driven Design',
      description:
        'End-to-end architecture for a specific platform or product - designed to be built, not just presented. Clear service boundaries, data contracts, and integration patterns.',
      engagement: 'Fixed-scope architecture engagement',
      href: '/services/solution-architecture',
    },
    {
      id: 'enterprise-architecture',
      category: 'strategy',
      tag: 'Architecture',
      title: 'Enterprise Architecture',
      value: 'Technology Alignment · Platform Rationalisation · Governance',
      description:
        "How technology decisions stay coherent across an entire organisation - system landscapes, platform consolidation, and governance that doesn't strangle delivery speed.",
      engagement: 'Advisory retainer or scoped assessment',
      href: '/services/enterprise-architecture',
    },
    {
      id: 'custom-engineering',
      category: 'build',
      tag: 'Build',
      title: 'Custom Software Engineering',
      value: 'Full-Stack Development · API Design · Cloud-Native Systems',
      description:
        "We build production software ourselves - backend, frontend, and everything connecting them - and bring in specialist engineers for depth we don't carry in-house rather than stretch a generalist thin.",
      engagement: 'Embedded delivery team or scoped build',
      href: '/services/custom-engineering',
    },
    {
      id: 'platform-modernisation',
      category: 'build',
      tag: 'Migration',
      title: 'Platform Modernisation & Migration',
      value: 'Monolith-to-Microservices · Legacy Replatforming · Strangler Fig Pattern',
      description:
        "Incremental migration off systems that can't keep up - keeping the business running throughout the transition instead of betting everything on a big-bang rewrite.",
      engagement: 'Phased migration roadmap plus delivery',
      href: '/services/platform-modernisation',
    },
    {
      id: 'ai-workflows',
      category: 'ai',
      tag: 'AI',
      title: 'AI & Automation Consulting',
      value: 'Agentic Workflows · LLM Integration · Process Automation',
      description:
        'Production agentic systems that remove real manual work - documentation, research synthesis, code review, order processing - built to run, not just demo.',
      engagement: 'Proof-of-concept through to production pipeline',
      href: '/services/ai-workflows',
    },
    {
      id: 'fractional-leadership',
      category: 'leadership',
      tag: 'Leadership',
      title: 'Fractional CTO / Technical Advisory',
      value: 'Technical Strategy · Architecture Sign-Off · Investor & Board Support',
      description:
        "Senior technical judgment on demand - architecture decisions, hiring, vendor evaluation, and the kind of oversight a growing team needs before it needs a full-time CTO.",
      engagement: 'Part-time or advisory retainer',
      href: '/services/fractional-leadership',
    },
    {
      id: 'team-augmentation',
      category: 'leadership',
      tag: 'Team',
      title: 'Team Augmentation & Staffing',
      value: 'Specialist Engineers · Code Review Standards · Engineering Mentorship',
      description:
        'We staff engagements with the specific skills they need - frontend, mobile, data, DevOps - drawn from a vetted network, with a senior architect overseeing quality and coherence throughout.',
      engagement: 'Project-based staffing or embedded team extension',
      href: '/services/team-augmentation',
    },
  ],

  cta: {
    title: "Not sure which fits?",
    description:
      "Tell us the problem, not the service you think you need - we'll figure out the right shape of engagement together.",
    href: '/contact',
  },
} as const satisfies ServicesConfig;

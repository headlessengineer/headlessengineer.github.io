import type { AboutConfig } from '../types/config';

export const aboutConfig = {
  sections: {
    hero:         { visible: true },
    coreServices: { visible: true },
    howWeWork:    { visible: true },
    expertise:    { visible: true },
    principles:   { visible: true },
    founder:      { visible: true },
    certifications: { visible: true },
    cta:          { visible: true },
  },

  metadata: {
    description:
      'headlessengineer is a technology consultancy founded by Karan Popat, helping businesses solve problems through software engineering, solution architecture, enterprise architecture, and AI.',
  },

  hero: {
    title: 'Who Is headlessengineer?',
    subtitle:
      'headlessengineer is a technology consultancy built for businesses that have a problem, not necessarily a tech stack in mind. We work across software engineering, solution architecture, and enterprise architecture - scoping every engagement around the business outcome first, then assembling the right technical approach and, where useful, the right specialists to deliver it. The studio is founded by Karan Popat, a Lead Software Engineer and Technology Architect, and is built as a growing network of engineers and architects across disciplines, not a one-person shop pretending otherwise.',
  },

  coreServices: {
    title: 'How We Help',
    description: "Problems we're built to solve",
    intro: 'We scope every engagement around the business outcome first, then assemble the right technical approach.',
    services: [
      {
        badge: 'Strategy',
        title: 'You have a business problem, not a spec',
        value: 'Technology Audits · Build vs Buy · Roadmapping',
        description:
          'We start from the business problem, not a tech wishlist - assessing what\'s broken and designing a roadmap that fits your timeline, budget, and risk appetite.',
        href: '/services',
      },
      {
        badge: 'Architecture',
        title: 'Your architecture needs to survive scale',
        value: 'Solution Architecture · Enterprise Architecture · System Design',
        description:
          'We design systems that hold together as they grow - from a single platform to how technology decisions align across an entire organisation.',
        href: '/services',
      },
      {
        badge: 'Build',
        title: 'You need it built, not just diagrammed',
        value: 'Full-Stack Engineering · API Design · Cloud-Native Systems',
        description:
          'We build production software ourselves, and bring in vetted specialists for depth we don\'t carry in-house rather than stretch a generalist thin.',
        href: '/services',
      },
      {
        badge: 'Migration',
        title: 'Legacy is holding the business back',
        value: 'Platform Modernisation · Strangler Fig Migrations',
        description:
          'We move businesses off systems that can\'t keep up - incrementally, without a risky big-bang rewrite.',
        href: '/services',
      },
      {
        badge: 'AI',
        title: 'AI should do real work, not a demo',
        value: 'Agentic Workflows · LLM Integration · Process Automation',
        description:
          'We design and ship AI systems that remove actual manual work from a business - built to run, not just demo.',
        href: '/services',
      },
    ],
  },

  howWeWork: {
    title: "How We're Staffed",
    description: 'A core of senior technical judgment, a network built to scale',
    content:
      'headlessengineer runs on a core-plus-network model. Founder Karan Popat leads every engagement as senior architect and technical point of contact, and we bring in vetted specialist engineers - frontend, mobile, data, DevOps, whatever a specific problem needs - rather than forcing every engagement through one person\'s skill set. As the studio grows, that network becomes a standing team; today, it\'s assembled per engagement so you\'re never paying for expertise you don\'t need.',
  },

  expertise: {
    title: 'Where We Go Deep',
    description: "Domains we bring genuine judgment to - and the disciplines we staff around them",
    skills: [
      {
        title: 'Enterprise & Solution Architecture',
        value: 'System Design · API-First Design · Domain-Driven Design · Technology Roadmapping',
        description:
          'We design at both the system level and the organisational level - how one platform is built, and how technology decisions across a business stay coherent as it grows.',
        href: '#',
      },
      {
        title: 'Distributed Systems & Cloud-Native Engineering',
        value: 'Go · Kafka · Kubernetes · Event-Driven Architecture · AWS',
        description:
          'Backend systems designed to run at real load - event-driven microservices, container orchestration, and infrastructure-as-code, owned end-to-end.',
        href: '#',
      },
      {
        title: 'Digital Commerce Platforms',
        value: 'Spryker · Magento 2 · Adobe Commerce · SAP Commerce Cloud',
        description:
          'A specialty, not a boundary: deep, certified expertise in enterprise commerce platforms, built over 12+ years across B2B, B2C, and D2C models.',
        href: '#',
      },
      {
        title: 'AI & Agentic Systems',
        value: 'n8n · CrewAI · Claude API · MCP Integration · Prompt Engineering',
        description:
          'Production agentic automation - not notebooks. Multi-agent pipelines, LLM integration, and workflow automation applied to real operational bottlenecks.',
        href: '#',
      },
      {
        title: 'Technical & Delivery Leadership',
        value: 'Fractional CTO · Team Building · Mentorship · Agile Delivery',
        description:
          'Senior judgment applied to how a team works, not just what it ships - team structure, delivery process, code standards, and hands-on mentorship.',
        href: '#',
      },
    ],
  },

  principles: {
    title: 'What It\'s Like to Work With Us',
    description: 'How we approach the work - what you can expect',
    principles: [
      {
        title: "We scope around the problem, not our own stack",
        value: 'Technology-agnostic recommendations · Honest build-vs-buy calls',
        description:
          "We'd rather tell you the right tool isn't one we specialise in than force-fit a solution to what we already know. Where that means bringing in another specialist, we do.",
        href: '#',
      },
      {
        title: 'We take ownership, not just tasks',
        value: 'ADRs · Incident ownership · No finish lines at launch',
        description:
          'We treat the system as our responsibility - writing architecture decision records, tracking problems to root cause, and thinking about what happens six months after go-live.',
        href: '#',
      },
      {
        title: 'We test before we ship',
        value: 'TDD · BDD · Integration Testing · Acceptance Testing',
        description:
          'We write tests before implementation, not as a ritual but because it catches the right problems at the right time - and we establish these practices in the teams we join.',
        href: '#',
      },
      {
        title: 'We use AI to free up engineering judgment, not replace it',
        value: 'Agentic tooling · Prompt engineering · Workflow automation',
        description:
          'AI should handle the repetitive parts so engineers can focus on design, architecture, and the problems that actually require thinking. We build with that constraint in mind.',
        href: '#',
      },
      {
        title: 'We raise the standard, not just the output',
        value: 'Code review · Engineering culture · Compounding standards',
        description:
          'We care about what a team leaves behind - the patterns, the practices, the habits. A codebase should be in better shape after we\'ve worked on it, not just functionally complete.',
        href: '#',
      },
    ],
  },

  founder: {
    title: 'Behind the Studio',
    name: 'Karan Popat',
    role: 'Founder & Lead Architect',
    bio: 'Karan has spent 12+ years building enterprise platforms - from greenfield commerce backends to distributed Go microservices running across 26 countries - and currently leads engineering teams of 9–15 at Accenture Song. He founded headlessengineer to bring that depth directly to businesses, and to build a consultancy that isn\'t bounded by any one person\'s stack: a core of senior architectural judgment, backed by a growing network of specialist engineers brought in as each engagement requires.',
    href: 'https://linkedin.com/in/popatkaran',
  },

  certifications: {
    title: 'Credentials Behind the Work',
    description: "Formal recognition backing the studio's expertise",
    certifications: [
      {
        title: 'Anthropic',
        value: 'Claude Code in Action',
        description: 'Issued March 2026 · Credential ID: i8k65e9m6btx',
        href: 'https://verify.skilljar.com/c/i8k65e9m6btx',
      },
      {
        title: 'Accenture',
        value: 'Reinvention with Agentic AI',
        description: 'Issued March 2026 · AI Agents · Agentic Systems',
        href: 'https://www.credly.com/badges/560b9718-e3f4-4742-8ca6-1e138215aa1e',
      },
      {
        title: 'Adobe',
        value: 'Adobe Certified Professional - Magento Commerce Developer',
        description: 'Issued March 2019',
      },
      {
        title: 'Spryker',
        value: 'Certified Foundations Developer',
        description: 'Issued September 2022',
      },
      {
        title: 'Amazon Web Services',
        value: 'AWS Cloud Quest: Cloud Practitioner',
        description: 'Issued April 2023',
        href: 'https://www.credly.com/badges/9560176f-71c9-4c01-822d-2f676cf90a9d',
      },
    ],
  },

  metrics: [
    { figure: '12+', label: 'Years shipping enterprise systems' },
    { figure: '26',  label: 'Countries in production' },
    { figure: '9–15', label: 'Engineer teams led' },
    { figure: '0',   label: 'Problems declined because of stack' },
  ],

  cta: {
    title: 'Have a Problem Worth Solving?',
    description:
      "Whether it's a strategy question, an architecture that needs to hold up, a platform that needs modernising, or a team that needs senior technical judgment - we're happy to talk through what you're working on.",
    buttons: [
      { label: 'Start the Conversation →', href: '/contact', variant: 'primary' },
      { label: 'Read Our Writing', href: '/articles', variant: 'secondary' },
    ],
  },
} as const satisfies AboutConfig;

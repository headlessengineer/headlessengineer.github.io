// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import type { ProjectsConfig } from '../../types/config';
import type { Project } from '../../lib/schemas/project';

vi.mock('next/link', () => ({
  default: function MockLink({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  },
}));

const MOCK_PROJECTS_CONFIG: ProjectsConfig = {
  sections: { list: { visible: true }, detail: { visible: true } },
  metadata: {
    title: 'Work - HeadlessEngineer',
    description: 'Case studies and engineering work from the studio.',
  },
  hero: {
    title: 'Work',
    description: 'Case studies from client engagements, plus open-source and experimental projects.',
  },
  backLink: { text: 'Back to Work' },
  categories: ['Case Study', 'Open Source', 'Experiment'],
  itemsPerPage: 9,
};

function makeMockProject(i: number): Project {
  return {
    title: `Project ${i}`,
    slug: `project-${i}`,
    description: `Description ${i}`,
    excerpt: `Excerpt ${i}`,
    category: 'Case Study',
    status: 'active',
    license: 'MIT',
    lastCommit: '2024-06-01',
    tags: ['go', 'backend'],
    seo: {
      metaTitle: `Project ${i}`,
      metaDescription: `Desc ${i}`,
      keywords: ['test'],
      canonicalUrl: `https://headlessengineer.xyz/projects/project-${i}`,
      ogImage: '/og.png',
    },
    published: true,
    content: '',
  };
}

const THREE_PROJECTS = [makeMockProject(1), makeMockProject(2), makeMockProject(3)];

let currentProjects: Project[] = THREE_PROJECTS;

vi.mock('../../lib/config-cache', () => ({
  getConfig: () => ({ projects: MOCK_PROJECTS_CONFIG }),
}));

vi.mock('../../lib/projects', () => ({
  getAllProjects: () => currentProjects,
}));

vi.mock('../../components/organisms/ProjectGrid', () => ({
  ProjectGrid: ({ projects }: { projects: Project[] }) => (
    <div data-testid="project-grid">
      {projects.map((p) => (
        <div key={p.slug} data-testid="project-card" />
      ))}
    </div>
  ),
}));

const { default: WorkPage, generateMetadata } = await import('../../app/work/page');

describe('WorkPage - SPEC-022 acceptance criteria', () => {
  beforeEach(() => {
    currentProjects = THREE_PROJECTS;
  });

  // AC-2: PageHero with eyebrow, h1 "Selected Work", description
  it('AC-2: renders eyebrow "Work"', () => {
    render(<WorkPage />);
    expect(screen.getByText('Work', { selector: 'span' })).toBeInTheDocument();
  });

  it('AC-2: renders h1 "Selected Work"', () => {
    render(<WorkPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Selected Work' })).toBeInTheDocument();
  });

  it('AC-2: renders hero description from config', () => {
    render(<WorkPage />);
    expect(screen.getByText(MOCK_PROJECTS_CONFIG.hero.description!)).toBeInTheDocument();
  });

  // AC-4: 3 project cards when 3 projects exist
  it('AC-4: project grid is present when projects exist', () => {
    render(<WorkPage />);
    expect(screen.getByTestId('project-grid')).toBeInTheDocument();
  });

  it('AC-4: renders 3 project cards', () => {
    render(<WorkPage />);
    expect(screen.getAllByTestId('project-card')).toHaveLength(3);
  });

  // AC-8: empty state
  it('AC-8: shows "No projects yet" when projects list is empty', () => {
    currentProjects = [];
    render(<WorkPage />);
    expect(screen.getByText(/No projects yet/i)).toBeInTheDocument();
  });

  it('AC-8: empty state includes a link to /contact', () => {
    currentProjects = [];
    render(<WorkPage />);
    const link = screen.getByRole('link', { name: /contact/i });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('AC-8: project grid is absent when projects list is empty', () => {
    currentProjects = [];
    render(<WorkPage />);
    expect(screen.queryByTestId('project-grid')).not.toBeInTheDocument();
  });

  // AC-9: metadata from config
  it('AC-9: generateMetadata returns projectsConfig.metadata.title', () => {
    const meta = generateMetadata();
    expect(meta.title).toBe('Work - HeadlessEngineer');
  });

  it('AC-9: generateMetadata returns projectsConfig.metadata.description', () => {
    const meta = generateMetadata();
    expect(meta.description).toBe(MOCK_PROJECTS_CONFIG.metadata.description);
  });
});

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ProjectSchema, type Project } from './schemas/project';

const CONTENT_DIR = path.join(process.cwd(), 'content/projects');

function parseProject(filePath: string): Project | null {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const result = ProjectSchema.safeParse(data);
  if (!result.success) return null;
  if (!result.data.published) return null;
  return { ...result.data, content };
}

// Effective only within a single build process (output: 'export'). If moved to a
// long-running server, remove this cache or add explicit invalidation.
let _cache: Project[] | null = null;

export function getAllProjects(): Project[] {
  if (_cache) return _cache;
  _cache = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parseProject(path.join(CONTENT_DIR, f)))
    .filter((p): p is Project => p !== null)
    .sort((a, b) => b.lastCommit.localeCompare(a.lastCommit));
  return _cache;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  return getAllProjects().filter((p) => p.category === category);
}

export function getProjectsByTag(tag: string): Project[] {
  return getAllProjects().filter((p) => p.tags.includes(tag));
}

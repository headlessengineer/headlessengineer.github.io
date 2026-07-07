import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ArticleSchema, type Article } from './schemas/article';

const CONTENT_DIR = path.join(process.cwd(), 'content/articles');

function parseArticle(filePath: string): Article | null {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const result = ArticleSchema.safeParse(data);
  if (!result.success) return null;
  if (!result.data.published) return null;
  return { ...result.data, content };
}

function walkDir(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walkDir(full) : full.endsWith('.md') ? [full] : [];
  });
}

// Effective only within a single build process (output: 'export'). If moved to a
// long-running server, remove this cache or add explicit invalidation.
let _cache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (_cache) return _cache;
  _cache = walkDir(CONTENT_DIR)
    .map(parseArticle)
    .filter((a): a is Article => a !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return _cache;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((a) => a.tags.includes(tag));
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogCategory } from '@/lib/blog';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function getCategoryDir(category: BlogCategory) {
  return path.join(CONTENT_DIR, category);
}

function getAllMarkdownFilesRecursive(dirPath: string): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFilesRecursive(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

export function findPostFilePath(category: BlogCategory, slug: string): string | null {
  const categoryDir = getCategoryDir(category);
  if (!fs.existsSync(categoryDir)) return null;

  const files = getAllMarkdownFilesRecursive(categoryDir);

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);
    const fileSlug = (data.slug as string) || path.basename(filePath, '.md');

    if (fileSlug === slug) {
      return filePath;
    }
  }

  return null;
}

export function readPostForEditing(category: BlogCategory, slug: string) {
  const filePath = findPostFilePath(category, slug);
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    filePath,
    data,
    content,
  };
}

export function updatePostPublishedStatus(
  category: BlogCategory,
  slug: string,
  published: boolean
) {
  const filePath = findPostFilePath(category, slug);
  if (!filePath) return false;

  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);

  parsed.data.published = published;

  fs.writeFileSync(filePath, matter.stringify(parsed.content, parsed.data), 'utf8');
  return true;
}

export function savePostEdits(
  category: BlogCategory,
  slug: string,
  updates: {
    title: string;
    excerpt?: string;
    published: boolean;
    content: string;
    heroImage?: string;
    heroImageAlt?: string;
  }
) {
  const filePath = findPostFilePath(category, slug);
  if (!filePath) return false;

  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);

  parsed.data.title = updates.title;
  parsed.data.excerpt = updates.excerpt || '';
  parsed.data.published = updates.published;
  parsed.data.heroImage = updates.heroImage || '';
  parsed.data.heroImageAlt = updates.heroImageAlt || updates.title;

  fs.writeFileSync(filePath, matter.stringify(updates.content, parsed.data), 'utf8');
  return true;
}
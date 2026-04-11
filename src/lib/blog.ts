import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type BlogCategory = 'start-smart' | 'build-and-scale';

export type BlogPostMeta = {
  title: string;
  slug: string;
  category: BlogCategory;
  cluster?: string;
  excerpt?: string;
  date?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content');
export const CATEGORIES: BlogCategory[] = ['start-smart', 'build-and-scale'];

function getCategoryDir(category: BlogCategory) {
  return path.join(CONTENT_DIR, category);
}

function ensureDirExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Missing content directory: ${dirPath}`);
  }
}

function getAllMarkdownFilesRecursive(dirPath: string): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFilesRecursive(fullPath));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

function formatTitleFromSlug(slug: string) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getClusterFromPath(categoryDir: string, filePath: string): string | undefined {
  const relativePath = path.relative(categoryDir, filePath);
  const parts = relativePath.split(path.sep);
  return parts.length > 1 ? parts[0] : undefined;
}

function safeParseMatter(raw: string, filePath: string) {
  try {
    return matter(raw);
  } catch (error) {
    console.error(`Frontmatter parse error in: ${filePath}`);
    console.error(error);
    return null;
  }
}

export function getPostsByCategory(category: BlogCategory): BlogPostMeta[] {
  const categoryDir = getCategoryDir(category);
  ensureDirExists(categoryDir);

  const files = getAllMarkdownFilesRecursive(categoryDir);

  const posts = files
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = safeParseMatter(raw, filePath);

      if (!parsed) return null;

      const { data, content } = parsed;
      const slugFromFile = path.basename(filePath).replace(/\.mdx?$/, '');
      const slug = (data.slug as string) || slugFromFile;
      const title = (data.title as string) || formatTitleFromSlug(slugFromFile);
      const excerpt =
        (data.excerpt as string) ||
        content.trim().replace(/\s+/g, ' ').slice(0, 180);

      return {
        title,
        slug,
        category,
        cluster: getClusterFromPath(categoryDir, filePath),
        excerpt,
        date: (data.date as string) || '',
      };
    })
    .filter((post): post is BlogPostMeta => post !== null);

  return posts.sort((a, b) => {
    if (!a.date && !b.date) return a.title.localeCompare(b.title);
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getAllPosts(): BlogPostMeta[] {
  return CATEGORIES.flatMap((category) => getPostsByCategory(category));
}

export function getPostByCategoryAndSlug(
  category: BlogCategory,
  slug: string
): BlogPost | null {
  const categoryDir = getCategoryDir(category);
  if (!fs.existsSync(categoryDir)) return null;

  const files = getAllMarkdownFilesRecursive(categoryDir);

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = safeParseMatter(raw, filePath);

    if (!parsed) continue;

    const { data, content } = parsed;
    const slugFromFile = path.basename(filePath).replace(/\.mdx?$/, '');
    const resolvedSlug = (data.slug as string) || slugFromFile;

    if (resolvedSlug === slug) {
      return {
        title: (data.title as string) || formatTitleFromSlug(slugFromFile),
        slug: resolvedSlug,
        category,
        cluster: getClusterFromPath(categoryDir, filePath),
        excerpt: (data.excerpt as string) || '',
        date: (data.date as string) || '',
        content,
      };
    }
  }

  return null;
}

export function getAllCategorySlugPairs(): Array<{
  category: BlogCategory;
  slug: string;
}> {
  return CATEGORIES.flatMap((category) =>
    getPostsByCategory(category).map((post) => ({
      category,
      slug: post.slug,
    }))
  );
}
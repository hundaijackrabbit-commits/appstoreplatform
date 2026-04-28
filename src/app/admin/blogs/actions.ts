'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { savePostEdits, updatePostPublishedStatus } from '@/lib/blog-admin';
import type { BlogCategory } from '@/lib/blog';

const MAX_HERO_IMAGE_SIZE = 4 * 1024 * 1024;
const ALLOWED_HERO_IMAGE_TYPES = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/avif', 'avif'],
]);

function safeFileName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

async function saveHeroImageUpload(category: BlogCategory, slug: string, file: File | null) {
  if (!file || file.size === 0) return null;

  const extension = ALLOWED_HERO_IMAGE_TYPES.get(file.type);
  if (!extension) {
    throw new Error('Hero image must be a JPG, PNG, WebP, or AVIF file.');
  }

  if (file.size > MAX_HERO_IMAGE_SIZE) {
    throw new Error('Hero image must be smaller than 4 MB.');
  }

  const uploadDir = path.join(process.cwd(), 'public', 'blog-hero-images', category);
  fs.mkdirSync(uploadDir, { recursive: true });

  const cleanSlug = safeFileName(slug) || 'blog-post';
  const fileName = `${cleanSlug}-hero.${extension}`;
  const fullPath = path.join(uploadDir, fileName);
  const arrayBuffer = await file.arrayBuffer();

  fs.writeFileSync(fullPath, Buffer.from(arrayBuffer));

  return `/blog-hero-images/${category}/${fileName}`;
}

export async function publishPost(formData: FormData) {
  const category = formData.get('category') as BlogCategory;
  const slug = formData.get('slug') as string;

  updatePostPublishedStatus(category, slug, true);

  revalidatePath('/blog');
  revalidatePath(`/blog/${category}`);
  revalidatePath('/admin/blogs');
}

export async function unpublishPost(formData: FormData) {
  const category = formData.get('category') as BlogCategory;
  const slug = formData.get('slug') as string;

  updatePostPublishedStatus(category, slug, false);

  revalidatePath('/blog');
  revalidatePath(`/blog/${category}`);
  revalidatePath('/admin/blogs');
}

export async function savePost(formData: FormData) {
  const category = formData.get('category') as BlogCategory;
  const slug = formData.get('slug') as string;
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'true';
  const currentHeroImage = (formData.get('currentHeroImage') as string) || '';
  const heroImageAlt = (formData.get('heroImageAlt') as string) || title;
  const removeHeroImage = formData.get('removeHeroImage') === 'true';
  const uploadedHeroImage = formData.get('heroImage');
  const heroImageUpload = uploadedHeroImage instanceof File ? uploadedHeroImage : null;
  const savedHeroImage = await saveHeroImageUpload(category, slug, heroImageUpload);
  const heroImage = removeHeroImage ? '' : savedHeroImage || currentHeroImage;

  savePostEdits(category, slug, {
    title,
    excerpt,
    published,
    content,
    heroImage,
    heroImageAlt,
  });

  revalidatePath('/blog');
  revalidatePath(`/blog/${category}`);
  revalidatePath(`/blog/${category}/${slug}`);
  revalidatePath('/admin/blogs');

  redirect('/admin/blogs');
}

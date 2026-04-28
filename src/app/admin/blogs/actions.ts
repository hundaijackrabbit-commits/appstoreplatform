'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { savePostEdits, updatePostPublishedStatus } from '@/lib/blog-admin';
import type { BlogCategory } from '@/lib/blog';

const MAX_HERO_IMAGE_SIZE = 12 * 1024 * 1024;
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

function editPath(category: BlogCategory, slug: string, message?: string, type: 'error' | 'success' = 'error') {
  const params = new URLSearchParams();

  if (message) {
    params.set(type, message);
  }

  const query = params.toString();
  return `/admin/blogs/${category}/${slug}${query ? `?${query}` : ''}`;
}

async function saveHeroImageUpload(category: BlogCategory, slug: string, file: File | null) {
  if (!file || file.size === 0) return null;

  const extension = ALLOWED_HERO_IMAGE_TYPES.get(file.type);
  if (!extension) {
    return {
      error: 'Hero image must be a JPG, PNG, WebP, or AVIF file.',
      path: null,
    };
  }

  if (file.size > MAX_HERO_IMAGE_SIZE) {
    return {
      error: 'Hero image must be smaller than 12 MB. Please compress it or choose a smaller image.',
      path: null,
    };
  }

  try {
    const uploadDir = path.join(process.cwd(), 'public', 'blog-hero-images', category);
    fs.mkdirSync(uploadDir, { recursive: true });

    const cleanSlug = safeFileName(slug) || 'blog-post';
    const fileName = `${cleanSlug}-hero-${Date.now()}.${extension}`;
    const fullPath = path.join(uploadDir, fileName);
    const arrayBuffer = await file.arrayBuffer();

    fs.writeFileSync(fullPath, Buffer.from(arrayBuffer));

    return {
      error: null,
      path: `/blog-hero-images/${category}/${fileName}`,
    };
  } catch (error) {
    console.error('Failed to save hero image upload:', error);
    return {
      error: 'The image upload failed on the server. Please try a smaller image or restart the dev server.',
      path: null,
    };
  }
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
  const title = (formData.get('title') as string) || '';
  const excerpt = (formData.get('excerpt') as string) || '';
  const content = (formData.get('content') as string) || '';
  const published = formData.get('published') === 'true';
  const currentHeroImage = (formData.get('currentHeroImage') as string) || '';
  const heroImageAlt = (formData.get('heroImageAlt') as string) || title;
  const removeHeroImage = formData.get('removeHeroImage') === 'true';
  const uploadedHeroImage = formData.get('heroImage');
  const heroImageUpload = uploadedHeroImage instanceof File ? uploadedHeroImage : null;

  if (!category || !slug) {
    redirect('/admin/blogs?error=Missing%20blog%20post%20category%20or%20slug.');
  }

  const uploadResult = await saveHeroImageUpload(category, slug, heroImageUpload);

  if (uploadResult?.error) {
    redirect(editPath(category, slug, uploadResult.error));
  }

  const heroImage = removeHeroImage ? '' : uploadResult?.path || currentHeroImage;

  const saved = savePostEdits(category, slug, {
    title,
    excerpt,
    published,
    content,
    heroImage,
    heroImageAlt,
  });

  if (!saved) {
    redirect(editPath(category, slug, 'Could not find the markdown file for this blog post.'));
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${category}`);
  revalidatePath(`/blog/${category}/${slug}`);
  revalidatePath('/admin/blogs');

  redirect('/admin/blogs?success=Blog%20post%20saved.');
}

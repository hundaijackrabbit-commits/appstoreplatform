'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { Buffer } from 'buffer';
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
  return String(value || '')
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

function isUploadFile(value: FormDataEntryValue | null): value is File {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'size' in value &&
      'type' in value &&
      'arrayBuffer' in value &&
      typeof (value as File).arrayBuffer === 'function'
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

async function saveHeroImageUpload(category: BlogCategory, slug: string, file: File | null) {
  if (!file || file.size === 0) return null;

  const extension = ALLOWED_HERO_IMAGE_TYPES.get(file.type);
  if (!extension) {
    return {
      error: `Hero image must be a JPG, PNG, WebP, or AVIF file. Your file type was: ${file.type || 'unknown'}.`,
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
    const safeCategory = safeFileName(category) || 'general';
    const cleanSlug = safeFileName(slug) || 'blog-post';
    const uploadDir = path.join(process.cwd(), 'public', 'blog-hero-images', safeCategory);

    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${cleanSlug}-hero-${Date.now()}.${extension}`;
    const fullPath = path.join(uploadDir, fileName);
    const arrayBuffer = await file.arrayBuffer();

    if (!arrayBuffer.byteLength) {
      return {
        error: 'The selected image appears to be empty. Please choose a different image.',
        path: null,
      };
    }

    await fs.writeFile(fullPath, Buffer.from(arrayBuffer));
    await fs.access(fullPath);

    return {
      error: null,
      path: `/blog-hero-images/${safeCategory}/${fileName}`,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Failed to save hero image upload:', error);

    return {
      error: `The image upload failed while writing the file. Details: ${message}`,
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
  const heroImageUpload = isUploadFile(uploadedHeroImage) ? uploadedHeroImage : null;

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

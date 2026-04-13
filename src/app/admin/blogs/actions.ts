'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { savePostEdits, updatePostPublishedStatus } from '@/lib/blog-admin';
import type { BlogCategory } from '@/lib/blog';

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

  savePostEdits(category, slug, {
    title,
    excerpt,
    published,
    content,
  });

  revalidatePath('/blog');
  revalidatePath(`/blog/${category}`);
  revalidatePath(`/blog/${category}/${slug}`);
  revalidatePath('/admin/blogs');

  redirect('/admin/blogs');
}
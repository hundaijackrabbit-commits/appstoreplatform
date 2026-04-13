import { notFound } from 'next/navigation';
import { readPostForEditing } from '@/lib/blog-admin';
import { savePost } from '../../actions';
import type { BlogCategory } from '@/lib/blog';

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function AdminEditBlogPage({ params }: PageProps) {
  const { category, slug } = await params;
  const post = readPostForEditing(category as BlogCategory, slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[--color-background] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Edit Blog Post</h1>

        <form action={savePost} className="space-y-6">
          <input type="hidden" name="category" value={category} />
          <input type="hidden" name="slug" value={slug} />

          <div>
            <label className="block text-sm text-gray-300 mb-2">Title</label>
            <input
              name="title"
              defaultValue={post.data.title || ''}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              defaultValue={post.data.excerpt || ''}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Published</label>
            <select
              name="published"
              defaultValue={post.data.published ? 'true' : 'false'}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Content</label>
            <textarea
              name="content"
              defaultValue={post.content}
              rows={24}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-3 text-sm text-green-300 hover:bg-green-500/20 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}
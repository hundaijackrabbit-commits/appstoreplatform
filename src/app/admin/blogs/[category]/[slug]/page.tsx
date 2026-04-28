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

  const heroImage = (post.data.heroImage as string) || '';
  const heroImageAlt = (post.data.heroImageAlt as string) || post.data.title || '';

  return (
    <main className="min-h-screen bg-[--color-background] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Edit Blog Post</h1>
        <p className="mb-8 text-gray-400">
          Upload a 16:9 hero image for best results. Recommended size: 1600 × 900 px. JPG, PNG, WebP, or AVIF under 4 MB.
        </p>

        <form action={savePost} className="space-y-6">
          <input type="hidden" name="category" value={category} />
          <input type="hidden" name="slug" value={slug} />
          <input type="hidden" name="currentHeroImage" value={heroImage} />

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

          <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white">Hero Image</h2>
              <p className="mt-1 text-sm text-gray-400">
                The public blog page displays this in a fixed 16:9 frame with object-cover sizing, so oversized uploads stay clean and consistent.
              </p>
            </div>

            {heroImage ? (
              <div className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <img
                  src={heroImage}
                  alt={heroImageAlt}
                  className="aspect-video w-full object-cover"
                />
                <p className="break-all px-4 py-3 text-xs text-gray-400">Current image: {heroImage}</p>
              </div>
            ) : (
              <div className="mb-5 flex aspect-video items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 text-sm text-gray-500">
                No hero image set yet.
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Upload New Hero Image</label>
                <input
                  type="file"
                  name="heroImage"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white hover:file:bg-white/20"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Hero Image Alt Text</label>
                <input
                  name="heroImageAlt"
                  defaultValue={heroImageAlt}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
                />
              </div>
            </div>

            {heroImage ? (
              <label className="mt-4 flex items-center gap-3 text-sm text-gray-300">
                <input type="checkbox" name="removeHeroImage" value="true" className="h-4 w-4" />
                Remove current hero image from this post
              </label>
            ) : null}
          </section>

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

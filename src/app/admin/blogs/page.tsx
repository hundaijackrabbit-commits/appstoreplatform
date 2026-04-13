import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { publishPost, unpublishPost } from './actions';

export const revalidate = 3600;

function statusStyles(status: string) {
  switch (status) {
    case 'published':
      return 'bg-green-500/15 text-green-300 border-green-500/30';
    case 'ready':
      return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    case 'needs-work':
      return 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30';
    default:
      return 'bg-white/10 text-gray-300 border-white/15';
  }
}

export default function AdminBlogsPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[--color-background] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.16em] text-[--color-primary] mb-3">
            Admin
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Blog Manager
          </h1>
          <p className="max-w-3xl text-lg text-gray-400 leading-relaxed">
            Posts need at least 900 words and published status to appear on the public blog.
          </p>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={`${post.category}-${post.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold text-white">{post.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {post.category} / {post.cluster || 'general'} / {post.slug}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-300">
                    <span>{post.wordCount} words</span>
                    <span>{post.published ? 'Published: Yes' : 'Published: No'}</span>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusStyles(
                        post.status
                      )}`}
                    >
                      {post.status}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/admin/blogs/${post.category}/${post.slug}`}
                    className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
                  >
                    Edit
                  </Link>

                  {post.published ? (
                    <form action={unpublishPost}>
                      <input type="hidden" name="category" value={post.category} />
                      <input type="hidden" name="slug" value={post.slug} />
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300 hover:bg-yellow-500/20 transition"
                      >
                        Unpublish
                      </button>
                    </form>
                  ) : (
                    <form action={publishPost}>
                      <input type="hidden" name="category" value={post.category} />
                      <input type="hidden" name="slug" value={post.slug} />
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300 hover:bg-green-500/20 transition"
                      >
                        Publish
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
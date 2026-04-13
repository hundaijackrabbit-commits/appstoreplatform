import { getAllPosts } from '@/lib/blog';

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

  const published = posts.filter((post) => post.status === 'published');
  const ready = posts.filter((post) => post.status === 'ready');
  const needsWork = posts.filter((post) => post.status === 'needs-work');
  const draft = posts.filter((post) => post.status === 'draft');

  const sections = [
    { title: 'Published', items: published },
    { title: 'Ready to Publish', items: ready },
    { title: 'Needs Work', items: needsWork },
    { title: 'Drafts', items: draft },
  ];

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
            Public posts must be marked as published and have at least 900 words.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="blog-card">
            <p className="text-sm text-gray-400">Total Articles</p>
            <p className="text-3xl font-bold mt-2">{posts.length}</p>
          </div>
          <div className="blog-card">
            <p className="text-sm text-gray-400">Published</p>
            <p className="text-3xl font-bold mt-2">{published.length}</p>
          </div>
          <div className="blog-card">
            <p className="text-sm text-gray-400">Ready</p>
            <p className="text-3xl font-bold mt-2">{ready.length}</p>
          </div>
          <div className="blog-card">
            <p className="text-sm text-gray-400">Needs Work / Draft</p>
            <p className="text-3xl font-bold mt-2">{needsWork.length + draft.length}</p>
          </div>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>

              {section.items.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-gray-400">
                  Nothing in this section.
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <div className="grid grid-cols-12 gap-4 px-5 py-3 text-xs uppercase tracking-[0.14em] text-gray-400 border-b border-white/10">
                    <div className="col-span-4">Title</div>
                    <div className="col-span-2">Category</div>
                    <div className="col-span-2">Cluster</div>
                    <div className="col-span-1">Words</div>
                    <div className="col-span-1">Published</div>
                    <div className="col-span-2">Status</div>
                  </div>

                  {section.items.map((post) => (
                    <div
                      key={`${post.category}-${post.slug}`}
                      className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/5 last:border-b-0 text-sm"
                    >
                      <div className="col-span-4">
                        <p className="font-medium text-white">{post.title}</p>
                        <p className="text-gray-400 mt-1">{post.slug}</p>
                      </div>

                      <div className="col-span-2 text-gray-300">
                        {post.category === 'start-smart' ? 'Start Smart' : 'Build & Scale'}
                      </div>

                      <div className="col-span-2 text-gray-400">
                        {post.cluster ? post.cluster.replace(/-/g, ' ') : '—'}
                      </div>

                      <div className="col-span-1 text-gray-300">
                        {post.wordCount}
                      </div>

                      <div className="col-span-1 text-gray-300">
                        {post.published ? 'Yes' : 'No'}
                      </div>

                      <div className="col-span-2">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusStyles(
                            post.status
                          )}`}
                        >
                          {post.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
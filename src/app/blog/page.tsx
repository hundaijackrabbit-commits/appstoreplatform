import Link from 'next/link';
import { ArrowRight, BookOpen, Briefcase, ChevronLeft, Link2, Rocket } from 'lucide-react';
import { getFeaturedPublishedPosts, getPublishedPostsByCategory } from '@/lib/blog';
export const metadata = {
  title: 'StartOva Blog',
  description: 'Read StartOva guides on website ownership, online business, local growth, and building online without platform lock-in.',
  alternates: {
    canonical: 'https://startova.space/blog',
  },
};
export const revalidate = 3600;

export default function BlogHubPage() {
  const startSmartPosts = getPublishedPostsByCategory('start-smart');
  const buildAndScalePosts = getPublishedPostsByCategory('build-and-scale');
  const featuredPosts = getFeaturedPublishedPosts(6);

  const startSmartCount = startSmartPosts.length;
  const buildAndScaleCount = buildAndScalePosts.length;

  return (
    <main className="min-h-screen bg-[--color-background] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Back Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[--color-primary] mb-6">
            <BookOpen className="w-4 h-4" />
            StartOva Blog Hub
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Choose Your Reading Path
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-gray-400 leading-relaxed">
            One section helps beginners start online. The other helps small businesses
            grow with a stronger digital presence.
          </p>
        </div>


        <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <Link2 className="h-5 w-5 text-[--color-primary]" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-[--color-muted]">Internal Linking Map</p>
              <h2 className="text-xl font-semibold text-white">Start with a topic path</h2>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <Link href="/blog/start-smart" className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-gray-300 hover:bg-white/10 transition">
              Learn how website ownership works
            </Link>
            <Link href="/blog/build-and-scale" className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-gray-300 hover:bg-white/10 transition">
              Build a stronger business presence
            </Link>
            <Link href="/#featured-products" className="rounded-2xl border border-green-400/20 bg-green-400/10 p-4 text-sm text-green-200 hover:bg-green-400/15 transition">
              Browse owned website builds
            </Link>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/blog/start-smart" className="block">
            <article className="blog-card h-full">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <BookOpen className="w-6 h-6 text-[--color-primary]" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-[--color-muted]">
                    Beginner Track
                  </p>
                  <h2 className="text-2xl font-semibold text-white">Start Smart</h2>
                </div>
              </div>

              <p className="text-gray-400 leading-7 mb-6">
                Clear, simple content for people who want to start a business online,
                understand websites, and avoid beginner mistakes.
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{startSmartCount} articles</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[--color-primary]">
                  Open Start Smart
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          </Link>

          <Link href="/blog/build-and-scale" className="block">
            <article className="blog-card h-full">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <Briefcase className="w-6 h-6 text-[--color-primary]" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-[--color-muted]">
                    Business Track
                  </p>
                  <h2 className="text-2xl font-semibold text-white">Build & Scale</h2>
                </div>
              </div>

              <p className="text-gray-400 leading-7 mb-6">
                Practical content for plumbers, electricians, contractors, and local
                businesses that want more visibility, trust, and leads online.
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{buildAndScaleCount} articles</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[--color-primary]">
                  Open Build & Scale
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <section className="mt-12">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-[--color-muted] mb-2">
                  Featured Guides
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  Start with these internal paths
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-[--color-primary]"
              >
                View all guides
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {featuredPosts.map((post) => (
                <Link
                  key={`${post.category}-${post.slug}`}
                  href={`/blog/${post.category}/${post.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-[--color-muted] mb-2">
                    {post.category === 'start-smart' ? 'Start Smart' : 'Build & Scale'}
                    {post.cluster ? ` / ${post.cluster.replace(/-/g, ' ')}` : ''}
                  </p>
                  <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-6">
                    {post.excerpt || 'Read this StartOva guide.'}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}


        <section className="mt-12 rounded-3xl border border-green-400/20 bg-green-400/10 p-6 text-center">
          <Rocket className="mx-auto mb-3 h-6 w-6 text-green-300" />
          <h2 className="text-2xl font-semibold text-white mb-3">Ready to turn the learning into a launch?</h2>
          <p className="mx-auto mb-5 max-w-2xl text-gray-300">
            The blog explains the problems. StartOva builds the owned website, codebase, and live deployment so you can move forward.
          </p>
          <Link href="/#featured-products" className="inline-flex items-center gap-2 rounded-xl bg-green-400 px-5 py-3 font-semibold text-black hover:bg-green-300 transition">
            See website builds
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Home, BookOpen, Link2 } from 'lucide-react';
import {
  CATEGORIES,
  type BlogCategory,
  getPublishedPostsByCategory,
} from '@/lib/blog';

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ category: string }>;
};
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;

  if (!isValidCategory(category)) {
    return {
      title: 'Blog Section Not Found',
      alternates: {
        canonical: 'https://startova.space/blog',
      },
    };
  }

  const title = getCategoryTitle(category);
  const description = getCategoryDescription(category);

  return {
    title,
    description,
    alternates: {
      canonical: `https://startova.space/blog/${category}`,
    },
  };
}
export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

function isValidCategory(value: string): value is BlogCategory {
  return CATEGORIES.includes(value as BlogCategory);
}

function getCategoryTitle(category: BlogCategory) {
  return category === 'start-smart' ? 'Start Smart' : 'Build & Scale';
}

function getOppositeCategory(category: BlogCategory): BlogCategory {
  return category === 'start-smart' ? 'build-and-scale' : 'start-smart';
}

function getCategoryDescription(category: BlogCategory) {
  return category === 'start-smart'
    ? 'Beginner-friendly guides for starting online with clarity.'
    : 'Practical growth content for small business owners and service businesses.';
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { category } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const posts = getPublishedPostsByCategory(category);
  const oppositeCategory = getOppositeCategory(category);

  return (
    <main className="min-h-screen bg-[--color-background] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Blog Hub
          </Link>
        </div>

        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.16em] text-[--color-primary] mb-3">
            {category === 'start-smart' ? 'Beginner Track' : 'Business Track'}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {getCategoryTitle(category)}
          </h1>

          <p className="max-w-3xl text-lg text-gray-400 leading-relaxed">
            {getCategoryDescription(category)}
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-gray-300">
            <p className="font-medium text-white mb-2">Internal reading path</p>
            <p className="leading-6">
              Start with any guide below, then use the related-article cards inside each post to move through connected topics.
            </p>
          </div>
        ) : null}


        {posts.length > 0 ? (
          <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
              <Link2 className="h-4 w-4 text-[--color-primary]" />
              Topic paths in this section
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(posts.map((post) => post.cluster).filter(Boolean))).slice(0, 8).map((cluster) => (
                <span
                  key={cluster}
                  className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs uppercase tracking-[0.12em] text-[--color-muted]"
                >
                  {cluster?.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-gray-300">
            No published articles found in this section yet.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={`${post.category}-${post.slug}`}
                  href={`/blog/${category}/${post.slug}`}
                  className="block"
                >
                  <article className="blog-card h-full overflow-hidden p-0">
                    {post.heroImage ? (
                      <img
                        src={post.heroImage}
                        alt={post.heroImageAlt || post.title}
                        className="aspect-video w-full object-cover"
                      />
                    ) : null}
                    <div className="p-5">
                    {post.cluster ? (
                      <p className="text-xs uppercase tracking-[0.15em] text-[--color-muted] mb-3">
                        {post.cluster.replace(/-/g, ' ')}
                      </p>
                    ) : null}

                    <h2 className="text-xl font-semibold text-white mb-3 leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-sm text-gray-400 leading-6 mb-5">
                      {post.excerpt || 'Read the full article.'}
                    </p>

                    <div className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[--color-primary]">
                      Read article
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
              >
                <BookOpen className="w-4 h-4" />
                Back to Blog Hub
              </Link>

              <Link
                href={`/blog/${oppositeCategory}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
              >
                <ArrowRight className="w-4 h-4" />
                {oppositeCategory === 'start-smart' ? 'Start Smart' : 'Build & Scale'}
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
              >
                <Home className="w-4 h-4" />
                Back Home
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  CATEGORIES,
  type BlogCategory,
  getPostsByCategory,
} from '@/lib/blog';

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

function isValidCategory(value: string): value is BlogCategory {
  return CATEGORIES.includes(value as BlogCategory);
}

function getCategoryTitle(category: BlogCategory) {
  return category === 'start-smart' ? 'Start Smart' : 'Build & Scale';
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

  const posts = getPostsByCategory(category);

  return (
    <main className="min-h-screen bg-[--color-background] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[--color-primary] hover:opacity-80 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog hub
        </Link>

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

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-gray-300">
            No articles found in this section yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={`${post.category}-${post.slug}`}
                href={`/blog/${category}/${post.slug}`}
                className="block"
              >
                <article className="blog-card h-full">
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
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

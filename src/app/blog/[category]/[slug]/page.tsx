import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  CATEGORIES,
  type BlogCategory,
  getAllCategorySlugPairs,
  getPostByCategoryAndSlug,
} from '@/lib/blog';

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

function isValidCategory(value: string): value is BlogCategory {
  return CATEGORIES.includes(value as BlogCategory);
}

export async function generateStaticParams() {
  return getAllCategorySlugPairs();
}

export default async function BlogPostPage({ params }: PageProps) {
  const { category, slug } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const post = getPostByCategoryAndSlug(category, slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[--color-background] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/blog/${category}`}
          className="inline-flex items-center gap-2 text-sm text-[--color-primary] hover:opacity-80 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {category === 'start-smart' ? 'Start Smart' : 'Build & Scale'}
        </Link>

        <article className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-[--color-muted]">
              {category === 'start-smart' ? 'Start Smart' : 'Build & Scale'}
            </span>

            {post.cluster ? (
              <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-[--color-muted]">
                {post.cluster.replace(/-/g, ' ')}
              </span>
            ) : null}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="text-lg text-gray-400 leading-8 mb-10">
              {post.excerpt}
            </p>
          ) : null}

          <div className="blog-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
}

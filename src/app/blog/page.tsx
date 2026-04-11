import Link from 'next/link';
import { ArrowRight, BookOpen, Briefcase } from 'lucide-react';
import { getPostsByCategory } from '@/lib/blog';

export const revalidate = 3600;

export default function BlogHubPage() {
  const startSmartCount = getPostsByCategory('start-smart').length;
  const buildAndScaleCount = getPostsByCategory('build-and-scale').length;

  return (
    <main className="min-h-screen bg-[--color-background] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
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
      </div>
    </main>
  );
}

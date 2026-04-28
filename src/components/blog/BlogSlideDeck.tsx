import { BarChart3, BookOpen, CheckCircle2, ClipboardList, Lightbulb, Quote, Rocket, Sparkles } from 'lucide-react';
import type { BlogSlideDeck as BlogSlideDeckType, BlogSlide } from '@/data/blogSlideDecks';

type Props = {
  deck: BlogSlideDeckType;
};

function getSlideIcon(kind: string) {
  switch (kind) {
    case 'stat':
      return BarChart3;
    case 'framework':
      return ClipboardList;
    case 'quote':
      return Quote;
    case 'takeaway':
      return Lightbulb;
    case 'cta':
      return Rocket;
    default:
      return Sparkles;
  }
}

function SlideBody({ slide }: { slide: BlogSlide }) {
  if (slide.kind === 'title') {
    return (
      <p className="mt-3 line-clamp-5 text-sm leading-6 text-slate-300 md:text-base md:leading-7">
        {slide.subtitle || 'A quick visual companion to the article.'}
      </p>
    );
  }

  if (slide.kind === 'stat') {
    return (
      <div className="mt-4">
        <p className="text-5xl font-black tracking-tight text-green-300 md:text-6xl">{slide.stat}</p>
        {slide.statCaption ? <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-300 md:text-base">{slide.statCaption}</p> : null}
        {slide.citation ? <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-slate-500">Source: {slide.citation}</p> : null}
      </div>
    );
  }

  if (slide.kind === 'quote') {
    return (
      <blockquote className="mt-4 border-l-4 border-green-400/70 pl-4 text-sm leading-7 text-slate-200 md:text-base">
        <span className="line-clamp-5">“{slide.quote}”</span>
        {slide.attribution ? <footer className="mt-3 text-xs uppercase tracking-[0.14em] text-slate-500">{slide.attribution}</footer> : null}
      </blockquote>
    );
  }

  if (slide.steps?.length) {
    return (
      <ol className="mt-4 grid gap-3 md:grid-cols-2">
        {slide.steps.slice(0, 4).map((step, index) => (
          <li key={`${step.label}-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-3">
            <p className="text-sm font-semibold text-white">{step.label}</p>
            <p className="mt-1 line-clamp-4 text-xs leading-5 text-slate-300 md:text-sm md:leading-6">{step.description}</p>
          </li>
        ))}
      </ol>
    );
  }

  if (slide.left || slide.right) {
    return (
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[slide.left, slide.right].filter(Boolean).map((side, index) => (
          <div key={`${side?.label}-${index}`} className="rounded-2xl border border-white/10 bg-black/25 p-3">
            <p className="text-sm font-semibold text-white">{side?.label}</p>
            <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-300 md:text-sm">
              {side?.points?.slice(0, 4).map((point) => (
                <li key={point} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  <span className="line-clamp-2">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  if (slide.bullets?.length) {
    return (
      <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300 md:grid-cols-2">
        {slide.bullets.slice(0, 6).map((bullet) => (
          <li key={bullet} className="flex gap-2 rounded-2xl border border-white/10 bg-black/20 p-3">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-green-400" />
            <span className="line-clamp-3">{bullet}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300 md:text-base md:leading-7">
      {slide.story ? <p className="line-clamp-5">{slide.story}</p> : null}
      {slide.outcome ? <p className="line-clamp-4"><strong className="text-white">Outcome:</strong> {slide.outcome}</p> : null}
      {slide.takeaway ? <p className="line-clamp-4"><strong className="text-white">Takeaway:</strong> {slide.takeaway}</p> : null}
      {slide.cta ? <p className="line-clamp-4">{slide.cta}</p> : null}
    </div>
  );
}

export default function BlogSlideDeck({ deck }: Props) {
  return (
    <section
      className="not-prose my-12 overflow-hidden rounded-3xl border border-green-400/20 bg-gradient-to-br from-green-400/10 via-white/[0.04] to-purple-500/10 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.24)] sm:p-5 md:p-7"
      aria-labelledby="visual-summary-heading"
    >
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-200">
            <BookOpen className="h-4 w-4" />
            Visual Summary
          </p>
          <h2 id="visual-summary-heading" className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Swipe through the key slides
          </h2>
          {deck.subtitle ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{deck.subtitle}</p> : null}
        </div>
        <div className="w-fit rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
          {deck.slides.length} slides{deck.estimatedReadMinutes ? ` • ${deck.estimatedReadMinutes} min companion` : ''}
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 pb-5 [scrollbar-color:rgba(74,222,128,0.55)_rgba(255,255,255,0.08)] [scrollbar-width:thin] sm:-mx-5 sm:px-5 md:-mx-7 md:px-7">
        <div className="flex w-max gap-5">
          {deck.slides.map((slide, index) => {
            const Icon = getSlideIcon(slide.kind);
            return (
              <article
                key={`${slide.kind}-${slide.title || index}`}
                className="relative flex min-h-[360px] w-[min(82vw,720px)] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0f1724]/95 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.28)] md:min-h-[405px] md:w-[720px] md:p-7"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_38%)]" />

                <div className="relative z-10 mb-5 flex items-center justify-between gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/10 text-green-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-400">
                    Slide {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="relative z-10 grid flex-1 gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                  <div>
                    {slide.title ? <h3 className="text-2xl font-black leading-tight tracking-tight text-white md:text-3xl">{slide.title}</h3> : null}
                    {slide.kind !== 'stat' && slide.kind !== 'title' && slide.subtitle ? (
                      <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-400">{slide.subtitle}</p>
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <SlideBody slide={slide} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        Use Shift + mouse wheel or swipe horizontally to move through the visual companion deck.
      </p>
    </section>
  );
}

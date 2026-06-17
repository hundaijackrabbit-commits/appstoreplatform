'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PRODUCTS } from '@/data/products';
import { formatCurrency } from '@/lib/utils';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileArchive,
  FileCheck,
  FolderCode,
  Globe,
  Laptop,
  Mail,
  Menu,
  PackageCheck,
  Rocket,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'How It Works', target: 'how-it-works' },
  { label: 'What You Get', target: 'what-you-get' },
  { label: 'Pricing', target: 'pricing' },
  { label: 'FAQ', target: 'faq' },
];

const trustStrip = [
  'Transparent pricing',
  'Code handoff',
  'Live deployment',
  'Commercial use',
  'Fast turnaround',
];

const problemBullets = [
  { label: 'No forced builder subscription', Icon: ShieldCheck },
  { label: 'No platform lock-in', Icon: PackageCheck },
  { label: 'Full project handoff', Icon: FolderCode },
  { label: 'Built for long-term control', Icon: BadgeCheck },
];

const processSteps = [
  {
    title: 'Choose your website type',
    body: 'Landing page, business site, store, or startup-style site.',
    Icon: Laptop,
  },
  {
    title: 'We customize and build it',
    body: 'We tailor the site to your brand, content, and goals.',
    Icon: Sparkles,
  },
  {
    title: 'We launch it live',
    body: 'Your site is deployed and ready to share.',
    Icon: Rocket,
  },
  {
    title: 'You receive the handoff',
    body: 'You get the source code, files, and basic instructions.',
    Icon: FileCheck,
  },
];

const deliverables = [
  'A live published website',
  'Full source code',
  'Downloadable project files',
  'Basic handoff instructions',
  'Branded design implementation',
  'Commercial use rights',
];

const handoffItems = [
  { label: 'Live Site', Icon: Globe },
  { label: 'Source Code', Icon: Code2 },
  { label: 'Project Files', Icon: FileArchive },
  { label: 'Handoff Notes', Icon: FileCheck },
];

const exampleCards = [
  {
    title: 'Landing Page',
    description: 'A clean one-page site for offers, launches, personal brands, or lead generation.',
    image: '/images/example-landing.webp',
  },
  {
    title: 'Business Website',
    description: 'A polished multi-page site for service businesses, local companies, or professional brands.',
    image: '/images/example-business.webp',
  },
  {
    title: 'Store or Product Site',
    description: 'A product-focused website built for selling, showcasing, or launching online.',
    image: '/images/example-store.webp',
  },
];

const goodFitItems = [
  'want a website built for you',
  'prefer a one-time build over another subscription',
  'want the files and code handed over',
  'need a clean, professional site fast',
  'care about long-term flexibility',
];

const startovaComparison = [
  'a website built for you',
  'source code and project files',
  'freedom from builder lock-in',
  'a one-time build model',
  'more flexibility long term',
];

const builderComparison = [
  'a DIY setup',
  'regular visual self-editing',
  'an all-in-one platform account',
  'convenience over ownership',
  'a builder-managed experience',
];

const trustBlocks = [
  {
    title: 'Clear deliverables',
    body: 'You know what you are getting before the build starts.',
  },
  {
    title: 'Real handoff',
    body: 'Your website is delivered with the files and code it was built from.',
  },
  {
    title: 'Built for long-term use',
    body: 'The goal is not just to launch your site. It is to give you something you can keep.',
  },
];

const faqs = [
  {
    question: 'Do I really own the website?',
    answer: 'Yes. You receive the source code and project files for the completed website deliverable, along with the live deployment setup.',
  },
  {
    question: 'Do I need to pay a monthly subscription?',
    answer: 'Not to StartOva for ownership of the website itself. You may still have optional third-party costs such as a domain, hosting, email, or tools depending on your setup.',
  },
  {
    question: 'Can you launch the website for me?',
    answer: 'Yes. StartOva can deploy the website live as part of the delivery process so it is ready to share.',
  },
  {
    question: 'Can I use my own domain?',
    answer: 'Yes. If you already have a domain, it can usually be connected during setup.',
  },
  {
    question: 'Can I edit the site later?',
    answer: 'Yes, but the editing experience depends on how the site is built. StartOva is best for people who value ownership and flexibility over a fully visual builder-style editor.',
  },
  {
    question: 'How fast can my site be ready?',
    answer: 'Timing depends on scope and how ready your content is. Smaller sites can usually move much faster than larger custom builds.',
  },
];

function getProductById(id: string) {
  return PRODUCTS.find((product) => product.id === id) || PRODUCTS[0];
}

export default function HomePage() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const landingProduct = useMemo(() => getProductById('modern-landing'), []);
  const businessProduct = useMemo(() => getProductById('portfolio-pro'), []);
  const storeProduct = useMemo(() => getProductById('ecommerce-store'), []);

  const pricingPlans = [
    {
      title: 'Starter Landing Page',
      product: landingProduct,
      intro: 'For launches, offers, personal brands, and simple businesses.',
      items: ['1 page', 'mobile responsive design', 'branded customization', 'contact or inquiry section', 'live deployment', 'source code and file handoff'],
      cta: 'Get Started',
    },
    {
      title: 'Business Website',
      product: businessProduct,
      intro: 'For businesses that need a stronger and more complete online presence.',
      items: ['professional page structure', 'branded design customization', 'contact section', 'mobile optimization', 'live deployment', 'source code and file handoff'],
      cta: 'Get Started',
      featured: true,
    },
    {
      title: 'Store or Startup Site',
      product: storeProduct,
      intro: 'For advanced sites with more functionality or custom requirements.',
      items: ['larger project scope', 'more advanced features', 'conversion-focused structure', 'custom review before build', 'deployment and handoff'],
      cta: 'Request a Quote',
    },
  ];

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goToProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080912] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080912]/88 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <button onClick={() => scrollTo('top')} className="flex items-center gap-2 text-left" aria-label="Go to StartOva homepage top">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/12 ring-1 ring-emerald-300/20">
              <Sparkles className="h-5 w-5 text-emerald-300" />
            </span>
            <span className="text-xl font-bold tracking-tight">StartOva</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button key={item.target} onClick={() => scrollTo(item.target)} className="rounded-xl px-4 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white">
                {item.label}
              </button>
            ))}
            <button onClick={() => router.push('/blog')} className="rounded-xl px-4 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white">
              Blog
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <Button onClick={() => scrollTo('pricing')} className="hidden rounded-xl bg-emerald-400 px-4 font-semibold text-black hover:bg-emerald-300 sm:inline-flex">
              Get My Website
            </Button>
            <button onClick={() => setMobileOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden" aria-label="Open navigation menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-white/10 bg-[#080912] px-4 py-4 md:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <button key={item.target} onClick={() => scrollTo(item.target)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/85">
                  {item.label}
                </button>
              ))}
              <button onClick={() => router.push('/blog')} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/85">
                Blog
              </button>
              <Button onClick={() => scrollTo('pricing')} className="mt-2 rounded-xl bg-emerald-400 font-semibold text-black hover:bg-emerald-300">
                Get My Website
              </Button>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.13),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-[1fr_0.92fr] md:px-6 md:py-20 lg:py-24">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                Websites built for real handoff
              </div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
                Get a professional website built — and actually own it.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                StartOva delivers your live website, source code, project files, and handoff instructions in one clear package. Built for founders, creators, and small businesses that want long-term flexibility.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => scrollTo('pricing')} className="h-14 rounded-xl bg-emerald-400 px-7 text-base font-bold text-black hover:bg-emerald-300">
                  Get My Website
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button onClick={() => scrollTo('what-you-get')} variant="outline" className="h-14 rounded-xl border-white/15 bg-white/5 px-7 text-base font-semibold text-white hover:bg-white/10">
                  See What You Get
                </Button>
              </div>
              <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {trustStrip.map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/75">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-emerald-400/12 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101522] p-3 shadow-2xl">
                <Image src="/images/startova-hero.webp" alt="StartOva delivery package showing a live website, source code, files, and handoff notes" width={1100} height={860} priority className="h-auto w-full rounded-[1.35rem]" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-[0.95fr_1fr] md:px-6" id="problem">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">The problem</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Launching fast is useful. Getting stuck later is not.</h2>
            <p className="mt-5 text-lg leading-8 text-white/65">Website builders can be convenient, but they often come with tradeoffs: recurring fees, limited flexibility, and dependence on a platform you do not control.</p>
            <p className="mt-4 text-lg leading-8 text-white/65">StartOva creates your site, launches it live, and hands it over properly so you can keep it, use it, and build on it without relying on a builder account just to stay online.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {problemBullets.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <item.Icon className="mb-4 h-7 w-7 text-emerald-300" />
                <p className="font-semibold text-white">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Process</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How StartOva works</h2>
              <p className="mt-4 text-lg text-white/65">A simple process designed to get your website live quickly with a real handoff at the end.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-white/10 bg-[#0d111d] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <step.Icon className="h-7 w-7 text-emerald-300" />
                    <span className="text-sm font-bold text-white/35">0{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="what-you-get" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-[1fr_0.9fr] md:px-6">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Delivery package</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you receive on delivery</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/65">Every StartOva project is built to be handed over properly, not trapped inside a platform account.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {deliverables.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-white/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-white/50">Need more than the essentials? Extra pages, copy help, logo support, integrations, and ongoing edits can be scoped separately.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/45">Your handoff</p>
            {handoffItems.map((item) => (
              <div key={item.label} className="mb-4 flex items-center gap-4 rounded-2xl bg-[#0c101a] p-4 last:mb-0">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-300/10"><item.Icon className="h-5 w-5 text-emerald-300" /></span>
                <span className="font-semibold text-white">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025]" id="who-this-is-for">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Fit</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for people who want more control over their website</h2>
              <p className="mt-4 text-lg leading-8 text-white/65">StartOva is a strong fit for founders, creators, and small businesses that want a professional web presence without being tied to a builder long term.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-emerald-300/15 bg-emerald-300/5 p-6">
                <h3 className="mb-5 text-xl font-bold">Good fit if you...</h3>
                {goodFitItems.map((item) => (
                  <p key={item} className="mb-3 flex gap-3 text-white/75 last:mb-0"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />{item}</p>
                ))}
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="mb-4 text-xl font-bold">Not the best fit for everyone</h3>
                <p className="leading-8 text-white/65">If you want to visually edit every part of your site yourself on a regular basis, a traditional website builder may be a better fit. StartOva is best for people who want a finished website with real ownership and flexibility.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="examples" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Examples</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See what a finished StartOva website can look like</h2>
              <p className="mt-4 max-w-3xl text-lg text-white/65">Browse examples of the kinds of sites StartOva can create and customize for different business needs.</p>
            </div>
            <Button onClick={() => scrollTo('pricing')} variant="outline" className="rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10">See Example Websites</Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {exampleCards.map((card) => (
              <div key={card.title} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
                <Image src={card.image} alt={`${card.title} example website preview`} width={800} height={520} loading="lazy" className="h-auto w-full" />
                <div className="p-5">
                  <p className="mb-2 text-sm font-semibold text-emerald-300">{card.title}</p>
                  <p className="leading-7 text-white/65">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Pricing</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple pricing</h2>
              <p className="mt-4 text-lg text-white/65">Choose the website type that fits your goals, scope, and stage.</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <Card key={plan.title} className={`flex h-full flex-col border-white/10 bg-[#0d111d] text-white ${plan.featured ? 'ring-2 ring-emerald-300/50' : ''}`}>
                  <CardHeader>
                    {plan.featured ? <p className="mb-2 text-sm font-semibold text-emerald-300">Most flexible</p> : null}
                    <CardTitle className="text-2xl">{plan.title}</CardTitle>
                    <CardDescription className="text-white/60">{plan.intro}</CardDescription>
                    <p className="pt-4 text-3xl font-bold text-white">{plan.product ? `Starting at ${formatCurrency(plan.product.basePrice)}` : 'Custom pricing'}</p>
                  </CardHeader>
                  <CardFooter className="mt-auto flex flex-col items-stretch gap-5">
                    <div className="grid gap-3 text-sm text-white/70">
                      {plan.items.map((item) => (<p key={item} className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />{item}</p>))}
                    </div>
                    <Button onClick={() => plan.product ? goToProduct(plan.product.id) : scrollTo('contact')} className="rounded-xl bg-emerald-400 font-bold text-black hover:bg-emerald-300">{plan.cta}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/50">Optional add-ons available: extra pages, copywriting help, branding support, integrations, ongoing edits, and rush delivery.</p>
          </div>
        </section>

        <section id="comparison" className="mx-auto grid max-w-7xl gap-5 px-4 py-16 md:grid-cols-2 md:px-6">
          <div className="md:col-span-2">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Comparison</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why choose StartOva instead of a website builder?</h2>
            <p className="mt-4 max-w-3xl text-lg text-white/65">Both options can work. The difference is what you value more: convenience inside a platform, or ownership and flexibility outside one.</p>
          </div>
          <div className="rounded-3xl border border-emerald-300/15 bg-emerald-300/5 p-6">
            <h3 className="mb-4 text-xl font-bold">StartOva is best if you want...</h3>
            {startovaComparison.map((item) => (<p key={item} className="mb-3 flex gap-3 text-white/75 last:mb-0"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />{item}</p>))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="mb-4 text-xl font-bold">A traditional builder is best if you want...</h3>
            {builderComparison.map((item) => (<p key={item} className="mb-3 flex gap-3 text-white/65 last:mb-0"><CheckCircle2 className="h-5 w-5 shrink-0 text-white/35" />{item}</p>))}
          </div>
        </section>

        <section id="trust" className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Trust</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built to feel clear, simple, and worth owning</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {trustBlocks.map((block) => (
                <div key={block.title} className="rounded-3xl border border-white/10 bg-[#0d111d] p-6">
                  <Award className="mb-4 h-7 w-7 text-emerald-300" />
                  <h3 className="font-bold text-white">{block.title}</h3>
                  <p className="mt-3 leading-7 text-white/60">{block.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-4 py-16 md:px-6">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">FAQ</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.04]">
                <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold">
                  {faq.question}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-white/45 transition ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index ? <p className="px-5 pb-5 leading-7 text-white/65">{faq.answer}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-emerald-400 text-black">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 md:flex-row md:items-center md:px-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Stop renting your website. Start building something you keep.</h2>
              <p className="mt-3 max-w-2xl text-black/70">If you want a professional website with a clear process, real handoff, and long-term flexibility, StartOva is built for you.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => scrollTo('pricing')} className="rounded-xl bg-black px-6 font-bold text-white hover:bg-black/85">Get My Website</Button>
              <Button onClick={() => scrollTo('contact')} variant="outline" className="rounded-xl border-black/20 bg-transparent px-6 font-bold text-black hover:bg-black/5">Ask a Question</Button>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-6">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Contact</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tell us about your website</h2>
            <p className="mt-4 text-lg leading-8 text-white/65">Share a few details and StartOva can recommend the best fit based on your goals, timeline, and scope.</p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-2 font-semibold">Prefer email?</p>
              <a className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200" href="mailto:support@startova.space"><Mail className="h-4 w-4" /> support@startova.space</a>
            </div>
          </div>
          <form className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5" action="mailto:support@startova.space" method="post" encType="text/plain">
            <label className="grid gap-2 text-sm font-medium text-white/75">Name<input name="name" type="text" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-emerald-300" /></label>
            <label className="grid gap-2 text-sm font-medium text-white/75">Email<input name="email" type="email" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-emerald-300" /></label>
            <label className="grid gap-2 text-sm font-medium text-white/75">Business or brand name<input name="business" type="text" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-emerald-300" /></label>
            <label className="grid gap-2 text-sm font-medium text-white/75">What type of website do you need?<select name="websiteType" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-emerald-300"><option>Landing page</option><option>Business website</option><option>Store or product site</option><option>Startup or custom site</option></select></label>
            <label className="grid gap-2 text-sm font-medium text-white/75">Anything else we should know?<textarea name="notes" rows={5} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-emerald-300" /></label>
            <Button type="submit" className="rounded-xl bg-emerald-400 font-bold text-black hover:bg-emerald-300">Get My Project Plan</Button>
          </form>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-xl font-bold">StartOva</p>
            <p className="mt-2 text-sm text-white/50">Websites built for ownership, not lock-in.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-white/55">
            <button onClick={() => scrollTo('how-it-works')} className="hover:text-white">How It Works</button>
            <button onClick={() => scrollTo('pricing')} className="hover:text-white">Pricing</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-white">FAQ</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white">Contact</button>
            <button onClick={() => router.push('/blog')} className="hover:text-white">Blog</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

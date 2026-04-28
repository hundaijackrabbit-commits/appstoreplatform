'use client';
import { motion } from 'framer-motion';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/data/products';
import { formatCurrency, staggerContainer, fadeInUp, scaleIn } from '@/lib/utils';
import {
  ArrowRight,
  Code,
  Globe,
  Zap,
  Shield,
  Users,
  Star,
  Sparkles,
  RefreshCcw,
  BookOpen,
  CheckCircle2,
  FolderCode,
  Rocket,
  Wallet,
  BadgeHelp,
  Quote,
  Clock,
  FileCheck,
  MessageCircle,
  HelpCircle,
  Download,
  Building,
  TrendingUp,
  Target,
  Award,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);

  const categories = [
    {
      id: 'landing-page',
      name: 'Landing Pages',
      icon: Globe,
      description: 'Simple pages built to attract leads and help you start selling fast',
    },
    {
      id: 'saas-tool',
      name: 'SaaS Tools',
      icon: Zap,
      description: 'Lean software products for founders and service businesses',
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      icon: Users,
      description: 'Online stores designed to help you launch and grow',
    },
    {
      id: 'portfolio',
      name: 'Business Presence',
      icon: Star,
      description: 'Professional sites that help your business look credible from day one',
    },
  ];

  const handleBrowseProducts = () => {
    const section = document.getElementById('featured-products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBrowseCategories = () => {
    const section = document.getElementById('categories');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHowItWorks = () => {
    const section = document.getElementById('how-it-works');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatYouGet = () => {
    const section = document.getElementById('what-you-get');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleComparison = () => {
    const section = document.getElementById('comparison');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTestimonials = () => {
    const section = document.getElementById('testimonials');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCaseStudies = () => {
    const section = document.getElementById('case-studies');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFAQ = () => {
    const section = document.getElementById('faq');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    const matchedProduct = PRODUCTS.find((product) => product.category === categoryId);
    if (matchedProduct) {
      router.push(`/product/${matchedProduct.id}`);
      return;
    }

    handleBrowseProducts();
  };

  const handleOpenBlog = () => {
    router.push('/blog');
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#0a0a14]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_30%),linear-gradient(135deg,rgba(34,197,94,0.06),rgba(99,102,241,0.05),rgba(168,85,247,0.08))] pointer-events-none" />
      

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-16 w-40 h-40 bg-green-500/15 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-24 right-24 w-56 h-56 bg-purple-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1.8s' }}
        />
        <div
          className="absolute bottom-16 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '3.2s' }}
        />
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-3 pt-3 sm:px-4 sm:pt-4 md:px-6 md:pt-6"
      >
        <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-white/5 px-3 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-4 sm:py-4 md:px-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex min-w-0 items-center justify-center gap-2 text-xl font-bold sm:text-2xl md:justify-start"
            >
              <Sparkles className="w-6 h-6 text-green-400 shrink-0" />
              <span className="bg-gradient-to-r from-white via-green-200 to-purple-200 bg-clip-text text-transparent truncate">
                StartOva
              </span>
            </motion.div>

            <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:flex-row md:items-center md:justify-end md:gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleTestimonials}
                className="h-9 w-full px-2 text-[11px] text-white/90 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-white md:h-11 md:w-auto md:px-5 md:text-sm border border-white/10 bg-white/5"
              >
                Success Stories
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleFAQ}
                className="h-9 w-full px-2 text-[11px] text-white/90 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-white md:h-11 md:w-auto md:px-5 md:text-sm border border-white/10 bg-white/5"
              >
                FAQ
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenBlog}
                className="h-9 w-full px-2 text-[11px] text-white/90 transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-white md:h-11 md:w-auto md:px-5 md:text-sm border border-white/10 bg-white/5"
              >
                <span className="flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>Blog</span>
                </span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleBrowseCategories}
                className="h-9 w-full px-2 text-[11px] text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 md:h-11 md:w-auto md:px-5 md:text-sm border-white/15 bg-white/5"
              >
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <section
        className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-5 md:px-6 md:pb-24 md:pt-16"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] overflow-hidden">
          <div className="absolute left-[-18%] top-[-20%] h-[520px] w-[520px] rounded-full bg-green-500/12 blur-[110px]" />
          <div className="absolute right-[-16%] top-[-18%] h-[560px] w-[560px] rounded-full bg-purple-500/16 blur-[120px]" />
          <motion.div
            animate={{ opacity: [0.18, 0.34, 0.18], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-32 h-px w-[78%] -translate-x-1/2 bg-gradient-to-r from-transparent via-green-300/30 to-transparent"
          />
        </div>

        <div className="relative grid min-w-0 items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div className="mx-auto w-full max-w-[min(100%,42rem)] min-w-0 text-center lg:mx-0 lg:text-left">
            <motion.div
              className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-2 text-[11px] font-medium text-green-200 shadow-[0_0_30px_rgba(34,197,94,0.08)] sm:px-4 md:text-sm"
            >
              <RefreshCcw className="h-4 w-4" />
              Built for ownership, not lock-in
            </motion.div>

            {/* Hero Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm font-medium">Full Code Ownership</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                <Wallet className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm font-medium">No Monthly Fees</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-white text-sm font-medium">5-7 Day Delivery</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-balance text-[2.65rem] font-bold leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl"
            >
              Own Your Website. Own Your Code.
              <br />
              <motion.span
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.7, ease: 'easeOut' }}
                className="mt-2 inline-block bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 bg-clip-text text-transparent"
              >
                Launch in Days, Not Months.
              </motion.span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-[34rem] overflow-hidden text-pretty text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl lg:mx-0"
            >
              Most website builders feel easy until you realize you do not actually own what you built.
              You are renting space on someone else’s platform.
            </motion.p>

            <motion.p
              className="mx-auto mt-4 max-w-[34rem] overflow-hidden text-pretty text-sm leading-relaxed text-gray-400 md:text-base lg:mx-0"
            >
              StartOva gives you something different: a real website or app, the full codebase, and a live deployed version. No lock-in. No subscriptions. No platform controlling your business.
            </motion.p>

            <motion.div variants={fadeInUp} className="mx-auto mt-6 grid w-full max-w-sm grid-cols-1 gap-2 sm:max-w-none sm:grid-cols-3 lg:mx-0 lg:justify-start">
              {['No monthly fees', 'Full ownership', 'Real handoff'].map((item) => (
                <span
                  key={item}
                  className="inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-medium text-white/80 backdrop-blur-xl"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mx-auto mt-8 flex w-full max-w-sm flex-col justify-center gap-3 sm:max-w-none sm:flex-row lg:mx-0 lg:justify-start">
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="group h-14 w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 px-6 text-sm font-bold leading-none text-black shadow-[0_8px_30px_rgba(34,197,94,0.35)] transition-all hover:shadow-[0_12px_42px_rgba(34,197,94,0.45)] sm:w-auto sm:min-w-[190px] sm:px-7 sm:text-base"
                  onClick={handleBrowseProducts}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="whitespace-nowrap">Launch Your Business This Week</span>
                    <ArrowRight className="relative top-[1px] h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleComparison}
                  className="h-14 w-full rounded-xl border-white/15 bg-white/5 px-6 text-sm font-semibold leading-none text-white hover:bg-white/10 sm:w-auto sm:min-w-[210px] sm:px-7 sm:text-base"
                >
                  <span className="whitespace-nowrap">Why Not Wix or Shopify?</span>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 36, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.85, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-[min(100%,42rem)] min-w-0"
          >
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-green-400/20 via-transparent to-purple-400/20 blur-3xl" />
            <motion.div
              animate={{ rotate: [0, 1.5, 0], y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute left-1 top-10 z-20 hidden rounded-2xl border border-green-300/20 bg-[#0b1416]/70 px-4 py-2 text-xs text-green-100 shadow-2xl backdrop-blur-xl md:block"
            >
              Your code
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -1.5, 0], y: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute right-2 top-32 z-20 hidden rounded-2xl border border-purple-300/20 bg-[#151126]/70 px-4 py-2 text-xs text-purple-100 shadow-2xl backdrop-blur-xl md:block"
            >
              Your brand
            </motion.div>
            <motion.div
              animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute bottom-8 left-8 z-20 hidden rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-2 text-xs text-white/75 shadow-2xl backdrop-blur-xl md:block"
            >
              Your data
            </motion.div>

            <motion.div
              whileHover={{ y: -6, rotate: -0.2 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d1120] shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:rounded-[2rem]"
            >
              <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(250,204,21,0.10),transparent_30%),radial-gradient(circle_at_74%_40%,rgba(34,197,94,0.10),transparent_36%),radial-gradient(circle_at_90%_12%,rgba(168,85,247,0.18),transparent_40%)]" />

              <div className="relative z-20 border-b border-white/10 bg-[#111827]/88 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-300/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                  <span className="ml-3 hidden rounded-full bg-black/20 px-3 py-1 text-[11px] text-white/55 sm:inline">
                    clean handoff • live website • real files
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden bg-black">
                <video
                  id="heroVideo"
                  className="aspect-[9/16] w-full max-h-[720px] object-cover md:aspect-[16/10] md:max-h-none"
                  src="/videos/startova-hero.mp4"
                  poster="/images/hero-poster.jpg"
                  muted={isMuted}
                  loop
                  playsInline
                  autoPlay
                  preload="none"
                  aria-label="StartOva website ownership preview video"
                />

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 right-4 z-40 bg-black/60 text-white px-3 py-2 rounded-lg text-xs backdrop-blur-md hover:bg-black/80 transition"
                >
                  {isMuted ? '🔇 Sound Off' : '🔊 Sound On'}
                </button>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(120deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.025)_34%,transparent_58%),radial-gradient(circle_at_18%_8%,rgba(255,255,255,0.12),transparent_30%)] mix-blend-screen"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-[#111123] to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#101724]/88 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-5 md:p-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_30%,rgba(34,197,94,0.14),transparent_26%),radial-gradient(circle_at_90%_15%,rgba(168,85,247,0.12),transparent_30%)]" />
          <div className="relative grid gap-5 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="flex items-start gap-4 text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/10 shadow-[0_0_30px_rgba(34,197,94,0.12)]">
                <Rocket className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Built for Real Business Launches</h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-300">
                  Everything is designed around ownership: your files, your live site, your next move.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                'Project files included',
                'Live deployment ready',
                'No platform lock-in',
              ].map((item, index) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                  className="rounded-2xl border border-green-400/15 bg-[#0e2a22]/70 px-4 py-3 text-sm font-medium text-green-100/90 shadow-[0_12px_30px_rgba(34,197,94,0.06)]"
                >
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ scale: [1, 1.18, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.35, ease: 'easeInOut' }}
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />
                    </motion.span>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <motion.section
        id="what-you-get"
        className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 md:pt-20"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          You Do Not Just Get a Website. You Get a Real Business Asset.
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 max-w-3xl mx-auto mb-8 text-lg"
        >
          This is where a lot of platforms get slippery. They give you access. StartOva gives you something tangible: the GitHub-ready project or ZIP, plus a live deployed version ready on day one.
        </motion.p>

        {/* Trust Indicators */}
        <motion.div 
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            { icon: Award, text: "Full Code Ownership", color: "text-green-400" },
            { icon: Wallet, text: "No Monthly Fees", color: "text-blue-400" },
            { icon: Clock, text: "Delivered in 5-7 Days", color: "text-purple-400" }
          ].map((item, index) => (
            <motion.div
              key={item.text}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-white font-medium text-sm">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div variants={scaleIn} whileHover={{ y: -6, scale: 1.01 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-[#b7d3fb] bg-[#DCEAFF] p-6 shadow-[0_18px_55px_rgba(4,18,38,0.22)] transition-all duration-300 hover:border-emerald-400/50 hover:shadow-[0_20px_65px_rgba(16,185,129,0.18)]">
              <div className="relative grid gap-5 sm:grid-cols-[1fr_140px] sm:items-center">
                <div className="order-2 sm:order-1">
                  <div className="mb-4 flex items-center gap-3">
                    <FolderCode className="h-6 w-6 shrink-0 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-slate-950">The Actual Project</h3>
                  </div>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      Complete source code with all components and styling
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      GitHub repository with commit history and documentation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      Production-ready ZIP file for immediate use
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      Editable files you can modify, expand, or hire developers for
                    </li>
                  </ul>
                </div>
                <div className="order-1 flex justify-center sm:order-2 sm:justify-end">
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-[#DCEAFF] sm:h-32 sm:w-32">
                    <FolderCode className="h-16 w-16 text-emerald-600" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={scaleIn} whileHover={{ y: -6, scale: 1.01 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-white/90 bg-[#FFFFFF] p-6 shadow-[0_18px_55px_rgba(4,18,38,0.22)] transition-all duration-300 hover:border-emerald-400/45 hover:shadow-[0_20px_65px_rgba(16,185,129,0.16)]">
              <div className="relative grid gap-5 sm:grid-cols-[1fr_140px] sm:items-center">
                <div className="order-2 sm:order-1">
                  <div className="mb-4 flex items-center gap-3">
                    <Rocket className="h-6 w-6 shrink-0 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-slate-950">A Live Working Version</h3>
                  </div>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      Live deployment ready to use from day one (domain included)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      Pre-configured hosting on modern platforms (Vercel/Netlify)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      SSL certificate and CDN optimization included
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      Deployment guide for future updates and modifications
                    </li>
                  </ul>
                </div>
                <div className="order-1 flex justify-center sm:order-2 sm:justify-end">
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-[#FFFFFF] sm:h-32 sm:w-32">
                    <Rocket className="h-16 w-16 text-emerald-600" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-gray-400 mt-8 max-w-3xl mx-auto"
        >
          Most services give you access to a system. StartOva gives you a working product and the pieces behind it.
        </motion.p>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          Built for Real Business Results
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg"
        >
          Here's what happens when you actually own your website instead of renting access to one.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Chen",
              business: "Marketing Consultant",
              quote: "Three months after launch, I hired a developer to add a client portal. Because I own the code, it took two weeks instead of starting from scratch. The ROI has been incredible.",
              outcome: "Added custom features, saved $12k vs. rebuilding"
            },
            {
              name: "Marcus Rodriguez",
              business: "E-commerce Founder",
              quote: "When we needed to integrate with our inventory system, we just handed our developer the GitHub repo. No platform limitations, no workarounds. Just clean code that works.",
              outcome: "Seamless integrations, no platform limitations"
            },
            {
              name: "Emily Foster",
              business: "Agency Owner",
              quote: "I've used this codebase as the foundation for three client projects. One purchase, multiple businesses launched. That's the power of actual ownership.",
              outcome: "Launched 3 businesses from one codebase"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              className="h-full"
            >
              <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
                <Quote className="w-8 h-8 text-green-400 mb-4" />
                <p className="text-gray-300 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                      <Building className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.business}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <p className="text-sm text-blue-300 font-medium">{testimonial.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Case Studies Section */}
      <motion.section
        id="case-studies"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          Real Builds, Real Results
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg"
        >
          See how StartOva foundations turn into successful businesses.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Case Study 1: Landing Page */}
          <motion.div
            variants={scaleIn}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          >
            <div className="h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-green-400/10 flex items-center justify-center border border-green-400/20">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">SaaS Landing Page</h3>
                  <p className="text-sm text-gray-400">AI Writing Tool Launch</p>
                </div>
              </div>

              {/* Problem */}
              <div className="mb-6">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Problem
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Startup needed to validate their AI writing tool idea quickly. Website builders were too limiting, 
                  and custom development would take 3+ months and $15k+ they didn't have.
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Solution
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Used StartOva's SaaS landing page template. Customized copy, added payment integration, 
                  and launched with their own domain in 6 days.
                </p>
              </div>

              {/* Result */}
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Result
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-white">$8.5k</p>
                    <p className="text-xs text-gray-400">Revenue in first month</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">320</p>
                    <p className="text-xs text-gray-400">Beta users signed up</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mt-3">
                  Later hired a developer to add advanced features using the existing codebase.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Case Study 2: E-commerce */}
          <motion.div
            variants={scaleIn}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          >
            <div className="h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-400/10 flex items-center justify-center border border-purple-400/20">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">E-commerce Store</h3>
                  <p className="text-sm text-gray-400">Artisan Jewelry Business</p>
                </div>
              </div>

              {/* Problem */}
              <div className="mb-6">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Problem
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Etsy fees were eating profits (8-12% per sale). Shopify felt limiting and expensive. 
                  Needed full control over customer experience and data.
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Solution
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Launched with StartOva's e-commerce template. Added Stripe payments, 
                  custom product galleries, and inventory management in the first week.
                </p>
              </div>

              {/* Result */}
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Result
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-white">18%</p>
                    <p className="text-xs text-gray-400">Profit margin increase</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">$24k</p>
                    <p className="text-xs text-gray-400">Revenue in 3 months</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mt-3">
                  Now owns complete customer database and has added subscription jewelry boxes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="comparison"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          StartOva vs Traditional Agencies vs Website Builders
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 max-w-4xl mx-auto mb-12 text-lg leading-relaxed"
        >
          Let’s be honest. Wix and Shopify can feel great at the beginning.
          Then one day you want to move things, customize more deeply, or stop paying forever.
          That is usually when the mood changes.
        </motion.p>

        <motion.div
          className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
        >
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 text-white">Feature</th>
                <th className="p-4 text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                    StartOva
                  </div>
                </th>
                <th className="p-4 text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                    Traditional Agency
                  </div>
                </th>
                <th className="p-4 text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                    Website Builder
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium">Ownership</td>
                <td className="p-4 text-green-300">Complete code ownership</td>
                <td className="p-4 text-blue-300">You own what you pay for</td>
                <td className="p-4 text-red-300">Platform owns everything</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4">Monthly fees</td>
                <td className="p-4">No ongoing platform subscription baked in</td>
                <td className="p-4">Recurring fees that do not really stop</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4">Code access</td>
                <td className="p-4">Built for real handoff and real control</td>
                <td className="p-4">Limited or heavily platform dependent</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4">Flexibility</td>
                <td className="p-4">Grow, rebuild, or hand off more freely</td>
                <td className="p-4">Bound by platform rules and feature limits</td>
              </tr>
              <tr>
                <td className="p-4">Exit freedom</td>
                <td className="p-4">Much easier to keep moving</td>
                <td className="p-4">Leaving can feel like dragging a couch out of someone else’s apartment</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <motion.p
          className="text-center text-gray-400 mt-6 max-w-3xl mx-auto"
        >
          Most platforms help you start fast. StartOva helps you stay independent.
        </motion.p>
      </motion.section>

      <motion.section
        id="pricing-anchor"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          Clear Pricing, Complete Ownership
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg"
        >
          No hidden costs, no recurring fees, no platform lock-in. Pay once, own forever.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* What's Included Section */}
          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">What's Always Included</h3>
            </div>

            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Complete source code and project files</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Live website deployed and ready to use</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Clear documentation and setup instructions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Mobile-responsive design for all devices</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Basic hosting setup guide</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span>Email support during build process</span>
              </li>
            </ul>
          </motion.div>

          {/* What Costs Extra Section */}
          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Optional Add-ons</h3>
            </div>

            <ul className="space-y-3 text-gray-300 mb-4">
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span>Premium design packages (from $15)</span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span>Advanced features like CMS, analytics (from $20)</span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span>Custom integrations and APIs (from $30)</span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span>Future updates and modifications ($150/hour)</span>
              </li>
            </ul>

            <div className="p-4 rounded-xl border border-purple-400/20 bg-purple-400/10">
              <p className="text-purple-200 text-sm">
                <strong>Important:</strong> You're never locked in. Since you own the code, 
                any developer can help you make changes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Delivery Timeline Section */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">Delivery Timeline</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="rounded-xl border border-blue-400/20 bg-blue-400/10 p-4 mb-3">
                <h4 className="text-blue-300 font-semibold mb-2">Simple Projects</h4>
                <p className="text-white text-2xl font-bold">24-72 hours</p>
                <p className="text-gray-400 text-sm">Landing pages, portfolios</p>
              </div>
            </div>

            <div className="text-center">
              <div className="rounded-xl border border-green-400/20 bg-green-400/10 p-4 mb-3">
                <h4 className="text-green-300 font-semibold mb-2">Medium Projects</h4>
                <p className="text-white text-2xl font-bold">3-7 days</p>
                <p className="text-gray-400 text-sm">Blogs, SaaS dashboards</p>
              </div>
            </div>

            <div className="text-center">
              <div className="rounded-xl border border-orange-400/20 bg-orange-400/10 p-4 mb-3">
                <h4 className="text-orange-300 font-semibold mb-2">Complex Projects</h4>
                <p className="text-white text-2xl font-bold">1-3 weeks</p>
                <p className="text-gray-400 text-sm">E-commerce, custom platforms</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl border border-gray-400/20 bg-gray-400/10">
            <p className="text-gray-300 text-center">
              <strong>No coding knowledge required.</strong> We handle everything technical and provide clear instructions for managing your site afterward.
            </p>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        id="why-startova-costs-less"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          Why StartOva Costs Less Than Traditional Agencies
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg"
        >
          It's not about cutting corners. It's about removing barriers to entrepreneurship.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Template-First Efficiency</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We start with proven templates and patterns instead of building everything from scratch. 
              This means faster delivery without sacrificing quality—you get the benefit of our experience 
              built into every foundation.
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Focused, Not Full-Service</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Traditional agencies handle everything: strategy, design, development, hosting, maintenance. 
              We focus on one thing: delivering clean, working code that you can own and control. 
              No consulting overhead, no long discovery phases.
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Volume & Automation</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              By streamlining our process and building lots of similar projects, we can pass savings 
              to customers. Automated deployment, tested workflows, and refined systems keep our 
              costs down—and yours too.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto rounded-2xl border border-green-400/20 bg-green-400/10 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(34,197,94,0.15)]"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Building className="w-8 h-8 text-green-300" />
            <h3 className="text-2xl font-bold text-white">Our Core Belief</h3>
          </div>
          
          <p className="text-green-100 text-lg leading-relaxed text-center mb-4">
            Everyone should have the capability to be an independent entrepreneur.
          </p>
          
          <p className="text-green-200/90 leading-relaxed text-center">
            Traditional web development creates barriers: high upfront costs, complex contracts, 
            ongoing dependencies. StartOva exists to remove these barriers. We believe that if you have 
            a business idea and the drive to make it happen, website costs shouldn't be what stops you. 
            Our goal is to get powerful digital tools into as many hands as possible, 
            at prices that make entrepreneurship accessible.
          </p>
        </motion.div>
      </motion.section>

      <motion.section
        id="categories"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-16"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          What Do You Want to Start?
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg"
        >
          Pick the kind of online business presence that fits your next move.
          Start small, rebuild smarter, or launch something completely new.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -8, scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <Card
                className="h-full cursor-pointer border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.22)] hover:border-green-400/30 hover:shadow-[0_16px_50px_rgba(34,197,94,0.12)] group transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.25, ease: 'easeInOut' }}
                      className="rounded-2xl bg-white/5 border border-white/10 p-4 group-hover:border-green-400/30 group-hover:bg-green-400/10 transition-colors"
                    >
                      <category.icon className="w-10 h-10 text-green-400 group-hover:text-purple-300 transition-colors" />
                    </motion.div>
                  </div>
                  <CardTitle className="text-lg text-white">{category.name}</CardTitle>
                  <CardDescription className="text-gray-400">{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="featured-products"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          Ready-to-Launch Builds
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg"
        >
          Choose a foundation, customize what you need, and move forward with something you can actually own.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10, scale: 1.018 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            >
              <Card className="relative h-full group cursor-pointer overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.25)] hover:border-green-400/30 hover:shadow-[0_18px_60px_rgba(34,197,94,0.16)] transition-all duration-300">
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-300/70 to-transparent"
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut' }}
                />
                
                {/* Best For Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-200 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    Best for: {product.bestFor}
                  </span>
                </div>

                <CardHeader className="pb-4 pt-16">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <CardTitle className="text-white text-xl leading-tight group-hover:text-green-300 transition-colors">
                      {product.name}
                    </CardTitle>
                    <span className="text-green-400 font-bold text-2xl shrink-0">
                      {formatCurrency(product.basePrice)}
                    </span>
                  </div>

                  <CardDescription className="text-sm text-gray-400 leading-relaxed mb-4">
                    {product.description}
                  </CardDescription>

                  {/* Key Features */}
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {product.keyFeatures.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Build Time */}
                  <div className="mt-4 p-3 rounded-lg border border-gray-600/30 bg-gray-600/20">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-300" />
                      <span className="text-orange-200 font-medium text-sm">
                        Delivery: {product.buildTime.display}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardFooter className="pt-6">
                  <Button
                    className="group w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-semibold shadow-[0_8px_24px_rgba(34,197,94,0.28)] hover:scale-[1.01] hover:shadow-[0_10px_32px_rgba(34,197,94,0.42)] transition-all flex items-center justify-center gap-2"
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <ArrowRight className="w-4 h-4 relative top-[1px] transition-transform group-hover:translate-x-1" />
                    <span>Customize and Launch</span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="how-it-works"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          How StartOva Works
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg"
        >
          Honestly, it is pretty simple. Pick something close to what you need, point us in the right direction, and get a proper handoff instead of a maze.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: 'Choose Your Starting Point',
              description:
                'Pick the website, store, or digital product that fits what you are trying to launch.',
            },
            {
              icon: Zap,
              title: 'Customize What You Need',
              description:
                'Select the features, layout, and direction that make sense without turning the process into a part-time job.',
            },
            {
              icon: Users,
              title: 'Launch with a Real Handoff',
              description:
                'Receive a finished build, the project files, and a live version so you can actually move forward.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 190, damping: 18 }}
            >
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] text-center hover:border-purple-400/30 hover:bg-white/[0.07] transition-colors">
                <div className="flex justify-center mb-4">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.06, 1] }}
                      transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.35, ease: 'easeInOut' }}
                    >
                      <item.icon className="w-8 h-8 text-green-400" />
                    </motion.div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="who-its-for"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          Who This Is Not For
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg"
        >
          StartOva is not for everybody. That is part of the point.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={scaleIn}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
              <div className="flex items-center gap-3 mb-4">
                <BadgeHelp className="w-6 h-6 text-purple-300" />
                <h3 className="text-xl font-semibold text-white">Probably Not for You If</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li>• You are happy staying inside all-in-one platforms forever</li>
                <li>• You do not care about owning your website or code</li>
                <li>• You want a drag-and-drop tool and never want to think beyond that</li>
                <li>• You prefer recurring subscriptions over one-time ownership</li>
              </ul>
            </div>
          </motion.div>

          <motion.div variants={scaleIn}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Probably for You If</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li>• You want something you can actually keep</li>
                <li>• You are serious about building a real business asset</li>
                <li>• You do not want to be trapped in platform limits later</li>
                <li>• You want a clean starting point you can grow from</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-gray-400 mt-8 max-w-3xl mx-auto"
        >
          This is not the easiest way to build online. It is the more honest one.
        </motion.p>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto max-w-4xl px-4 pb-20 sm:px-6"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          Questions You Probably Have
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg"
        >
          The honest answers to what happens after you get your website.
        </motion.p>

        <div className="space-y-6">
          {[
            {
              question: "What happens after you deliver my website?",
              answer: "You get the complete project files, a live working website, and clear documentation. From that point, you own everything. You can edit it yourself, hire any developer, or let it run as-is. No ongoing relationship required unless you want support.",
              icon: FileCheck
            },
            {
              question: "Can I edit the website myself?",
              answer: "Yes, with some technical knowledge. The code is clean and well-documented, but you'll need basic HTML/CSS skills or a developer to make changes. We include setup guides, but this isn't a drag-and-drop editor—it's real code you own.",
              icon: Code
            },
            {
              question: "Do I need technical skills to use StartOva?",
              answer: "Not to launch—we handle the technical setup and deployment. But to make future changes, you'll either need to learn some web development or hire a developer. That's the trade-off for complete ownership.",
              icon: HelpCircle
            },
            {
              question: "What if I want changes later?",
              answer: "Since you own the code, you can hire any developer to make changes. We also offer post-delivery support at $150/hour if you prefer us to handle updates. The key difference: you're never trapped with only one option.",
              icon: RefreshCcw
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/10">
                  <faq.icon className="h-6 w-6 text-green-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          className="text-center mt-8"
        >
          <p className="text-gray-400 mb-4">
            Still have questions? 
          </p>
          <a
            href="mailto:support@startova.space"
            className="inline-flex items-center gap-2 rounded-xl border border-green-400/30 bg-green-400/10 px-6 py-3 text-green-300 hover:bg-green-400/20 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Email Us Your Questions
          </a>
        </motion.div>
      </motion.section>

      <motion.section
        id="learn-before-you-build"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20"
      >
        <motion.div
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)]"
        >
          <p className="text-sm uppercase tracking-[0.18em] text-green-300 mb-3">
            Learn Before You Build
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Not sure whether to use a website builder, hire an agency, or own your code?
          </h2>
          <p className="text-gray-400 max-w-3xl mb-6 text-lg leading-relaxed">
            Start with our practical guides on website ownership, platform lock-in, online business costs, and building a site you can actually keep.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/blog/start-smart"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10 transition"
            >
              Start Smart Guides
            </a>
            <a
              href="/blog/build-and-scale"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10 transition"
            >
              Build & Scale Guides
            </a>
            <a
              href="/blog"
              className="rounded-xl border border-green-400/30 bg-green-400/10 px-4 py-2 text-green-300 hover:bg-green-400/20 transition"
            >
              View All Articles
            </a>
          </div>
        </motion.div>
      </motion.section>

      <section id="seo-link-paths" className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
          <p className="text-sm uppercase tracking-[0.18em] text-green-300 mb-3">High-intent StartOva guides</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Build knowledge before you build the site</h2>
          <p className="text-gray-400 max-w-3xl mb-6 text-lg leading-relaxed">
            These internal paths help visitors understand ownership, platform lock-in, and what it means to launch with real files instead of renting another builder.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <a href="/blog/start-smart" className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-gray-300 hover:bg-white/10 transition">
              Learn the basics of owning your website
            </a>
            <a href="/blog/build-and-scale" className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-gray-300 hover:bg-white/10 transition">
              Plan a stronger business website strategy
            </a>
            <a href="/blog" className="rounded-2xl border border-green-400/20 bg-green-400/10 p-4 text-sm text-green-200 hover:bg-green-400/15 transition">
              Browse all StartOva guides
            </a>
          </div>
        </div>
      </section>

      <motion.section
        id="final-cta"
        className="relative z-10 max-w-5xl mx-auto px-6 pb-16 text-center"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight"
        >
          Build It Once. Keep It.
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          If you are tired of paying for access to something that never really becomes yours,
          StartOva was built for exactly that frustration.
        </motion.p>

        <motion.div variants={fadeInUp} className="relative mx-auto flex w-full max-w-lg flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-green-400/10 blur-2xl"
            animate={{ opacity: [0.25, 0.45, 0.25], scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Button
            size="lg"
            className="group h-14 min-w-[180px] rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 px-8 text-sm font-bold leading-none text-black shadow-[0_8px_30px_rgba(34,197,94,0.35)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_42px_rgba(34,197,94,0.45)] sm:text-base"
            onClick={handleBrowseProducts}
          >
            <span className="flex items-center justify-center gap-2 whitespace-nowrap">
              <span>Start Your Build</span>
              <ArrowRight className="relative top-[1px] h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleWhatYouGet}
            className="h-14 min-w-[170px] rounded-xl border-white/15 bg-white/5 px-8 text-sm font-semibold leading-none text-white hover:bg-white/10 sm:text-base"
          >
            <span className="whitespace-nowrap">See What You Get</span>
          </Button>
        </motion.div>
      </motion.section>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 text-sm text-gray-500 leading-relaxed shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
          StartOva helps entrepreneurs and small business owners own their websites, source code, and digital business assets. Unlike hosted website builders and subscription store platforms, StartOva focuses on real project handoff, GitHub-ready delivery, ZIP access, and live deployment so users can launch with more control and less long-term platform dependency.
        </div>
      </section>
    </div>
  );
}

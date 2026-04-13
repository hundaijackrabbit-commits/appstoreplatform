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
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

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
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a14]">
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
        className="relative z-10 px-4 pt-4 md:px-6 md:pt-6"
      >
        <div className="max-w-7xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-4 md:px-5 md:py-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center justify-center md:justify-start gap-2 text-2xl font-bold min-w-0"
            >
              <Sparkles className="w-6 h-6 text-green-400 shrink-0" />
              <span className="bg-gradient-to-r from-white via-green-200 to-purple-200 bg-clip-text text-transparent truncate">
                StartOva
              </span>
            </motion.div>

            <div className="flex flex-col gap-3 w-full md:w-auto md:flex-row md:items-center md:justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHowItWorks}
                className="h-11 w-full md:w-auto px-5 text-white/90 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10"
              >
                How It Works
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenBlog}
                className="h-11 w-full md:w-auto px-5 text-white/90 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10"
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
                className="h-11 w-full md:w-auto px-5 border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.section
        className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20 text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm text-green-200 mb-6"
        >
          <RefreshCcw className="w-4 h-4" />
          Built for ownership, not lock-in
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-purple-200 bg-clip-text text-transparent leading-tight tracking-tight"
        >
          Stop Renting Your Website.
          <br />
          <span className="text-green-400">Own It.</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl text-gray-300 mb-5 max-w-4xl mx-auto leading-relaxed"
        >
          Ever build something on Wix or Shopify and then realize you do not really own it?
          Yeah. That part never feels great.
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed"
        >
          StartOva helps you launch online without getting buried in technical confusion.
          You get a real website or app, a real handoff, and a live version ready to go.
          No weird lock-in. No paying forever just to keep the lights on.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="text-lg h-14 px-8 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-semibold shadow-[0_8px_30px_rgba(34,197,94,0.35)] hover:scale-[1.02] transition-all"
            onClick={handleBrowseProducts}
          >
            <span className="flex items-center justify-center gap-2">
              <span>Browse Products</span>
              <ArrowRight className="w-5 h-5 relative top-[1px]" />
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleComparison}
            className="h-14 px-8 rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            Why Not Wix or Shopify?
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleOpenBlog}
            className="h-14 px-8 rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            <span className="flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>Read the Blog</span>
            </span>
          </Button>
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
        >
          <div className="flex items-center justify-center mb-3">
            <Code className="w-6 h-6 text-green-400 mr-2" />
            <span className="text-lg font-semibold text-white">Built for Real Business Launches</span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            This is for people who want something real. Maybe you are starting from scratch.
            Maybe you are rebuilding after wasting time on platforms that looked easy until they did not.
            Either way, the goal is simple: get online with something you can actually keep.
          </p>
        </motion.div>
      </motion.section>

      <motion.section
        id="what-you-get"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-16"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          You Do Not Just Get a Website. You Get the Whole Thing.
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg"
        >
          This is where a lot of platforms get slippery. They give you access.
          StartOva gives you something tangible.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={scaleIn}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
              <div className="flex items-center gap-3 mb-4">
                <FolderCode className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">The Actual Project</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  Full codebase delivered in a usable format
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  GitHub repository included when applicable
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  ZIP-ready handoff so you actually have the files
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  Something you can edit, expand, or hand off later
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div variants={scaleIn}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">A Live Working Version</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  Live deployment ready to use from day one
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  Vercel-friendly launch path for modern projects
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  Ready to share, test, or launch without setup chaos
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  Less guessing, less friction, more forward momentum
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.p
          variants={fadeInUp}
          className="text-center text-gray-400 mt-8 max-w-3xl mx-auto"
        >
          Most services give you access to a system. StartOva gives you a working product and the pieces behind it.
        </motion.p>
      </motion.section>

      <motion.section
        id="comparison"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          Why Not Just Use Wix or Shopify?
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-center text-gray-400 max-w-4xl mx-auto mb-10 text-lg leading-relaxed"
        >
          Let’s be honest. Wix and Shopify can feel great at the beginning.
          Then one day you want to move things, customize more deeply, or stop paying forever.
          That is usually when the mood changes.
        </motion.p>

        <motion.div
          variants={scaleIn}
          className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
        >
          <table className="w-full text-left min-w-[720px]">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 text-white">Feature</th>
                <th className="p-4 text-white">StartOva</th>
                <th className="p-4 text-white">Wix / Shopify</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-white/10">
                <td className="p-4">Ownership</td>
                <td className="p-4">You get the real project files</td>
                <td className="p-4">You are still inside their platform</td>
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
          variants={fadeInUp}
          className="text-center text-gray-400 mt-6 max-w-3xl mx-auto"
        >
          Most platforms help you start fast. StartOva helps you stay independent.
        </motion.p>
      </motion.section>

      <motion.section
        id="pricing-anchor"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={scaleIn}
          className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 text-center shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
        >
          <div className="flex items-center justify-center mb-4">
            <Wallet className="w-6 h-6 text-green-400 mr-2" />
            <span className="text-lg font-semibold text-white">What Does It Actually Cost?</span>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Here is the part a lot of people do not calculate.
            A website builder can look cheap at first. Twenty bucks here. Thirty there. Maybe more once you add what you actually need.
          </p>

          <p className="text-gray-400 leading-relaxed mb-4">
            Then a year goes by and you have paid hundreds for something you still do not fully own.
            And the meter keeps running.
          </p>

          <p className="text-gray-300 leading-relaxed">
            With StartOva, the value is not just the build. It is the fact that you get something real.
            The files. The project. The live version. Something you paid for and can actually keep.
          </p>
        </motion.div>
      </motion.section>

      <motion.section
        id="categories"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-16"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          What Do You Want to Start?
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg"
        >
          Pick the kind of online business presence that fits your next move.
          Start small, rebuild smarter, or launch something completely new.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => (
            <motion.div key={category.id} variants={scaleIn}>
              <Card
                className="h-full cursor-pointer border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.22)] hover:border-green-400/30 hover:shadow-[0_16px_50px_rgba(34,197,94,0.12)] group transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 group-hover:border-green-400/30 transition-colors">
                      <category.icon className="w-10 h-10 text-green-400 group-hover:text-purple-300 transition-colors" />
                    </div>
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
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          Ready-to-Launch Builds
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-center text-gray-400 max-w-3xl mx-auto mb-12 text-lg"
        >
          Choose a foundation, customize what you need, and move forward with something you can actually own.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 6).map((product) => (
            <motion.div key={product.id} variants={scaleIn}>
              <Card className="h-full group cursor-pointer border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.25)] hover:border-green-400/30 hover:shadow-[0_18px_60px_rgba(34,197,94,0.10)] transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <CardTitle className="text-white text-xl leading-tight group-hover:text-green-300 transition-colors">
                      {product.name}
                    </CardTitle>
                    <span className="text-green-400 font-bold text-2xl shrink-0">
                      {formatCurrency(product.basePrice)}
                    </span>
                  </div>

                  <CardDescription className="text-sm text-gray-400 leading-relaxed min-h-[72px]">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="pt-6">
                  <Button
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-semibold shadow-[0_8px_24px_rgba(34,197,94,0.28)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <ArrowRight className="w-4 h-4 relative top-[1px]" />
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
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          How StartOva Works
        </motion.h2>

        <motion.p
          variants={fadeInUp}
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
            <motion.div key={index} variants={scaleIn}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.22)] text-center hover:border-purple-400/20 transition-colors">
                <div className="flex justify-center mb-4">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <item.icon className="w-8 h-8 text-green-400" />
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
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight"
        >
          Who This Is Not For
        </motion.h2>

        <motion.p
          variants={fadeInUp}
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
          variants={fadeInUp}
          className="text-center text-gray-400 mt-8 max-w-3xl mx-auto"
        >
          This is not the easiest way to build online. It is the more honest one.
        </motion.p>
      </motion.section>

      <motion.section
        id="final-cta"
        className="relative z-10 max-w-5xl mx-auto px-6 pb-16 text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight"
        >
          Build It Once. Keep It.
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          If you are tired of paying for access to something that never really becomes yours,
          StartOva was built for exactly that frustration.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg h-14 px-8 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-semibold shadow-[0_8px_30px_rgba(34,197,94,0.35)] hover:scale-[1.02] transition-all"
            onClick={handleBrowseProducts}
          >
            <span className="flex items-center justify-center gap-2">
              <span>Start Your Build</span>
              <ArrowRight className="w-5 h-5 relative top-[1px]" />
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleWhatYouGet}
            className="h-14 px-8 rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            See What You Get
          </Button>
        </motion.div>
      </motion.section>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 text-sm text-gray-500 leading-relaxed shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
          StartOva helps entrepreneurs and small business owners build websites and web applications they can fully own.
          Unlike website builders and hosted store platforms, StartOva focuses on real project handoff, code access, GitHub-ready delivery,
          and live deployment so users can launch with more control and less long-term platform dependency.
        </div>
      </section>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 pb-12 pt-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
          <p className="text-sm uppercase tracking-[0.18em] text-gray-400 mb-2">Support</p>
          <a
            href="mailto:support@startova.space"
            className="text-lg md:text-xl font-semibold text-green-400 hover:text-green-300 transition-colors"
          >
            support@startova.space
          </a>
        </div>
      </footer>
    </div>
  );
}

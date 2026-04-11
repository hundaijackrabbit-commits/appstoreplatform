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
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const categories = [
    {
      id: 'landing-page',
      name: 'Landing Pages',
      icon: Globe,
      description: 'Simple pages built to attract leads and start selling fast',
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
      description: 'Professional sites that help you look credible from day one',
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
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 text-2xl font-bold"
          >
            <Sparkles className="w-6 h-6 text-green-400" />
            <span className="bg-gradient-to-r from-white via-green-200 to-purple-200 bg-clip-text text-transparent">
              StartOva
            </span>
          </motion.div>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHowItWorks}
              className="text-white/90 hover:text-white"
            >
              How It Works
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenBlog}
              className="text-white/90 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Blog</span>
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleBrowseCategories}
              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              Browse Categories
            </Button>
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
          Start fresh online with less friction
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-purple-200 bg-clip-text text-transparent leading-tight tracking-tight"
        >
          Start Over.
          <br />
          <span className="text-green-400">Start Online.</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
        >
          StartOva helps you launch a business online without getting buried in technical complexity.
          Choose a website, store, or digital product build, customize what you need, and move from idea to launch with a clear path forward.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="text-lg h-14 px-8 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-semibold shadow-[0_8px_30px_rgba(34,197,94,0.35)] hover:scale-[1.02] transition-all"
            onClick={handleBrowseProducts}
          >
            <span className="flex items-center justify-center gap-2">
              <span>Launch Something New</span>
              <ArrowRight className="w-5 h-5 relative top-[1px]" />
            </span>
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

          <Button
            variant="outline"
            size="lg"
            onClick={handleHowItWorks}
            className="h-14 px-8 rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            See How StartOva Works
          </Button>
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
        >
          <div className="flex items-center justify-center mb-3">
            <Code className="w-6 h-6 text-green-400 mr-2" />
            <span className="text-lg font-semibold text-white">Built for Real Business Launches</span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            StartOva is for people who want a faster way to get online.
            Whether you are starting from scratch, rebuilding, or finally turning an idea into a real business, each project is built with a practical launch-first approach.
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
          These products are designed to make starting online simpler.
          Choose a foundation, customize it to your needs, and move forward faster.
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
          The goal is simple. Remove the confusion, keep the momentum, and help you get online with clarity.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: 'Choose Your Starting Point',
              description: 'Pick the website, store, or digital product that best fits the business you want to launch.',
            },
            {
              icon: Zap,
              title: 'Customize What You Need',
              description: 'Select the features, layout, and add-ons that make sense for your goals without overcomplicating the process.',
            },
            {
              icon: Users,
              title: 'Launch with Confidence',
              description: 'Receive your finished build with a practical handoff so you can move from idea to online presence faster.',
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

      <footer className="relative z-10 max-w-7xl mx-auto px-6 pb-12 pt-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
          <p className="text-sm uppercase tracking-[0.18em] text-gray-400 mb-2">
            Support
          </p>
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
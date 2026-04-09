'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/data/products';
import { formatCurrency, staggerContainer, fadeInUp, scaleIn } from '@/lib/utils';
import { ArrowRight, Code, Globe, Zap, Shield, Users, Star, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const categories = [
    { id: 'landing-page', name: 'Landing Pages', icon: Globe, description: 'Convert visitors into customers' },
    { id: 'saas-tool', name: 'SaaS Tools', icon: Zap, description: 'Full-featured applications' },
    { id: 'ecommerce', name: 'E-commerce', icon: Users, description: 'Complete online stores' },
    { id: 'portfolio', name: 'Portfolios', icon: Star, description: 'Showcase your work' },
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
              AppStore Platform
            </span>
          </motion.div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleHowItWorks} className="text-white/90 hover:text-white">
              How It Works
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
          <Sparkles className="w-4 h-4" />
          Premium custom builds with fast delivery
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-purple-200 bg-clip-text text-transparent leading-tight tracking-tight"
        >
          Your Digital Product
          <br />
          <span className="text-green-400">Built to Order</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Premium web applications crafted just for you. Launch faster with a polished build process,
          clear delivery workflow, and production-ready handoff.
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
            onClick={handleHowItWorks}
            className="h-14 px-8 rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            How It Works
          </Button>
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
        >
          <div className="flex items-center justify-center mb-3">
            <Code className="w-6 h-6 text-green-400 mr-2" />
            <span className="text-lg font-semibold text-white">Real Build Process</span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Each product enters our build queue where real developers craft your application.
            Delivery times: <span className="text-green-400 font-semibold">2–48 hours</span> depending on complexity.
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
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white tracking-tight"
        >
          What Would You Like to Build?
        </motion.h2>

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
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white tracking-tight"
        >
          Featured Products
        </motion.h2>

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

                <CardContent className="pt-0">
                  <div className="flex items-center space-x-2 text-sm text-gray-300 mb-5">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span>Build Time: {product.buildTime.display}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-6">
                  <Button
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-semibold shadow-[0_8px_24px_rgba(34,197,94,0.28)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <ArrowRight className="w-4 h-4 relative top-[1px]" />
                    <span>Customize &amp; Order</span>
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
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white tracking-tight"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: 'Choose Your Product',
              description: 'Pick the website or app type that matches your business goal.',
            },
            {
              icon: Zap,
              title: 'Customize and Order',
              description: 'Select your options, features, and add-ons, then place your order.',
            },
            {
              icon: Users,
              title: 'Receive and Launch',
              description: 'Download your finished project and deploy it live with the included guidance.',
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
    </div>
  );
}
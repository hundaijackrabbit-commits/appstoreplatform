'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/data/products';
import { formatCurrency } from '@/lib/utils';
import { staggerContainer, fadeInUp, scaleIn } from '@/lib/utils';
import { ArrowRight, Code, Globe, Zap, Shield, Users, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  
  const categories = [
    { id: 'landing-page', name: 'Landing Pages', icon: Globe, description: 'Convert visitors into customers' },
    { id: 'saas-tool', name: 'SaaS Tools', icon: Zap, description: 'Full-featured applications' },
    { id: 'ecommerce', name: 'E-commerce', icon: Users, description: 'Complete online stores' },
    { id: 'portfolio', name: 'Portfolios', icon: Star, description: 'Showcase your work' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent"
          >
            AppStore Platform
          </motion.div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              How It Works
            </Button>
            <Button variant="outline" size="sm">
              Browse Categories
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20 text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-purple-200 bg-clip-text text-transparent leading-tight"
        >
          Your Digital Product
          <br />
          <span className="text-green-400">Built to Order</span>
        </motion.h1>
        
        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Premium web applications crafted just for you. Watch your idea come to life with our build queue system.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="text-lg">
            Browse Products <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg">
            How It Works
          </Button>
        </motion.div>

        {/* Build Time Notice */}
        <motion.div
          variants={scaleIn}
          className="glass rounded-lg p-6 max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center mb-3">
            <Code className="w-6 h-6 text-green-400 mr-2" />
            <span className="text-lg font-semibold text-white">Real Build Process</span>
          </div>
          <p className="text-gray-300">
            Each product enters our build queue where real developers craft your application. 
            Delivery times: <span className="text-green-400 font-medium">2-48 hours</span> depending on complexity.
          </p>
        </motion.div>
      </motion.section>

      {/* Categories */}
      <motion.section
        className="relative z-10 max-w-7xl mx-auto px-6 pb-16"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl font-bold text-center mb-12 text-white"
        >
          What Would You Like to Build?
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => (
            <motion.div key={category.id} variants={scaleIn}>
              <Card className="h-full cursor-pointer hover:glow-accent group">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <category.icon className="w-12 h-12 text-green-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl font-bold text-center mb-12 text-white"
        >
          Featured Products
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 6).map((product) => (
            <motion.div key={product.id} variants={scaleIn}>
              <Card className="h-full group cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="group-hover:text-green-400 transition-colors">
                      {product.name}
                    </CardTitle>
                    <span className="text-green-400 font-bold text-lg">
                      {formatCurrency(product.basePrice)}
                    </span>
                  </div>
                  <CardDescription className="text-sm">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
                    <Zap className="w-4 h-4" />
                    <span>Build Time: {product.buildTime.display}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {product.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 rounded-md text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full group-hover:glow-primary cursor-pointer" 
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    Customize & Order
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Trust Indicators */}
      <motion.section
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Enterprise Security", description: "Bank-grade security and privacy protection" },
            { icon: Zap, title: "Real Build Process", description: "Actual development work, not template generation" },
            { icon: Users, title: "Expert Developers", description: "Seasoned professionals craft your application" }
          ].map((item, index) => (
            <motion.div key={index} variants={scaleIn}>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <item.icon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

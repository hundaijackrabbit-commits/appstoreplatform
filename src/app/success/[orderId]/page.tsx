'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { loadOrder, updateOrderStatus } from '@/lib/orders';
import { getProductById } from '@/data/products';
import { formatCurrency, formatDate } from '@/lib/utils';
import { fadeInUp, scaleIn } from '@/lib/utils';
import { 
  Download, 
  CheckCircle, 
  Github, 
  Globe, 
  ExternalLink, 
  ArrowRight,
  Copy,
  Check,
  Rocket,
  FileText,
  Code,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import type { Order } from '@/types';

export default function SuccessPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  useEffect(() => {
    if (params.orderId) {
      const foundOrder = loadOrder(params.orderId as string);
      if (foundOrder) {
        setOrder(foundOrder);
        // Mark as delivered if not already
        if (foundOrder.status !== 'delivered') {
          updateOrderStatus(foundOrder.id, 'delivered');
        }
      }
    }
  }, [params.orderId]);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      // In a real app, this would trigger the actual file download
      alert('Download started! Your project files are being prepared...');
    }, 2000);
  };

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Order Not Found</h1>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const product = getProductById(order.productConfiguration.productId);

  const deploymentSteps = [
    {
      title: "Create a free GitHub account",
      description: "Go to GitHub.com and sign up for a free account if you don't have one",
      link: "https://github.com",
      command: null
    },
    {
      title: "Upload your project files",
      description: "Create a new repository and upload the downloaded files",
      link: null,
      command: null
    },
    {
      title: "Go to Vercel and sign up with GitHub",
      description: "Visit Vercel.com and connect your GitHub account",
      link: "https://vercel.com",
      command: null
    },
    {
      title: "Click \"Import Project\"",
      description: "Find your repository and click the import button",
      link: null,
      command: null
    },
    {
      title: "Select your repository",
      description: "Choose the repo you created in step 2",
      link: null,
      command: null
    },
    {
      title: "Click \"Deploy\"",
      description: "Vercel will automatically build and deploy your site",
      link: null,
      command: null
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10" />
      
      {/* Celebration Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/30 rounded-full blur-xl animate-pulse glow-accent" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-yellow-500/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <CheckCircle className="w-20 h-20 text-green-400 glow-primary" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute inset-0 bg-green-400 rounded-full opacity-20"
              />
            </motion.div>
          </div>
          
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-5xl font-bold text-white mb-4"
          >
            🎉 Your Project is Ready!
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-2"
          >
            {product?.name} has been built and is ready for download
          </motion.p>
          
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-gray-400"
          >
            Order ID: {order.id}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Download Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card glass glow className="h-fit">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Download className="w-8 h-8 text-green-400" />
                </div>
                <CardTitle className="text-2xl">Download Your Project</CardTitle>
                <CardDescription>
                  Get your complete project files with all customizations
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={handleDownload}
                    isLoading={isDownloading}
                    className="w-full text-lg py-4"
                  >
                    {isDownloading ? (
                      'Preparing Download...'
                    ) : (
                      <>
                        <Download className="mr-2 w-5 h-5" />
                        Download Project (.zip)
                      </>
                    )}
                  </Button>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-white flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    What's Included:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Complete source code</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>All your customizations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Setup and build instructions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Deployment configuration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Documentation and README</span>
                    </li>
                  </ul>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-600 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Project:</span>
                    <span className="text-white">{product?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Paid:</span>
                    <span className="text-green-400 font-semibold">
                      {formatCurrency(order.productConfiguration.totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Completed:</span>
                    <span className="text-white">
                      {order.actualCompletionAt ? formatDate(order.actualCompletionAt) : 'Just now'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Deployment Guide */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card glass className="h-fit">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Rocket className="w-8 h-8 text-purple-400" />
                </div>
                <CardTitle className="text-2xl">Launch Your Website</CardTitle>
                <CardDescription>
                  Make your website live online using GitHub and Vercel
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center mb-6">
                  <p className="text-blue-300 font-medium">
                    ✨ Free deployment with unlimited bandwidth
                  </p>
                  <p className="text-blue-200 text-sm mt-1">
                    Your site will be live in under 5 minutes
                  </p>
                </div>

                <div className="space-y-4">
                  {deploymentSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{step.title}</h4>
                          <p className="text-gray-300 text-sm mt-1">{step.description}</p>
                          
                          {step.link && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => window.open(step.link!, '_blank')}
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Visit {step.link.includes('github') ? 'GitHub' : 'Vercel'}
                            </Button>
                          )}
                          
                          {step.command && (
                            <div className="mt-2 flex items-center space-x-2">
                              <code className="bg-gray-800 px-2 py-1 rounded text-sm text-green-400 flex-1">
                                {step.command}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(step.command!, index)}
                                className="p-1"
                              >
                                {copiedStep === index ? (
                                  <Check className="w-3 h-3 text-green-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-white mb-2 flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Need Help?
                  </h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Your download includes detailed setup instructions and troubleshooting guides.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText className="w-3 h-3 mr-1" />
                      Documentation
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Video Tutorial
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Card glass>
            <CardContent className="py-6">
              <h3 className="text-xl font-semibold text-white mb-4">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center space-y-2">
                  <Download className="w-6 h-6 text-green-400 mx-auto" />
                  <p className="font-medium text-white">Download & Extract</p>
                  <p className="text-gray-400 text-sm">Get your project files and unzip them</p>
                </div>
                <div className="text-center space-y-2">
                  <Github className="w-6 h-6 text-purple-400 mx-auto" />
                  <p className="font-medium text-white">Upload to GitHub</p>
                  <p className="text-gray-400 text-sm">Create a repository and upload your files</p>
                </div>
                <div className="text-center space-y-2">
                  <Globe className="w-6 h-6 text-blue-400 mx-auto" />
                  <p className="font-medium text-white">Deploy to Vercel</p>
                  <p className="text-gray-400 text-sm">Get your public website URL instantly</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <Button variant="outline">
                    Browse More Products
                  </Button>
                </Link>
                <Button 
                  onClick={() => window.open('mailto:support@appstoreplatform.com', '_blank')}
                  variant="ghost"
                >
                  Need Support?
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
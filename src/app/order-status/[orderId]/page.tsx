'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { loadOrder, formatTimeRemaining, getOrderProgress, simulateOrderProgress } from '@/lib/orders';
import { getProductById } from '@/data/products';
import { formatCurrency, formatDate } from '@/lib/utils';
import { HUMOROUS_MESSAGES } from '@/types';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  Loader2, 
  Package, 
  Coffee,
  Zap,
  Download,
  ExternalLink 
} from 'lucide-react';
import Link from 'next/link';
import type { Order } from '@/types';

export default function OrderStatusPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (params.orderId) {
      const foundOrder = loadOrder(params.orderId as string);
      if (foundOrder) {
        setOrder(foundOrder);
        
        // If order is complete, redirect to success page
        if (foundOrder.status === 'ready') {
          router.push(`/success/${foundOrder.id}`);
          return;
        }
        
        // Set up auto-refresh for order status
        const interval = setInterval(() => {
          const updatedOrder = loadOrder(params.orderId as string);
          if (updatedOrder) {
            setOrder(updatedOrder);
            if (updatedOrder.status === 'ready') {
              clearInterval(interval);
              router.push(`/success/${updatedOrder.id}`);
            }
          }
          
          // Continue simulating progress if not ready
          if (updatedOrder && updatedOrder.status !== 'ready') {
            simulateOrderProgress(updatedOrder.id);
          }
        }, 3000);
        
        setRefreshInterval(interval);
      }
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [params.orderId, router]);

  // Rotate humorous messages
  useEffect(() => {
    if (order && order.status !== 'ready') {
      const messageInterval = setInterval(() => {
        setCurrentMessageIndex(prev => (prev + 1) % HUMOROUS_MESSAGES.length);
      }, 4000);

      return () => clearInterval(messageInterval);
    }
  }, [order]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Order Not Found</h1>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const product = getProductById(order.productConfiguration.productId);
  const progress = getOrderProgress(order.status);

  const statusIcons = {
    queued: Loader2,
    building: Coffee,
    optimizing: Zap,
    finalizing: Package,
    ready: CheckCircle,
    delivered: Download
  };

  const StatusIcon = statusIcons[order.status];

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        
        {/* Order Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Your Build is in Progress</h1>
          <p className="text-xl text-gray-300">Order ID: {order.id}</p>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Card glass glow className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <StatusIcon 
                  className={`w-12 h-12 ${
                    order.status === 'ready' ? 'text-green-400' : 'text-purple-400 animate-spin'
                  }`} 
                />
              </div>
              <CardTitle className="text-3xl capitalize text-white">
                {order.status === 'queued' && 'In Queue'}
                {order.status === 'building' && 'Building'}
                {order.status === 'optimizing' && 'Optimizing'}
                {order.status === 'finalizing' && 'Finalizing'}
                {order.status === 'ready' && 'Ready!'}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-purple-400 progress-shimmer"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Current Message */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg text-white font-medium"
                >
                  {order.currentMessage || HUMOROUS_MESSAGES[currentMessageIndex]}
                </motion.div>
              </AnimatePresence>

              {/* Time Remaining */}
              <div className="flex items-center justify-center space-x-2 text-gray-300">
                <Clock className="w-4 h-4" />
                <span>{formatTimeRemaining(order.estimatedCompletionAt)}</span>
              </div>

              {/* Safe to Leave Notice */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                <p className="text-blue-300 font-medium">
                  ✨ You can safely leave this page — your project will continue building.
                </p>
                <p className="text-blue-200 text-sm mt-1">
                  Bookmark this page or save the order ID to check back later.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Product Info */}
          <Card glass>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white">{product?.name}</h4>
                <p className="text-gray-300 text-sm">{product?.description}</p>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Total Price:</span>
                <span className="font-semibold text-green-400">
                  {formatCurrency(order.productConfiguration.totalPrice)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Order Date:</span>
                <span className="text-white">{formatDate(order.createdAt)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Est. Completion:</span>
                <span className="text-white">{formatDate(order.estimatedCompletionAt)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Build Stages */}
          <Card glass>
            <CardHeader>
              <CardTitle>Build Stages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { key: 'queued', label: 'Queued', icon: Loader2 },
                  { key: 'building', label: 'Building', icon: Coffee },
                  { key: 'optimizing', label: 'Optimizing', icon: Zap },
                  { key: 'finalizing', label: 'Finalizing', icon: Package },
                  { key: 'ready', label: 'Ready', icon: CheckCircle },
                ].map((stage, index) => {
                  const statusOrder = ['queued', 'building', 'optimizing', 'finalizing', 'ready'];
                  const currentIndex = statusOrder.indexOf(order.status);
                  const stageIndex = statusOrder.indexOf(stage.key);
                  const isCompleted = stageIndex <= currentIndex;
                  const isCurrent = stageIndex === currentIndex;
                  
                  return (
                    <div key={stage.key} className="flex items-center space-x-3">
                      <stage.icon 
                        className={`w-5 h-5 ${
                          isCompleted 
                            ? 'text-green-400' 
                            : isCurrent 
                            ? 'text-purple-400 animate-spin' 
                            : 'text-gray-600'
                        }`} 
                      />
                      <span className={`${
                        isCompleted ? 'text-green-400' : isCurrent ? 'text-white' : 'text-gray-400'
                      }`}>
                        {stage.label}
                      </span>
                      {isCompleted && stageIndex < currentIndex && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="glass rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <Coffee className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-white font-medium">Development</p>
                <p className="text-gray-400">Our team builds your custom application</p>
              </div>
              <div className="text-center">
                <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-medium">Testing & Optimization</p>
                <p className="text-gray-400">Quality assurance and performance tuning</p>
              </div>
              <div className="text-center">
                <Download className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-white font-medium">Delivery</p>
                <p className="text-gray-400">Download your completed project files</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProductById } from '@/data/products';
import { formatCurrency, formatDate, fadeInUp } from '@/lib/utils';
import {
  CheckCircle,
  Globe,
  ExternalLink,
  Rocket,
  FileText,
  FolderGit2,
  Download,
} from 'lucide-react';

type SuccessOrder = {
  id: string;
  status: string;
  productId: string;
  productName: string;
  totalPrice: number;
  zipUrl: string;
  repoUrl: string;
  deliveryNotes: string;
  selectedAddons: string[];
  currentMessage: string;
  createdAt: string | null;
};

export default function SuccessPage() {
  const params = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<SuccessOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!params.orderId) return;

      setIsLoading(true);
      setNotFound(false);

      try {
        const res = await fetch(`/api/orders/${params.orderId}`, {
          cache: 'no-store',
        });

        const data = await res.json();

        if (data.success && data.order) {
          setOrder(data.order);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Failed to fetch success order:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [params.orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading delivery...</h1>
          <p className="text-gray-300">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Delivery Not Found</h1>
          <Button variant="outline" onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const product = order.productId ? getProductById(order.productId) : null;

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/30 rounded-full blur-xl animate-pulse glow-accent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-400 glow-primary" />
          </div>

          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-5xl font-bold text-white mb-4"
          >
            🎉 Your StartOva Build is Ready
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-xl text-gray-300 mb-2"
          >
            {product?.name || order.productName} is ready. You can now launch your business online.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-gray-400"
          >
            Order ID: {order.id}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-black/30 border border-white/10 text-white">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Download className="w-8 h-8 text-green-400" />
              </div>
              <CardTitle className="text-2xl">Your StartOva Package</CardTitle>
              <CardDescription>
                Everything you need to go live is included below
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Button
                size="lg"
                className="w-full"
                disabled={!order.zipUrl}
                onClick={() => order.zipUrl && window.open(order.zipUrl, '_blank')}
              >
                <Download className="mr-2 w-5 h-5" />
                {order.zipUrl ? 'Download Your Project Files' : 'ZIP not added yet'}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full"
                disabled={!order.repoUrl}
                onClick={() => order.repoUrl && window.open(order.repoUrl, '_blank')}
              >
                <FolderGit2 className="mr-2 w-5 h-5" />
                {order.repoUrl ? 'Open GitHub Repository' : 'Repo not added yet'}
              </Button>

              <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Project:</span>
                  <span>{product?.name || order.productName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Paid:</span>
                  <span className="text-green-400 font-semibold">
                    {formatCurrency(order.totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Completed:</span>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border border-white/10 text-white">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Rocket className="w-8 h-8 text-purple-400" />
              </div>
              <CardTitle className="text-2xl">Launch Instructions</CardTitle>
              <CardDescription>
                Steps to get your project live quickly
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-4 whitespace-pre-wrap text-gray-200">
                {order.deliveryNotes || 'No delivery notes have been added yet.'}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => order.repoUrl && window.open(order.repoUrl, '_blank')}
                  disabled={!order.repoUrl}
                >
                  <ExternalLink className="mr-2 w-4 h-4" />
                  Open Repo
                </Button>

                <Button
                  variant="outline"
                  onClick={() => order.zipUrl && window.open(order.zipUrl, '_blank')}
                  disabled={!order.zipUrl}
                >
                  <FileText className="mr-2 w-4 h-4" />
                  Open ZIP Link
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => window.open('mailto:support@startova.space', '_blank')}
                >
                  <Globe className="mr-2 w-4 h-4" />
                  Contact StartOva Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
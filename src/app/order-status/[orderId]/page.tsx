'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getOrderProgress } from '@/lib/orders';
import { getProductById } from '@/data/products';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  Package,
  AlertCircle,
  Info,
} from 'lucide-react';
import type { Order } from '@/types';

export default function OrderStatusPage() {
  const params = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
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

        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          throw new Error('API did not return JSON');
        }

        const data = await res.json();

        if (data.success && data.order) {
          const airtableOrder = data.order;

          const formattedOrder: Order = {
  id: airtableOrder.id,
  status: airtableOrder.status,
  createdAt:
    airtableOrder.createdAt && !Number.isNaN(new Date(airtableOrder.createdAt).getTime())
      ? new Date(airtableOrder.createdAt).toISOString()
      : new Date().toISOString(),
  currentMessage: airtableOrder.currentMessage || '',
  progressMessages: [],
  estimatedCompletionAt: null,
  actualCompletionAt: null,
  productConfiguration: {
    productId: airtableOrder.productId || '',
    selectedAddons: airtableOrder.selectedAddons || [],
    totalPrice: airtableOrder.totalPrice || 0,
  },
};

          setOrder(formattedOrder);

          if (
            airtableOrder.status === 'ready_for_delivery' ||
            airtableOrder.status === 'delivered'
          ) {
            router.push(`/success/${airtableOrder.id}`);
            return;
          }
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Failed to fetch order:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [params.orderId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10 pointer-events-none" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading Order...</h1>
          <p className="text-gray-300">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10 pointer-events-none" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Order Not Found</h1>
          <Button variant="outline" onClick={() => router.push('/')}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const product = order.productConfiguration.productId
    ? getProductById(order.productConfiguration.productId)
    : null;

  const progress = getOrderProgress(order.status);

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Order Received', icon: FileText, color: 'text-blue-400' };
      case 'reviewing':
        return { label: 'Under Review', icon: AlertCircle, color: 'text-yellow-400' };
      case 'approved_to_build':
        return { label: 'Approved to Build', icon: CheckCircle, color: 'text-green-400' };
      case 'building':
        return { label: 'Building', icon: Package, color: 'text-purple-400' };
      case 'finalizing':
        return { label: 'Finalizing', icon: CheckCircle, color: 'text-green-400' };
      default:
        return { label: 'Pending', icon: FileText, color: 'text-blue-400' };
    }
  };

  const statusDisplay = getStatusDisplay(order.status);
  const StatusIcon = statusDisplay.icon;

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10 pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <nav className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Order Status</h1>
          <p className="text-xl text-gray-300">Order ID: {order.id}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Card glass glow className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <StatusIcon className={`w-12 h-12 ${statusDisplay.color}`} />
              </div>
              <CardTitle className={`text-3xl ${statusDisplay.color}`}>
                {statusDisplay.label}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <div className="text-lg text-white font-medium">
                {order.currentMessage || 'Your order has been received and is being processed.'}
              </div>

              {order.status === 'pending' && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <h4 className="font-semibold text-blue-300 mb-2">What happens next?</h4>
                      <ul className="text-blue-200 text-sm space-y-1">
                        <li>• Our team will review your order and requirements</li>
                        <li>• We&apos;ll confirm project scope and timeline</li>
                        <li>• You&apos;ll receive updates as we progress</li>
                        <li>• Estimated review time: 24-48 hours</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {order.status === 'reviewing' && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <h4 className="font-semibold text-yellow-300 mb-2">Under Review</h4>
                      <p className="text-yellow-200 text-sm">
                        Our team is currently reviewing your project requirements and will
                        update the status once approved.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                <p className="text-green-300 font-medium">
                  ✨ You can safely leave this page — we&apos;ll keep track of your order.
                </p>
                <p className="text-green-200 text-sm mt-1">
                  Bookmark this page or save the order ID to check back later.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card glass>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white">{product?.name || 'Custom Project'}</h4>
                <p className="text-gray-300 text-sm">
                  {product?.description || 'Your project has been received and queued for review.'}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Price:</span>
                  <span className="text-white">
                    {product ? formatCurrency(product.basePrice) : '-'}
                  </span>
                </div>

                {product && order.productConfiguration.selectedAddons.length > 0 && (
                  <div className="space-y-1">
                    {order.productConfiguration.selectedAddons.map((addonId) => {
                      const addon = product.addons.find((a) => a.id === addonId);
                      if (!addon) return null;
                      return (
                        <div key={addonId} className="flex justify-between text-sm">
                          <span className="text-gray-400">+ {addon.name}:</span>
                          <span className="text-green-400">+{formatCurrency(addon.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-between pt-2 border-t border-gray-600">
                  <span className="text-gray-400">Total Price:</span>
                  <span className="font-semibold text-green-400">
                    {formatCurrency(order.productConfiguration.totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Order Date:</span>
                <span className="text-white">
  {order.createdAt ? formatDate(order.createdAt) : 'Just now'}
</span>
              </div>
            </CardContent>
          </Card>

          <Card glass>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { key: 'pending', label: 'Order Received', icon: FileText },
                  { key: 'reviewing', label: 'Under Review', icon: AlertCircle },
                  { key: 'approved_to_build', label: 'Approved to Build', icon: CheckCircle },
                  { key: 'building', label: 'Building', icon: Package },
                  { key: 'finalizing', label: 'Finalizing', icon: CheckCircle },
                  { key: 'ready_for_delivery', label: 'Ready for Delivery', icon: CheckCircle },
                ].map((stage) => {
                  const statusOrder = [
                    'pending',
                    'reviewing',
                    'approved_to_build',
                    'building',
                    'finalizing',
                    'ready_for_delivery',
                  ];
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
                              ? 'text-purple-400'
                              : 'text-gray-600'
                        }`}
                      />
                      <span
                        className={`${
                          isCompleted
                            ? 'text-green-400'
                            : isCurrent
                              ? 'text-white'
                              : 'text-gray-400'
                        }`}
                      >
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
      </div>
    </div>
  );
}
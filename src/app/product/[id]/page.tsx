'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProductById, calculatePrice } from '@/data/products';
import { formatCurrency } from '@/lib/utils';
import { scaleIn } from '@/lib/utils';
import {
  ArrowLeft,
  Clock,
  Code,
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    if (params.id) {
      const foundProduct = getProductById(params.id as string);
      if (foundProduct) {
        setProduct(foundProduct);
        setTotalPrice(foundProduct.basePrice);
      }
    }
  }, [params.id]);

  useEffect(() => {
    if (product) {
      setTotalPrice(calculatePrice(product, selectedAddons));
    }
  }, [product, selectedAddons]);

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleOrder = async () => {
    if (!product) return;

    setIsOrdering(true);

    try {
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          selectedAddons,
        }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        window.location.href = data.url;
        return;
      }

      alert(data.error || 'Failed to start checkout');
    } catch (error) {
      console.error(error);
      alert('Something went wrong starting checkout');
    } finally {
      setIsOrdering(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-[#0a0a14]">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10 pointer-events-none" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Button variant="outline" onClick={() => router.push('/')}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const addonsTotal = totalPrice - product.basePrice;

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

      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            className="text-white/90 hover:text-white"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Products
          </Button>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1.5 text-xs text-green-200 mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                Premium custom build
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {product.name}
              </h1>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-gray-200">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span>Build Time: {product.buildTime.display}</span>
                </div>

                <div className="flex items-start space-x-3 text-gray-200">
                  <Code className="w-5 h-5 text-purple-400 mt-0.5" />
                  <span>Tech Stack: {product.techStack.join(', ')}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Included Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2.5">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div variants={scaleIn} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
              <div className="flex items-center mb-3">
                <Zap className="w-6 h-6 text-green-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Your Build Process</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Once you place your order, it enters our review queue. We&apos;ll evaluate your
                requirements and provide updates on the build timeline. You can safely leave this
                page — we&apos;ll keep track of your order status.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="sticky top-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.30)] overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-2 gap-3">
                  <h3 className="text-xl font-semibold text-white">Checkout Summary</h3>
                  <span className="text-xs rounded-full border border-green-400/20 bg-green-400/10 px-2.5 py-1 text-green-300 shrink-0">
                    Secure Checkout
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Start with the base build, then add the extras you want before checkout.
                </p>
              </div>

              <CardContent className="p-6 space-y-6">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-semibold text-white">Base Product</h4>
                      <p className="text-sm text-gray-400 mt-1">All core features included</p>
                    </div>
                    <span className="text-green-400 font-bold text-xl shrink-0">
                      {formatCurrency(product.basePrice)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Optional Add-ons</h4>

                  {product.addons.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);

                    return (
                      <label
                        key={addon.id}
                        className={`flex items-start gap-4 rounded-xl border px-4 py-4 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-green-400/30 bg-green-400/10 shadow-[0_8px_24px_rgba(34,197,94,0.08)]'
                            : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleAddonToggle(addon.id)}
                          className="mt-1 h-5 w-5 rounded border-white/20 bg-transparent accent-green-400"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-white font-medium leading-tight">
                                {addon.name}
                              </div>
                              <div className="text-sm text-gray-400 mt-1">
                                {addon.description}
                              </div>
                            </div>

                            <div className="shrink-0 text-green-400 font-semibold">
                              +{formatCurrency(addon.price)}
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="mt-2 border-t border-white/10 pt-5 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Base Price</span>
                    <span className="text-white font-medium">
                      {formatCurrency(product.basePrice)}
                    </span>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Add-ons</span>
                      <span className="text-green-400 font-medium">
                        +{formatCurrency(addonsTotal)}
                      </span>
                    </div>
                  )}

                  <div className="h-px bg-white/10" />

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Total</div>
                      <div className="text-xs text-gray-500 mt-1">One-time payment</div>
                    </div>

                    <div className="text-4xl font-bold text-green-400 tracking-tight">
                      {formatCurrency(totalPrice)}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-semibold shadow-[0_8px_24px_rgba(34,197,94,0.28)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    onClick={handleOrder}
                    disabled={isOrdering}
                  >
                    <span>Order Now</span>
                    <span className="text-black/80 text-sm font-medium">
                      {formatCurrency(totalPrice)}
                    </span>
                  </Button>
                </div>

                <div className="pt-1 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-2">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span>Secure payment powered by Stripe</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Your project enters our build queue immediately after checkout and review.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
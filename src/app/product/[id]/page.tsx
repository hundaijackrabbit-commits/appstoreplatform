'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProductById, calculatePrice } from '@/data/products';
import { formatCurrency } from '@/lib/utils';
import { fadeInUp, scaleIn } from '@/lib/utils';
import { ArrowLeft, Clock, Code, Check, ShoppingCart, Zap, Plus } from 'lucide-react';
import type { Product, ProductConfiguration } from '@/types';

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
    setSelectedAddons(prev => 
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleOrder = async () => {
  if (!product) return;

  setIsOrdering(true);

  try {
    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product.id,
        productName: product.name,
        totalPrice: totalPrice,
        selectedAddons: selectedAddons,
      }),
    });

    const data = await response.json();

    if (data.success) {
      router.push(`/order-status/${data.orderId}`);
    } else {
      alert('Failed to create order');
      setIsOrdering(false);
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong');
    setIsOrdering(false);
  }
};

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
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

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Products
          </Button>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="glass rounded-xl p-8">
              <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
              <p className="text-xl text-gray-300 mb-6">{product.description}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-white">Build Time: {product.buildTime.display}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Tech Stack: {product.techStack.join(', ')}</span>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Included Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Build Process Info */}
            <motion.div
              variants={scaleIn}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center mb-3">
                <Zap className="w-6 h-6 text-green-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Your Build Process</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Once you place your order, it enters our review queue. 
                We'll evaluate your requirements and provide updates on the build timeline. 
                You can safely leave this page - we'll keep track of your order status.
              </p>
            </motion.div>
          </motion.div>

          {/* Pricing Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card glass className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Customize Your {product.name}
                </CardTitle>
                <CardDescription className="text-center">
                  Start with the base product and add optional features
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Base Price */}
                <div className="border-b border-gray-600 pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white">Base Product</h4>
                      <p className="text-sm text-gray-400">All core features included</p>
                    </div>
                    <span className="text-green-400 font-bold text-lg">
                      {formatCurrency(product.basePrice)}
                    </span>
                  </div>
                </div>

                {/* Add-ons */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Optional Add-ons</h4>
                  
                  {product.addons.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    
                    return (
                      <motion.div
                        key={addon.id}
                        whileHover={{ scale: 1.02 }}
                        className={`
                          p-4 rounded-lg border cursor-pointer transition-all duration-200
                          ${isSelected 
                            ? 'border-green-400 bg-green-500/10 glow-primary' 
                            : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                          }
                        `}
                        onClick={() => handleAddonToggle(addon.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className={`
                                w-5 h-5 rounded border-2 flex items-center justify-center
                                ${isSelected 
                                  ? 'border-green-400 bg-green-400' 
                                  : 'border-gray-400'
                                }
                              `}>
                                {isSelected && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <div>
                                <span className={`font-medium ${isSelected ? 'text-green-400' : 'text-white'}`}>
                                  {addon.name}
                                </span>
                                <span className="text-green-400 font-medium ml-2">
                                  +{formatCurrency(addon.price)}
                                </span>
                              </div>
                            </div>
                            {addon.description && (
                              <p className="text-xs text-gray-400 mt-1 ml-8">{addon.description}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Price Summary */}
                <div className="border-t border-gray-600 pt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Base Price:</span>
                    <span className="text-white">{formatCurrency(product.basePrice)}</span>
                  </div>
                  
                  {selectedAddons.length > 0 && (
                    <div className="space-y-2">
                      {selectedAddons.map(addonId => {
                        const addon = product.addons.find(a => a.id === addonId);
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
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-600">
                    <span className="text-lg font-semibold text-white">Total Price:</span>
                    <span className="text-2xl font-bold text-green-400">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Order Button */}
                <Button 
                  className="w-full text-lg py-4"
                  size="lg"
                  onClick={handleOrder}
                  isLoading={isOrdering}
                  disabled={isOrdering}
                >
                  {isOrdering ? (
                    'Creating Order...'
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 w-5 h-5" />
                      Order Now - {formatCurrency(totalPrice)}
                    </>
                  )}
                </Button>
                
                <p className="text-center text-xs text-gray-400 mt-3">
                  Your project will be reviewed and entered into our build queue
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
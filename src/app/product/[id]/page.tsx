'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProductById, calculatePrice } from '@/data/products';
import { createOrder, saveOrder, startOrderSimulation } from '@/lib/orders';
import { formatCurrency } from '@/lib/utils';
import { fadeInUp, scaleIn } from '@/lib/utils';
import { ArrowLeft, Clock, Code, Check, ShoppingCart, Zap } from 'lucide-react';
import Link from 'next/link';
import type { Product, ProductConfiguration } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [customizations, setCustomizations] = useState<Record<string, string | string[]>>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    if (params.id) {
      const foundProduct = getProductById(params.id as string);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Initialize with required options
        const initialCustomizations: Record<string, string | string[]> = {};
        foundProduct.customizationOptions.forEach(group => {
          if (group.required && group.options.length > 0) {
            if (group.multiple) {
              initialCustomizations[group.id] = [group.options[0].id];
            } else {
              initialCustomizations[group.id] = group.options[0].id;
            }
          }
        });
        setCustomizations(initialCustomizations);
        setTotalPrice(calculatePrice(foundProduct, initialCustomizations));
      }
    }
  }, [params.id]);

  useEffect(() => {
    if (product) {
      setTotalPrice(calculatePrice(product, customizations));
    }
  }, [product, customizations]);

  const handleCustomizationChange = (groupId: string, optionId: string, isMultiple: boolean) => {
    setCustomizations(prev => {
      if (isMultiple) {
        const currentValues = Array.isArray(prev[groupId]) ? prev[groupId] as string[] : [];
        const newValues = currentValues.includes(optionId)
          ? currentValues.filter(id => id !== optionId)
          : [...currentValues, optionId];
        return { ...prev, [groupId]: newValues };
      } else {
        return { ...prev, [groupId]: optionId };
      }
    });
  };

  const handleOrder = async () => {
    if (!product) return;
    
    setIsOrdering(true);
    
    const productConfiguration: ProductConfiguration = {
      productId: product.id,
      customizations,
      totalPrice
    };

    const order = createOrder(productConfiguration);
    saveOrder(order);
    
    // Start build simulation
    startOrderSimulation(order.id);
    
    // Simulate order processing
    setTimeout(() => {
      setIsOrdering(false);
      router.push(`/order-status/${order.id}`);
    }, 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
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

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10" />

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Products
            </Button>
          </Link>
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
                Once you place your order, your project enters our build queue. 
                Our developers will craft your application using the customizations you select below. 
                You'll receive updates throughout the process and can track progress in real-time.
              </p>
            </motion.div>
          </motion.div>

          {/* Customization Panel */}
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
                  Choose your preferences below to build your perfect application
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {product.customizationOptions.map((group) => (
                  <motion.div
                    key={group.id}
                    variants={fadeInUp}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white">
                        {group.name}
                        {group.required && <span className="text-red-400 ml-1">*</span>}
                      </h4>
                      {group.description && (
                        <span className="text-xs text-gray-400">{group.description}</span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {group.options.map((option) => {
                        const isSelected = group.multiple
                          ? (customizations[group.id] as string[])?.includes(option.id)
                          : customizations[group.id] === option.id;

                        return (
                          <motion.div
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            className={`
                              p-3 rounded-lg border cursor-pointer transition-all duration-200
                              ${isSelected 
                                ? 'border-green-400 bg-green-500/10 glow-primary' 
                                : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                              }
                            `}
                            onClick={() => handleCustomizationChange(group.id, option.id, group.multiple || false)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className={`font-medium ${isSelected ? 'text-green-400' : 'text-white'}`}>
                                    {option.name}
                                  </span>
                                  {option.priceModifier !== 0 && (
                                    <span className={`text-sm ${option.priceModifier > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                      {option.priceModifier > 0 ? '+' : ''}{formatCurrency(option.priceModifier)}
                                    </span>
                                  )}
                                </div>
                                {option.description && (
                                  <p className="text-xs text-gray-400 mt-1">{option.description}</p>
                                )}
                              </div>
                              {isSelected && (
                                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}

                {/* Price Summary */}
                <div className="border-t border-gray-600 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-white">Total Price</span>
                    <span className="text-2xl font-bold text-green-400">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>

                  <Button 
                    className="w-full text-lg py-4"
                    size="lg"
                    onClick={handleOrder}
                    isLoading={isOrdering}
                    disabled={isOrdering}
                  >
                    {isOrdering ? (
                      'Processing Order...'
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 w-5 h-5" />
                        Order Now - {formatCurrency(totalPrice)}
                      </>
                    )}
                  </Button>
                  
                  <p className="text-center text-xs text-gray-400 mt-3">
                    Your project will enter the build queue immediately after payment
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
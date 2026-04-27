'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Mail, User, MessageSquare, Send } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';

interface LeadCaptureFormProps {
  product: Product;
  selectedAddons: string[];
  totalPrice: number;
  onSuccess?: () => void;
}

export default function LeadCaptureForm({ product, selectedAddons, totalPrice, onSuccess }: LeadCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: product.category,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productId: product.id,
          selectedAddons,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess?.();
        // Reset form
        setFormData({
          name: '',
          email: '',
          projectType: product.category,
          message: '',
        });
      } else {
        alert(data.error || 'Failed to submit request');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.30)] overflow-hidden">
      <CardHeader className="px-6 pt-6 pb-4 border-b border-white/10">
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-green-400" />
          Get Started with {product.name}
        </CardTitle>
        <CardDescription className="text-gray-400">
          Tell us about your project needs and we'll prepare a custom quote.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-gray-300 flex items-center gap-2">
              <User className="w-4 h-4" />
              Your Name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-green-400/50"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-300 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-green-400/50"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectType" className="text-sm text-gray-300">
              Project Type
            </Label>
            <Select 
              value={formData.projectType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                <SelectItem value="landing-page">Landing Page</SelectItem>
                <SelectItem value="portfolio">Portfolio</SelectItem>
                <SelectItem value="saas-tool">SaaS Tool</SelectItem>
                <SelectItem value="ecommerce">E-commerce Store</SelectItem>
                <SelectItem value="blog">Blog Platform</SelectItem>
                <SelectItem value="api-service">API Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm text-gray-300">
              Project Details (Optional)
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-green-400/50"
              placeholder="Tell us more about your project requirements, timeline, or any specific features you need..."
              rows={3}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Estimated Project Cost</span>
              <span className="text-green-400 font-bold text-lg">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-semibold shadow-[0_8px_24px_rgba(34,197,94,0.28)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                <Send className="w-4 h-4" />
                Request Quote
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center leading-relaxed">
            We'll review your request and get back to you within 4 hours with a detailed project plan.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
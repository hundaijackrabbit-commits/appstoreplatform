'use client';

import { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BlogEmailCaptureProps {
  title?: string;
  description?: string;
  placeholder?: string;
  className?: string;
}

export default function BlogEmailCapture({
  title = "Get More Guides Like This",
  description = "Join 2,000+ business owners getting actionable website ownership guides delivered weekly.",
  placeholder = "Enter your email address",
  className = ""
}: BlogEmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return static version for SSR
    return (
      <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <Mail className="h-5 w-5 text-[--color-primary]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            type="email"
            placeholder={placeholder}
            className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-gray-500 rounded-md px-3 py-2"
            disabled
          />
          <button className="px-6 bg-[--color-primary] text-black font-semibold rounded-md disabled:opacity-50" disabled>
            Subscribe
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: '',
          projectType: 'blog-subscription',
          message: 'Blog email subscription',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setEmail('');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`rounded-2xl border border-green-400/20 bg-green-400/5 p-6 text-center ${className}`}>
        <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white mb-2">Thanks for subscribing!</h3>
        <p className="text-sm text-gray-300">
          You'll receive our next guide within the week.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <Mail className="h-5 w-5 text-[--color-primary]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[--color-primary]/50"
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className="px-6 bg-[--color-primary] text-black font-semibold hover:bg-[--color-primary]/90 transition flex items-center gap-2"
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <Send className="w-4 h-4" />
              Subscribe
            </>
          )}
        </Button>
      </form>

      <p className="text-xs text-gray-500 mt-3">
        No spam. Unsubscribe anytime. We respect your privacy.
      </p>
    </div>
  );
}
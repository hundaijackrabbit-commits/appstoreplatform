'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle, 
  Clock, 
  Mail, 
  ArrowRight, 
  Home, 
  MessageCircle,
  Sparkles 
} from 'lucide-react';

export default function LeadCaptureSuccessPage() {
  const router = useRouter();

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

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full"
        >
          {/* Success Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 rounded-full bg-green-400/20 border border-green-400/30 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Request Received!
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Thank you for your interest in StartOva. We've received your project request 
              and will be in touch within 4 hours.
            </p>
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.28)] mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  What Happens Next
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-400/20 border border-green-400/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-400 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Project Review</h4>
                      <p className="text-gray-300 text-sm">Our team will review your requirements and prepare a detailed project plan tailored to your needs.</p>
                      <span className="inline-block mt-2 text-green-400 text-xs font-medium bg-green-400/10 px-2 py-1 rounded-full">
                        Within 4 hours
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-400/20 border border-purple-400/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-400 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Detailed Proposal</h4>
                      <p className="text-gray-300 text-sm">You'll receive a comprehensive proposal with timeline, deliverables, and final pricing via email.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-400/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-400 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Project Start</h4>
                      <p className="text-gray-300 text-sm">Once approved, we'll begin development immediately and keep you updated throughout the process.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Card className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.20)]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Check Your Email</h4>
                    <p className="text-gray-300 text-sm mb-2">
                      We've sent a confirmation to your email address. If you don't see it, check your spam folder.
                    </p>
                    <p className="text-xs text-gray-400">
                      Questions? Reach us at <span className="text-green-400">support@startova.space</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => router.push('/')}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-semibold shadow-[0_8px_24px_rgba(34,197,94,0.28)] hover:scale-[1.01] transition-all"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <Button
              variant="outline"
              onClick={() => router.push('/blog')}
              className="flex-1 h-12 rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Read Our Guides
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-500">
              Thank you for choosing StartOva for your web development needs
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
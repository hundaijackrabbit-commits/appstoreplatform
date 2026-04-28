import Link from 'next/link';
import { Sparkles, Mail, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 max-w-7xl mx-auto px-6 pb-12 pt-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
        <div className="grid gap-8 md:grid-cols-4">
          
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-green-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-white via-green-200 to-purple-200 bg-clip-text text-transparent">
                StartOva
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Own your website with full source code, GitHub access, and commercial rights. 
              No subscriptions. No platform lock-in. Build your business on your terms.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Globe className="w-4 h-4" />
              <span>© {currentYear} StartOva</span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:support@startova.space" 
                  className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#categories" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Landing Pages
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  SaaS Tools
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Business Sites
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Need help or have questions?</p>
            <a
              href="mailto:support@startova.space"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-green-400/30 bg-green-400/10 text-green-300 hover:bg-green-400/20 transition text-sm"
            >
              <Mail className="w-4 h-4" />
              support@startova.space
            </a>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="border-t border-white/10 mt-6 pt-6 text-center">
          <p className="text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto">
            StartOva helps entrepreneurs and small business owners own their websites, source code, and digital business assets. 
            Unlike hosted website builders and subscription store platforms, StartOva focuses on real project handoff, 
            GitHub-ready delivery, ZIP access, and live deployment so users can launch with more control and less long-term platform dependency.
          </p>
        </div>
      </div>
    </footer>
  );
}
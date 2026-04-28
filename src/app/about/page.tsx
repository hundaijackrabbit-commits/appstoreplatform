import { Metadata } from 'next';
import { Building, Users, Award, Target, Heart, Code2, Globe, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about StartOva - our mission to help entrepreneurs own their websites and digital assets without platform lock-in.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Ownership First',
      description: 'We believe you should own your digital assets, not rent them. Every product comes with full source code and commercial rights.',
    },
    {
      icon: Code2,
      title: 'No Lock-in',
      description: 'Freedom from platform dependency. Our products work anywhere, and you control your hosting, customization, and future.',
    },
    {
      icon: Zap,
      title: 'Launch Ready',
      description: 'Skip months of development. Our templates are production-ready with modern frameworks, responsive design, and best practices.',
    },
    {
      icon: Users,
      title: 'Entrepreneur Focused',
      description: 'Built for founders and small business owners who need professional websites without ongoing subscriptions or technical debt.',
    },
  ];

  const team = [
    {
      name: 'StartOva Team',
      role: 'Product Development',
      description: 'Experienced developers and designers creating high-quality, ownership-focused digital products.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_30%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        
        {/* Header */}
        <header className="text-center mb-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              About StartOva
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Helping entrepreneurs and small business owners own their websites, 
              source code, and digital business assets.
            </p>
          </div>
        </header>

        {/* Mission */}
        <section className="mb-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            </div>
            <div className="text-lg text-gray-300 leading-relaxed space-y-4">
              <p>
                StartOva was created out of frustration with the website industry's obsession with subscription models and platform lock-in. 
                We believe entrepreneurs deserve to own their digital assets, not rent them forever.
              </p>
              <p>
                Too many business owners get trapped paying monthly fees for websites they can never truly own or move. 
                We're changing that by delivering complete, production-ready websites and applications with full source code, 
                GitHub access, and commercial rights.
              </p>
              <p>
                Our goal is simple: <strong>give you the freedom to build, customize, and scale your business without platform dependency</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Why StartOva */}
        <section className="mb-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Why StartOva Exists</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-green-400 mb-3">💸 End Subscription Trap</h3>
                <p className="text-gray-300 text-sm">
                  Stop paying $20-200+ monthly for websites you don't own. Buy once, own forever.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-green-400 mb-3">🔓 Break Platform Lock-in</h3>
                <p className="text-gray-300 text-sm">
                  Host anywhere, customize everything, switch providers anytime without losing your site.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-green-400 mb-3">⚡ Skip Months of Development</h3>
                <p className="text-gray-300 text-sm">
                  Get professional websites in minutes, not months. Focus on your business, not building from scratch.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-green-400 mb-3">📈 Scale Without Limits</h3>
                <p className="text-gray-300 text-sm">
                  Modify, rebrand, and expand your site as much as you want. No artificial feature restrictions.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-green-400 mb-3">💼 Built for Business</h3>
                <p className="text-gray-300 text-sm">
                  Production-ready code, modern frameworks, and commercial rights included.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-green-400 mb-3">🛠️ Real Support</h3>
                <p className="text-gray-300 text-sm">
                  Get actual help with technical questions, not just billing support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                <Building className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Values</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {values.map((value, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30">
                <Globe className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">What We Offer</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 Ready-Made Websites</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Landing pages for lead generation</li>
                  <li>• E-commerce stores with payment integration</li>
                  <li>• SaaS tools and business applications</li>
                  <li>• Professional portfolios and business sites</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-400 mb-4">📦 Complete Ownership Package</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Full source code with commercial license</li>
                  <li>• GitHub repository access</li>
                  <li>• ZIP file downloads</li>
                  <li>• Live demos and documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)] text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
              Have questions about our products, need technical support, or want to learn more about owning your digital assets? 
              We're here to help.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-md mx-auto">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Email Support</p>
                  <a 
                    href="mailto:support@startova.space" 
                    className="text-lg font-semibold text-green-400 hover:text-green-300 transition-colors"
                  >
                    support@startova.space
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Response Time</p>
                  <p className="text-white">Within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
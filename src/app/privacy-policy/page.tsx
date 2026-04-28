import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'StartOva Privacy Policy - How we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_30%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">1. Information We Collect</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  When you use StartOva, we collect information to provide and improve our services:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Account Information:</strong> Email address, name, and billing information when you make a purchase</li>
                  <li><strong>Payment Information:</strong> Payment details processed securely through Stripe (we don't store credit card information)</li>
                  <li><strong>Usage Information:</strong> How you interact with our website and services</li>
                  <li><strong>Technical Information:</strong> IP address, browser type, device information, and cookies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">2. How We Use Your Information</h2>
              <div className="text-gray-300 space-y-4">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process your orders and deliver digital products</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send order confirmations and important service updates</li>
                  <li>Improve our website and services</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">3. Information Sharing</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We don't sell, trade, or rent your personal information. We may share information with:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> Stripe for payment processing, hosting providers, and analytics services</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">4. Data Security</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We implement appropriate security measures to protect your information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure payment processing through Stripe</li>
                  <li>Regular security updates and monitoring</li>
                  <li>Limited access to personal information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">5. Your Rights</h2>
              <div className="text-gray-300 space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your information</li>
                  <li>Data portability (receive your data in a structured format)</li>
                </ul>
                <p>
                  To exercise these rights, contact us at{' '}
                  <a href="mailto:support@startova.space" className="text-green-400 hover:text-green-300">
                    support@startova.space
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">6. Cookies and Tracking</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences</li>
                  <li>Understand how our website is used</li>
                  <li>Provide analytics through Google Analytics</li>
                  <li>Improve our services</li>
                </ul>
                <p>
                  You can control cookies through your browser settings.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">7. Data Retention</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We retain your information for as long as necessary to provide our services and comply with legal obligations. 
                  Order information is typically retained for 7 years for tax and legal purposes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">8. Children's Privacy</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Our services are not directed to children under 13. We don't knowingly collect personal information from children under 13.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">9. Changes to This Policy</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We may update this privacy policy from time to time. We'll notify you of significant changes by email or through our website.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">10. Contact Us</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  If you have questions about this privacy policy, please contact us:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p><strong>Email:</strong> <a href="mailto:support@startova.space" className="text-green-400 hover:text-green-300">support@startova.space</a></p>
                  <p><strong>Website:</strong> <a href="https://startova.space" className="text-green-400 hover:text-green-300">https://startova.space</a></p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
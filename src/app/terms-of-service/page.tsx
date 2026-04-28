import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'StartOva Terms of Service - Terms and conditions for using our website and services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_30%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">1. Acceptance of Terms</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  By accessing and using StartOva's website and services, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">2. Description of Service</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  StartOva provides digital website and application templates, source code, and related digital assets. 
                  Our services include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Pre-built website templates and applications</li>
                  <li>Source code delivery via ZIP files and GitHub repositories</li>
                  <li>Live deployment services</li>
                  <li>Documentation and setup instructions</li>
                  <li>Limited technical support</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">3. User Accounts and Purchases</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  When you make a purchase:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You must be at least 18 years old or have parental consent</li>
                  <li>One purchase grants you lifetime access to the specific product</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">4. License and Ownership</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Upon purchase, you receive:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Commercial License:</strong> Right to use, modify, and deploy the code commercially</li>
                  <li><strong>Full Source Code:</strong> Complete access to all code files</li>
                  <li><strong>No Restrictions:</strong> Freedom to modify, rebrand, and customize</li>
                  <li><strong>Resale Rights:</strong> You may sell websites built from our templates</li>
                </ul>
                <p>
                  <strong>Restrictions:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You cannot resell the original template/source code itself</li>
                  <li>You cannot claim authorship of the original template</li>
                  <li>You cannot redistribute the template as a template</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">5. Payment and Billing</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Payment terms:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All payments are processed securely through Stripe</li>
                  <li>Prices are listed in USD and may be subject to applicable taxes</li>
                  <li>Payment is due in full before product delivery</li>
                  <li>We reserve the right to change prices with notice</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">6. Delivery and Access</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Product delivery:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Digital products are delivered immediately upon successful payment</li>
                  <li>You'll receive download links and access instructions via email</li>
                  <li>Access is provided through secure download links</li>
                  <li>You have unlimited downloads of purchased products</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">7. Refunds and Returns</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Due to the digital nature of our products:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All sales are generally final</li>
                  <li>Refunds may be considered within 7 days for technical issues</li>
                  <li>Refunds are not available for change of mind</li>
                  <li>See our <a href="/refund-policy" className="text-green-400 hover:text-green-300">Refund Policy</a> for full details</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">8. Support and Warranties</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Support and warranties:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We provide email support for technical issues</li>
                  <li>Products are provided "as is" without warranty</li>
                  <li>We don't guarantee compatibility with all hosting environments</li>
                  <li>Custom development services are not included</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">9. User Conduct</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use our services for any illegal or unauthorized purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Share download links or access credentials with others</li>
                  <li>Reverse engineer our platform or services</li>
                  <li>Use our products to create competing template services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">10. Limitation of Liability</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  StartOva's liability is limited to the amount you paid for the product. We are not liable for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Indirect, consequential, or incidental damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Third-party claims or issues</li>
                  <li>Server downtime or technical issues beyond our control</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">11. Termination</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We may terminate or suspend your access if you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate these terms</li>
                  <li>Engage in fraudulent activity</li>
                  <li>Abuse our support services</li>
                </ul>
                <p>
                  Upon termination, your access to new downloads may be revoked, but you retain rights to products already purchased.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">12. Changes to Terms</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We reserve the right to update these terms at any time. Changes will be posted on our website with an updated date. 
                  Continued use of our services constitutes acceptance of modified terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">13. Governing Law</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  These terms are governed by the laws of Canada. Any disputes will be resolved in Canadian courts.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">14. Contact Information</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  For questions about these terms, please contact us:
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
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Delivery Policy',
  description: 'StartOva Refund and Delivery Policy - Information about our refund process and product delivery.',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_30%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Refund & Delivery Policy
            </h1>
            <p className="text-lg text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">Delivery Policy</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Instant Digital Delivery</h3>
              <div className="text-gray-300 space-y-4">
                <p>
                  All StartOva products are delivered digitally and immediately upon successful payment:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Immediate Access:</strong> Download links are sent to your email within minutes of purchase</li>
                  <li><strong>Multiple Formats:</strong> You receive ZIP files, GitHub repository access, and live demo links</li>
                  <li><strong>Complete Package:</strong> Full source code, documentation, and setup instructions included</li>
                  <li><strong>Unlimited Downloads:</strong> Access your purchases anytime from your email confirmation</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">What You Receive</h3>
              <div className="text-gray-300 space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="font-semibold text-green-400 mb-2">🗂️ Complete Source Code</h4>
                  <p>All HTML, CSS, JavaScript, and framework files with full commercial license</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="font-semibold text-green-400 mb-2">📚 Documentation</h4>
                  <p>Setup instructions, customization guide, and deployment documentation</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="font-semibold text-green-400 mb-2">🚀 Live Demo</h4>
                  <p>Working example of the website/app for reference and testing</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="font-semibold text-green-400 mb-2">⚙️ GitHub Repository</h4>
                  <p>Access to the code repository for easy version control and deployment</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">Refund Policy</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Understanding Digital Products</h3>
              <div className="text-gray-300 space-y-4">
                <p>
                  Due to the instant delivery and digital nature of our products, <strong>all sales are generally final</strong>. 
                  However, we want you to be satisfied with your purchase and offer limited refunds in specific circumstances.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">When Refunds Are Available</h3>
              <div className="text-gray-300 space-y-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                  <h4 className="font-semibold text-green-400 mb-2">✅ Valid Refund Reasons (within 7 days)</h4>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>The downloaded files are corrupted or incomplete</li>
                    <li>The product doesn't match the description or demo</li>
                    <li>Technical issues prevent you from accessing the files</li>
                    <li>Duplicate purchase (same product bought multiple times)</li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <h4 className="font-semibold text-red-400 mb-2">❌ Refunds NOT Available For</h4>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Change of mind or buyer's remorse</li>
                    <li>Lack of technical skills to implement the code</li>
                    <li>Compatibility issues with specific hosting providers</li>
                    <li>Requests made after 7 days from purchase</li>
                    <li>Partial use of the product or after customization begins</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">Refund Process</h3>
              <div className="text-gray-300 space-y-4">
                <p>To request a refund:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Email us at <a href="mailto:support@startova.space" className="text-green-400 hover:text-green-300">support@startova.space</a> within 7 days</li>
                  <li>Include your order confirmation number and reason for refund</li>
                  <li>Provide specific details about the issue you're experiencing</li>
                  <li>We'll respond within 24-48 hours to review your request</li>
                </ol>
                <p className="text-yellow-400 text-sm">
                  <strong>Note:</strong> Approved refunds are processed back to the original payment method within 5-10 business days.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">Before You Buy</h2>
              <div className="text-gray-300 space-y-4">
                <p>To avoid disappointment, please:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Preview Thoroughly:</strong> Check out the live demo and feature list</li>
                  <li><strong>Read Requirements:</strong> Ensure you have the technical skills or support needed</li>
                  <li><strong>Check Compatibility:</strong> Verify the technology stack works with your hosting</li>
                  <li><strong>Ask Questions:</strong> Contact us before purchasing if you're unsure about anything</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">Alternative Solutions</h2>
              <div className="text-gray-300 space-y-4">
                <p>Instead of refunds, we can often help with:</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h4 className="font-semibold text-green-400 mb-2">🛠️ Technical Support</h4>
                    <p>Help with setup, deployment, or basic customization questions</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h4 className="font-semibold text-green-400 mb-2">📖 Additional Documentation</h4>
                    <p>More detailed guides or clarification on implementation</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h4 className="font-semibold text-green-400 mb-2">🔄 Product Exchange</h4>
                    <p>Switch to a different product that better fits your needs</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h4 className="font-semibold text-green-400 mb-2">💡 Implementation Tips</h4>
                    <p>Best practices and recommendations for your specific use case</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-400 mb-4">Contact Us</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  We're here to help ensure your success with StartOva products. For any delivery issues, 
                  refund requests, or questions about this policy:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p><strong>Email:</strong> <a href="mailto:support@startova.space" className="text-green-400 hover:text-green-300">support@startova.space</a></p>
                  <p><strong>Response Time:</strong> Within 24-48 hours</p>
                  <p><strong>Website:</strong> <a href="https://startova.space" className="text-green-400 hover:text-green-300">https://startova.space</a></p>
                </div>
                <p className="text-sm text-yellow-400">
                  <strong>Tip:</strong> Include your order number and specific details about your issue for faster support.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
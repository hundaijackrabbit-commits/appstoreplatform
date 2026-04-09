'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('Finalizing your order...');

  useEffect(() => {
    const finalizeOrder = async () => {
      const sessionId = searchParams.get('session_id');

      if (!sessionId) {
        setMessage('Missing Stripe session ID.');
        return;
      }

      try {
        const res = await fetch('/api/checkout/finalize-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
          }),
        });

        const data = await res.json();

        if (data.success && data.orderId) {
          router.push(`/order-status/${data.orderId}`);
          return;
        }

        setMessage(data.error || 'Failed to finalize your order.');
      } catch (error) {
        console.error(error);
        setMessage('Something went wrong while finalizing your order.');
      }
    };

    finalizeOrder();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10 px-6">
      <div className="text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Payment Received</h1>
        <p className="text-gray-300 mb-6">{message}</p>
        <Button variant="outline" onClick={() => router.push('/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}

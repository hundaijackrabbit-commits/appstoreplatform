import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createOrderInAirtable, getOrderByStripeSessionId } from '@/lib/airtable';
import { getProductById } from '@/data/products';

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { success: false, error: 'Missing STRIPE_WEBHOOK_SECRET' },
      { status: 500 }
    );
  }

  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { success: false, error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.payment_status !== 'paid') {
        return NextResponse.json({ received: true });
      }

      const existingOrder = await getOrderByStripeSessionId(session.id);

      if (existingOrder) {
        return NextResponse.json({ received: true, duplicate: true });
      }

      const productId = session.metadata?.productId || '';
      const selectedAddons = session.metadata?.selectedAddons
        ? JSON.parse(session.metadata.selectedAddons)
        : [];
      const totalPrice = Number(session.metadata?.totalPrice || 0);

      const product = getProductById(productId);

      if (!product) {
        throw new Error('Product not found from paid Stripe session');
      }

      const orderId = `ORD-${Date.now()}`;

      await createOrderInAirtable({
        'Order ID': orderId,
        'Stripe Session ID': session.id,
        'Product ID': product.id,
        'Product Name': product.name,
        'Total Price': totalPrice,
        'Status': 'pending',
        'Created At': new Date().toISOString(),
        'Selected Addons': JSON.stringify(selectedAddons),
        'Current Message': 'Payment received. Waiting to be reviewed.',
        'Progress Messages': JSON.stringify([
          {
            status: 'pending',
            message: 'Payment received and order created',
            timestamp: new Date().toISOString(),
          },
        ]),
      });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('STRIPE WEBHOOK ERROR:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Webhook failed' },
      { status: 400 }
    );
  }
}

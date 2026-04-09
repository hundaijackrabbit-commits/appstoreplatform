import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getOrderByStripeSessionId } from '@/lib/airtable';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Missing session ID' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { success: false, error: 'Payment not completed' },
        { status: 400 }
      );
    }

    const existingOrder = await getOrderByStripeSessionId(session.id);

    if (!existingOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not created yet. Please wait a moment and refresh.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: existingOrder.fields['Order ID'],
    });
  } catch (error: any) {
    console.error('FINALIZE ORDER ERROR:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to finalize order' },
      { status: 500 }
    );
  }
}

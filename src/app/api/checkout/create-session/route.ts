import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getProductById, calculatePrice } from '@/data/products';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, selectedAddons = [] } = body;

    const product = getProductById(productId);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const totalPrice = calculatePrice(product, selectedAddons);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3005';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: Math.round(totalPrice * 100),
          },
        },
      ],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/product/${product.id}`,
      metadata: {
        productId: product.id,
        selectedAddons: JSON.stringify(selectedAddons),
        totalPrice: String(totalPrice),
      },
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error: any) {
    console.error('CREATE CHECKOUT SESSION ERROR:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

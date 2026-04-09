import { NextResponse } from 'next/server';
import { createOrderInAirtable } from '@/lib/airtable';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderId = `ORD-${Date.now()}`;

    const record = await createOrderInAirtable({
      'Order ID': orderId,
      'Product ID': body.productId,
      'Product Name': body.productName,
      'Total Price': body.totalPrice,
      'Status': 'pending',
      'Created At': new Date().toISOString(),
      'Selected Addons': JSON.stringify(body.selectedAddons || []),
      'Current Message': 'Order received. Waiting to be reviewed.',
      'Progress Messages': JSON.stringify([
        {
          status: 'pending',
          message: 'Order received',
          timestamp: new Date().toISOString(),
        },
      ]),
      'Customer Email': body.customerEmail || '',
    });

    return NextResponse.json({
      success: true,
      orderId,
      airtableRecordId: record.id,
    });
  } catch (error: any) {
    console.error('CREATE ORDER API ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Unknown server error',
      },
      { status: 500 }
    );
  }
}
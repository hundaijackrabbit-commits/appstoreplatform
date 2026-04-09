import { NextResponse } from 'next/server';
import { getOrderFromAirtable } from '@/lib/airtable';

export async function GET(
  request: Request,
  context: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await context.params;

    const record = await getOrderFromAirtable(orderId);

    if (!record) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const status = record.fields['Status'] || 'pending';
    const zipUrl = record.fields['ZIP URL'] || '';
    const repoUrl = record.fields['Repo URL'] || '';

    if (status !== 'ready_for_delivery' && status !== 'delivered') {
      return NextResponse.json(
        { error: 'Order not ready for download' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: record.fields['Order ID'] || '',
      status,
      zipUrl,
      repoUrl,
      deliveryNotes: record.fields['Delivery Notes'] || '',
    });
  } catch (error: any) {
    console.error('DOWNLOAD ROUTE ERROR:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to load download data' },
      { status: 500 }
    );
  }
}

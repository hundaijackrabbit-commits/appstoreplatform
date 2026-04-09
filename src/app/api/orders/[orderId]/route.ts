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
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: record.fields['Order ID'] || '',
        status: record.fields['Status'] || 'pending',
        productId: record.fields['Product ID'] || '',
        productName: record.fields['Product Name'] || '',
        totalPrice: record.fields['Total Price'] || 0,
        zipUrl: record.fields['ZIP URL'] || '',
        repoUrl: record.fields['Repo URL'] || '',
        deliveryNotes: record.fields['Delivery Notes'] || '',
        selectedAddons: record.fields['Selected Addons']
          ? JSON.parse(record.fields['Selected Addons'])
          : [],
        currentMessage: record.fields['Current Message'] || '',
        createdAt: record.fields['Created At'] || null,
      },
    });
  } catch (error: any) {
    console.error('GET ORDER ERROR:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to get order' },
      { status: 500 }
    );
  }
}
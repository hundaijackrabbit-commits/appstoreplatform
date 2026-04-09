import { NextResponse } from 'next/server';
import { listOrdersFromAirtable } from '@/lib/airtable';

export async function GET() {
  try {
    const records = await listOrdersFromAirtable();

    const orders = records.map((record: any) => ({
      recordId: record.id,
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
    }));

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error('LIST ORDERS ERROR:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to list orders' },
      { status: 500 }
    );
  }
}

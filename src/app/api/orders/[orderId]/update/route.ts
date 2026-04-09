import { NextResponse } from 'next/server';
import { getOrderFromAirtable, updateOrderInAirtable } from '@/lib/airtable';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await context.params;
    const body = await request.json();

    const record = await getOrderFromAirtable(orderId);

    if (!record) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const fields: Record<string, any> = {};

    if (typeof body.status === 'string') fields['Status'] = body.status;
    if (typeof body.zipUrl === 'string') fields['ZIP URL'] = body.zipUrl;
    if (typeof body.repoUrl === 'string') fields['Repo URL'] = body.repoUrl;
    if (typeof body.deliveryNotes === 'string') fields['Delivery Notes'] = body.deliveryNotes;
    if (typeof body.currentMessage === 'string') fields['Current Message'] = body.currentMessage;

    if (body.status === 'ready_for_delivery' || body.status === 'delivered') {
      fields['Actual Completion At'] = new Date().toISOString();
    }

    const updated = await updateOrderInAirtable(record.id, fields);

    return NextResponse.json({
      success: true,
      updated,
    });
  } catch (error: any) {
    console.error('UPDATE ORDER ERROR:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}
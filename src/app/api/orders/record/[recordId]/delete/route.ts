import { NextResponse } from 'next/server';
import { deleteOrderFromAirtable } from '@/lib/airtable';

export async function DELETE(
  request: Request,
  context: { params: Promise<{ recordId: string }> }
) {
  try {
    const { recordId } = await context.params;

    await deleteOrderFromAirtable(recordId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('DELETE ORDER ERROR:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete order' },
      { status: 500 }
    );
  }
}

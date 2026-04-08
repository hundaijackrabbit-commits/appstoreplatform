import { NextRequest, NextResponse } from 'next/server';
import { loadOrder } from '@/lib/orders';
import { getProductById } from '@/data/products';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const order = loadOrder(orderId);
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.status !== 'ready' && order.status !== 'delivered') {
      return NextResponse.json({ error: 'Order not ready for download' }, { status: 400 });
    }

    const product = getProductById(order.productConfiguration.productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // In a real application, you would:
    // 1. Generate or retrieve the actual project files
    // 2. Create a ZIP file with all the customizations
    // 3. Return a download link or stream the file
    
    // For demo purposes, we'll return download information
    const downloadInfo = {
      orderId: order.id,
      productName: product.name,
      fileName: `${product.name.toLowerCase().replace(/\s+/g, '-')}-${orderId.slice(-8)}.zip`,
      fileSize: '15.2 MB', // Simulated
      downloadUrl: `/downloads/${orderId}.zip`, // Simulated
      customizations: order.productConfiguration.customizations,
      techStack: product.techStack,
      buildTime: order.actualCompletionAt || order.estimatedCompletionAt,
      includes: [
        'Complete source code',
        'Customization implementations',
        'Build and deployment scripts',
        'Documentation and README files',
        'Environment configuration examples'
      ]
    };

    return NextResponse.json(downloadInfo);
    
  } catch (error) {
    console.error('Download API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
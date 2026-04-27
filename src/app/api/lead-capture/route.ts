import { NextResponse } from 'next/server';
import { getProductById } from '@/data/products';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectType, message, productId, selectedAddons, totalPrice } = body;

    // Basic validation
    if (!name || !email || !productId) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and product are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const product = getProductById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Invalid product' },
        { status: 400 }
      );
    }

    // In a real app, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify team of new lead
    
    // For now, just log the lead (in production, save to database)
    console.log('New lead captured:', {
      name,
      email,
      projectType,
      message,
      productId: product.id,
      productName: product.name,
      selectedAddons,
      totalPrice,
      timestamp: new Date().toISOString(),
    });

    // Simulate sending confirmation email
    await sendConfirmationEmail({
      name,
      email,
      productName: product.name,
      totalPrice,
    });

    // Generate a simple lead ID for tracking
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest! We\'ll be in touch within 4 hours.',
      leadId,
    });
  } catch (error: any) {
    console.error('LEAD CAPTURE ERROR:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Simulated email function - in production, use a service like SendGrid, Resend, etc.
async function sendConfirmationEmail({ name, email, productName, totalPrice }: {
  name: string;
  email: string;
  productName: string;
  totalPrice: number;
}) {
  // This is where you'd integrate with your email service
  console.log(`Sending confirmation email to ${email}:`);
  console.log(`
Subject: StartOva Project Request Received - ${productName}

Hi ${name},

Thank you for your interest in ${productName}! We've received your project request.

Project Details:
- Product: ${productName}
- Estimated Cost: $${totalPrice}

What's Next:
1. Our team will review your requirements within 4 hours
2. We'll send you a detailed project plan and timeline
3. Upon approval, we'll begin development immediately

Questions? Reply to this email or contact us at support@startova.space

Best regards,
The StartOva Team
  `);
  
  // In production, replace with actual email service:
  // await emailService.send({
  //   to: email,
  //   subject: `StartOva Project Request Received - ${productName}`,
  //   template: 'lead-confirmation',
  //   data: { name, productName, totalPrice }
  // });
}
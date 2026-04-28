import { NextResponse } from 'next/server';
import { getProductById } from '@/data/products';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectType, message, productId, selectedAddons, totalPrice } = body;

    // Handle different types of leads
    const isBlogSubscription = projectType === 'blog-subscription';
    
    // Basic validation
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!isBlogSubscription && (!name || !productId)) {
      return NextResponse.json(
        { success: false, error: 'Name and product are required for project requests' },
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

    let product = null;
    if (productId && !isBlogSubscription) {
      product = getProductById(productId);
      if (!product) {
        return NextResponse.json(
          { success: false, error: 'Invalid product' },
          { status: 400 }
        );
      }
    }

    // In a real app, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify team of new lead
    
    // For now, just log the lead (in production, save to database)
    if (isBlogSubscription) {
      console.log('New blog subscription:', {
        email,
        projectType,
        message,
        timestamp: new Date().toISOString(),
      });

      // Simulate sending subscription confirmation email
      await sendBlogSubscriptionEmail({ email });
    } else {
      console.log('New lead captured:', {
        name,
        email,
        projectType,
        message,
        productId: product?.id,
        productName: product?.name,
        selectedAddons,
        totalPrice,
        timestamp: new Date().toISOString(),
      });

      // Simulate sending confirmation email
      await sendConfirmationEmail({
        name,
        email,
        productName: product?.name || '',
        totalPrice: totalPrice || 0,
      });
    }

    // Generate a simple lead ID for tracking
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const responseMessage = isBlogSubscription 
      ? 'Thank you for subscribing! You\'ll receive our next guide soon.'
      : 'Thank you for your interest! We\'ll be in touch within 4 hours.';

    return NextResponse.json({
      success: true,
      message: responseMessage,
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

// Blog subscription confirmation email
async function sendBlogSubscriptionEmail({ email }: { email: string }) {
  console.log(`Sending blog subscription confirmation to ${email}:`);
  console.log(`
Subject: Welcome to StartOva's Website Ownership Guide Series

Hi there!

Thank you for subscribing to our website ownership guide series. You're now part of a community of 2,000+ business owners learning to build and own their digital presence.

What to expect:
✓ Weekly actionable guides delivered to your inbox
✓ No-fluff content focused on practical business outcomes  
✓ Tips on avoiding platform lock-in and building real digital assets

Your next guide will arrive within a week. Each one builds on the previous, so you'll develop a complete understanding of website ownership step by step.

Questions? Reply to this email — we read every message.

Best regards,
The StartOva Team

P.S. Ready to skip the theory and get your owned website built? Check out our professional website builds at https://startova.space/#featured-products
  `);
}
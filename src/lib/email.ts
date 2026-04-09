import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL;

if (!resendApiKey) {
  throw new Error('Missing RESEND_API_KEY');
}

if (!resendFromEmail) {
  throw new Error('Missing RESEND_FROM_EMAIL');
}

const resend = new Resend(resendApiKey);
const FROM_EMAIL: string = resendFromEmail;

export async function sendOrderReceivedEmail(params: {
  to: string;
  orderId: string;
  productName: string;
  totalPrice: number;
}) {
  if (!params.to) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: `We received your order: ${params.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2>Thanks for your order</h2>
        <p>We’ve received your order and added it to our build queue.</p>

        <p><strong>Order ID:</strong> ${params.orderId}</p>
        <p><strong>Product:</strong> ${params.productName}</p>
        <p><strong>Total:</strong> $${params.totalPrice.toFixed(2)}</p>

        <p>You’ll receive another update when your project is ready.</p>
      </div>
    `,
  });
}

export async function sendOrderReadyEmail(params: {
  to: string;
  orderId: string;
  productName: string;
  zipUrl?: string;
  repoUrl?: string;
  deliveryNotes?: string;
}) {
  if (!params.to) return;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: `Your project is ready: ${params.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2>Your project is ready</h2>

        <p><strong>Order ID:</strong> ${params.orderId}</p>
        <p><strong>Product:</strong> ${params.productName}</p>

        ${
          params.zipUrl
            ? `<p><a href="${params.zipUrl}" target="_blank" rel="noopener noreferrer">Download ZIP Package</a></p>`
            : ''
        }

        ${
          params.repoUrl
            ? `<p><a href="${params.repoUrl}" target="_blank" rel="noopener noreferrer">Open GitHub Repository</a></p>`
            : ''
        }

        ${
          params.deliveryNotes
            ? `<p><strong>Notes:</strong><br/>${params.deliveryNotes.replace(/\n/g, '<br/>')}</p>`
            : ''
        }

        <p>Thanks for your order.</p>
      </div>
    `,
  });
}
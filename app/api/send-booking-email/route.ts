import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Format the booking data into an email body
    const bookingDetails = Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    const email = await resend.emails.send({
      from: 'noreply@meocy.com',
      to: 'meocystudio@gmail.com',
      subject: 'New Booking Request from MEOCY Website',
      text: `New booking request:\n\n${bookingDetails}`,
      html: `
        <h2>New Booking Request</h2>
        <p>A new booking request has been submitted:</p>
        <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; font-family: monospace;">
${bookingDetails}
        </pre>
        <p><small>Sent from MEOCY website</small></p>
      `,
    });

    return Response.json({ success: true, messageId: email.id });
  } catch (error) {
    console.error('Email send error:', error);
    return Response.json({ success: false, error: error instanceof Error ? error.message : 'Failed to send email' }, { status: 500 });
  }
}

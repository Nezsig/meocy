import { NextRequest, NextResponse } from 'next/server';
import { saveBooking, Booking } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ RESEND_API_KEY not configured - email not sent');
    return { success: false, reason: 'Email service not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'bookings@meocy.com',
        to,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend API error:', error);
      return { success: false, reason: 'Email service error' };
    }

    return { success: true };
  } catch (err) {
    console.error('Email send error:', err);
    return { success: false, reason: 'Email send failed' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'package_type', 'shoot_type', 'location', 'preferred_date', 'preferred_time'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Save booking to database
    const booking: Booking = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      package_type: body.package_type,
      shoot_type: body.shoot_type,
      location: body.location,
      preferred_date: body.preferred_date,
      preferred_time: body.preferred_time,
      special_requests: body.special_requests || '',
      payment_status: 'pending',
    };

    const savedBooking = await saveBooking(booking);

    // Send notification email to studio (hello@meocy.com)
    const studioEmailHtml = `
      <h2>New Booking Inquiry</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone}</p>
      <p><strong>Package:</strong> ${body.package_type}</p>
      <p><strong>Shoot Type:</strong> ${body.shoot_type}</p>
      <p><strong>Location:</strong> ${body.location}</p>
      <p><strong>Preferred Date:</strong> ${body.preferred_date}</p>
      <p><strong>Preferred Time:</strong> ${body.preferred_time}</p>
      <p><strong>Special Requests:</strong> ${body.special_requests || 'None'}</p>
      <p><strong>Booking ID:</strong> ${savedBooking.id}</p>
    `;

    // Send emails and capture results
    const studioEmailResult = await sendEmail('hello@meocy.com', `New Booking Inquiry from ${body.name}`, studioEmailHtml);
    console.log('Studio email result:', studioEmailResult);

    // Send confirmation email to customer
    const clientEmailHtml = `
      <h2>Booking Confirmation</h2>
      <p>Thank you for your booking inquiry!</p>
      <p>We have received your request and will contact you within 24 hours to confirm details and arrange payment.</p>
      <p><strong>Booking Reference:</strong> ${savedBooking.id}</p>
      <p>We look forward to working with you!</p>
      <p>Best regards,<br>MEOCY Studio Team</p>
    `;

    const clientEmailResult = await sendEmail(body.email, 'Booking Confirmation - MEOCY Studio', clientEmailHtml);
    console.log('Client email result:', clientEmailResult);

    return NextResponse.json(
      {
        success: true,
        booking: savedBooking,
        message: 'Booking created successfully',
        emailStatus: {
          studioEmail: studioEmailResult.success ? 'sent' : `failed: ${studioEmailResult.reason}`,
          customerEmail: clientEmailResult.success ? 'sent' : `failed: ${clientEmailResult.reason}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

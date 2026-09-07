import { NextRequest, NextResponse } from 'next/server';
import { saveBooking, Booking } from '@/lib/supabase';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Save booking to Supabase
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

    // Send confirmation email to studio
    const emailHtml = `
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

    await resend.emails.send({
      from: 'bookings@meocy.com',
      to: 'meocystudio@gmail.com',
      subject: `New Booking Inquiry from ${body.name}`,
      html: emailHtml,
    });

    // Send confirmation email to client
    const clientEmailHtml = `
      <h2>Booking Confirmation</h2>
      <p>Thank you for your booking inquiry!</p>
      <p>We have received your request and will contact you within 24 hours to confirm details and arrange payment.</p>
      <p><strong>Booking Reference:</strong> ${savedBooking.id}</p>
      <p>We look forward to working with you!</p>
      <p>Best regards,<br>MEOCY Studio Team</p>
    `;

    await resend.emails.send({
      from: 'bookings@meocy.com',
      to: body.email,
      subject: 'Booking Confirmation - MEOCY Studio',
      html: clientEmailHtml,
    });

    return NextResponse.json(
      {
        success: true,
        booking: savedBooking,
        message: 'Booking created successfully',
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

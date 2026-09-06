import { NextRequest, NextResponse } from 'next/server';
import { updateBookingPaymentStatus } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log the payment callback (for debugging)
    console.log('Payment callback received:', body);

    // Skeleton: In production, verify the payment with the bank gateway
    // For now, we'll accept the callback and mark as paid if it has required fields
    if (!body.bookingId) {
      return NextResponse.json(
        { error: 'Missing booking ID' },
        { status: 400 }
      );
    }

    // Update booking payment status
    const paymentStatus = body.status || 'completed';
    await updateBookingPaymentStatus(body.bookingId, paymentStatus);

    return NextResponse.json({
      success: true,
      message: 'Payment processed',
      bookingId: body.bookingId,
      status: paymentStatus,
    });
  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

// Handle GET requests for bank redirects
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookingId = searchParams.get('bookingId');
    const status = searchParams.get('status') || 'completed';

    console.log('Payment callback GET:', { bookingId, status });

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Missing booking ID' },
        { status: 400 }
      );
    }

    // Update booking payment status
    await updateBookingPaymentStatus(bookingId, status);

    // Redirect to confirmation page
    return NextResponse.redirect(
      new URL(`/confirmation?id=${bookingId}`, request.url)
    );
  } catch (error) {
    console.error('Payment callback error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

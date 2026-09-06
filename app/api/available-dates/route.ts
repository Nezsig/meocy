import { NextRequest, NextResponse } from 'next/server';
import { getAvailableDates } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const bookedDates = await getAvailableDates();

    return NextResponse.json({
      success: true,
      bookedDates: bookedDates,
    });
  } catch (error) {
    console.error('Available dates error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch available dates' },
      { status: 500 }
    );
  }
}

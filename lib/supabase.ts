import { createClient } from '@supabase/supabase-js';

function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export interface Booking {
  id?: string;
  name: string;
  email: string;
  phone: string;
  package_type: string;
  shoot_type: string;
  location: string;
  preferred_date: string;
  preferred_time: string;
  special_requests?: string;
  payment_status?: string;
  created_at?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: any = null;

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase not configured - using mock storage');
    return null;
  }

  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
}

// Mock storage for bookings (file-based fallback when Supabase not configured)
const mockBookings: Map<string, Booking> = new Map();
const bookedDates: Set<string> = new Set();

export async function saveBooking(booking: Booking): Promise<Booking> {
  const client = getSupabaseClient();
  const bookingId = generateId();
  const bookingWithId: Booking = {
    ...booking,
    id: bookingId,
    payment_status: 'pending',
    created_at: new Date().toISOString(),
  };

  try {
    if (client) {
      const { data, error } = await client
        .from('bookings')
        .insert([bookingWithId])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        // Fallback to mock storage
        mockBookings.set(bookingId, bookingWithId);
        bookedDates.add(booking.preferred_date);
        return bookingWithId;
      }

      if (data && data.length > 0) {
        bookedDates.add(booking.preferred_date);
        return data[0];
      }
    }
  } catch (err) {
    console.error('Database error:', err);
  }

  // Fallback: use mock storage
  mockBookings.set(bookingId, bookingWithId);
  bookedDates.add(booking.preferred_date);
  return bookingWithId;
}

export async function getAvailableDates(): Promise<string[]> {
  const client = getSupabaseClient();

  try {
    if (client) {
      const { data, error } = await client
        .from('bookings')
        .select('preferred_date')
        .eq('payment_status', 'completed');

      if (error) {
        console.error('Supabase error:', error);
        return Array.from(bookedDates);
      }

      if (data) {
        return data.map((b: any) => b.preferred_date);
      }
    }
  } catch (err) {
    console.error('Database error:', err);
  }

  // Fallback: return mock dates
  return Array.from(bookedDates);
}

export async function updateBookingPaymentStatus(
  bookingId: string,
  status: string
): Promise<Booking | null> {
  const client = getSupabaseClient();

  try {
    if (client) {
      const { data, error } = await client
        .from('bookings')
        .update({ payment_status: status })
        .eq('id', bookingId)
        .select();

      if (error) {
        console.error('Supabase error:', error);
        // Fallback to mock storage
        const booking = mockBookings.get(bookingId);
        if (booking) {
          booking.payment_status = status;
          mockBookings.set(bookingId, booking);
          return booking;
        }
        return null;
      }

      if (data && data.length > 0) {
        return data[0];
      }
    }
  } catch (err) {
    console.error('Database error:', err);
  }

  // Fallback: update mock storage
  const booking = mockBookings.get(bookingId);
  if (booking) {
    booking.payment_status = status;
    mockBookings.set(bookingId, booking);
    return booking;
  }

  return null;
}

export async function getBooking(bookingId: string): Promise<Booking | null> {
  const client = getSupabaseClient();

  try {
    if (client) {
      const { data, error } = await client
        .from('bookings')
        .select()
        .eq('id', bookingId)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return mockBookings.get(bookingId) || null;
      }

      return data;
    }
  } catch (err) {
    console.error('Database error:', err);
  }

  // Fallback: return from mock storage
  return mockBookings.get(bookingId) || null;
}

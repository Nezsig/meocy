import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

export async function saveBooking(booking: Booking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function getAvailableDates() {
  const { data, error } = await supabase
    .from('bookings')
    .select('preferred_date')
    .eq('payment_status', 'paid');

  if (error) throw error;
  return (data || []).map(record => record.preferred_date).filter(Boolean);
}

export async function updateBookingPaymentStatus(
  bookingId: string,
  status: string
) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ payment_status: status })
    .eq('id', bookingId)
    .select();

  if (error) throw error;
  return data?.[0];
}

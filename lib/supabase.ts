import { createClient } from '@supabase/supabase-js';

let supabase: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (supabase) return supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey);
  return supabase;
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

export async function saveBooking(booking: any): Promise<any> {
  const client: any = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .insert([booking])
    .select();

  if (error) throw error;
  return data?.[0] || {};
}

export async function getAvailableDates() {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .select('preferred_date')
    .eq('payment_status', 'paid');

  if (error) throw error;
  return (data || []).map((record: any) => record.preferred_date).filter(Boolean);
}

export async function updateBookingPaymentStatus(
  bookingId: string,
  status: string
) {
  const client: any = getSupabaseClient();
  const { data, error } = await client
    .from('bookings')
    .update({ payment_status: status })
    .eq('id', bookingId)
    .select();

  if (error) throw error;
  return data?.[0];
}

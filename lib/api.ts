/**
 * API configuration and utilities for the booking system
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const API_ENDPOINTS = {
  BOOKINGS: `${API_BASE_URL}/api/bookings`,
  STATUS: `${API_BASE_URL}/api/status`,
  BOOKED_DATES: `${API_BASE_URL}/api/booked-dates`,
};

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  package_type?: string;
  shoot_type?: string;
  location?: string;
  preferred_date?: string;
  preferred_time?: string;
  special_requests?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: any;
}

export async function submitBooking(data: BookingFormData): Promise<BookingResponse> {
  const response = await fetch(API_ENDPOINTS.BOOKINGS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Booking submission failed: ${response.statusText}`);
  }

  return response.json();
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(API_ENDPOINTS.STATUS);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}

export async function getBookedDates(): Promise<string[]> {
  try {
    const response = await fetch(API_ENDPOINTS.BOOKED_DATES);
    if (!response.ok) throw new Error('Failed to fetch booked dates');
    const data = await response.json();
    return data.booked_dates.map((d: any) => d.booking_date);
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    return [];
  }
}

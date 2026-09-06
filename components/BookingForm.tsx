'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  package_type: string;
  shoot_type: string;
  location: string;
  preferred_date: string;
  preferred_time: string;
  special_requests: string;
  consent: boolean;
}

export default function BookingForm() {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [bookedDates, setBookedDates] = useState<string[]>([]);

  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    package_type: 'basic',
    shoot_type: 'product',
    location: 'studio',
    preferred_date: '',
    preferred_time: '10:00',
    special_requests: '',
    consent: false,
  });

  // Fetch booked dates on mount
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch('/api/available-dates');
        const data = await response.json();
        if (data.bookedDates) {
          setBookedDates(data.bookedDates);
        }
      } catch (err) {
        console.error('Failed to fetch booked dates:', err);
      }
    };

    fetchBookedDates();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const isDateDisabled = (dateStr: string): boolean => {
    return bookedDates.includes(dateStr);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.consent) {
        throw new Error('Please accept the terms and conditions');
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      setSuccess(true);
      // Redirect to payment page with booking ID
      setTimeout(() => {
        router.push(`/payment?bookingId=${data.booking.id}`);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-green-600 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">
          {t('booking.success')}
        </h3>
        <p className="text-gray-600">
          Redirecting to payment...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('booking.form.name')} *
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('booking.form.email')} *
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('booking.form.phone')} *
        </label>
        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('booking.form.packageType')} *
        </label>
        <select
          name="package_type"
          value={formData.package_type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="basic">Basic - €200</option>
          <option value="silver">Silver - €400</option>
          <option value="gold">Gold - €750</option>
          <option value="platinum">Platinum - €1000</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('booking.form.shootType')} *
        </label>
        <select
          name="shoot_type"
          value={formData.shoot_type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="product">Product</option>
          <option value="fashion">Fashion</option>
          <option value="restaurant">Restaurant</option>
          <option value="model">Model</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('booking.form.location')} *
        </label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="studio">Studio</option>
          <option value="onLocation">On Location</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('booking.form.preferredDate')} *
        </label>
        <input
          type="date"
          name="preferred_date"
          required
          value={formData.preferred_date}
          onChange={handleChange}
          disabled={isDateDisabled(formData.preferred_date)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
        />
        {isDateDisabled(formData.preferred_date) && (
          <p className="text-red-600 text-sm mt-1">This date is not available</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('booking.form.preferredTime')} *
        </label>
        <select
          name="preferred_time"
          value={formData.preferred_time}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="08:00">08:00 AM</option>
          <option value="09:00">09:00 AM</option>
          <option value="10:00">10:00 AM</option>
          <option value="11:00">11:00 AM</option>
          <option value="12:00">12:00 PM</option>
          <option value="13:00">01:00 PM</option>
          <option value="14:00">02:00 PM</option>
          <option value="15:00">03:00 PM</option>
          <option value="16:00">04:00 PM</option>
          <option value="17:00">05:00 PM</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('booking.form.specialRequests')}
        </label>
        <textarea
          name="special_requests"
          value={formData.special_requests}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <label className="flex items-start">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 mr-3"
        />
        <span className="text-sm text-gray-700">
          {t('booking.form.consent')}
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn btn-primary py-3 font-semibold disabled:opacity-50"
      >
        {loading ? t('booking.form.submitting') : t('booking.form.submit')}
      </button>
    </form>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import axios from 'axios';

const PACKAGES = ['Starter', 'Professional', 'Premium'];
const SHOOT_TYPES = ['Product', 'Fashion', 'Restaurant', 'Model'];

export default function BookingForm() {
  const t = useTranslations('booking');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [isDateUnavailable, setIsDateUnavailable] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package_type: '',
    shoot_type: '',
    location: '',
    preferred_date: '',
    preferred_time: '',
    special_requests: '',
  });

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const fetchBookedDates = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await axios.get(`${apiUrl}/api/booked-dates`);
      const dates = new Set<string>(response.data.booked_dates.map((booking: any) => booking.booking_date));
      setBookedDates(dates);
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'preferred_date') {
      const isUnavailable = bookedDates.has(value);
      setIsDateUnavailable(isUnavailable);

      if (isUnavailable) {
        setToast({
          type: 'warning',
          message: t('dateUnavailable') || 'This date is already booked. Please choose another date.',
        });
      } else if (toast?.type === 'warning') {
        setToast(null);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDateUnavailable || bookedDates.has(formData.preferred_date)) {
      setToast({
        type: 'error',
        message: t('dateUnavailable') || 'This date is already booked. Please choose another date.',
      });
      setTimeout(() => setToast(null), 5000);
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await axios.post(`${apiUrl}/api/bookings`, formData);

      if (response.data.success) {
        setToast({
          type: 'success',
          message: t('success'),
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          package_type: '',
          shoot_type: '',
          location: '',
          preferred_date: '',
          preferred_time: '',
          special_requests: '',
        });
        setIsDateUnavailable(false);
        fetchBookedDates();
      }
    } catch (error) {
      console.error('Booking error:', error);
      setToast({
        type: 'error',
        message: t('error'),
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  return (
    <section id="booking" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">{t('title')}</h2>

      {toast && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            toast.type === 'success'
              ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700'
              : toast.type === 'warning'
              ? 'bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700'
              : 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700'
          }`}
        >
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {t('name')} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t('email')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              {t('phone')} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="package_type" className="block text-sm font-medium mb-2">
              {t('package')}
            </label>
            <select
              id="package_type"
              name="package_type"
              value={formData.package_type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            >
              <option value="">Select a package</option>
              {PACKAGES.map((pkg) => (
                <option key={pkg} value={pkg}>
                  {pkg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="shoot_type" className="block text-sm font-medium mb-2">
              {t('shootType')}
            </label>
            <select
              id="shoot_type"
              name="shoot_type"
              value={formData.shoot_type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            >
              <option value="">Select a type</option>
              {SHOOT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              {t('location')}
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="preferred_date" className="block text-sm font-medium mb-2">
              {t('date')}
            </label>
            <input
              type="date"
              id="preferred_date"
              name="preferred_date"
              value={formData.preferred_date}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 transition ${
                isDateUnavailable
                  ? 'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-black dark:focus:ring-white'
              }`}
            />
            {isDateUnavailable && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-2">
                {t('dateUnavailable') || 'This date is already booked'}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="preferred_time" className="block text-sm font-medium mb-2">
              {t('time')}
            </label>
            <input
              type="time"
              id="preferred_time"
              name="preferred_time"
              value={formData.preferred_time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>
        </div>

        <div>
          <label htmlFor="special_requests" className="block text-sm font-medium mb-2">
            {t('specialRequests')}
          </label>
          <textarea
            id="special_requests"
            name="special_requests"
            value={formData.special_requests}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('submitting') : t('submit')}
        </button>
      </form>
    </section>
  );
}

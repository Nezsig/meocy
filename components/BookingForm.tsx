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
        throw new Error('Please accept the payment policy and terms');
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
      <div className="text-center py-12">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-lime-500 mx-auto"
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
        <h3 className="text-2xl font-bold mb-2 text-black">
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
      <style>{`
        .booking-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.95rem;
          background: #fff;
          color: #000;
          transition: all 0.3s;
        }

        .booking-input:focus {
          outline: none;
          border-color: #7acc00;
          box-shadow: 0 0 0 3px rgba(122, 204, 0, 0.1);
        }

        .booking-input::placeholder {
          color: #9ca3af;
        }

        .booking-select {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.95rem;
          background: #fff;
          color: #000;
          cursor: pointer;
          transition: all 0.3s;
        }

        .booking-select:focus {
          outline: none;
          border-color: #7acc00;
          box-shadow: 0 0 0 3px rgba(122, 204, 0, 0.1);
        }

        .booking-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.95rem;
          font-family: inherit;
          background: #fff;
          color: #000;
          resize: vertical;
          transition: all 0.3s;
        }

        .booking-textarea:focus {
          outline: none;
          border-color: #7acc00;
          box-shadow: 0 0 0 3px rgba(122, 204, 0, 0.1);
        }

        .form-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #000;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .required {
          color: #dc2626;
        }

        .policy-section {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin: 24px 0;
        }

        .policy-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #000;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .policy-item {
          font-size: 0.85rem;
          color: #374151;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .policy-item:last-child {
          margin-bottom: 0;
        }

        .consent-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #fff;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          margin: 24px 0;
          transition: all 0.3s;
        }

        .consent-box:has(input:checked) {
          border-color: #7acc00;
          background: rgba(122, 204, 0, 0.02);
        }

        .consent-checkbox {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          cursor: pointer;
          accent-color: #7acc00;
          flex-shrink: 0;
        }

        .consent-text {
          font-size: 0.85rem;
          color: #374151;
          line-height: 1.6;
        }

        .submit-btn {
          width: 100%;
          padding: 16px 24px;
          background: #7acc00;
          color: #000;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(122, 204, 0, 0.3);
          letter-spacing: 0.3px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #6ab800;
          box-shadow: 0 6px 16px rgba(122, 204, 0, 0.4);
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-box {
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          margin-bottom: 24px;
        }
      `}</style>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      <div>
        <label className="form-label">
          Name / Brand Name <span className="required">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Enter your name or brand name"
          value={formData.name}
          onChange={handleChange}
          className="booking-input"
        />
      </div>

      <div>
        <label className="form-label">
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          className="booking-input"
        />
      </div>

      <div>
        <label className="form-label">
          Phone Number <span className="required">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          required
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={handleChange}
          className="booking-input"
        />
      </div>

      <div>
        <label className="form-label">
          Select Package <span className="required">*</span>
        </label>
        <select
          name="package_type"
          value={formData.package_type}
          onChange={handleChange}
          className="booking-select"
        >
          <option value="">Choose package</option>
          <option value="product">Product - €200</option>
          <option value="fashion">Fashion - €210</option>
          <option value="restaurant">Restaurant - €220</option>
          <option value="model">Model - €230</option>
        </select>
      </div>

      <div>
        <label className="form-label">
          Shoot Type <span className="required">*</span>
        </label>
        <select
          name="shoot_type"
          value={formData.shoot_type}
          onChange={handleChange}
          className="booking-select"
        >
          <option value="">Select type</option>
          <option value="product">Product</option>
          <option value="fashion">Fashion</option>
          <option value="restaurant">Restaurant</option>
          <option value="model">Model</option>
        </select>
      </div>

      <div>
        <label className="form-label">
          Location <span className="required">*</span>
        </label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="booking-select"
        >
          <option value="studio">Our Studio</option>
          <option value="onLocation">Your Shop/Restaurant Address</option>
        </select>
      </div>

      <div>
        <label className="form-label">
          Preferred Date <span className="required">*</span>
        </label>
        <input
          type="date"
          name="preferred_date"
          required
          value={formData.preferred_date}
          onChange={handleChange}
          disabled={isDateDisabled(formData.preferred_date)}
          className="booking-input"
        />
        {isDateDisabled(formData.preferred_date) && (
          <p className="text-red-600 text-sm mt-2">This date is not available</p>
        )}
      </div>

      <div>
        <label className="form-label">
          Preferred Time <span className="required">*</span>
        </label>
        <select
          name="preferred_time"
          value={formData.preferred_time}
          onChange={handleChange}
          className="booking-select"
        >
          <option value="">--:--</option>
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
        <label className="form-label">
          Special Requests
        </label>
        <textarea
          name="special_requests"
          value={formData.special_requests}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us any special requests or details..."
          className="booking-textarea"
        />
      </div>

      {/* Payment & Booking Policy Section */}
      <div className="policy-section">
        <div className="policy-title">Payment & Booking Policy</div>
        <div className="policy-item">
          <strong>Day of Booking:</strong> 25% deposit is charged and held
        </div>
        <div className="policy-item">
          <strong>During Booking Period:</strong> 50% remains held until shoot completion
        </div>
        <div className="policy-item">
          <strong>After Completion:</strong> Final 25% is released
        </div>
        <div className="policy-item">
          <strong>Cancellation:</strong> Cancel within 24 hours for full refund; no refunds after that window
        </div>
        <div className="policy-item">
          <strong>Date Changes:</strong> Can only change dates 7+ days after booking or by cancelling and rebooking
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="consent-box">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="consent-checkbox"
        />
        <label htmlFor="consent" className="consent-text">
          I understand and accept the payment structure, cancellation policy, and date change rules outlined above
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="submit-btn"
      >
        {loading ? 'Confirming...' : 'Confirm Booking Request'}
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        No online payment required — we'll confirm details and payment with you directly.
      </p>
      <p className="text-center text-xs text-gray-500">
        Your details are used only to respond to this request. See our Privacy Policy.
      </p>
    </form>
  );
}

'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function SuccessPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="py-20 min-h-screen flex items-center justify-center" style={{ background: '#f9fafb' }}>
      <style>{`
        .success-container {
          max-width: 600px;
          background: white;
          border-radius: 16px;
          padding: 60px 40px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: #7acc00;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
          box-shadow: 0 8px 24px rgba(122, 204, 0, 0.3);
        }

        .success-icon svg {
          width: 48px;
          height: 48px;
          color: white;
          stroke-width: 3;
        }

        .success-title {
          font-size: 2rem;
          font-weight: 800;
          color: #000;
          margin-bottom: 16px;
        }

        .success-subtitle {
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .booking-details {
          background: #f9fafb;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
          text-align: left;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-label {
          font-weight: 600;
          color: #000;
        }

        .detail-value {
          color: #666;
        }

        .cta-button {
          display: inline-block;
          background: #7acc00;
          color: #000;
          padding: 16px 40px;
          border-radius: 10px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(122, 204, 0, 0.3);
        }

        .cta-button:hover {
          background: #6ab800;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(122, 204, 0, 0.4);
        }

        .success-footer {
          font-size: 0.9rem;
          color: #999;
          margin-top: 32px;
        }
      `}</style>

      <div className="success-container">
        <div className="success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="success-title">Booking Confirmed!</h1>
        <p className="success-subtitle">
          Thank you for your booking request. We've received your details and will contact you within 24 hours to confirm and discuss payment options.
        </p>

        {bookingId && (
          <div className="booking-details">
            <div className="detail-row">
              <span className="detail-label">Booking Reference:</span>
              <span className="detail-value">{bookingId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className="detail-value">Pending Confirmation</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Next Step:</span>
              <span className="detail-value">We'll email you within 24h</span>
            </div>
          </div>
        )}

        <Link href="/" className="cta-button">
          Back to Home
        </Link>

        <div className="success-footer">
          <p>Questions? Contact us at hello@meocy.com</p>
        </div>
      </div>
    </div>
  );
}

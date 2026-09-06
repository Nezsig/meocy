'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ConfirmationPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id');

  return (
    <div className="py-16 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <svg
                className="w-8 h-8 text-green-600"
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
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('confirmation.title')}</h1>
          <p className="text-gray-600 mb-6">{t('confirmation.message')}</p>

          {bookingId && (
            <div className="mb-6 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">{t('confirmation.bookingId')}</p>
              <p className="text-lg font-mono font-bold">{bookingId}</p>
            </div>
          )}

          <Link href="/" className="btn btn-primary inline-block">
            {t('confirmation.back')}
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function PaymentPage() {
  const t = useTranslations();

  useEffect(() => {
    // Simulate payment redirect - in production, this would be replaced
    // with actual bank gateway integration
    const timer = setTimeout(() => {
      // For now, redirect to confirmation page after 3 seconds
      // In production: window.location.href = bankGatewayUrl;
      window.location.href = '/confirmation';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-16 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">{t('payment.processing')}</h1>
          <p className="text-gray-600 mb-4">{t('payment.redirecting')}</p>
          <p className="text-sm text-gray-500">
            {t('payment.deposit')}
          </p>
        </div>
      </div>
    </div>
  );
}

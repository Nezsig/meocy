import { useTranslations } from 'next-intl';
import BookingForm from '@/components/BookingForm';

export const dynamic = 'force-dynamic';

export default function BookingPage() {
  const t = useTranslations();

  return (
    <div className="py-16 min-h-screen bg-gray-50">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-12">{t('booking.title')}</h1>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}

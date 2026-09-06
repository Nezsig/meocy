import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations();

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">{t('footer.terms')}</h1>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
          <p className="mb-4">
            These Terms and Conditions govern your use of the MEOCY Studio website and services.
          </p>

          <h3 className="text-xl font-bold mb-2">Booking Policy</h3>
          <p className="mb-4">
            A 25% deposit is required to confirm your booking. The remaining balance is due on the day of the shoot.
          </p>

          <h3 className="text-xl font-bold mb-2">Cancellation Policy</h3>
          <p className="mb-4">
            Cancellations must be made at least 7 days in advance for a full refund of the deposit. Cancellations within 7 days are non-refundable.
          </p>

          <h3 className="text-xl font-bold mb-2">Usage Rights</h3>
          <p className="mb-4">
            All photography is the intellectual property of MEOCY Studio. Usage rights are as specified in your booking agreement.
          </p>

          <h3 className="text-xl font-bold mb-2">Payment</h3>
          <p>
            Payments must be made through our secure payment gateway. By booking, you agree to these terms.
          </p>
        </div>
      </div>
    </div>
  );
}

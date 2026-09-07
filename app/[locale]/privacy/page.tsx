import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function PrivacyPage() {
  const t = useTranslations();

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">{t('footer.privacy')}</h1>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="mb-4">
            MEOCY Studio is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>

          <h3 className="text-xl font-bold mb-2">Information Collection</h3>
          <p className="mb-4">
            We collect information you voluntarily provide through our booking form, including name, email, phone number, and booking preferences.
          </p>

          <h3 className="text-xl font-bold mb-2">Use of Information</h3>
          <p className="mb-4">
            Your information is used to process your booking, send confirmation emails, and communicate about your shoot.
          </p>

          <h3 className="text-xl font-bold mb-2">Data Protection</h3>
          <p className="mb-4">
            We use industry-standard security measures to protect your personal information.
          </p>

          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <p>
            For privacy concerns, please contact us at {t('footer.email')}
          </p>
        </div>
      </div>
    </div>
  );
}

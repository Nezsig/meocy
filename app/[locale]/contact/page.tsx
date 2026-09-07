import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const t = useTranslations();

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-bold mb-12 text-center">{t('nav.contact')}</h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <p className="text-gray-600">{t('footer.address')}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <a href={`mailto:${t('footer.email')}`} className="text-blue-600 hover:underline">
                {t('footer.email')}
              </a>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <a href={`tel:${t('footer.phone')}`} className="text-blue-600 hover:underline">
                {t('footer.phone')}
              </a>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">{t('footer.social')}</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Instagram: @meocy_studio</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <p className="text-gray-600 mb-2">Monday - Friday: 10:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Saturday: By appointment</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

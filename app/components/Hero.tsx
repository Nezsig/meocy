'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black text-white py-32">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">{t('subtitle')}</p>
        <Link
          href={`/${locale}#booking`}
          className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
        >
          {t('cta')}
        </Link>
      </div>
    </section>
  );
}

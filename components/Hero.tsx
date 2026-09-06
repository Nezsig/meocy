'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="bg-black text-white py-32 md:py-48">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/booking" className="btn btn-secondary px-8 py-3 text-lg">
              {t('hero.cta_book')}
            </Link>
            <button className="btn btn-primary px-8 py-3 text-lg border border-white">
              {t('hero.cta_work')}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-3xl font-bold mb-2">8</p>
              <p className="text-gray-400">{t('stats.equipment')}</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-2">12h</p>
              <p className="text-gray-400">{t('stats.response')}</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-2">1</p>
              <p className="text-gray-400">{t('stats.location')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

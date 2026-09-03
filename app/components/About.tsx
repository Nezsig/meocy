'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">{t('title')}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center leading-relaxed">
          {t('description')}
        </p>
      </div>
    </section>
  );
}

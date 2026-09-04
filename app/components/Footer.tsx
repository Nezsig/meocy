'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-2">{t('company')}</h3>
            <p className="text-gray-400">{t('address')}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">{t('email')}</h3>
            <a href="mailto:hello@meocy.com" className="text-gray-400 hover:text-white">
              hello@meocy.com
            </a>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Social</h3>
            <div className="flex gap-4">
              <a href="#instagram" className="text-gray-400 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 {t('company')}. {t('rights')}.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white">
                {t('privacy')}
              </Link>
              <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white">
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

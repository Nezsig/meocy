'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="text-2xl font-bold text-black dark:text-white">
          MEOCY
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href={`/${locale}`} className="hover:text-gray-600 dark:hover:text-gray-300 transition">
            {t('home')}
          </Link>
          <Link href={`/${locale}#work`} className="hover:text-gray-600 dark:hover:text-gray-300 transition">
            {t('work')}
          </Link>
          <Link href={`/${locale}#packages`} className="hover:text-gray-600 dark:hover:text-gray-300 transition">
            {t('packages')}
          </Link>
          <Link href={`/${locale}#faq`} className="hover:text-gray-600 dark:hover:text-gray-300 transition">
            {t('faq')}
          </Link>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

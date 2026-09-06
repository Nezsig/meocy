'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: t('nav.home') },
    { href: '/booking', label: t('nav.booking') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const getLocalizedPath = (path: string, newLocale: string) => {
    if (path.startsWith(`/${locale}`)) {
      return path.replace(`/${locale}`, `/${newLocale}`);
    }
    return `/${newLocale}${path}`;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            MEOCY
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-gray-600 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {['en', 'it', 'fr'].map((l) => (
                <Link
                  key={l}
                  href={getLocalizedPath(pathname, l)}
                  className={`px-2 py-1 text-sm ${
                    locale === l ? 'font-bold' : 'text-gray-600'
                  }`}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-black text-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">MEOCY</h3>
            <p className="text-gray-400">
              Professional photography studio in Milan.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/booking" className="hover:text-white">
                  {t('nav.booking')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href={`mailto:${t('footer.email')}`} className="hover:text-white">
                  {t('footer.email')}
                </a>
              </li>
              <li>
                <a href={`tel:${t('footer.phone')}`} className="hover:text-white">
                  {t('footer.phone')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MEOCY Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

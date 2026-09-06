'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CTA() {
  const t = useTranslations();

  return (
    <section className="bg-black text-white py-20">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Visual Content?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's create stunning photography that elevates your brand. Book your shoot today.
          </p>
          <Link href="/booking" className="btn btn-secondary px-8 py-3 text-lg">
            {t('hero.cta_book')}
          </Link>
        </div>
      </div>
    </section>
  );
}

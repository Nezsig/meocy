'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Packages() {
  const t = useTranslations();

  const packages = [
    {
      key: 'basic',
      highlighted: false,
    },
    {
      key: 'silver',
      highlighted: false,
    },
    {
      key: 'gold',
      highlighted: true,
    },
    {
      key: 'platinum',
      highlighted: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {packages.map((pkg) => (
        <div
          key={pkg.key}
          className={`rounded-lg shadow-lg p-8 ${
            pkg.highlighted ? 'bg-black text-white transform scale-105' : 'bg-white'
          }`}
        >
          <h3 className="text-2xl font-bold mb-2">
            {t(`packages.${pkg.key}.name`)}
          </h3>
          <p className={`text-sm mb-4 ${pkg.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
            {t(`packages.${pkg.key}.subtitle`)}
          </p>
          <p className="text-4xl font-bold mb-6">
            {t(`packages.${pkg.key}.price`)}
          </p>

          <ul className="space-y-3 mb-8">
            {(() => {
              const features = t.raw(`packages.${pkg.key}.features`);
              return Array.isArray(features)
                ? features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-3">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))
                : null;
            })()}
          </ul>

          <Link href="/booking" className={`btn block text-center ${
            pkg.highlighted ? 'bg-white text-black' : 'bg-black text-white'
          }`}>
            Book Now
          </Link>
        </div>
      ))}

      {/* Custom Quote */}
      <div className="rounded-lg shadow-lg p-8 bg-gray-100 flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold mb-4 text-center">
          {t('packages.custom')}
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Need something tailored to your needs?
        </p>
        <Link href="/contact" className="btn btn-primary">
          Get Quote
        </Link>
      </div>
    </div>
  );
}

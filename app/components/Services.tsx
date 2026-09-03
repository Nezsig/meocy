'use client';

import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('services');

  const services = [
    { key: 'product', name: t('product') },
    { key: 'fashion', name: t('fashion') },
    { key: 'restaurant', name: t('restaurant') },
    { key: 'model', name: t('model') },
  ];

  return (
    <section id="work" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.key}
              className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-4">{service.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Professional {service.name.toLowerCase()} services tailored to your vision.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

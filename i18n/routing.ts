import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'it', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const locales = routing.locales;

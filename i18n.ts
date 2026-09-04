import { notFound } from 'next/navigation';

const locales = ['en', 'it', 'fr'];

export async function getMessages(locale: string) {
  if (!locales.includes(locale)) {
    notFound();
  }

  try {
    return (await import(`./messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export { locales };

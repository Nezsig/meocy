import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the locale is supported
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Load messages for the current locale
  let messages: any = {};
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (err) {
    console.error(`Failed to load messages for locale: ${locale}`, err);
    try {
      // Fallback to English
      messages = (await import('@/messages/en.json')).default;
    } catch (fallbackErr) {
      console.warn('Failed to load any messages');
      messages = {};
    }
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <html lang={locale}>
        <body>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}

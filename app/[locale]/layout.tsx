import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

  // Providing all messages to the client
  let messages: any = {};
  try {
    messages = await getMessages();
  } catch (err) {
    // Fallback if getMessages fails during build
    console.warn('Failed to get messages, using empty object');
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

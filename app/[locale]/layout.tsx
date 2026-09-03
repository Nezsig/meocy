import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from '@/i18n';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'MEOCY Photography Studio',
  description: 'Professional photography studio in Milan.',
};

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: Props) {
  let messages;
  try {
    messages = await getMessages(params.locale);
  } catch (error) {
    notFound();
  }

  return (
    <html lang={params.locale}>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

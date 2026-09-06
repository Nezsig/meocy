import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'MEOCY Photography Studio',
  description: 'Professional photography studio in Milan.',
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const validLocales = ['en', 'it', 'fr'];

  if (!validLocales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

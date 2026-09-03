import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MEOCY Photography Studio - Milan',
  description: 'Professional photography studio in Milan specializing in product, fashion, restaurant, and model photography.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}

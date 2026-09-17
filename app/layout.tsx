import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MEOCY Studio - Professional Photography in Milan',
  description: 'Professional product, fashion, and content photography services in Milan. Book your shoot today.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

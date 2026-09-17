import Hero from '@/components/Hero';
import Packages from '@/components/Packages';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <Hero />
      <Packages />
      <Footer />
    </>
  );
}

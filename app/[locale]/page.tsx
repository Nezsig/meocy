import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import Packages from '@/components/Packages';
import Calculator from '@/components/Calculator';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <Hero />
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t('packages.title')}</h2>
          <Packages />
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <Calculator />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <FAQ />
        </div>
      </section>

      <CTA />
    </>
  );
}

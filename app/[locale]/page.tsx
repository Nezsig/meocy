import { useTranslations } from 'next-intl';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Services from '@/app/components/Services';
import BookingForm from '@/app/components/BookingForm';
import FAQ from '@/app/components/FAQ';

export default function Home() {
  const t = useTranslations();

  return (
    <div>
      <Hero />
      <About />
      <Services />
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <BookingForm />
        </div>
      </section>
      <FAQ />
    </div>
  );
}

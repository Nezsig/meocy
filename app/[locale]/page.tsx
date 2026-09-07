import Hero from '@/components/Hero';
import Equipment from '@/components/Equipment';
import Packages from '@/components/Packages';
import Calculator from '@/components/Calculator';
import Process from '@/components/Process';
import Studio from '@/components/Studio';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export const dynamic = 'force-dynamic';

export default function Home() {

  return (
    <>
      <Hero />
      <Equipment />
      <section className="packages-section-wrapper">
        <style>{`
          .packages-section-wrapper {
            background: var(--bg);
            padding: 100px 0;
          }

          .packages-header {
            text-align: center;
            margin-bottom: 80px;
          }

          .packages-header span.eyebrow {
            display: inline-block;
            background: var(--accent-soft);
            color: var(--accent);
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding: 8px 16px;
            border-radius: 20px;
            margin-bottom: 24px;
          }

          .packages-header h2 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2rem, 6vw, 3rem);
            font-weight: 800;
            margin-bottom: 24px;
            color: var(--text-dark);
          }

          .packages-header p {
            font-size: 1.05rem;
            color: var(--text-light);
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.7;
          }
        `}</style>

        <div className="container">
          <div className="packages-header">
            <span className="eyebrow">Pricing</span>
            <h2>Packages & Pricing</h2>
            <p>All prices shown excluding VAT. Every detail fixed in writing before we start. Standard packages include videos for social media content (Reels, TikTok, Stories).</p>
          </div>
          <Packages />
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <Calculator />
        </div>
      </section>

      <Process />

      <Studio />

      <section className="py-16 bg-gray-50">
        <div className="container">
          <FAQ />
        </div>
      </section>

      <CTA />
    </>
  );
}

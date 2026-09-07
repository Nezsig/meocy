'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CTA() {
  const t = useTranslations();

  return (
    <section className="cta-section">
      <style>{`
        .cta-section {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          color: #ffffff;
          padding: 100px 20px;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -20%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .cta-content {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .cta-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }

        .cta-description {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 48px;
          line-height: 1.8;
          font-weight: 400;
        }

        .cta-button {
          display: inline-block;
          background: #ffffff;
          color: #000000;
          padding: 16px 44px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          background: #f5f5f5;
        }

        @media (max-width: 768px) {
          .cta-section {
            padding: 60px 20px;
          }

          .cta-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Transform Your Visual Content?
          </h2>
          <p className="cta-description">
            Let's create stunning photography that elevates your brand. Book your shoot today.
          </p>
          <Link href="/booking" className="cta-button">
            {t('hero.cta_book')}
          </Link>
        </div>
      </div>
    </section>
  );
}

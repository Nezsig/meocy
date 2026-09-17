import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="hero-section">
      <style>{`
        .hero-section {
          margin-top: 60px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          position: relative;
          overflow: hidden;
          padding: 60px 20px;
        }

        .hero-section::before {
          content: "";
          position: absolute;
          top: -40%;
          right: -10%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-section::after {
          content: "";
          position: absolute;
          bottom: -30%;
          left: -5%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.05);
          padding: 10px 18px;
          border-radius: 20px;
          margin-bottom: 32px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #000;
          border: 1px solid rgba(0, 0, 0, 0.1);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .hero-tag::before {
          content: "";
          width: 6px;
          height: 6px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 8vw, 5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -1.5px;
          margin-bottom: 24px;
          color: #000;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 3vw, 1.3rem);
          color: #666;
          margin-bottom: 56px;
          line-height: 1.8;
          font-weight: 400;
        }

        .hero-cta {
          display: flex;
          flex-direction: column;
          gap: 14px;
          justify-content: center;
          align-items: center;
          margin-bottom: 100px;
        }

        @media (min-width: 640px) {
          .hero-cta {
            flex-direction: row;
            gap: 12px;
          }
        }

        .btn {
          padding: 14px 40px;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 50px;
          cursor: pointer;
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: inherit;
          min-width: 200px;
        }

        .btn-primary {
          background: #000;
          color: #fff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .btn-primary:hover {
          background: #1a1a1a;
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .btn-secondary {
          background: transparent;
          color: #000;
          border: 2px solid #000;
        }

        .btn-secondary:hover {
          background: #000;
          color: #fff;
          transform: translateY(-2px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 50px;
        }

        .stat-item {
          animation: fadeInUp 0.6s ease-out both;
        }

        .stat-number {
          font-size: 4rem;
          font-weight: 800;
          color: #22c55e;
          margin-bottom: 12px;
          letter-spacing: -1px;
        }

        .stat-label {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.6;
          font-weight: 500;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            margin-top: 60px;
            padding: 40px 20px;
          }

          .btn {
            min-width: 100%;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .stats-grid {
            gap: 30px;
          }

          .stat-number {
            font-size: 3rem;
          }
        }
      `}</style>

      <div className="container">
        <div className="hero-content">
          <div className="hero-tag">
            <span>MILAN</span>
          </div>

          <h1 className="hero-title">
            {t('hero.title')}
          </h1>

          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>

          <div className="hero-cta">
            <Link href="/booking" className="btn btn-primary">
              {t('hero.cta_book')}
            </Link>
            <button className="btn btn-secondary">
              {t('hero.cta_work')}
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">8</div>
              <p className="stat-label">{t('stats.equipment')}</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">12</div>
              <p className="stat-label">{t('stats.response')}</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">1</div>
              <p className="stat-label">{t('stats.location')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

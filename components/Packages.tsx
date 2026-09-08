'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Packages() {
  const t = useTranslations();

  const packages = [
    {
      key: 'basic',
      variant: 'light',
    },
    {
      key: 'silver',
      variant: 'dark',
    },
    {
      key: 'gold',
      variant: 'accent',
    },
    {
      key: 'platinum',
      variant: 'dark',
    },
  ];

  return (
    <section className="packages-section">
      <style>{`
        .packages-section {
          padding: 0;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }

        .package-card {
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 40px;
          display: flex;
          flex-direction: column;
          min-height: 600px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .package-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 100%);
          pointer-events: none;
        }

        .package-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 0, 0, 0.15);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .package-card.light {
          background: var(--bg-light);
          color: var(--text-dark);
        }

        .package-card.dark {
          background: var(--dark);
          color: var(--text-on-dark);
          border-color: rgba(0, 0, 0, 0.3);
        }

        .package-card.accent {
          background: #f0ffe8;
          color: var(--text-dark);
          border-color: var(--accent);
          border-width: 2px;
        }

        .package-header {
          margin-bottom: 24px;
        }

        .package-name {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .package-card.light .package-name {
          color: var(--text-dark);
        }

        .package-card.dark .package-name {
          color: var(--text-on-dark);
        }

        .package-card.accent .package-name {
          color: var(--accent);
        }

        .package-subtitle {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .package-card.dark .package-subtitle {
          color: var(--accent);
        }

        .package-price {
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 8px;
        }

        .package-price-note {
          font-size: 0.75rem;
          color: var(--text-light);
          font-weight: 500;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }

        .package-card.dark .package-price-note {
          color: var(--text-on-dark-dim);
        }

        .package-card.accent .package-price-note {
          color: var(--text-light);
        }

        .package-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid;
        }

        .package-card.light .package-info {
          border-color: rgba(0, 0, 0, 0.1);
        }

        .package-card.dark .package-info {
          border-color: rgba(255, 255, 255, 0.1);
        }

        .package-card.accent .package-info {
          border-color: rgba(122, 204, 0, 0.2);
        }

        .package-info-item {
          border: 1px solid;
          border-radius: var(--r-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .package-card.light .package-info-item {
          border-color: rgba(0, 0, 0, 0.1);
          background: var(--bg);
        }

        .package-card.dark .package-info-item {
          border-color: rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
        }

        .package-card.accent .package-info-item {
          border-color: rgba(122, 204, 0, 0.3);
          background: rgba(122, 204, 0, 0.05);
        }

        .package-info-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--text-light);
          margin-bottom: 6px;
        }

        .package-card.dark .package-info-label {
          color: var(--text-on-dark-dim);
        }

        .package-card.accent .package-info-label {
          color: var(--accent);
        }

        .package-info-value {
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .package-card.light .package-info-value {
          color: var(--text-dark);
        }

        .package-card.dark .package-info-value {
          color: var(--text-on-dark);
        }

        .package-card.accent .package-info-value {
          color: var(--text-dark);
        }

        .package-features {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .package-feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .package-feature-check {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          font-weight: 700;
          margin-top: 2px;
        }

        .package-feature-text {
          color: inherit;
        }

        .package-card.light .package-feature-text {
          color: var(--text-dark);
        }

        .package-card.dark .package-feature-text {
          color: var(--text-on-dark);
        }

        .package-cta {
          border: 1.5px solid #000;
          background: transparent;
          color: #000;
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: block;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .package-card.light .package-cta {
          color: #000;
          border-color: #000;
        }

        .package-card.light .package-cta:hover {
          background: #000;
          color: #fff;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .package-card.dark .package-cta {
          color: #fff;
          border-color: #fff;
        }

        .package-card.dark .package-cta:hover {
          background: #fff;
          color: #000;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .package-card.accent .package-cta {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        .package-card.accent .package-cta:hover {
          background: #22c55e;
          color: #000;
          border-color: #22c55e;
          box-shadow: 0 8px 20px rgba(34, 197, 94, 0.2);
        }

        @media (max-width: 768px) {
          .packages-grid {
            grid-template-columns: 1fr;
          }

          .package-card {
            min-height: auto;
          }
        }
      `}</style>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <div key={pkg.key} className={`package-card ${pkg.variant}`}>
            <div className="package-header">
              <div className="package-name">
                {t(`packages.${pkg.key}.name`)}
              </div>
              <div className="package-subtitle">
                {t(`packages.${pkg.key}.subtitle`)}
              </div>
              <div className="package-price">
                {t(`packages.${pkg.key}.price`)}
              </div>
            </div>

            <div className="package-info">
              {pkg.key === 'basic' && (
                <>
                  <div className="package-info-item">
                    <div className="package-info-label">Volume</div>
                    <div className="package-info-value">Up to 15 final images</div>
                  </div>
                  <div className="package-info-item">
                    <div className="package-info-label">Delivery</div>
                    <div className="package-info-value">5 working days</div>
                  </div>
                </>
              )}
              {pkg.key === 'silver' && (
                <>
                  <div className="package-info-item">
                    <div className="package-info-label">Volume</div>
                    <div className="package-info-value">Up to 40 final images</div>
                  </div>
                  <div className="package-info-item">
                    <div className="package-info-label">Delivery</div>
                    <div className="package-info-value">4 working days</div>
                  </div>
                </>
              )}
              {pkg.key === 'gold' && (
                <>
                  <div className="package-info-item">
                    <div className="package-info-label">Volume</div>
                    <div className="package-info-value">80+ final images</div>
                  </div>
                  <div className="package-info-item">
                    <div className="package-info-label">Delivery</div>
                    <div className="package-info-value">7 working days</div>
                  </div>
                </>
              )}
              {pkg.key === 'platinum' && (
                <>
                  <div className="package-info-item">
                    <div className="package-info-label">Volume</div>
                    <div className="package-info-value">100+ photos & 10 videos</div>
                  </div>
                  <div className="package-info-item">
                    <div className="package-info-label">Delivery</div>
                    <div className="package-info-value">10 working days</div>
                  </div>
                </>
              )}
            </div>

            <ul className="package-features">
              {(() => {
                const features = t.raw(`packages.${pkg.key}.features`);
                return Array.isArray(features)
                  ? features.map((feature, idx) => (
                      <li key={idx} className="package-feature">
                        <div className="package-feature-check">✓</div>
                        <div className="package-feature-text">{feature}</div>
                      </li>
                    ))
                  : null;
              })()}
            </ul>

            <Link href="/booking" className="package-cta">
              Book your package
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

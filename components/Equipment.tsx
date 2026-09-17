import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function Equipment() {
  const t = useTranslations();

  const equipmentCategories = [
    {
      titleKey: 'equipment.camera',
      items: ['Sony A6700', 'Sony FX30'],
      icon: '📷',
    },
    {
      titleKey: 'equipment.lenses',
      items: ['85mm f/1.4', '50mm f/1.4', '33mm f/1.4'],
      icon: '🔍',
    },
    {
      titleKey: 'equipment.lighting',
      items: [
        'Godox AD600Pro',
        'Godox AD300Pro',
        'GVM 300W',
        'GVM 150W',
        '3× Speedlight',
        '120cm & 80cm Octabox',
        'Light Stands',
      ],
      icon: '💡',
    },
    {
      titleKey: 'equipment.support',
      items: ['Photo & video tripods', 'Ronin RS Mini Pro'],
      icon: '🦾',
    },
    {
      titleKey: 'equipment.aerial',
      items: ['DJI Mini 3 Pro'],
      icon: '🚁',
    },
    {
      titleKey: 'equipment.storage',
      items: [
        '256GB SD card',
        '128GB V90 SD card',
        '128GB V60 SD card',
        '64GB SD card',
        '8TB HDD backup',
      ],
      icon: '💾',
    },
    {
      titleKey: 'equipment.power',
      items: ['3× spare batteries', '2× 20,000mAh power bank', 'EcoFlow 60,000mAh'],
      icon: '🔋',
    },
    {
      titleKey: 'equipment.postproduction',
      items: ['Mac', 'ASUS PA278QV color-calibrated monitor'],
      icon: '🖥️',
    },
  ];

  return (
    <section className="equipment-section">
      <style>{`
        .equipment-section {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: #ffffff;
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }

        .equipment-section::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .equipment-section::after {
          content: "";
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .equipment-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-bottom: 100px;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        .equipment-header-left span.eyebrow {
          display: inline-block;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 20px;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .equipment-header h2 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          color: #ffffff;
          margin-bottom: 24px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .equipment-header-right p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          line-height: 1.8;
          font-weight: 400;
        }

        .equipment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          position: relative;
          z-index: 1;
        }

        .equipment-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .equipment-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
          pointer-events: none;
        }

        .equipment-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .equipment-card-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
          display: inline-block;
        }

        .equipment-card-title {
          font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto';
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          z-index: 1;
        }

        .equipment-card-title::before {
          content: "";
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
        }

        .equipment-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .equipment-list li {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.5;
          padding-left: 0;
          transition: color 0.2s;
          font-weight: 400;
        }

        .equipment-list li::before {
          content: "–";
          margin-right: 8px;
          color: rgba(255, 255, 255, 0.4);
        }

        .equipment-card:hover .equipment-list li {
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 768px) {
          .equipment-header {
            grid-template-columns: 1fr;
            gap: 40px;
            margin-bottom: 60px;
          }

          .equipment-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .equipment-section {
            padding: 80px 0;
          }

          .equipment-header h2 {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="container">
        <div className="equipment-header">
          <div className="equipment-header-left">
            <span className="eyebrow">Behind the Scenes</span>
            <h2>{t('equipment.title')}</h2>
          </div>
          <div className="equipment-header-right">
            <p>{t('equipment.subtitle')}</p>
          </div>
        </div>

        <div className="equipment-grid">
          {equipmentCategories.map((category, index) => (
            <div key={index} className="equipment-card">
              <div className="equipment-card-icon">{category.icon}</div>
              <div className="equipment-card-title">
                {t(category.titleKey)}
              </div>
              <ul className="equipment-list">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

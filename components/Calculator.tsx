'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Prices {
  [key: string]: number;
}

export default function Calculator() {
  const [serviceType, setServiceType] = useState('product');
  const [imageCount, setImageCount] = useState(20);
  const [location, setLocation] = useState('studio');
  const [addOns, setAddOns] = useState<string[]>([]);

  const basePrices: Prices = {
    product: 200,
    fashion: 300,
    restaurant: 350,
    model: 400,
  };

  const addOnPrices: Prices = {
    modelCasting: 100,
    styling: 75,
    videoClips: 200,
    expressDelivery: 150,
  };

  const { breakdown, minPrice, maxPrice } = useMemo(() => {
    let base = basePrices[serviceType];
    let imagePrice = Math.ceil(imageCount / 5) * 20;

    if (location === 'onLocation') {
      base += 150;
    }

    let addOnTotal = 0;
    addOns.forEach((addon) => {
      addOnTotal += addOnPrices[addon] || 0;
    });

    const subtotal = base + imagePrice + addOnTotal;
    const min = Math.round(subtotal * 0.9);
    const max = Math.round(subtotal * 1.1);

    return {
      breakdown: {
        service: base,
        images: imagePrice,
        location: location === 'onLocation' ? 150 : 0,
        addOns: addOnTotal,
      },
      total: subtotal,
      minPrice: min,
      maxPrice: max,
    };
  }, [serviceType, imageCount, location, addOns]);

  const toggleAddOn = (addon: string) => {
    setAddOns((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  return (
    <section className="calculator-section">
      <style>{`
        .calculator-section {
          background: var(--bg);
          padding: 100px 0;
        }

        .calculator-header {
          margin-bottom: 60px;
        }

        .calculator-header span.eyebrow {
          display: inline-block;
          background: var(--accent-soft);
          color: var(--accent);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 20px;
          margin-bottom: 16px;
        }

        .calculator-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.75rem, 5vw, 2.75rem);
          margin-bottom: 24px;
          color: var(--text-dark);
        }

        .calculator-header p {
          font-size: 1rem;
          color: var(--text-light);
          max-width: 600px;
          line-height: 1.7;
        }

        .calculator-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .calculator-controls h3 {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-dark);
          margin-bottom: 16px;
          margin-top: 32px;
        }

        .calculator-controls h3:first-of-type {
          margin-top: 0;
        }

        .button-group {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
        }

        .button-group button {
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.06);
          color: var(--text-dark);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .button-group button:hover {
          background: rgba(0, 0, 0, 0.1);
        }

        .button-group button.active {
          background: #000;
          color: #fff;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .location-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .location-buttons button {
          width: 100%;
          padding: 16px;
          text-align: left;
          background: rgba(0, 0, 0, 0.06);
          border: none;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .location-buttons button.active {
          background: #000;
          color: #fff;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .slider-container {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .slider-container input[type="range"] {
          flex: 1;
        }

        .slider-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent);
          min-width: 40px;
          text-align: right;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-light);
          margin-top: 8px;
        }

        .addons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .addon-card {
          border: none;
          border-radius: 8px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(0, 0, 0, 0.06);
        }

        .addon-card:hover {
          background: rgba(0, 0, 0, 0.1);
        }

        .addon-card input[type="checkbox"]:checked ~ .addon-label {
          color: #000;
          font-weight: 700;
        }

        .addon-card input[type="checkbox"] {
          margin-right: 12px;
        }

        .addon-label {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-dark);
        }

        .addon-desc {
          font-size: 0.8rem;
          color: var(--text-light);
          margin-top: 4px;
        }

        /* Price Card */
        .price-card {
          border: none;
          border-radius: 16px;
          background: #0a0a0a;
          color: var(--text-on-dark);
          padding: 40px;
          position: sticky;
          top: 100px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .price-card-header {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #7acc00;
          margin-bottom: 16px;
        }

        .price-display {
          font-size: clamp(2.25rem, 5vw, 2.75rem);
          font-weight: 900;
          margin-bottom: 12px;
          line-height: 1;
          color: #fff;
        }

        .price-range {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 24px;
        }

        .price-note {
          font-size: 0.85rem;
          color: var(--text-on-dark-dim);
          line-height: 1.6;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.95rem;
          margin-bottom: 16px;
        }

        .breakdown-item-label {
          color: var(--text-on-dark-dim);
        }

        .breakdown-item-value {
          font-weight: 600;
          color: var(--text-on-dark);
        }

        .price-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .feature {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .feature-icon {
          font-size: 1.5rem;
          margin-bottom: 4px;
        }

        .feature-value {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-on-dark);
        }

        .feature-label {
          font-size: 0.8rem;
          color: var(--text-on-dark-dim);
        }

        .price-cta {
          background: #7acc00;
          color: #000;
          border: none;
          padding: 16px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          width: 100%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(122, 204, 0, 0.3);
        }

        .price-cta:hover {
          background: #6ab800;
          box-shadow: 0 6px 16px rgba(122, 204, 0, 0.4);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .calculator-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .price-card {
            position: static;
            top: auto;
          }

          .addons-grid {
            grid-template-columns: 1fr;
          }

          .location-buttons {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="container">
        <div className="calculator-header">
          <span className="eyebrow">The Part Everyone Asks About First</span>
          <h2>See your price before you talk to anyone.</h2>
          <p>
            Move the controls and watch the number change. This is the same
            calculation behind every quote we send — nothing hidden underneath it.
          </p>
        </div>

        <div className="calculator-container">
          {/* Left: Controls */}
          <div className="calculator-controls">
            {/* Service Type */}
            <h3>What are we photographing?</h3>
            <div className="button-group">
              {['product', 'fashion', 'restaurant', 'model'].map((type) => (
                <button
                  key={type}
                  className={`capitalize ${serviceType === type ? 'active' : ''}`}
                  onClick={() => setServiceType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Image Count */}
            <h3>How many final images?</h3>
            <div className="slider-container">
              <input
                type="range"
                min="5"
                max="80"
                step="1"
                value={imageCount}
                onChange={(e) => setImageCount(Number(e.target.value))}
                className="w-full"
              />
              <div className="slider-value">{imageCount}</div>
            </div>
            <div className="slider-labels">
              <span>5 — a small drop</span>
              <span>80 — a full catalogue</span>
            </div>

            {/* Location */}
            <h3>Where?</h3>
            <div className="location-buttons">
              <button
                className={location === 'studio' ? 'active' : ''}
                onClick={() => setLocation('studio')}
              >
                <div style={{ fontWeight: 600 }}>Our Milan studio</div>
                <div style={{ fontSize: '0.85rem', marginTop: '4px', color: 'var(--text-light)' }}>
                  Full control of the light
                </div>
              </button>
              <button
                className={location === 'onLocation' ? 'active' : ''}
                onClick={() => setLocation('onLocation')}
              >
                <div style={{ fontWeight: 600 }}>Your location</div>
                <div style={{ fontSize: '0.85rem', marginTop: '4px', color: 'var(--text-light)' }}>
                  We pack the studio into a van
                </div>
              </button>
            </div>

            {/* Add-ons */}
            <h3>Anything else?</h3>
            <div className="addons-grid">
              {[
                { id: 'modelCasting', label: 'Model casting', desc: 'We cast, book and pay the talent.' },
                { id: 'styling', label: 'Styling & set build', desc: 'Props, surfaces, wardrobe.' },
                { id: 'videoClips', label: 'Vertical video clips', desc: '6–10 short clips from the same set.' },
                { id: 'expressDelivery', label: 'Express delivery', desc: 'Retouched files back in 48 hours.' },
              ].map((addon) => (
                <div
                  key={addon.id}
                  className="addon-card"
                  onClick={() => toggleAddOn(addon.id)}
                >
                  <input
                    type="checkbox"
                    checked={addOns.includes(addon.id)}
                    onChange={() => {}}
                  />
                  <label className="addon-label">{addon.label}</label>
                  <div className="addon-desc">{addon.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Price Card */}
          <div className="price-card">
            <div className="price-card-header">Your Estimate</div>
            <div className="price-display">
              €{minPrice} – €{maxPrice}
            </div>
            <div className="price-range">
              Excluding VAT. Fixed in writing before we start.
            </div>

            <div className="price-note">
              <strong>{serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} shoot</strong>
              — studio time & lighting
            </div>

            <div className="breakdown-item">
              <span className="breakdown-item-label">{imageCount} final retouched images</span>
              <span className="breakdown-item-value">€{breakdown.images}</span>
            </div>

            {breakdown.location > 0 && (
              <div className="breakdown-item">
                <span className="breakdown-item-label">On-location travel</span>
                <span className="breakdown-item-value">€{breakdown.location}</span>
              </div>
            )}

            {breakdown.addOns > 0 && (
              <div className="breakdown-item">
                <span className="breakdown-item-label">Add-ons</span>
                <span className="breakdown-item-value">€{breakdown.addOns}</span>
              </div>
            )}

            <div className="price-features">
              <div className="feature">
                <div className="feature-icon">⏱️</div>
                <div className="feature-value">4 working days</div>
                <div className="feature-label">Files delivered</div>
              </div>
              <div className="feature">
                <div className="feature-icon">✨</div>
                <div className="feature-value">Essential</div>
                <div className="feature-label">One studio day</div>
              </div>
            </div>

            <Link href="/booking" className="price-cta" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>
              Hold a date with this brief
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

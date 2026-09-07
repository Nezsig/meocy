export const dynamic = 'force-dynamic';

export default function Process() {
  const steps = [
    {
      title: 'Tell us what you sell',
      duration: '20 MINUTES',
      description:
        'A short call or a form. We look at your products, your channels and the images you wish you had.',
    },
    {
      title: 'We send a shot list',
      duration: '2 DAYS',
      description:
        'Every frame planned before anyone touches a camera — angles, props, light, and where each image will be used.',
    },
    {
      title: 'Shoot day',
      duration: 'HALF OR FULL DAY',
      description:
        'In our Milan studio or at your location. You can join in person or watch the live tethered feed from anywhere.',
    },
    {
      title: 'Selects, retouch, deliver',
      duration: '4–7 DAYS',
      description:
        'You pick favourites in a private gallery. We retouch and deliver in every crop your channels need.',
    },
  ];

  return (
    <section className="process-section">
      <style>{`
        .process-section {
          background: var(--dark);
          color: var(--text-on-dark);
          padding: 100px 0;
        }

        .process-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .process-content span.eyebrow {
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

        .process-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 800;
          color: var(--text-on-dark);
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .process-content > p {
          font-size: 1.05rem;
          color: var(--text-on-dark-dim);
          margin-bottom: 60px;
          line-height: 1.7;
        }

        .process-steps {
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: relative;
          padding-left: 32px;
        }

        .process-steps::before {
          content: "";
          position: absolute;
          left: 5px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(
            180deg,
            var(--accent) 0%,
            var(--accent) 100%
          );
        }

        .process-step {
          position: relative;
          padding-left: 24px;
        }

        .process-step::before {
          content: "";
          position: absolute;
          left: -32px;
          top: 6px;
          width: 12px;
          height: 12px;
          background: var(--accent);
          border-radius: 50%;
          border: 3px solid var(--dark);
        }

        .process-step-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-on-dark);
          margin-bottom: 8px;
        }

        .process-step-duration {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-soft);
          padding: 4px 12px;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .process-step-description {
          font-size: 0.95rem;
          color: var(--text-on-dark-dim);
          line-height: 1.6;
        }

        .process-image {
          position: relative;
          border-radius: var(--r-lg);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          aspect-ratio: 1;
        }

        .process-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .process-image-caption {
          font-size: 0.8rem;
          color: var(--text-on-dark-dim);
          margin-top: 16px;
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .process-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .process-image {
            aspect-ratio: auto;
            min-height: 400px;
          }
        }

        @media (max-width: 768px) {
          .process-section {
            padding: 60px 0;
          }

          .process-container {
            gap: 40px;
          }

          .process-steps {
            gap: 32px;
            padding-left: 24px;
          }

          .process-steps::before {
            left: 3px;
          }

          .process-step::before {
            left: -24px;
          }
        }
      `}</style>

      <div className="container">
        <div className="process-container">
          {/* Left: Timeline */}
          <div className="process-content">
            <span className="eyebrow">From First Message to Final Files</span>
            <h2>You will always know what happens next.</h2>
            <p>
              No jargon, no surprise invoices. Four steps, fixed timings, one person
              looking after you the whole way.
            </p>

            <div className="process-steps">
              {steps.map((step, idx) => (
                <div key={idx} className="process-step">
                  <div className="process-step-title">{step.title}</div>
                  <div className="process-step-duration">{step.duration}</div>
                  <div className="process-step-description">{step.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="process-image">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
              alt="MEOCY Studio Setup"
            />
            <div className="process-image-caption">
              Via Tortona, Milan — 180 sqm, three cycloramas, tethered to your screen.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

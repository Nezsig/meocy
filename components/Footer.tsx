export const dynamic = 'force-dynamic';

export default function Footer() {
  return (
    <footer className="footer-section">
      <style>{`
        .footer-section {
          background: var(--dark);
          color: var(--text-on-dark);
          padding: 80px 0 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 80px;
        }

        .footer-branding {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .footer-logo {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -1px;
          color: var(--text-on-dark);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-logo-dot {
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
        }

        .footer-desc {
          font-size: 0.85rem;
          color: var(--text-on-dark-dim);
          line-height: 1.7;
          max-width: 280px;
        }

        .footer-socials {
          display: flex;
          gap: 16px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--r-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-on-dark);
          cursor: pointer;
          transition: all 0.3s var(--ease);
          text-decoration: none;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .social-link:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact-icon {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1rem;
          color: var(--accent);
          margin-bottom: 4px;
        }

        .contact-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--text-on-dark-dim);
        }

        .contact-value {
          font-size: 0.95rem;
          color: var(--text-on-dark);
          font-weight: 500;
        }

        .contact-value a {
          color: var(--text-on-dark);
          text-decoration: none;
          transition: color 0.3s var(--ease);
        }

        .contact-value a:hover {
          color: var(--accent);
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .footer-column-title {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-on-dark-dim);
          margin-bottom: 16px;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links-list li a {
          font-size: 0.95rem;
          color: var(--text-on-dark);
          text-decoration: none;
          transition: color 0.3s var(--ease);
        }

        .footer-links-list li a:hover {
          color: var(--accent);
        }

        .footer-bottom {
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: var(--text-on-dark-dim);
        }

        .footer-bottom-left,
        .footer-bottom-right {
          display: flex;
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }

          .footer-branding {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
            margin-bottom: 40px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .footer-bottom-left,
          .footer-bottom-right {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="container">
        <div className="footer-content">
          <div className="footer-branding">
            <div className="footer-logo">
              <div className="footer-logo-dot"></div>
              MEOCY
            </div>
            <p className="footer-desc">
              Professional photography studio in Milan. Product, fashion, restaurant and model shoots.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com" className="social-link" title="Instagram">
                📷
              </a>
              <a href="https://maps.google.com" className="social-link" title="Location">
                📍
              </a>
            </div>
          </div>

          <div className="footer-contact">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-label">Email</div>
              <div className="contact-value">
                <a href="mailto:hello@meocy.com">hello@meocy.com</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-label">Phone</div>
              <div className="contact-value">
                <a href="tel:+39379105100">+39 379 105 1000</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-label">Studio</div>
              <div className="contact-value">
                Viale Renato Serra 14,<br />
                20148 Milano
              </div>
            </div>
            <div className="contact-item" style={{ marginTop: '8px' }}>
              <div className="contact-value" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                MEOCY MILAN • CET
              </div>
            </div>
          </div>

          <div className="footer-links">
            <h3 className="footer-column-title">Navigation</h3>
            <ul className="footer-links-list">
              <li><a href="#about">About</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#packages">Packages</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#booking">Book Now</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3 className="footer-column-title">Services</h3>
            <ul className="footer-links-list">
              <li><a href="#fashion">Fashion</a></li>
              <li><a href="#product">Product</a></li>
              <li><a href="#restaurant">Restaurant</a></li>
              <li><a href="#model">Model</a></li>
              <li><a href="#location">On-Location</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3 className="footer-column-title">Legal</h3>
            <ul className="footer-links-list">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© 2026 MEOCY Studio. All rights reserved.</span>
          </div>
          <div className="footer-bottom-right">
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              Privacy Policy
            </a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

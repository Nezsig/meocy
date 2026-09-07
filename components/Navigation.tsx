'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'Work' },
    { href: '/#process', label: 'How it works' },
    { href: '/#equipment', label: 'Equipment' },
    { href: '/#estimate', label: 'Estimate' },
    { href: '/#packages', label: 'Packages' },
    { href: '/#faq', label: 'FAQ' },
  ];

  const getLocalizedPath = (path: string, newLocale: string) => {
    if (path.startsWith(`/${locale}`)) {
      return path.replace(`/${locale}`, `/${newLocale}`);
    }
    return `/${newLocale}${path}`;
  };

  const isActive = (href: string) => {
    return pathname === href || pathname === `/${locale}${href}`;
  };

  return (
    <>
      <style>{`
        nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 12px;
          z-index: 50;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin: 0 auto;
          border-radius: 16px;
          padding: 12px 24px;
          max-width: calc(100% - 24px);
          left: 12px;
          right: 12px;
        }

        nav .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: auto;
          max-width: 100%;
          padding: 0;
          gap: 32px;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.95rem;
          color: #000;
          transition: all 0.2s;
          flex-shrink: 0;
          letter-spacing: -0.5px;
        }

        .logo-link:hover {
          opacity: 0.7;
        }

        .logo-link span {
          display: inline;
        }

        .logo-image {
          height: 40px;
          width: 40px;
          object-fit: contain;
        }

        .desktop-menu {
          display: none;
          align-items: center;
          gap: 4px;
          flex: 1;
          justify-content: center;
        }

        @media (min-width: 1024px) {
          .desktop-menu {
            display: flex;
          }

          .desktop-menu a {
            font-size: 0.95rem;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.75);
            text-decoration: none;
            transition: all 0.2s;
            padding: 8px 14px;
            border-radius: 8px;
            position: relative;
          }

          .desktop-menu a:hover {
            color: #000;
            background: rgba(0, 0, 0, 0.05);
          }

          .desktop-menu a.active {
            color: #000;
            font-weight: 600;
            background: rgba(0, 0, 0, 0.1);
          }
        }

        .controls {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .language-switcher {
          display: flex;
          gap: 8px;
        }

        .language-switcher a {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 8px;
          text-decoration: none;
          color: #000;
          background: rgba(0, 0, 0, 0.06);
          transition: all 0.2s;
          letter-spacing: 0.5px;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .language-switcher a.active {
          background: #000;
          color: #fff;
          font-weight: 700;
          border-color: #000;
        }

        .language-switcher a:hover:not(.active) {
          background: rgba(0, 0, 0, 0.1);
          border-color: rgba(0, 0, 0, 0.2);
        }

        .book-now-btn {
          font-size: 0.95rem;
          font-weight: 700;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          background: #dc2626;
          color: #fff;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
          display: inline-block;
          letter-spacing: 0.3px;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }

        .book-now-btn:hover {
          background: #b91c1c;
          box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
          transform: translateY(-2px);
        }

        .mobile-menu-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          color: #000;
          padding: 0;
        }

        @media (min-width: 1024px) {
          .mobile-menu-button {
            display: none;
          }
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 0;
          padding: 12px 0;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          margin-top: 12px;
        }

        .mobile-menu.open {
          display: flex;
        }

        .mobile-menu a {
          padding: 12px 16px;
          text-decoration: none;
          color: #000;
          font-weight: 500;
          transition: background 0.2s;
        }

        .mobile-menu a:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        @media (min-width: 1024px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>

      <nav>
        <div className="container">
          <Link href="/" className="logo-link">
            <Image
              src="/MEOCY Logo.png"
              alt="MEOCY Studio"
              width={40}
              height={40}
              className="logo-image"
              priority
            />
            <span>STUDIO</span>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            {links.slice(0, -1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="controls">
            {/* Language Switcher - Modern Buttons */}
            <div className="language-switcher">
              {['en', 'it', 'fr'].map((l) => (
                <Link
                  key={l}
                  href={getLocalizedPath(pathname, l)}
                  className={locale === l ? 'active' : ''}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>

            {/* Book Now Button - Prominent Red CTA */}
            <Link href="/booking" className="book-now-btn">
              Book Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

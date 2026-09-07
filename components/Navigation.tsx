'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const t = useTranslations();
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
    { href: '/booking', label: t('nav.booking'), cta: true },
  ];

  const getLocalizedPath = (path: string, newLocale: string) => {
    if (path.startsWith(`/${locale}`)) {
      return path.replace(`/${locale}`, `/${newLocale}`);
    }
    return `/${newLocale}${path}`;
  };

  return (
    <>
      <style>{`
        nav {
          background: #ffffff;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          position: sticky;
          top: 8px;
          z-index: 50;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          margin: 0 8px;
          border-radius: 10px;
          padding: 0 16px;
        }

        nav .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 75px;
          max-width: 100%;
          padding: 0;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          color: #000;
          transition: opacity 0.2s;
          margin-right: auto;
        }

        .logo-link:hover {
          opacity: 0.8;
        }

        .logo-link span {
          display: none;
        }

        @media (min-width: 1024px) {
          .logo-link span {
            display: inline;
          }
        }

        .logo-image {
          height: 45px;
          width: auto;
        }

        .desktop-menu {
          display: none;
        }

        @media (min-width: 768px) {
          .desktop-menu {
            display: flex;
            gap: 20px;
            align-items: center;
          }

          .desktop-menu a {
            font-size: 0.85rem;
            font-weight: 500;
            color: #000;
            text-decoration: none;
            transition: all 0.2s;
            position: relative;
            white-space: nowrap;
          }

          .desktop-menu a::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: #000;
            transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .desktop-menu a:hover {
            color: #666;
          }

          .desktop-menu a:hover::after {
            width: 100%;
          }

          .desktop-menu a.cta {
            background: #000;
            color: #fff;
            padding: 8px 20px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 0.85rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .desktop-menu a.cta::after {
            display: none;
          }

          .desktop-menu a.cta:hover {
            background: #333;
            color: #fff;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
          }
        }

        .controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .language-switcher {
          display: flex;
          gap: 4px;
          background: rgba(0, 0, 0, 0.05);
          padding: 4px 6px;
          border-radius: 8px;
        }

        .language-switcher a {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 6px;
          text-decoration: none;
          color: #666;
          transition: all 0.2s;
          letter-spacing: 0.5px;
        }

        .language-switcher a.active {
          background: #000;
          color: #fff;
          font-weight: 700;
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

        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none;
          }
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 0;
          padding: 16px 0;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
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

        @media (min-width: 768px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>

      <nav>
        <div className="container">
          <Link href="/" className="logo-link">
            <Image
              src="/logo.png"
              alt="MEOCY Studio"
              width={40}
              height={45}
              className="logo-image"
            />
            <span>STUDIO</span>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={link.cta ? 'cta' : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="controls">
            {/* Language Switcher */}
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

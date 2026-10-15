'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--canvas)',
        borderBottom: '1px solid var(--hairline)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
      }}
    >
      <div className="container-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        {/* Logo Wordmark */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Logo Lime Accent mark */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 10,
                height: 10,
                backgroundColor: 'var(--logo-lime)',
              }}
            />
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <title>PreTaxPrice Logo</title>
              <rect x="5.5" y="4.5" width="21" height="23" rx="3.5" stroke="#ffffff" strokeWidth="2.2" />
              <rect x="8.5" y="7.5" width="15" height="4.5" rx="1" fill="#effcf8" />
              <rect x="8.5" y="14.5" width="6.5" height="4.5" rx="1" fill="#ffffff" />
              <rect x="17" y="14.5" width="6.5" height="4.5" rx="1" fill="#ffffff" />
              <rect x="8.5" y="20.5" width="6.5" height="4.5" rx="1" fill="#ffffff" />
              <rect x="17" y="20.5" width="6.5" height="4.5" rx="1" fill="var(--logo-lime)" />
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--ink)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              PreTax<span style={{ color: 'var(--primary)' }}>Price</span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Reverse Sales Tax Utility
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="hidden-mobile">
          <Link href="/#calculator" className="nav-link">Calculator</Link>
          <Link href="/#how-it-works" className="nav-link">How It Works</Link>
          <Link href="/tax-rates" className="nav-link">Tax Rates</Link>
          <Link href="/#faq" className="nav-link">FAQ</Link>
          <Link href="/vat-calculator" className="nav-link">VAT</Link>
          <Link href="/canada" className="nav-link">Canada</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden-mobile">
          <Link
            href="/#calculator"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)',
              padding: '10px 18px',
              borderRadius: 'var(--radius-xs)',
              fontWeight: 700,
              fontSize: 13,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              transition: 'background-color 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-deep)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
          >
            Calculate Now
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="show-mobile"
          style={{
            background: 'var(--canvas-soft)',
            border: '1px solid var(--hairline-strong)',
            borderRadius: 'var(--radius-xs)',
            cursor: 'pointer',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div
          style={{
            backgroundColor: 'var(--canvas)',
            borderTop: '1px solid var(--hairline)',
            borderBottom: '1px solid var(--hairline-strong)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            boxShadow: 'var(--shadow-dropdown)',
          }}
          className="show-mobile-menu"
        >
          {[
            { href: '/#calculator', label: 'Calculator' },
            { href: '/#how-it-works', label: 'How It Works' },
            { href: '/tax-rates', label: 'Tax Rates' },
            { href: '/#faq', label: 'FAQ' },
            { href: '/vat-calculator', label: 'VAT Calculator' },
            { href: '/canada', label: 'Canada Calculator' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              onClick={() => setOpen(false)}
              style={{
                fontSize: 14,
                fontWeight: 600,
                padding: '10px 0',
                borderBottom: '1px solid var(--hairline)',
                display: 'block',
              }}
            >
              {label}
            </Link>
          ))}
          <div style={{ marginTop: 12 }}>
            <Link
              href="/#calculator"
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: 'var(--primary)',
                color: 'var(--on-primary)',
                padding: '12px 18px',
                borderRadius: 'var(--radius-xs)',
                fontWeight: 700,
                fontSize: 13,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Calculate Now
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
          .show-mobile-menu { display: none !important; }
        }
        @media (max-width: 959px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

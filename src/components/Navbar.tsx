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
        background: 'rgba(9, 9, 11, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.2)',
      }}
    >
      <div className="container-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 'var(--radius-sm)',
              background: 'var(--primary)',
              boxShadow: '0 0 15px rgba(204, 255, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
            className="logo-icon-box"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round">
              <title>PreTaxPrice Logo</title>
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 20, color: 'var(--text-primary)', lineHeight: 1.1, fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              PreTax<span style={{ color: 'var(--primary)' }}>Price</span>
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="hidden-mobile">
          <Link href="/#calculator" className="nav-link">Calculator</Link>
          <Link href="/how-it-works" className="nav-link">How It Works</Link>
          <Link href="/tax-rates" className="nav-link">Tax Rates</Link>
          <Link href="/faq" className="nav-link">FAQ</Link>
          <Link href="/vat-calculator" className="nav-link">VAT</Link>
          <Link href="/canada" className="nav-link">Canada</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>

        {/* CTA */}
        <div className="hidden-mobile">
          <Link
            href="/#calculator"
            className="cta-button"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
              color: '#000',
              padding: '12px 24px',
              borderRadius: 'var(--radius)',
              fontWeight: 800,
              fontSize: 14,
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(204, 255, 0, 0.2)',
              border: 'none',
              transition: 'all 0.25s ease',
              fontFamily: 'var(--font-sans)',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            Try the calculator
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="show-mobile"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" fill="none" stroke="var(--text-primary)" strokeWidth="2.5" strokeLinecap="round">
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

      {/* Mobile Menu */}
      {open && (
        <div
          style={{
            background: 'rgba(9, 9, 11, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            animation: 'fadeIn 0.2s ease',
          }}
          className="show-mobile-menu"
        >
          {[
            { href: '/#calculator', label: 'Calculator' },
            { href: '/how-it-works', label: 'How It Works' },
            { href: '/tax-rates', label: 'Tax Rates' },
            { href: '/faq', label: 'FAQ' },
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
              style={{ fontSize: 15, padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'block' }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 960px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } .show-mobile-menu { display: none !important; } }
        @media (max-width: 959px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(204, 255, 0, 0.4) !important;
          filter: brightness(1.05);
        }
        .cta-button:active {
          transform: translateY(1px);
        }
        .logo-icon-box:hover {
          transform: rotate(5deg) scale(1.05);
          box-shadow: 0 0 20px rgba(204, 255, 0, 0.5) !important;
        }
      `}</style>
    </nav>
  );
}

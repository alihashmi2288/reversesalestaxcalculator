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
        background: 'rgba(9, 9, 11, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 1px 16px rgba(0,0,0,0.05)',
      }}
    >
      <div className="container-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius)',
              background: 'var(--primary)',
              border: '2px solid #000',
              boxShadow: '2px 2px 0px 0px #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round">
              <title>ReverseTaxCalc Logo</title>
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--text-primary)', lineHeight: 1.1, fontFamily: 'var(--font-sans)' }}>ReverseTaxCalc</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden-mobile">
          <Link href="/#calculator" className="nav-link">Calculator</Link>
          <Link href="/how-it-works" className="nav-link">How It Works</Link>
          <Link href="/tax-rates" className="nav-link">Tax Rates</Link>
          <Link href="/faq" className="nav-link">FAQ</Link>
          <Link href="/vat-calculator" className="nav-link">VAT</Link>
          <Link href="/canada" className="nav-link">Canada</Link>
        </div>

        {/* CTA */}
        <div className="hidden-mobile">
          <Link
            href="/#calculator"
            style={{
              background: 'var(--primary)',
              color: '#000',
              padding: '10px 20px',
              borderRadius: 'var(--radius)',
              fontWeight: 800,
              fontSize: 14,
              textDecoration: 'none',
              boxShadow: 'var(--shadow-solid-dark)',
              border: '2px solid transparent',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Try the calculator
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="show-mobile"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          style={{
            background: 'var(--bg)',
            borderTop: '1px solid var(--border)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
          className="show-mobile"
        >
          {[
            { href: '/#calculator', label: 'Calculator' },
            { href: '/how-it-works', label: 'How It Works' },
            { href: '/tax-rates', label: 'Tax Rates' },
            { href: '/faq', label: 'FAQ' },
            { href: '/vat-calculator', label: 'VAT Calculator' },
            { href: '/canada', label: 'Canada Calculator' },
            { href: '/about', label: 'About' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              onClick={() => setOpen(false)}
              style={{ fontSize: 16, padding: '8px 0', borderBottom: '1px solid var(--border)' }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </nav>
  );
}

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleSectionScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
        if (window.location.hash !== `#${targetId}`) {
          window.history.pushState(null, '', `/#${targetId}`);
        }
      }
    }
  };

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
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
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
              Reverse Sales Tax Calculator
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <Link href="/#calculator" className="nav-link" onClick={(e) => handleSectionScroll(e, 'calculator')}>Calculator</Link>
          <Link href="/#how-it-works" className="nav-link" onClick={(e) => handleSectionScroll(e, 'how-it-works')}>How It Works</Link>
          <Link href="/tax-rates" className="nav-link">Tax Rates</Link>
          <Link href="/#faq" className="nav-link" onClick={(e) => handleSectionScroll(e, 'faq')}>FAQ</Link>
          <Link href="/vat-calculator" className="nav-link">VAT</Link>
          <Link href="/canada" className="nav-link">Canada</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/#calculator"
            onClick={(e) => handleSectionScroll(e, 'calculator')}
            className="inline-flex items-center justify-center bg-[var(--primary)] hover:bg-[var(--primary-deep)] text-white px-[18px] py-[10px] rounded-[var(--radius-xs)] font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-150 no-underline shadow-xs focus-visible:outline-2 focus-visible:outline-[var(--forest)] focus-visible:outline-offset-2"
            style={{ color: '#ffffff' }}
            aria-label="Calculate reverse sales tax"
          >
            Calculate
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex lg:hidden items-center justify-center cursor-pointer min-w-[44px] min-h-[44px] p-2 bg-[var(--canvas-soft)] border border-[var(--hairline-strong)] rounded-[var(--radius-xs)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
        >
          <svg width="22" height="22" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
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
          id="mobile-nav-menu"
          className="flex lg:hidden flex-col gap-1 px-5 py-4 bg-[var(--canvas)] border-t border-[var(--hairline)] border-b border-[var(--hairline-strong)] shadow-[var(--shadow-dropdown)]"
        >
          {[
            { href: '/#calculator', label: 'Calculator', targetId: 'calculator' },
            { href: '/#how-it-works', label: 'How It Works', targetId: 'how-it-works' },
            { href: '/tax-rates', label: 'Tax Rates' },
            { href: '/#faq', label: 'FAQ', targetId: 'faq' },
            { href: '/vat-calculator', label: 'VAT Calculator' },
            { href: '/canada', label: 'Canada Calculator' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label, targetId }) => (
            <Link
              key={href}
              href={href}
              className="nav-link block py-2.5 text-sm font-semibold border-b border-[var(--hairline)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-1"
              onClick={(e) => {
                setOpen(false);
                if (targetId) handleSectionScroll(e, targetId);
              }}
            >
              {label}
            </Link>
          ))}
          <div style={{ marginTop: 12 }}>
            <Link
              href="/#calculator"
              onClick={(e) => {
                setOpen(false);
                handleSectionScroll(e, 'calculator');
              }}
              className="block text-center bg-[var(--primary)] hover:bg-[var(--primary-deep)] text-white px-[18px] py-[12px] rounded-[var(--radius-xs)] font-bold text-[13px] uppercase tracking-[0.04em] no-underline transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--forest)] focus-visible:outline-offset-2"
              style={{ color: '#ffffff' }}
              aria-label="Calculate reverse sales tax"
            >
              Calculate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

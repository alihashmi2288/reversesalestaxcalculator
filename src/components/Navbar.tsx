'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();

  const guidesBtnRef = useRef<HTMLButtonElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);
  const guidesMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        if (guidesOpen) {
          setGuidesOpen(false);
          guidesBtnRef.current?.focus();
        }
        if (moreOpen) {
          setMoreOpen(false);
          moreBtnRef.current?.focus();
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (guidesMenuRef.current && !guidesMenuRef.current.contains(target) && !guidesBtnRef.current?.contains(target)) {
        setGuidesOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(target) && !moreBtnRef.current?.contains(target)) {
        setMoreOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, guidesOpen, moreOpen]);

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

  const isCurrentPage = (href: string) => {
    if (href === '/#calculator' || href === '/') {
      return pathname === '/';
    }
    return pathname === href;
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
      aria-label="Main navigation"
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

        {/* Desktop Navigation Links (6 Items: Calculator, Tax Rates, Guides, About Us, More Tools, Contact) */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2.5" role="menubar">
          {/* 1. Calculator */}
          <Link
            href="/#calculator"
            className="nav-link"
            onClick={(e) => handleSectionScroll(e, 'calculator')}
            aria-current={isCurrentPage('/#calculator') ? 'page' : undefined}
            role="menuitem"
          >
            Calculator
          </Link>

          {/* 2. Tax Rates */}
          <Link
            href="/tax-rates"
            className="nav-link"
            aria-current={isCurrentPage('/tax-rates') ? 'page' : undefined}
            role="menuitem"
          >
            Tax Rates
          </Link>

          {/* 3. Guides Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              ref={guidesBtnRef}
              type="button"
              className="nav-trigger-btn"
              onClick={() => {
                setGuidesOpen(!guidesOpen);
                setMoreOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setGuidesOpen(true);
                  setTimeout(() => {
                    const first = guidesMenuRef.current?.querySelector('a');
                    first?.focus();
                  }, 50);
                }
              }}
              aria-expanded={guidesOpen}
              aria-haspopup="true"
              aria-controls="desktop-guides-menu"
            >
              <span>Guides</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{
                  transform: guidesOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.15s ease',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Guides Dropdown Menu */}
            <div
              id="desktop-guides-menu"
              ref={guidesMenuRef}
              role="menu"
              aria-label="Guides submenu"
              aria-hidden={!guidesOpen}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: 6,
                backgroundColor: 'var(--canvas)',
                border: '1px solid var(--hairline-strong)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-dropdown)',
                padding: '6px 0',
                minWidth: 165,
                zIndex: 60,
                display: guidesOpen ? 'block' : 'none',
              }}
            >
              <Link
                href="/#how-it-works"
                className="nav-dropdown-item"
                onClick={(e) => {
                  setGuidesOpen(false);
                  handleSectionScroll(e, 'how-it-works');
                }}
                role="menuitem"
              >
                How It Works
              </Link>
              <Link
                href="/#faq"
                className="nav-dropdown-item"
                onClick={(e) => {
                  setGuidesOpen(false);
                  handleSectionScroll(e, 'faq');
                }}
                role="menuitem"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* 4. About Us */}
          <Link
            href="/about"
            className="nav-link"
            aria-current={isCurrentPage('/about') ? 'page' : undefined}
            role="menuitem"
          >
            About Us
          </Link>

          {/* 5. More Tools Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              ref={moreBtnRef}
              type="button"
              className="nav-trigger-btn"
              onClick={() => {
                setMoreOpen(!moreOpen);
                setGuidesOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setMoreOpen(true);
                  setTimeout(() => {
                    const first = moreMenuRef.current?.querySelector('a');
                    first?.focus();
                  }, 50);
                }
              }}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              aria-controls="desktop-more-tools-menu"
            >
              <span>More Tools</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{
                  transform: moreOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.15s ease',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* More Tools Dropdown Menu */}
            <div
              id="desktop-more-tools-menu"
              ref={moreMenuRef}
              role="menu"
              aria-label="More tools submenu"
              aria-hidden={!moreOpen}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: 6,
                backgroundColor: 'var(--canvas)',
                border: '1px solid var(--hairline-strong)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-dropdown)',
                padding: '6px 0',
                minWidth: 185,
                zIndex: 60,
                display: moreOpen ? 'block' : 'none',
              }}
            >
              <Link
                href="/vat-calculator"
                className="nav-dropdown-item"
                onClick={() => setMoreOpen(false)}
                role="menuitem"
              >
                VAT Calculator
              </Link>
              <Link
                href="/canada"
                className="nav-dropdown-item"
                onClick={() => setMoreOpen(false)}
                role="menuitem"
              >
                Canada Sales Tax
              </Link>
              <Link
                href="/tax-rates"
                className="nav-dropdown-item"
                onClick={() => setMoreOpen(false)}
                role="menuitem"
              >
                US State Calculators
              </Link>
            </div>
          </div>

          {/* 6. Contact */}
          <Link
            href="/contact"
            className="nav-link"
            aria-current={isCurrentPage('/contact') ? 'page' : undefined}
            role="menuitem"
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTA (Open calculator - Unchanged as requested) */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/#calculator"
            onClick={(e) => handleSectionScroll(e, 'calculator')}
            className="inline-flex items-center justify-center min-h-[44px] bg-[var(--primary)] hover:bg-[var(--primary-deep)] text-white px-[18px] py-[10px] rounded-[var(--radius-xs)] font-bold text-[13px] uppercase tracking-[0.04em] transition-colors duration-150 no-underline shadow-xs focus-visible:outline-2 focus-visible:outline-[var(--forest)] focus-visible:outline-offset-2"
            style={{ color: '#ffffff' }}
            aria-label="Open reverse sales tax calculator"
          >
            Open calculator
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
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] px-1 pt-1 pb-1">
            Navigation
          </div>
          {[
            { href: '/#calculator', label: 'Calculator', targetId: 'calculator' },
            { href: '/tax-rates', label: 'Tax Rates' },
            { href: '/about', label: 'About Us' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label, targetId }) => (
            <Link
              key={href}
              href={href}
              className="nav-link block py-2.5 text-[14px] font-semibold border-b border-[var(--hairline)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-1"
              aria-current={isCurrentPage(href) ? 'page' : undefined}
              onClick={(e) => {
                setOpen(false);
                if (targetId) handleSectionScroll(e, targetId);
              }}
            >
              {label}
            </Link>
          ))}

          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] px-1 pt-3 pb-1">
            Guides &amp; Resources
          </div>
          {[
            { href: '/#how-it-works', label: 'How It Works & Formula', targetId: 'how-it-works' },
            { href: '/#faq', label: 'Frequently Asked Questions', targetId: 'faq' },
          ].map(({ href, label, targetId }) => (
            <Link
              key={href}
              href={href}
              className="nav-link block py-2 text-[13.5px] font-medium border-b border-[var(--hairline)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-1"
              aria-current={isCurrentPage(href) ? 'page' : undefined}
              onClick={(e) => {
                setOpen(false);
                if (targetId) handleSectionScroll(e, targetId);
              }}
            >
              {label}
            </Link>
          ))}

          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] px-1 pt-3 pb-1">
            More Calculators
          </div>
          {[
            { href: '/vat-calculator', label: 'VAT Calculator (EU/UK)' },
            { href: '/canada', label: 'Canada Sales Tax (GST/HST)' },
            { href: '/tax-rates', label: 'US State Sales Tax Calculators' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link block py-2 text-[13.5px] font-medium border-b border-[var(--hairline)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-1"
              aria-current={isCurrentPage(href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div style={{ marginTop: 14 }}>
            <Link
              href="/#calculator"
              onClick={(e) => {
                setOpen(false);
                handleSectionScroll(e, 'calculator');
              }}
              className="block text-center bg-[var(--primary)] hover:bg-[var(--primary-deep)] text-white px-[18px] py-[12px] rounded-[var(--radius-xs)] font-bold text-[13px] uppercase tracking-[0.04em] no-underline transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--forest)] focus-visible:outline-offset-2"
              style={{ color: '#ffffff' }}
              aria-label="Open reverse sales tax calculator"
            >
              Open calculator
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

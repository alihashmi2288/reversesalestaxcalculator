import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: 'var(--canvas-soft)', borderTop: '1px solid var(--hairline-strong)', color: 'var(--body)', marginTop: 80 }}>
      <style>{`
        .footer-link {
          color: var(--muted);
          text-decoration: none;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          min-height: 28px;
          padding: 2px 0;
          transition: color 0.15s ease;
        }
        .footer-link:hover {
          color: var(--primary);
        }
      `}</style>
      <div className="container-main" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 9,
                    height: 9,
                    backgroundColor: 'var(--logo-lime)',
                  }}
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M7 12h10M12 7v10" />
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--ink)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  PreTax<span style={{ color: 'var(--primary)' }}>Price</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500 }}>
                  Reverse Sales Tax Calculator
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--body)' }}>
              Calculate the original pre-tax price from any sales tax or VAT-inclusive total. Designed for accuracy, privacy, and speed.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <div style={{ color: 'var(--ink)', fontWeight: 700, fontSize: 12, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Calculators
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { href: '/', label: 'Reverse Sales Tax' },
                { href: '/vat-calculator', label: 'VAT Calculator (EU/UK)' },
                { href: '/canada', label: 'Canada GST / HST / PST' },
                { href: '/us/california', label: 'California Tax Calculator' },
                { href: '/us/texas', label: 'Texas Tax Calculator' },
                { href: '/us/new-york', label: 'New York Tax Calculator' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div style={{ color: 'var(--ink)', fontWeight: 700, fontSize: 12, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Resources
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { href: '/tax-rates', label: '2026 US State Tax Rates' },
                { href: '/#how-it-works', label: 'How It Works & Formula' },
                { href: '/#faq', label: 'Frequently Asked Questions' },
                { href: '/about', label: 'About Us & Editorial Standards' },
                { href: '/contact', label: 'Contact Support' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <div style={{ color: 'var(--ink)', fontWeight: 700, fontSize: 12, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Legal & Trust
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/terms-of-service', label: 'Terms of Service' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 20, padding: 14, backgroundColor: 'var(--canvas)', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-sm)' }}>
              <p style={{ fontSize: 11, lineHeight: 1.5, color: 'var(--muted)', margin: 0 }}>
                <strong>Disclaimer:</strong> PreTaxPrice is a free mathematical estimation utility. For formal tax returns, audit filings, or multi-jurisdiction nexus determination, consult a qualified CPA or state revenue department.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>© {year} PreTaxPrice. All calculations perform client-side in your browser.</p>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>100% Free · No registration required</p>
        </div>
      </div>
    </footer>
  );
}

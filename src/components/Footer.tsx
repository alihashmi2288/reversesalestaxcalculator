import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#111827', color: '#9CA3AF', marginTop: 80 }}>
      <style>{`
        .footer-link { color: #9CA3AF; text-decoration: none; font-size: 14px; transition: color 0.2s; }
        .footer-link:hover { color: #fff; }
      `}</style>
      <div className="container-main" style={{ paddingTop: 64, paddingBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #1A56DB, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>ReverseTax Calculator</div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>Free • No Signup • Works Worldwide</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>
              Calculate the original pre-tax price from any total amount. Trusted by consumers, accountants, and business owners worldwide.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Calculators</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '/', label: 'Reverse Sales Tax' },
                { href: '/vat-calculator', label: 'VAT Calculator (EU)' },
                { href: '/canada', label: 'Canada GST/HST/PST' },
                { href: '/us/california', label: 'California Tax' },
                { href: '/us/texas', label: 'Texas Tax' },
                { href: '/us/new-york', label: 'New York Tax' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resources</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '/tax-rates', label: 'US State Tax Rates' },
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/faq', label: 'FAQ' },
                { href: '/about', label: 'About Us' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/terms-of-service', label: 'Terms of Service' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-link">{label}</Link>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 24, padding: 16, background: '#1F2937', borderRadius: 12 }}>
              <p style={{ fontSize: 12, lineHeight: 1.6 }}>
                ⚠️ This calculator is for estimation only. Always verify tax rates with official government sources for legal/financial decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #374151', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13 }}>© {year} ReverseTax Calculator. All rights reserved.</p>
          <p style={{ fontSize: 13 }}>Made with ❤️ for taxpayers everywhere</p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404: Page Not Found | Reverse Sales Tax Calculator',
  description: 'The page you are looking for does not exist or has been moved. Use our free reverse sales tax calculator or browse tax rates.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NotFound() {
  return (
    <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div className="card" style={{ maxWidth: 640, width: '100%', textAlign: 'center', padding: '48px 32px', border: '1px solid var(--hairline)' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
        
        <span className="section-label" style={{ marginBottom: 16, display: 'inline-block' }}>Error 404</span>
        
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 16, letterSpacing: '-0.02em' }}>
          Page Not Found
        </h1>
        
        <p style={{ color: 'var(--body)', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          We couldn&apos;t find the page or calculator you were looking for. It may have been moved, renamed, or no longer exists.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          <Link
            href="/"
            style={{
              background: 'var(--primary)',
              color: '#ffffff',
              padding: '14px 28px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              border: '1px solid var(--primary-deep)',
              boxShadow: 'none',
            }}
          >
            Go to Reverse Sales Tax Calculator →
          </Link>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, marginTop: 8 }}>
            <Link
              href="/tax-rates"
              style={{ padding: '10px 14px', background: 'var(--canvas-soft)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', color: 'var(--ink)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
            >
              US Tax Rates
            </Link>
            <Link
              href="/canada"
              style={{ padding: '10px 14px', background: 'var(--canvas-soft)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', color: 'var(--ink)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
            >
              Canada Calculator
            </Link>
            <Link
              href="/vat-calculator"
              style={{ padding: '10px 14px', background: 'var(--canvas-soft)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', color: 'var(--ink)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
            >
              VAT Calculator
            </Link>
            <Link
              href="/faq"
              style={{ padding: '10px 14px', background: 'var(--canvas-soft)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline)', color: 'var(--ink)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
            >
              Tax FAQ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

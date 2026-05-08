import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sales Tax FAQ — Frequently Asked Questions',
  description: 'Answers to the most common questions about reverse sales tax calculation, US state tax rates, VAT, and more.',
  alternates: { canonical: 'https://reversetaxcalculator.com/faq' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://reversetaxcalculator.com' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://reversetaxcalculator.com/faq' },
  ],
};

export default function FAQPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 560, margin: '0 auto' }}>
            Everything you need to know about sales tax and our calculator.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 16 }}>
        <AdSlot slot="faq-leaderboard" size="leaderboard" label="Leaderboard" />
      </div>

      <div className="container-main" style={{ marginTop: 48, marginBottom: 80 }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 48 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>FAQ</span>
        </nav>
        <FAQSection />
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/" style={{ background: 'var(--primary)', color: '#fff', padding: '16px 40px', borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Use the Calculator →
          </Link>
        </div>
      </div>
    </main>
  );
}

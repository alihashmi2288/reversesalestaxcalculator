import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About ReverseTax Calculator — Free Sales Tax Tool',
  description: 'Learn about ReverseTax Calculator — a free, privacy-first tool helping consumers and businesses calculate original prices before tax.',
  alternates: { canonical: 'https://reversetaxcalculator.com/about' },
};

export default function AboutPage() {
  return (
    <main>
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>About Us</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 540, margin: '0 auto' }}>Our mission: make tax calculations free, instant, and accessible to everyone.</p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 64, marginBottom: 80, maxWidth: 720, margin: '64px auto 80px' }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 48 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>About</span>
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {[
            {
              icon: '🎯',
              title: 'Our Mission',
              body: 'ReverseTax Calculator was built with a simple mission: give everyone — consumers, business owners, accountants, and students — a fast, free, and accurate way to calculate the original price before sales tax. No registration, no subscriptions, no data collection.',
            },
            {
              icon: '🔒',
              title: '100% Private',
              body: 'All calculations happen directly in your browser using JavaScript. We never send your price data to any server. There are no accounts, no cookies tracking your calculations, and no selling your data. What you calculate stays on your device.',
            },
            {
              icon: '🌍',
              title: 'Built for Everyone',
              body: 'Whether you\'re in Alabama or Wyoming, Ontario or Queensland, London or Mumbai — our calculator works for you. We support all 50 US states with combined rates, all 13 Canadian provinces and territories, European VAT, and any custom rate worldwide.',
            },
            {
              icon: '🔄',
              title: 'Constantly Updated',
              body: 'Tax rates change. We monitor US state rate updates and refresh our database regularly to ensure you always have accurate combined average rates at your fingertips. Our last comprehensive rate review was in 2024.',
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
              <h2 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)', marginBottom: 12 }}>{title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75 }}>{body}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/" style={{ background: 'var(--primary)', color: '#fff', padding: '16px 40px', borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Use the Calculator →
          </Link>
        </div>
      </div>
    </main>
  );
}

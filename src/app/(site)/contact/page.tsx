import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us: Reverse Sales Tax Calculator',
  description: 'Get in touch with the PreTaxPrice team for reverse sales tax questions, rate updates, bug reports, or feedback.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/contact' },
  openGraph: {
    title: 'Contact Us: Reverse Sales Tax Calculator',
    description: 'Get in touch with the PreTaxPrice team for reverse sales tax questions, rate updates, bug reports, or feedback.',
    url: 'https://salestaxreversecalculator.com/contact',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact PreTaxPrice' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us: Reverse Sales Tax Calculator',
    description: 'Get in touch with the PreTaxPrice team for reverse sales tax questions, rate updates, bug reports, or feedback.',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com/' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://salestaxreversecalculator.com/contact' },
  ],
};

export default function ContactPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="hero-band" style={{ padding: '56px 0 48px', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-sm)', color: 'var(--mint-200)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
            Get In Touch
          </div>
          <h1 style={{ fontSize: 'clamp(28px,4.5vw,44px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 12 }}>
            Contact the PreTaxPrice Team
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
            Have a question, a rate update for your jurisdiction, or feedback on our calculators? We would love to hear from you.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1000, margin: '40px auto 80px', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: 'var(--ink)' }}>Contact</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }} className="contact-layout">
          {/* Client Form */}
          <div>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="contact-sidebar">
            {/* Direct Contact */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 16 }}>✉️ Email Us Directly</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
                You can reach our editorial and technical team directly at:
              </p>
              <a
                href="mailto:salestaxreversecalculator@gmail.com"
                style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 14, textDecoration: 'underline', wordBreak: 'break-all' }}
              >
                salestaxreversecalculator@gmail.com
              </a>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 12, lineHeight: 1.6 }}>
                We review submissions daily and respond within 1–2 business days.
              </p>
            </div>

            {/* Common Topics */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 16 }}>💬 Common Topics</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { icon: '📊', text: 'Reporting an updated tax rate' },
                  { icon: '🐛', text: 'Reporting a bug or calculation issue' },
                  { icon: '💡', text: 'Suggesting a new calculator feature' },
                  { icon: '🤝', text: 'Partnership or advertising inquiries' },
                  { icon: '❓', text: 'General questions about the tool' },
                ].map(({ icon, text }) => (
                  <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
                    <span>{icon}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 16 }}>🔗 Quick Links</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { href: '/faq', label: 'Read our FAQ' },
                  { href: '/how-it-works', label: 'How the calculator works' },
                  { href: '/about', label: 'About our tool' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} style={{ color: 'var(--primary)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
                      {label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr !important; }
          .contact-sidebar { position: static !important; }
        }
      `}</style>
    </main>
  );
}

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import LinkifiedText from '@/components/LinkifiedText';
import { getVatCountryBySlug, VAT_COUNTRY_RATES } from '@/data/vatTaxRates';
import VATCalculatorClient from './VATCalculatorClient';

// Generate static paths for all pre-defined VAT countries
export async function generateStaticParams() {
  return VAT_COUNTRY_RATES.map((c) => ({
    country: c.slug,
  }));
}

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countrySlug } = await params;
  const countryData = getVatCountryBySlug(countrySlug);
  if (!countryData) return { title: 'Country Not Found' };

  const ogUrl = new URL('https://salestaxreversecalculator.com/api/og');
  ogUrl.searchParams.set('title', `${countryData.name} Reverse VAT Calculator`);
  ogUrl.searchParams.set('location', countryData.name);
  ogUrl.searchParams.set('rate', countryData.rate.toString());

  return {
    title: `${countryData.name} Reverse ${countryData.type} Calculator — ${countryData.rate}% Standard Rate`,
    description: `Free ${countryData.name} reverse ${countryData.type.toLowerCase()} calculator. Pre-filled with the ${countryData.rate}% standard rate. Calculate the original ex-${countryData.type.toLowerCase()} net price instantly.`,
    alternates: { canonical: `https://salestaxreversecalculator.com/vat-calculator/${countrySlug}` },
    openGraph: {
      images: [{ url: ogUrl.toString() }],
    },
    twitter: {
      title: `${countryData.name} Reverse ${countryData.type} Calculator`,
    },
  };
}

export default async function CountryVatPage({ params }: Props) {
  const { country: countrySlug } = await params;
  const countryData = getVatCountryBySlug(countrySlug);
  if (!countryData) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'VAT Calculator', item: 'https://salestaxreversecalculator.com/vat-calculator' },
      { '@type': 'ListItem', position: 3, name: countryData.name, item: `https://salestaxreversecalculator.com/vat-calculator/${countrySlug}` },
    ],
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${countryData.name} Reverse ${countryData.type} Calculator`,
    "url": `https://salestaxreversecalculator.com/vat-calculator/${countrySlug}`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": `Free ${countryData.name} reverse ${countryData.type.toLowerCase()} calculator. Find the net price excluding tax from any receipt total instantly.`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": countryData.currency
    },
    "areaServed": {
      "@type": "Country",
      "name": countryData.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "PreTaxPrice",
      "url": "https://salestaxreversecalculator.com"
    },
    "screenshot": "https://salestaxreversecalculator.com/og-image.png"
  };

  const faqSchema = countryData.faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: countryData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section style={{ padding: '60px 0 80px', position: 'relative', borderBottom: '2px solid var(--border)' }}>
        <div className="container-main" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--primary)', border: '2px solid #000', borderRadius: 'var(--radius)', padding: '6px 16px', marginBottom: 24, boxShadow: '4px 4px 0px 0px rgba(255,255,255,0.1)' }}>
            <span style={{ color: '#000', fontSize: 13, fontWeight: 800, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>🗺️ {countryData.code} · PRE-FILLED {countryData.type} RATE: {countryData.rate}%</span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 8vw, 64px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 24, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            {countryData.name} Reverse VAT<br />
            <span style={{ color: 'var(--primary)', textShadow: '4px 4px 0px #000' }}>
              Calculator
            </span>
          </h1>

          <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            Pre-filled with {countryData.name}&apos;s standard {countryData.rate}% {countryData.type.toLowerCase()} rate.
            Enter any gross total amount to calculate the net ex-tax price instantly.
          </p>
        </div>
      </section>

      {/* ── Main Layout ───────────────────── */}
      <div className="container-main" style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 860, width: '100%' }}>
          
          <nav style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 32, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
            <Link href="/vat-calculator" style={{ color: 'var(--primary)', textDecoration: 'none', transition: 'color 0.2s' }}>VAT Calculator</Link>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
            <span style={{ color: 'var(--text-primary)' }}>{countryData.name}</span>
          </nav>

          <div style={{ marginBottom: 32 }}>
            <AdSlot slot={`${countrySlug}-leaderboard`} size="leaderboard" />
          </div>

          {/* Rate Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Standard Rate', value: `${countryData.rate}%`, color: 'var(--primary)', desc: `Standard ${countryData.type} rate` },
              { label: 'Currency', value: `${countryData.currency} (${countryData.symbol})`, color: '#a1a1aa', desc: 'Local transaction currency' },
              { label: 'VAT-Inclusive', value: 'Yes', color: 'var(--primary)', desc: 'Prices display with tax pre-added', textShadow: '2px 2px 0px #000' },
            ].map(({ label, value, color, desc, textShadow }) => (
              <div key={label} className="card" style={{ textAlign: 'center', border: '2px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: 'var(--font-mono)', textShadow }}>{value}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 8, textTransform: 'uppercase' }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 64 }}>
            <VATCalculatorClient countryData={countryData} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {/* Country Info */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">Country Info</span>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                About {countryData.name} {countryData.type}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                {countryData.aboutText.map((paragraph, idx) => (
                  <p key={idx}><LinkifiedText text={paragraph} currentState={countryData.name} /></p>
                ))}
              </div>
            </section>

            {/* City Rates */}
            {countryData.cities.length > 0 && (
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">Local Rates</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Tax Rates in Major {countryData.name} Cities
                </h2>
                <div className="card" style={{ padding: 0, overflow: 'hidden', border: '2px solid var(--border)', borderRadius: 'var(--radius)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#09090b', borderBottom: '2px solid var(--border)' }}>
                        <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>City</th>
                        <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Combined Rate</th>
                        <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Local Surcharge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {countryData.cities.map((city, idx) => (
                        <tr key={idx} style={{ borderBottom: idx === countryData.cities.length - 1 ? 'none' : '1px solid var(--border)' }}>
                          <td style={{ padding: '16px 24px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{city.name}</td>
                          <td style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>{city.rate.toFixed(1).replace(/\.?0+$/, '')}%</td>
                          <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>None (Standard Rate)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.5 }}>
                  * Consumption taxes like VAT and GST are levied strictly at the national level in {countryData.name}. Municipal or city-level surcharges do not apply, so rates are completely uniform country-wide.
                </p>
              </section>
            )}

            {/* Use Cases */}
            {countryData.useCases.length > 0 && (
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">Use Cases</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  When to Use This Calculator in {countryData.name}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                  {countryData.useCases.map((useCase, idx) => (
                    <div key={idx} className="card" style={{ padding: 24, border: '2px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>{useCase.title}</h3>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}><LinkifiedText text={useCase.description} currentState={countryData.name} /></p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {countryData.faqs.length > 0 && (
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">FAQ</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 32px' }}>
                  Frequently Asked Questions: {countryData.name} VAT/GST
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {countryData.faqs.map((faq, idx) => (
                    <details key={idx} className="faq-item" style={{ border: '2px solid var(--border)', borderRadius: 'var(--radius)' }}>
                      <summary className="faq-trigger" style={{ outline: 'none' }}>
                        <span>{faq.question}</span>
                        <span style={{ color: 'var(--primary)', fontSize: 22 }}>+</span>
                      </summary>
                      <p className="faq-content" style={{ margin: 0 }}>
                        <LinkifiedText text={faq.answer} currentState={countryData.name} />
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <div style={{ marginTop: 16, marginBottom: 64 }}>
              <AdSlot slot={`${countrySlug}-rectangle`} size="rectangle" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

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

  const title = `${countryData.name} Reverse ${countryData.type} Calculator (${countryData.rate}% Rate)`;
  const description = `Free ${countryData.name} reverse ${countryData.type.toLowerCase()} calculator pre-filled with the ${countryData.rate}% rate. Calculate ex-tax net prices instantly.`;

  return {
    title,
    description,
    alternates: { canonical: `https://salestaxreversecalculator.com/vat-calculator/${countrySlug}` },
    openGraph: {
      title,
      description,
      url: `https://salestaxreversecalculator.com/vat-calculator/${countrySlug}`,
      images: [{ url: ogUrl.toString() }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com/' },
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
      <section className="hero-band" style={{ padding: '56px 0 48px', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-xs)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--mint-100)', marginBottom: 16 }}>
            <span>🗺️</span> {countryData.code} · Pre-filled {countryData.type} Rate: {countryData.rate}%
          </div>

          <h1
            aria-label={`${countryData.name} Reverse VAT Calculator`}
            style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.02em' }}
          >
            {countryData.name} Reverse VAT Calculator
          </h1>

          <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            Pre-filled with {countryData.name}&apos;s standard {countryData.rate}% {countryData.type.toLowerCase()} rate.
            Enter any gross total amount to calculate the net ex-tax price instantly.
          </p>
        </div>
      </section>

      {/* ── Main Layout ───────────────────── */}
      <div className="container-main" style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 880, width: '100%' }}>
          
          <nav style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span style={{ color: 'var(--hairline-strong)' }}>/</span>
            <Link href="/vat-calculator" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>VAT Calculator</Link>
            <span style={{ color: 'var(--hairline-strong)' }}>/</span>
            <span style={{ color: 'var(--ink)' }}>{countryData.name}</span>
          </nav>

          <div style={{ marginBottom: 32 }}>
            <AdSlot slot={`${countrySlug}-leaderboard`} size="leaderboard" />
          </div>

          {/* Rate Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Standard Rate', value: `${countryData.rate}%`, color: 'var(--primary)', desc: `Standard ${countryData.type} rate` },
              { label: 'Currency', value: `${countryData.currency} (${countryData.symbol})`, color: 'var(--ink)', desc: 'Local transaction currency' },
              { label: 'VAT-Inclusive', value: 'Yes', color: 'var(--primary)', desc: 'Prices display with tax pre-added' },
            ].map(({ label, value, color, desc }) => (
              <div key={label} className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: 'monospace' }}>{value}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 64 }}>
            <VATCalculatorClient countryData={countryData} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {/* Country Info */}
            <section style={{ maxWidth: 880 }}>
              <span className="section-label">Country Info</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                About {countryData.name} {countryData.type}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--body)', fontSize: 16, lineHeight: 1.8 }}>
                {countryData.aboutText.map((paragraph, idx) => (
                  <p key={idx}><LinkifiedText text={paragraph} currentState={countryData.name} /></p>
                ))}
              </div>
            </section>

            {/* City Rates */}
            {countryData.cities.length > 0 && (
              <section style={{ maxWidth: 880 }}>
                <span className="section-label">Local Rates</span>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                  Tax Rates in Major {countryData.name} Cities
                </h2>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                        <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>City</th>
                        <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Combined Rate</th>
                        <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.04em' }}>Local Surcharge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {countryData.cities.map((city, idx) => (
                        <tr key={idx} style={{ borderBottom: idx === countryData.cities.length - 1 ? 'none' : '1px solid var(--hairline)', background: idx % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-soft)' }}>
                          <td style={{ padding: '14px 20px', color: 'var(--ink)', fontWeight: 600 }}>{city.name}</td>
                          <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{city.rate.toFixed(1).replace(/\.?0+$/, '')}%</td>
                          <td style={{ padding: '14px 20px', color: 'var(--muted)', fontSize: 13 }}>None (Standard Rate)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12, lineHeight: 1.5 }}>
                  * Consumption taxes like VAT and GST are levied strictly at the national level in {countryData.name}. Municipal or city-level surcharges do not apply, so rates are completely uniform country-wide.
                </p>
              </section>
            )}

            {/* Use Cases */}
            {countryData.useCases.length > 0 && (
              <section style={{ maxWidth: 880 }}>
                <span className="section-label">Use Cases</span>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
                  When to Use This Calculator in {countryData.name}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                  {countryData.useCases.map((useCase, idx) => (
                    <div key={idx} className="card" style={{ padding: 24 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>{useCase.title}</h3>
                      <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.7, margin: 0 }}><LinkifiedText text={useCase.description} currentState={countryData.name} /></p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {countryData.faqs.length > 0 && (
              <section style={{ maxWidth: 880 }}>
                <span className="section-label">FAQ</span>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '12px 0 24px', letterSpacing: '-0.02em' }}>
                  Frequently Asked Questions: {countryData.name} VAT/GST
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {countryData.faqs.map((faq, idx) => (
                    <details key={idx} className="faq-item">
                      <summary style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{faq.question}</span>
                        <span style={{ color: 'var(--primary)', fontSize: 20, fontWeight: 800 }}>+</span>
                      </summary>
                      <p style={{ marginTop: 14, fontSize: 14, color: 'var(--body)', lineHeight: 1.7, paddingTop: 14, borderTop: '1px solid var(--hairline)' }}>
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

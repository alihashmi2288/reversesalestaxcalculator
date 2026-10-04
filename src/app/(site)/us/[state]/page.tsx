import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import LinkifiedText from '@/components/LinkifiedText';
import { getStateBySlug, STATE_TAX_RATES } from '@/data/stateTaxRates';
import { getStateContentBySlug } from '@/data/stateContent';
import { getStateRevenueInfo } from '@/data/stateRevenueLinks';
import StateCalculatorClient from './StateCalculatorClient';

import ConnecticutPage from './ConnecticutPage';
import NewYorkPage from './NewYorkPage';

// Generate static paths for top 10 states + all others
export async function generateStaticParams() {
  return STATE_TAX_RATES.map((s) => ({
    state: s.state.toLowerCase().replace(/\s+/g, '-'),
  }));
}

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) return { title: 'State Not Found' };

  let title = `${stateData.state} Reverse Sales Tax Calculator (${stateData.rate}% Rate)`;
  let description = `Free ${stateData.state} reverse sales tax calculator pre-filled with the ${stateData.rate}% rate. Find original pre-tax prices from ${stateData.state} receipts instantly.`;

  const ogUrl = new URL('https://salestaxreversecalculator.com/api/og');

  if (stateSlug === 'connecticut') {
    title = 'Connecticut Reverse Sales Tax Calculator (6.35% Rate)';
    description = 'Free Connecticut reverse sales tax calculator with 2026 rates. Find your pre-tax price from any receipt instantly. No signup required.';
  } else if (stateData.rate === 0) {
    title = `${stateData.state} Reverse Sales Tax Calculator (0% Tax Free)`;
    description = `Free ${stateData.state} reverse sales tax calculator. ${stateData.state} has no state sales tax (0%). Calculate pre-tax and checkout amounts instantly.`;
  } else if (stateData.avgLocalRate === 0) {
    title = `${stateData.state} Reverse Sales Tax Calculator (${stateData.rate}% Flat Rate)`;
    description = `Free ${stateData.state} reverse sales tax calculator pre-filled with ${stateData.state}'s flat ${stateData.rate}% rate. Find original pre-tax prices instantly.`;
  } else if (stateSlug === 'new-york') {
    title = 'Reverse Sales Tax Calculator for NYC - Easy & Accurate';
    description = 'Unlock the true cost of your purchases in New York City with our reverse sales tax calculator. Get started now and take control of your spending!';
  } else if (stateSlug === 'texas') {
    title = `Texas Reverse Sales Tax Calculator (8.24% Rate)`;
    description = `Free Texas reverse sales tax calculator pre-filled with the 8.24% combined rate. Find original pre-tax prices from any Texas receipt instantly.`;
  }

  ogUrl.searchParams.set('title', title);
  ogUrl.searchParams.set('location', stateData.state);
  ogUrl.searchParams.set('rate', stateData.rate.toString());

  return {
    title,
    description,
    alternates: { canonical: `https://salestaxreversecalculator.com/us/${stateSlug}` },
    openGraph: {
      title,
      description,
      url: `https://salestaxreversecalculator.com/us/${stateSlug}`,
      images: [{ url: ogUrl.toString() }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) notFound();

  if (stateSlug === 'connecticut') {
    return <ConnecticutPage stateData={stateData} />;
  }

  if (stateSlug === 'new-york') {
    return <NewYorkPage stateData={stateData} />;
  }

  const stateContent = getStateContentBySlug(stateSlug);
  const revenueInfo = getStateRevenueInfo(stateSlug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com/' },
      { '@type': 'ListItem', position: 2, name: 'US States', item: 'https://salestaxreversecalculator.com/tax-rates' },
      { '@type': 'ListItem', position: 3, name: stateData.state, item: `https://salestaxreversecalculator.com/us/${stateSlug}` },
    ],
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${stateData.state} Reverse Sales Tax Calculator`,
    "url": `https://salestaxreversecalculator.com/us/${stateSlug}`,
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": "Sales Tax Calculation & Accounting",
    "softwareVersion": "2.4.0",
    "inLanguage": "en",
    "operatingSystem": "All modern browsers (Desktop & Mobile)",
    "description": `Free ${stateData.state} reverse sales tax calculator. Find the original pre-tax price from any ${stateData.state} receipt instantly.`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "areaServed": {
      "@type": "State",
      "name": stateData.state,
      "containedInPlace": {
        "@type": "Country",
        "name": "United States"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "PreTaxPrice",
      "url": "https://salestaxreversecalculator.com"
    },
    "screenshot": "https://salestaxreversecalculator.com/og-image.png"
  };

  const faqSchema = stateContent?.faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: stateContent.faqs.map((faq) => ({
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
            <span style={{ color: '#000', fontSize: 13, fontWeight: 800, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>🗺️ {stateData.abbreviation} · PRE-FILLED COMBINED RATE: {stateData.rate}%</span>
          </div>

          <h1
            aria-label={`${stateData.state} Reverse Sales Tax Calculator`}
            style={{ fontSize: 'clamp(32px, 8vw, 64px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '-0.02em' }}
          >
            {stateData.state} Reverse Sales Tax{' '}
            <br />
            <span style={{ color: 'var(--primary)', textShadow: '4px 4px 0px #000' }}>
              Calculator
            </span>
          </h1>

          {/* E-E-A-T Trust Signals Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, fontFamily: 'var(--font-mono)' }}>
            <span>✍️ Written by <strong>Tax Research Team</strong></span>
            <span>•</span>
            <span>🔍 Reviewed for <strong>2026 Statutory Rates</strong></span>
            <span>•</span>
            <span>🏛️ Source: <strong>{stateData.source}</strong></span>
          </div>

          <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            Pre-filled with {stateData.state}&apos;s {stateData.rate}% combined average tax rate.
            Enter any total price to find the original pre-tax amount instantly.
          </p>
        </div>
      </section>

      {/* ── Main Layout ───────────────────── */}
      <div className="container-main" style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 860, width: '100%' }}>
          
          <nav style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 32, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>/</span>
            <Link href="/tax-rates" style={{ color: 'var(--primary)', textDecoration: 'none', transition: 'color 0.2s' }}>Tax Rates</Link>
            <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-primary)' }}>{stateData.state}</span>
          </nav>

          {/* Rate Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'State Base Rate', value: `${stateData.stateRate}%`, color: 'var(--primary)', desc: `Standard statewide rate` },
              { label: 'Avg Local Rate', value: stateData.avgLocalRate > 0 ? `${stateData.avgLocalRate.toFixed(2)}%` : 'None', color: '#a1a1aa', desc: 'Average local surcharges' },
              { label: 'Combined Rate', value: `${stateData.rate}%`, color: 'var(--primary)', desc: 'Pre-loaded checkout rate', textShadow: '2px 2px 0px #000' },
            ].map(({ label, value, color, desc, textShadow }) => (
              <div key={label} className="card" style={{ textAlign: 'center', border: '2px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: 'var(--font-mono)', textShadow }}>{value}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 8, textTransform: 'uppercase' }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 64 }}>
            <StateCalculatorClient stateData={stateData} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {/* State Info */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">State Info</span>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                About {stateData.state} Sales Tax
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                {stateContent?.aboutText ? (
                  stateContent.aboutText.map((paragraph, idx) => (
                    <p key={idx}><LinkifiedText text={paragraph} currentState={stateData.state} /></p>
                  ))
                ) : stateData.rate === 0 ? (
                  <p>{stateData.state} is one of five US states with <strong>no sales tax</strong>. Shoppers in {stateData.state} pay the listed price — no tax is added at checkout for most purchases.</p>
                ) : (
                  <>
                    <p>
                      {stateData.state} has a state sales tax rate of <strong>{stateData.stateRate}%</strong>.
                      {stateData.avgLocalRate > 0 ? ` Added to this are local taxes averaging ${stateData.avgLocalRate.toFixed(2)}%, bringing the combined average to ${stateData.rate}%.` : ' There are no local sales taxes in this state.'}
                    </p>
                    <p>
                      This means for every $100 of pre-tax goods, you pay ${stateData.rate} in sales tax for a total of ${(100 + stateData.rate).toFixed(2)}.
                      Reversely, if you paid ${(100 + stateData.rate).toFixed(2)}, the original price was $100.00.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* City Rates */}
            {stateContent && stateContent.cities.length > 0 && (
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">Local Rates</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Tax Rates in Major {stateData.state} Cities
                </h2>
                <div className="card" style={{ padding: 0, overflow: 'hidden', border: '2px solid var(--border)', borderRadius: 'var(--radius)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#09090b', borderBottom: '2px solid var(--border)' }}>
                        <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>City</th>
                        <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Combined Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stateContent.cities.map((city, idx) => (
                        <tr key={idx} style={{ borderBottom: idx === stateContent.cities.length - 1 ? 'none' : '1px solid var(--border)' }}>
                          <td style={{ padding: '16px 24px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{city.name}</td>
                          <td style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>{city.rate.toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Use Cases */}
            {stateContent && stateContent.useCases.length > 0 && (
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">Use Cases</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  When to Use This Calculator in {stateData.state}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                  {stateContent.useCases.map((useCase, idx) => (
                    <div key={idx} className="card" style={{ padding: 24, border: '2px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>{useCase.title}</h3>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}><LinkifiedText text={useCase.description} currentState={stateData.state} /></p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Official State Department of Revenue & Exemption Guidelines */}
            {revenueInfo && (
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">State Authority & Exemptions</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Official {stateData.state} Tax Resources & Exemption Rules
                </h2>
                <div className="card" style={{ padding: 24, border: '2px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--primary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Official State Revenue Department
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
                        For statutory filing questions, sales tax permits, or audit guidance in {stateData.state}, verify directly with the governing revenue agency:
                      </p>
                      <a
                        href={revenueInfo.agencyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#000', background: 'var(--primary)', padding: '8px 16px', borderRadius: 'var(--radius-sm)', fontWeight: 800, fontSize: 14, textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
                      >
                        🏛️ Visit {revenueInfo.agencyName} →
                      </a>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
                        Local Exemption Rules (Groceries, Medicine & Clothing)
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        {revenueInfo.exemptionNotes}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* FAQs */}
            {stateContent && stateContent.faqs.length > 0 && (
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">FAQ</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 32px' }}>
                  Frequently Asked Questions: {stateData.state} Taxes
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {stateContent.faqs.map((faq, idx) => (
                    <details key={idx} className="faq-item" style={{ border: '2px solid var(--border)', borderRadius: 'var(--radius)' }}>
                      <summary className="faq-trigger" style={{ outline: 'none' }}>
                        <span>{faq.question}</span>
                        <span style={{ color: 'var(--primary)', fontSize: 22 }}>+</span>
                      </summary>
                      <p className="faq-content" style={{ margin: 0 }}>
                        <LinkifiedText text={faq.answer} currentState={stateData.state} />
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <div style={{ marginTop: 16, marginBottom: 64 }}>
              <AdSlot slot={`${stateSlug}-rectangle`} size="rectangle" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

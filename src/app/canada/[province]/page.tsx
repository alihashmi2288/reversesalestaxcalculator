import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import LinkifiedText from '@/components/LinkifiedText';
import { getProvinceBySlug, CANADA_PROV_TAX_RATES } from '@/data/canadaTaxRates';
import CanadaCalculatorClient from './CanadaCalculatorClient';

// Generate static paths for all 13 provinces and territories
export async function generateStaticParams() {
  return CANADA_PROV_TAX_RATES.map((p) => ({
    province: p.slug,
  }));
}

interface Props {
  params: Promise<{ province: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { province: provinceSlug } = await params;
  const provinceData = getProvinceBySlug(provinceSlug);
  if (!provinceData) return { title: 'Province Not Found' };

  const ogUrl = new URL('https://salestaxreversecalculator.com/api/og');
  ogUrl.searchParams.set('title', `${provinceData.name} Reverse Tax Calculator`);
  ogUrl.searchParams.set('location', provinceData.name);
  ogUrl.searchParams.set('rate', provinceData.rate.toString());

  return {
    title: `${provinceData.name} Reverse Sales Tax Calculator — ${provinceData.rate}% ${provinceData.type}`,
    description: `Free ${provinceData.name} reverse sales tax calculator. Pre-filled with the ${provinceData.rate}% ${provinceData.type} rate. Find original prices before Canadian sales tax in ${provinceData.name} instantly.`,
    alternates: { canonical: `https://salestaxreversecalculator.com/canada/${provinceSlug}` },
    openGraph: {
      images: [{ url: ogUrl.toString() }],
    },
    twitter: {
      title: `${provinceData.name} Reverse Sales Tax Calculator`,
    },
  };
}

export default async function ProvincePage({ params }: Props) {
  const { province: provinceSlug } = await params;
  const provinceData = getProvinceBySlug(provinceSlug);
  if (!provinceData) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'Canada', item: 'https://salestaxreversecalculator.com/canada' },
      { '@type': 'ListItem', position: 3, name: provinceData.name, item: `https://salestaxreversecalculator.com/canada/${provinceSlug}` },
    ],
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${provinceData.name} Reverse Sales Tax Calculator`,
    "url": `https://salestaxreversecalculator.com/canada/${provinceSlug}`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": `Free ${provinceData.name} reverse sales tax calculator. Find the original pre-tax price from any Canadian receipt in ${provinceData.name} instantly.`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CAD"
    },
    "areaServed": {
      "@type": "State",
      "name": provinceData.name,
      "containedInPlace": {
        "@type": "Country",
        "name": "Canada"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "PreTaxPrice",
      "url": "https://salestaxreversecalculator.com"
    },
    "screenshot": "https://salestaxreversecalculator.com/og-image.png"
  };

  const faqSchema = provinceData.faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: provinceData.faqs.map((faq) => ({
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
            <span style={{ color: '#000', fontSize: 13, fontWeight: 800, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>🇨🇦 {provinceData.abbr} · PRE-FILLED {provinceData.type} RATE: {provinceData.rate}%</span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 8vw, 64px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 24, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            {provinceData.name} Reverse Sales<br />
            <span style={{ color: 'var(--primary)', textShadow: '4px 4px 0px #000' }}>
              Tax Calculator
            </span>
          </h1>

          <p style={{ fontSize: 17, color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            Pre-filled with {provinceData.name}&apos;s {provinceData.rate}% combined {provinceData.type} rate.
            Enter any total price to find the original pre-tax amount instantly.
          </p>
        </div>
      </section>

      {/* ── Main Layout ───────────────────── */}
      <div className="container-main" style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 860, width: '100%' }}>
          
          <nav style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 32, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
            <Link href="/canada" style={{ color: 'var(--primary)', textDecoration: 'none', transition: 'color 0.2s' }}>Canada</Link>
            <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
            <span style={{ color: 'var(--text-primary)' }}>{provinceData.name}</span>
          </nav>

          <div style={{ marginBottom: 32 }}>
            <AdSlot slot={`${provinceSlug}-leaderboard`} size="leaderboard" />
          </div>

          {/* Rate Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Federal GST', value: provinceData.gst > 0 ? `${provinceData.gst}%` : 'N/A', color: 'var(--primary)', desc: `Federal Sales Tax` },
              { label: 'Provincial Component', value: provinceData.pst > 0 ? `${provinceData.pst}%` : provinceData.hst > 0 ? `${provinceData.hst - 5}%` : 'None', color: '#a1a1aa', desc: 'PST / QST / Province portion' },
              { label: 'Combined Rate', value: `${provinceData.rate}%`, color: 'var(--primary)', desc: 'Pre-loaded rate', textShadow: '2px 2px 0px #000' },
            ].map(({ label, value, color, desc, textShadow }) => (
              <div key={label} className="card" style={{ textAlign: 'center', border: '2px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: 'var(--font-mono)', textShadow }}>{value}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 8, textTransform: 'uppercase' }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 64 }}>
            <CanadaCalculatorClient provinceData={provinceData} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {/* Province Info */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">Province Info</span>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                About {provinceData.name} Sales Tax
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                {provinceData.aboutText.map((paragraph, idx) => (
                  <p key={idx}><LinkifiedText text={paragraph} currentState={provinceData.name} /></p>
                ))}
              </div>
            </section>

            {/* City Rates */}
            {provinceData.cities.length > 0 && (
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">Local Rates</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  Tax Rates in Major {provinceData.name} Cities
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
                      {provinceData.cities.map((city, idx) => (
                        <tr key={idx} style={{ borderBottom: idx === provinceData.cities.length - 1 ? 'none' : '1px solid var(--border)' }}>
                          <td style={{ padding: '16px 24px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{city.name}</td>
                          <td style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>{city.rate.toFixed(3).replace(/\.?0+$/, '')}%</td>
                          <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>None (Uniform Rate)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.5 }}>
                  * Unlike in the US, Canadian provinces apply sales tax uniformly across all municipalities. City-level or county-level surcharges do not exist in Canada.
                </p>
              </section>
            )}

            {/* Use Cases */}
            {provinceData.useCases.length > 0 && (
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">Use Cases</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
                  When to Use This Calculator in {provinceData.name}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                  {provinceData.useCases.map((useCase, idx) => (
                    <div key={idx} className="card" style={{ padding: 24, border: '2px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)' }}>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>{useCase.title}</h3>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}><LinkifiedText text={useCase.description} currentState={provinceData.name} /></p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {provinceData.faqs.length > 0 && (
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">FAQ</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 32px' }}>
                  Frequently Asked Questions: {provinceData.name} Taxes
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {provinceData.faqs.map((faq, idx) => (
                    <details key={idx} className="faq-item" style={{ border: '2px solid var(--border)', borderRadius: 'var(--radius)' }}>
                      <summary className="faq-trigger" style={{ outline: 'none' }}>
                        <span>{faq.question}</span>
                        <span style={{ color: 'var(--primary)', fontSize: 22 }}>+</span>
                      </summary>
                      <p className="faq-content" style={{ margin: 0 }}>
                        <LinkifiedText text={faq.answer} currentState={provinceData.name} />
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <div style={{ marginTop: 16, marginBottom: 64 }}>
              <AdSlot slot={`${provinceSlug}-rectangle`} size="rectangle" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

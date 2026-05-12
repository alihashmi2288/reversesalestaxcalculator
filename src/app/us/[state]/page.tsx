import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import LinkifiedText from '@/components/LinkifiedText';
import { getStateBySlug, STATE_TAX_RATES } from '@/data/stateTaxRates';
import { getStateContentBySlug } from '@/data/stateContent';
import StateCalculatorClient from './StateCalculatorClient';

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

  const ogUrl = new URL('https://salestaxreversecalculator.com/api/og');
  ogUrl.searchParams.set('title', `${stateData.state} Reverse Tax Calculator`);
  ogUrl.searchParams.set('location', stateData.state);
  ogUrl.searchParams.set('rate', stateData.rate.toString());

  return {
    title: `${stateData.state} Reverse Sales Tax Calculator — ${stateData.rate}% Combined Rate`,
    description: `Free ${stateData.state} reverse sales tax calculator. Pre-filled with the ${stateData.rate}% combined average rate. Find original prices before ${stateData.state} sales tax instantly.`,
    alternates: { canonical: `https://salestaxreversecalculator.com/us/${stateSlug}` },
    openGraph: {
      images: [{ url: ogUrl.toString() }],
    },
  };
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params;
  const stateData = getStateBySlug(stateSlug);
  if (!stateData) notFound();

  const stateContent = getStateContentBySlug(stateSlug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'US States', item: 'https://salestaxreversecalculator.com/tax-rates' },
      { '@type': 'ListItem', position: 3, name: stateData.state, item: `https://salestaxreversecalculator.com/us/${stateSlug}` },
    ],
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
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 100, padding: '6px 16px', marginBottom: 16 }}>
            <span style={{ color: '#a5b4fc', fontSize: 13, fontWeight: 600 }}>🗺️ {stateData.abbreviation} · Combined Rate: {stateData.rate}%</span>
          </div>
          <h1 style={{ fontSize: 'clamp(26px,4.5vw,44px)', fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.15 }}>
            {stateData.state} Reverse Sales<br />Tax Calculator
          </h1>
          <p style={{ fontSize: 17, color: '#94a3b8', maxWidth: 540, margin: '0 auto' }}>
            Pre-filled with {stateData.state}&apos;s {stateData.rate}% combined average tax rate.
            Enter any total price to find the original pre-tax amount.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 16 }}>
        <AdSlot slot={`${stateSlug}-leaderboard`} size="leaderboard" />
      </div>

      <div className="container-main" style={{ marginTop: 32 }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link href="/tax-rates" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Tax Rates</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>{stateData.state}</span>
        </nav>

        {/* Rate Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'State Rate', value: `${stateData.stateRate}%`, color: 'var(--primary)' },
            { label: 'Avg Local Rate', value: stateData.avgLocalRate > 0 ? `${stateData.avgLocalRate.toFixed(2)}%` : 'None', color: '#7c3aed' },
            { label: 'Combined Rate', value: `${stateData.rate}%`, color: stateData.rate === 0 ? '#047857' : stateData.rate > 8 ? '#dc2626' : '#d97706' },
          ].map(({ label, value, color }) => (
            <div key={label} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <StateCalculatorClient stateData={stateData} />

        {/* State Info */}
        <div style={{ marginTop: 48, maxWidth: 720, margin: '48px auto 0' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
            About {stateData.state} Sales Tax
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75 }}>
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
        </div>

        {/* City Rates */}
        {stateContent && stateContent.cities.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24, textAlign: 'center' }}>
              Tax Rates in Major {stateData.state} Cities
            </h2>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-primary)' }}>City</th>
                    <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-primary)' }}>Combined Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {stateContent.cities.map((city, idx) => (
                    <tr key={idx} style={{ borderBottom: idx === stateContent.cities.length - 1 ? 'none' : '1px solid var(--border)' }}>
                      <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{city.name}</td>
                      <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--primary)' }}>{city.rate.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Use Cases */}
        {stateContent && stateContent.useCases.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24, textAlign: 'center' }}>
              When to Use This Calculator in {stateData.state}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {stateContent.useCases.map((useCase, idx) => (
                <div key={idx} className="card" style={{ padding: 32 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>{useCase.title}</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}><LinkifiedText text={useCase.description} currentState={stateData.state} /></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {stateContent && stateContent.faqs.length > 0 && (
          <div style={{ marginTop: 64, maxWidth: 800, margin: '64px auto 0' }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32, textAlign: 'center' }}>
              Frequently Asked Questions: {stateData.state} Taxes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {stateContent.faqs.map((faq, idx) => (
                <details key={idx} className="card" style={{ padding: '24px 32px', cursor: 'pointer', outline: 'none' }}>
                  <summary style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {faq.question}
                    <span style={{ color: 'var(--primary)', fontSize: 24 }}>+</span>
                  </summary>
                  <p style={{ marginTop: 16, fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                    <LinkifiedText text={faq.answer} currentState={stateData.state} />
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 48, marginBottom: 64 }}>
          <AdSlot slot={`${stateSlug}-rectangle`} size="rectangle" />
        </div>
      </div>
    </main>
  );
}

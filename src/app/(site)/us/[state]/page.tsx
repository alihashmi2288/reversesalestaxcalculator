import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import LinkifiedText from '@/components/LinkifiedText';
import { getStateBySlug, STATE_TAX_RATES, type StateRate } from '@/data/stateTaxRates';
import { getStateContentBySlug } from '@/data/stateContent';
import { getStateRevenueInfo } from '@/data/stateRevenueLinks';
import StateCalculatorClient from './StateCalculatorClient';

import ConnecticutPage from './ConnecticutPage';
import NewYorkPage from './NewYorkPage';
import CaliforniaPage from './CaliforniaPage';
import TexasPage from './TexasPage';
import FloridaPage from './FloridaPage';

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
  } else if (stateSlug === 'california') {
    title = 'California Reverse Sales Tax Calculator (7.25% to 10.75%)';
    description = 'Free California reverse sales tax calculator pre-loaded with CDTFA rates. Back out sales tax from Los Angeles (9.50%), San Francisco (8.625%), and all CA cities.';
  } else if (stateSlug === 'texas') {
    title = 'Texas Reverse Sales Tax Calculator (8.25% Standard Rate)';
    description = 'Free Texas reverse sales tax calculator pre-filled with the 8.25% combined rate. Find original pre-tax prices from Houston, Dallas, Austin, and San Antonio receipts.';
  } else if (stateSlug === 'florida') {
    title = 'Florida Reverse Sales Tax Calculator (6.5% to 7.5% Surtax)';
    description = 'Free Florida reverse sales tax calculator with 2026 county surtax rates. Find original pre-tax prices from Miami, Tampa, Orlando, and Jacksonville receipts.';
  } else if (stateSlug === 'new-york') {
    title = 'New York Reverse Sales Tax Calculator (NYC 8.875%)';
    description = 'Unlock the true pre-tax cost of purchases in New York City with our reverse sales tax calculator. Pre-loaded with 8.875% NYC combined tax.';
  } else if (stateData.rate === 0) {
    title = `${stateData.state} Reverse Sales Tax Calculator (0% Tax Free)`;
    description = `Free ${stateData.state} reverse sales tax calculator. ${stateData.state} has no state sales tax (0%). Calculate pre-tax and checkout amounts instantly.`;
  } else if (stateData.avgLocalRate === 0) {
    title = `${stateData.state} Reverse Sales Tax Calculator (${stateData.rate}% Flat Rate)`;
    description = `Free ${stateData.state} reverse sales tax calculator pre-filled with ${stateData.state}'s flat ${stateData.rate}% rate. Find original pre-tax prices instantly.`;
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

  if (stateSlug === 'california') {
    return <CaliforniaPage stateData={stateData} />;
  }

  if (stateSlug === 'texas') {
    return <TexasPage stateData={stateData} />;
  }

  if (stateSlug === 'florida') {
    return <FloridaPage stateData={stateData} />;
  }

  if (stateSlug === 'new-york') {
    return <NewYorkPage stateData={stateData} />;
  }

  const stateContent = getStateContentBySlug(stateSlug);
  const revenueInfo = getStateRevenueInfo(stateSlug);

  const localizedUseCases = getLocalizedUseCases(stateData);
  const localizedFaqs = getLocalizedFaqs(stateData);

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
      "name": "Reverse Sales Tax Calculator",
      "alternateName": "PreTaxPrice",
      "url": "https://salestaxreversecalculator.com"
    },
    "screenshot": "https://salestaxreversecalculator.com/og-image.png"
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: localizedFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="hero-band" style={{ padding: '56px 0 64px', textAlign: 'center' }}>
        <div className="container-main" style={{ position: 'relative' }}>
          <span className="section-label" style={{ background: 'var(--mint-100)', color: 'var(--primary-deep)', border: '1px solid var(--mint-200)' }}>
            🗺️ {stateData.abbreviation} · PRE-FILLED COMBINED RATE: {stateData.rate}%
          </span>

          <h1
            aria-label={`${stateData.state} Reverse Sales Tax Calculator`}
            style={{ fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, margin: '16px 0 16px' }}
          >
            {stateData.state} Reverse Sales Tax Calculator
          </h1>

          {/* E-E-A-T Trust Signals Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--mint-100)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
            <span>✍️ Written by <strong>Tax Research Team</strong></span>
            <span>•</span>
            <span>🔍 Reviewed for <strong>2026 Statutory Rates</strong></span>
            <span>•</span>
            <span>🏛️ Source: <strong>{stateData.source}</strong></span>
          </div>

          <p style={{ fontSize: 17, color: 'var(--mint-100)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            Pre-filled with {stateData.state}&apos;s {stateData.rate}% combined average tax rate.
            Enter any total price to find the original pre-tax amount instantly.
          </p>
        </div>
      </section>

      {/* ── Main Layout ───────────────────── */}
      <div className="container-main" style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 860, width: '100%' }}>
          
          <nav style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'var(--hairline-strong)' }}>/</span>
            <Link href="/tax-rates" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Tax Rates</Link>
            <span style={{ margin: '0 8px', color: 'var(--hairline-strong)' }}>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{stateData.state}</span>
          </nav>

          {/* Rate Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'State Base Rate', value: `${stateData.stateRate}%`, color: 'var(--ink)', desc: `Standard statewide rate` },
              { label: 'Avg Local Rate', value: stateData.avgLocalRate > 0 ? `${stateData.avgLocalRate.toFixed(2)}%` : 'None', color: 'var(--muted)', desc: 'Average local surcharges' },
              { label: 'Combined Rate', value: `${stateData.rate}%`, color: 'var(--primary-deep)', desc: 'Pre-loaded checkout rate' },
            ].map(({ label, value, color, desc }) => (
              <div key={label} className="card" style={{ textAlign: 'center', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', background: 'var(--canvas)', padding: '20px 16px', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: 'var(--font-mono)' }}>{value}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginTop: 8, textTransform: 'uppercase' }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 56 }}>
            <StateCalculatorClient stateData={stateData} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {/* State Info */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">State Info</span>
              <h2 style={{ fontSize: 30, fontWeight: 700, color: 'var(--ink)', margin: '12px 0 20px' }}>
                About {stateData.state} Sales Tax
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--body)', fontSize: 16, lineHeight: 1.8 }}>
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
                <h2 style={{ fontSize: 30, fontWeight: 700, color: 'var(--ink)', margin: '12px 0 20px' }}>
                  Tax Rates in Major {stateData.state} Cities
                </h2>
                <div style={{ overflow: 'hidden', border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', background: 'var(--canvas)', boxShadow: 'var(--shadow-card)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--canvas-soft)', borderBottom: '1px solid var(--hairline-strong)' }}>
                        <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>City</th>
                        <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Combined Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stateContent.cities.map((city, idx) => (
                        <tr key={idx} style={{ borderBottom: idx === stateContent.cities.length - 1 ? 'none' : '1px solid var(--hairline)' }}>
                          <td style={{ padding: '14px 20px', color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>{city.name}</td>
                          <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--primary-deep)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>{city.rate.toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Use Cases */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">Use Cases</span>
              <h2 style={{ fontSize: 30, fontWeight: 700, color: 'var(--ink)', margin: '12px 0 20px' }}>
                When to Use This Calculator in {stateData.state}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                {localizedUseCases.map((useCase, idx) => (
                  <div key={idx} className="card" style={{ padding: 24, border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', background: 'var(--canvas)', boxShadow: 'var(--shadow-card)' }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{useCase.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}><LinkifiedText text={useCase.description} currentState={stateData.state} /></p>
                  </div>
                ))}
              </div>
            </section>

            {/* Official State Department of Revenue & Exemption Guidelines */}
            {revenueInfo && (
              <section style={{ maxWidth: 860 }}>
                <span className="section-label">State Authority &amp; Exemptions</span>
                <h2 style={{ fontSize: 30, fontWeight: 700, color: 'var(--ink)', margin: '12px 0 20px' }}>
                  Official {stateData.state} Tax Resources &amp; Exemption Rules
                </h2>
                <div style={{ padding: 24, border: '1px solid var(--mint-200)', borderRadius: 'var(--radius-lg)', background: 'var(--mint-50)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary-deep)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Official State Revenue Department
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: '0 0 12px' }}>
                        For statutory filing questions, sales tax permits, or audit guidance in {stateData.state}, verify directly with the governing revenue agency:
                      </p>
                      <a
                        href={revenueInfo.agencyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', width: 'auto' }}
                      >
                        🏛️ Visit {revenueInfo.agencyName} →
                      </a>
                    </div>

                    <div style={{ borderTop: '1px solid var(--mint-200)', paddingTop: 16 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                        Local Exemption Rules (Groceries, Medicine &amp; Clothing)
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
                        {revenueInfo.exemptionNotes}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* FAQs */}
            <section style={{ maxWidth: 860 }}>
              <span className="section-label">FAQ</span>
              <h2 style={{ fontSize: 30, fontWeight: 700, color: 'var(--ink)', margin: '12px 0 32px' }}>
                Frequently Asked Questions: {stateData.state} Taxes
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {localizedFaqs.map((faq, idx) => (
                  <details key={idx} className="faq-item" style={{ border: '1px solid var(--hairline-strong)', borderRadius: 'var(--radius-lg)', background: 'var(--canvas)' }}>
                    <summary className="faq-trigger" style={{ outline: 'none' }}>
                      <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{faq.question}</span>
                      <span style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 700 }}>+</span>
                    </summary>
                    <p className="faq-content" style={{ margin: 0, color: 'var(--body)' }}>
                      <LinkifiedText text={faq.answer} currentState={stateData.state} />
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <div style={{ marginTop: 16, marginBottom: 64 }}>
              <AdSlot slot={`${stateSlug}-rectangle`} size="rectangle" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function getLocalizedUseCases(stateData: StateRate) {
  if (stateData.rate === 0) {
    return [
      {
        title: `Verifying Cross-Border Receipt Overcharges`,
        description: `Shoppers and businesses residing in ${stateData.state} enjoy a 0.00% state sales tax environment. If an out-of-state vendor or online marketplace incorrectly assessed sales tax on delivery, use our reverse calculator to determine the exact pre-tax basis and file for a prompt tax refund.`,
      },
      {
        title: `Multi-State Business Expense Allocation`,
        description: `For companies incorporated in ${stateData.state} procuring supplies in neighboring jurisdictions, separating vendor sales tax from your accounting cost of goods sold is critical for GAAP bookkeeping and IRS Schedule C tax deductions.`,
      },
      {
        title: `Auditing Equipment Invoices & Leases`,
        description: `Commercial agreements originating outside ${stateData.state} often bundle destination taxes into monthly charges. Reverse calculating payments confirms whether vendors correctly applied ${stateData.state}'s statutory tax exemptions.`,
      },
    ];
  }

  if (stateData.avgLocalRate === 0) {
    return [
      {
        title: `Uniform Statewide Receipt Reconciliation`,
        description: `${stateData.state} operates a flat ${stateData.stateRate}% statewide sales tax with 0% local municipal add-ons. Every retail purchase in the state can be cleanly divided by ${(1 + stateData.stateRate / 100).toFixed(4)}, allowing you to quickly isolate pre-tax expense figures without researching local city or county tax codes.`,
      },
      {
        title: `Deductible Asset Logging for ${stateData.state} Businesses`,
        description: `When recording asset purchases and operating expenses with the ${stateData.state} Department of Revenue or IRS, dividing bank statement totals by ${(1 + stateData.stateRate / 100).toFixed(4)} ensures you report exact GAAP-compliant net asset costs rather than inflated gross figures.`,
      },
      {
        title: `Verifying Vendor Invoices & Gross Receipts`,
        description: `Vendors in ${stateData.state} often quote all-inclusive totals. Reverse calculating the ${stateData.stateRate}% state tax reveals whether statutory exemptions (such as manufacturing or agricultural equipment) were correctly omitted from your order.`,
      },
    ];
  }

  return [
    {
      title: `Decoupling ${stateData.state} Local vs State Surcharges`,
      description: `With local taxes in ${stateData.state} averaging ${stateData.avgLocalRate.toFixed(2)}% on top of the ${stateData.stateRate}% state baseline (for an average combined rate of ${stateData.rate}%), reverse calculating receipt charges allows ${stateData.state} bookkeepers to accurately apportion state and municipal tax distributions.`,
    },
    {
      title: `Capital Expense & Budget Threshold Planning`,
      description: `When budgeting for commercial equipment or vehicle acquisitions in ${stateData.state}, enter your total capital expenditure budget into the calculator to determine the maximum pre-tax purchase price before ${stateData.state}'s ${stateData.rate}% average sales tax pushes the purchase over your spending limit.`,
    },
    {
      title: `Audit Defense for ${stateData.state} Small Businesses`,
      description: `If your business lost itemized receipts during tax season, the IRS requires rigorous mathematical substantiation. Dividing bank statement charges by ${(1 + stateData.rate / 100).toFixed(4)} provides verifiable evidence of deductible expenses separate from sales tax paid.`,
    },
  ];
}

function getLocalizedFaqs(stateData: StateRate) {
  if (stateData.rate === 0) {
    return [
      {
        question: `Does ${stateData.state} have a sales tax?`,
        answer: `${stateData.state} has no general statewide sales tax (0.00%). Most retail purchases are made completely tax-free, though specific excise taxes or selective local municipal taxes may apply to special categories.`,
      },
      {
        question: `How do I reverse calculate tax for a receipt in ${stateData.state}?`,
        answer: `Because ${stateData.state} has a 0% general sales tax, the receipt total is already the pre-tax price. If an out-of-state retailer incorrectly collected tax on delivery to ${stateData.state}, use our calculator with the charged rate to determine your refund amount.`,
      },
      {
        question: `Can local cities in ${stateData.state} charge sales tax?`,
        answer: stateData.avgLocalRate > 0
          ? `While ${stateData.state} levies no state sales tax, certain local boroughs or municipalities do charge local option taxes averaging approximately ${stateData.avgLocalRate.toFixed(2)}%.`
          : `No. Local municipalities in ${stateData.state} do not levy general local sales taxes.`,
      },
    ];
  }

  if (stateData.avgLocalRate === 0) {
    return [
      {
        question: `What is the sales tax rate in ${stateData.state}?`,
        answer: `${stateData.state} has a uniform statewide sales tax rate of ${stateData.stateRate}%. The state does not permit local city or county sales taxes, meaning ${stateData.stateRate}% applies uniformly across all jurisdictions.`,
      },
      {
        question: `How do I back out sales tax from a ${stateData.state} receipt?`,
        answer: `Divide the final receipt total by ${(1 + stateData.stateRate / 100).toFixed(4)}. For example, with a ${stateData.stateRate}% rate, a receipt total of $${(100 + stateData.stateRate).toFixed(2)} divided by ${(1 + stateData.stateRate / 100).toFixed(4)} yields the original pre-tax price of $100.00.`,
      },
      {
        question: `Do local cities in ${stateData.state} have additional sales taxes?`,
        answer: `No. Unlike states with county or municipal sales taxes, ${stateData.state} has 0% local sales taxes. The ${stateData.stateRate}% state rate is the only sales tax rate charged statewide.`,
      },
    ];
  }

  return [
    {
      question: `What is the combined sales tax rate in ${stateData.state}?`,
      answer: `${stateData.state} imposes a state base rate of ${stateData.stateRate}%. Local municipalities and counties add surtaxes averaging ${stateData.avgLocalRate.toFixed(2)}%, bringing the statewide combined average to ${stateData.rate}%. Exact rates depend on the city or county where the item is purchased or delivered.`,
    },
    {
      question: `How do I reverse calculate ${stateData.state} sales tax from a total?`,
      answer: `To calculate the pre-tax price, convert the combined tax rate on your receipt to a decimal divisor (1 + rate/100) and divide your receipt total. For the statewide average of ${stateData.rate}%, divide by ${(1 + stateData.rate / 100).toFixed(4)}.`,
    },
    {
      question: `Why can't I just subtract ${stateData.rate}% from my receipt total?`,
      answer: `Because sales tax in ${stateData.state} is calculated on the pre-tax price, not the post-tax total. Subtracting the percentage from the total calculates tax on the wrong base amount and produces an inaccurate figure. Division is the exact mathematical inverse.`,
    },
  ];
}

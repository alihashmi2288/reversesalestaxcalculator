import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'About Sales Tax Reverse Calculator — Who We Are & Editorial Standards' },
  description: 'Learn about Sales Tax Reverse Calculator — a free, privacy-first tool helping shoppers, freelancers, accountants, and businesses calculate the original price before sales tax. Learn about our strict data verification standards.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/about' },
  openGraph: {
    title: 'About Sales Tax Reverse Calculator — Who We Are & Editorial Standards',
    description: 'Learn about Sales Tax Reverse Calculator — a free, privacy-first tool helping shoppers, freelancers, accountants, and businesses calculate the original price before sales tax.',
    url: 'https://salestaxreversecalculator.com/about',
    images: [{ url: 'https://salestaxreversecalculator.com/og-image.png', width: 1200, height: 630, alt: 'About Sales Tax Reverse Calculator' }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://salestaxreversecalculator.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://salestaxreversecalculator.com/about' },
  ],
};

export default function AboutPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '72px 0', textAlign: 'center' }}>
        <div className="container-main">
          <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 900, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            About Sales Tax Reverse Calculator
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
            Our mission: make tax calculations free, instant, and accessible to everyone — backed by rigorous mathematical accuracy and verified government tax data.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: '48px auto 80px', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 40, fontFamily: 'var(--font-mono)' }}>
          <a href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: 'var(--text-primary)' }}>About</span>
        </nav>

        {/* Why We Built This */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🎯</div>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: 'var(--text-primary)', marginBottom: 14, textTransform: 'uppercase' }}>Why We Built This Tool</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
            We built <strong>salestaxreversecalculator.com</strong> (PreTaxPrice) because figuring out the original price before tax
            shouldn&apos;t require a math degree, complex spreadsheets, or expensive accounting subscriptions. Every day, millions of accountants, business owners, freelancers, and shoppers stare at a receipt, credit card statement, or invoice and ask themselves: <em>&quot;What did this item actually cost before tax was added?&quot;</em>
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginTop: 12 }}>
            This question has a straightforward answer, but the mathematical steps are often misunderstood. The most common error in business bookkeeping is the &quot;subtracting error&quot; — where a user attempts to find the pre-tax price by calculating the tax rate percentage of the final amount and subtracting it. This is mathematically incorrect. Because sales tax is applied to the original subtotal, not the final total, you must use the mathematical inverse: division. 
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginTop: 12 }}>
            For instance, if you paid $107.50 for an item with a 7.5% tax rate, subtracting 7.5% from $107.50 yields $99.44. In reality, the true original price was exactly $100.00, and the sales tax paid was $7.50. While a difference of $0.56 might seem minor on a single transaction, across hundreds of monthly business expense lines, these errors compound into thousands of dollars in mismatched records, leading to filing errors and audit flags.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginTop: 12 }}>
            Our calculator eliminates this error entirely. We provide a clean, free, and instant utility that performs the precise division formula automatically so your books remain compliant, accurate, and reliable.
          </p>
        </div>

        {/* Dynamic 4-in-1 Tabs Guide */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🧮</div>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: 'var(--text-primary)', marginBottom: 14, textTransform: 'uppercase' }}>How to Use the Calculator</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
            Our tool goes beyond basic calculators by offering four specialized tabs to solve different financial scenarios:
          </p>
          <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <li style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
              <strong style={{ color: 'var(--primary)', display: 'block', fontSize: 16, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>1. BASIC CALCULATOR (Default)</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, margin: 0 }}>
                Input the final price you paid (including tax) and the sales tax rate. You can type a custom percentage, select a standard preset, or pick any US State from the dropdown to load the average local combined tax rate. Click calculate to get a complete breakdown showing the original pre-tax price and the tax component.
              </p>
            </li>
            <li style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
              <strong style={{ color: 'var(--primary)', display: 'block', fontSize: 16, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>2. MULTIPLE ITEMS CALCULATOR</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, margin: 0 }}>
                Ideal for reconciling receipts containing multiple distinct purchases. Add as many rows as you need, input the total and tax rate for each item, and view both individual pre-tax costs and a running grand total at the bottom of the card.
              </p>
            </li>
            <li style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
              <strong style={{ color: 'var(--primary)', display: 'block', fontSize: 16, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>3. FIND TAX RATE MODE</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, margin: 0 }}>
                If your receipt displays a subtotal and a final total but doesn&apos;t mention the applied tax rate percentage, switch to this tab. Enter the original price and the final price paid, and the tool will calculate the exact implied tax percentage that was charged.
              </p>
            </li>
            <li style={{ paddingBottom: 8 }}>
              <strong style={{ color: 'var(--primary)', display: 'block', fontSize: 16, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>4. BATCH / CSV MODE</strong>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, margin: 0 }}>
                Reconciling a month&apos;s worth of expenses? Paste comma-separated lists of totals and rates (e.g. <code>108, 8</code>) directly into the batch container. The tool processes all rows simultaneously and generates a detailed table that you can export as a CSV for immediate upload into your bookkeeping software.
              </p>
            </li>
          </ul>
        </div>

        {/* Who Benefits Most */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🏢</div>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: 'var(--text-primary)', marginBottom: 14, textTransform: 'uppercase' }}>Who Benefits Most from Reverse Tax Calculations?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
            While anyone can use a reverse sales tax calculator, several industries and roles rely on these calculations for their daily operations:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              {
                icon: '🧾',
                title: 'Bookkeepers & Accountants',
                desc: 'Reconciling card statements where transactions show as a single lumped charge. They must isolate the base expense from the tax to claim tax credits and keep corporate ledgers GAAP-compliant.',
              },
              {
                icon: '💼',
                title: 'Freelancers & Contractors',
                desc: 'Tracking business expenses to lower net tax burdens. The IRS only allows the base, pre-tax cost of equipment, software, and tools to be deducted on tax returns.',
              },
              {
                icon: '🛒',
                title: 'E-Commerce Sellers',
                desc: 'Refunding orders and managing marketplace payouts. Platforms like Shopify or Amazon payout net payouts; sellers use reverse calculations to reconcile customer refunds and sales reports.',
              },
              {
                icon: '🍳',
                title: 'Hospitality & Catering',
                desc: 'Preparing all-inclusive pricing contracts for corporate client events. Managers must split the final quoted price into food costs, service fees, and applicable local taxes.',
              },
              {
                icon: '🏠',
                title: 'Real Estate & Property Management',
                desc: 'Auditing service invoices for properties (maintenance, cleaning, landscaping) which carry tax-inclusive rates, ensuring expenses are billed back to owners correctly.',
              },
              {
                icon: '🚗',
                title: 'Dealerships & Traders',
                desc: 'Analyzing vehicle purchases and trade-ins that quote full price with registration fees and local taxes pre-bundled. Finding the pre-tax value is key for margin calculations.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: 'rgba(0, 0, 0, 0.2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Integrity Section */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🛡️</div>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: 'var(--text-primary)', marginBottom: 14, textTransform: 'uppercase' }}>Our Data Integrity & Rate Sourcing Standards</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
            Tax rates are dynamic — states adjust thresholds, local municipalities add surcharges, and tax laws change frequently. To maintain the high levels of precision required by businesses, we enforce a strict data integrity policy:
          </p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginTop: 14 }}>
            <li>
              <strong>Authoritative Sourcing</strong>: We pull state, federal, and local tax rates directly from official state revenue department circulars, the Canadian Revenue Agency (CRA), the UK HM Revenue and Customs (HMRC), and verified tax research foundations.
            </li>
            <li>
              <strong>Blended Averages</strong>: For US State dropdowns, we provide the combined state rate plus the weighted average local (city/county) sales tax rate, offering the most realistic checkout rates.
            </li>
            <li>
              <strong>Scheduled Audits</strong>: Our tax rate databases are audited semi-annually by finance professionals to ensure compliance with current tax year regulations (last reviewed for 2026).
            </li>
          </ul>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginTop: 14, fontStyle: 'italic' }}>
            Disclaimer: While we make every effort to maintain the accuracy of our databases, tax rates are subject to local jurisdictions. We always recommend consulting a certified CPA or verifying with local tax portals for official legal filings.
          </p>
        </div>

        {/* Privacy */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔒</div>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: 'var(--text-primary)', marginBottom: 14, textTransform: 'uppercase' }}>100% Client-Side Privacy</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
            We understand that financial data is confidential. That is why our calculator runs <strong>entirely in your web browser</strong>. Every number you enter is processed locally on your device via JavaScript.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginTop: 12 }}>
            No calculations are transmitted to our servers, and we never collect, log, or share your financial data. You can perform unlimited calculations with complete confidentiality, free of cost.
          </p>
        </div>

        {/* Contact */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 48 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>✉️</div>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: 'var(--text-primary)', marginBottom: 14, textTransform: 'uppercase' }}>Get in Touch</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
            Have a question about a calculation, feedback on features, or spotted a local tax rate that has recently changed? We would love to hear from you. 
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginTop: 12 }}>
            Reach out to our editor team directly at{' '}
            <a href="mailto:salestaxreversecalculator@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
              salestaxreversecalculator@gmail.com
            </a>{' '}
            or submit a form on our dedicated{' '}
            <Link href="/contact" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
              Contact page
            </Link>
            . We review all submissions within 1–2 business days.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link
            href="/"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
              color: '#000',
              padding: '16px 48px',
              borderRadius: 'var(--radius)',
              fontWeight: 800,
              fontSize: 16,
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(204, 255, 0, 0.2)',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              transition: 'transform 0.2s',
            }}
            className="cta-button"
          >
            Use the Calculator
          </Link>
        </div>
      </div>
    </main>
  );
}

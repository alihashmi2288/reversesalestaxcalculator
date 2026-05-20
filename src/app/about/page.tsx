import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'About Sales Tax Reverse Calculator — Who We Are & How We Help' },
  description: 'Learn about Sales Tax Reverse Calculator — a free, privacy-first tool helping shoppers, freelancers, accountants, and businesses calculate the original price before sales tax.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/about' },
  openGraph: {
    title: 'About Sales Tax Reverse Calculator — Who We Are & How We Help',
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
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
            About Sales Tax Reverse Calculator
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            Our mission: make tax calculations free, instant, and accessible to everyone — no math degree required.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 860, margin: '64px auto 80px', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 48 }}>
          <a href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>About</span>
        </nav>

        {/* Why We Built This */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🎯</div>
          <h2 style={{ fontWeight: 700, fontSize: 22, color: 'var(--text-primary)', marginBottom: 12 }}>Why We Built This</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
            We built <strong>salestaxreversecalculator.com</strong> because figuring out the original price before tax
            shouldn&apos;t require a math degree or a spreadsheet. Every day, millions of people stare at a receipt or invoice
            and think, &quot;Wait — how much did this actually cost before tax?&quot; That question has a simple answer, but the
            math is tricky. You can&apos;t just subtract the tax percentage from the total — that gives you the wrong number
            because the tax was calculated on the pre-tax price, not the final amount.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginTop: 12 }}>
            Our tool handles that math instantly. Whether you&apos;re a shopper checking a receipt, a freelancer separating
            income from taxes, or an accountant reconciling invoices — you get an accurate answer in under a second,
            for free, with no account needed.
          </p>
        </div>

        {/* How to Use */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📖</div>
          <h2 style={{ fontWeight: 700, fontSize: 22, color: 'var(--text-primary)', marginBottom: 16 }}>How to Use the Calculator</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
            Using the reverse sales tax calculator is simple and takes about five seconds. Here&apos;s how it works:
          </p>
          <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 14, color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Enter the total price you paid.</strong> This is the final number on your receipt or invoice — the amount that already includes tax.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Select your location or enter a tax rate.</strong> You can pick a US state from the dropdown and it will auto-fill the combined average rate (state + local taxes). Or type in any custom rate — this works for Canada, Europe, Australia, or anywhere in the world.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Hit Calculate (or it updates automatically).</strong> The tool instantly shows you the original pre-tax price and the exact tax amount that was added.
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Use Batch Mode for multiple items.</strong> Processing a whole week of receipts? Switch to Batch Mode and paste in multiple amounts at once — the calculator handles them all at the same time.
            </li>
          </ol>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginTop: 16 }}>
            The formula the calculator uses is: <strong>Original Price = Total Price ÷ (1 + Tax Rate / 100)</strong>.
            For example, if you paid $107.50 and the tax rate is 7.5%, the calculator divides $107.50 by 1.075 to give you
            exactly $100.00 — the pre-tax price. The $7.50 difference is the sales tax.
          </p>
        </div>

        {/* Industries */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏢</div>
          <h2 style={{ fontWeight: 700, fontSize: 22, color: 'var(--text-primary)', marginBottom: 16 }}>Who Benefits Most from This Tool?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
            While anyone can use a reverse sales tax calculator, some industries rely on it almost every single day:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              {
                icon: '🧾',
                title: 'Accounting & Bookkeeping',
                desc: 'Accountants regularly receive invoices and expense reports where the total already includes tax. They need the pre-tax amount to correctly categorize expenses, claim input tax credits, and produce accurate financial statements.',
              },
              {
                icon: '🛒',
                title: 'Retail & E-Commerce',
                desc: 'Online retailers selling across multiple US states need to verify that the right tax amounts were collected at checkout. Reverse calculations make it easy to audit transactions and confirm remittance accuracy.',
              },
              {
                icon: '💼',
                title: 'Small Business Owners',
                desc: 'Small business owners who purchase supplies, equipment, or services need to separate the tax portion from the total to keep clean records for their own tax filings and expense tracking.',
              },
              {
                icon: '🏠',
                title: 'Real Estate',
                desc: 'Real estate transactions often involve tax-inclusive fees, agent commissions, and service charges. Agents and buyers use reverse calculations to understand the true cost of every line item.',
              },
              {
                icon: '🚗',
                title: 'Automotive',
                desc: 'Car buyers and dealerships frequently deal with tax-inclusive sticker prices. Knowing the pre-tax price helps buyers compare deals accurately and negotiate from the right baseline.',
              },
              {
                icon: '🏥',
                title: 'Healthcare & Insurance',
                desc: 'Medical billing departments and insurance adjusters often need to extract the pre-tax portion of a bill to apply coverage correctly and calculate reimbursements from the right amount.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
          <h2 style={{ fontWeight: 700, fontSize: 22, color: 'var(--text-primary)', marginBottom: 12 }}>No Signup. No Fees. No Data Collected.</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
            Every calculation you do happens <strong>directly in your browser</strong> using JavaScript. Your numbers never
            leave your device — we don&apos;t send anything to any server, and we don&apos;t store your calculations anywhere.
            There are no accounts to create, no cookies that track what you calculate, and absolutely no charge — ever.
            This tool is and will always be 100% free.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginTop: 12 }}>
            We believe financial tools should be fast, trustworthy, and open to everyone. That&apos;s not just a tagline —
            it&apos;s the reason this site exists.
          </p>
        </div>

        {/* Built for Everyone */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🌍</div>
          <h2 style={{ fontWeight: 700, fontSize: 22, color: 'var(--text-primary)', marginBottom: 12 }}>Built for Everyone, Everywhere</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
            Tax systems are different all over the world, and we support them all. For the <strong>United States</strong>,
            we cover all 50 states plus Washington D.C. with their current combined average rates — that&apos;s the state rate
            plus typical local county and city rates blended together.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginTop: 12 }}>
            For <strong>Canada</strong>, the calculator handles federal GST (5%), HST for provinces like Ontario and Nova
            Scotia (13–15%), and provincial sales taxes like BC&apos;s PST and Quebec&apos;s QST (9.975%). For <strong>Europe</strong>,
            it works with standard VAT rates for every EU country plus the UK. And if your country isn&apos;t listed, just type
            in your custom rate — the formula works the same everywhere.
          </p>
        </div>

        {/* Constantly Updated */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔄</div>
          <h2 style={{ fontWeight: 700, fontSize: 22, color: 'var(--text-primary)', marginBottom: 12 }}>We Keep Our Rates Up to Date</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
            Tax rates change — states raise or lower rates, counties adjust local surcharges, and new legislation passes
            every year. We monitor official state revenue department announcements and cross-reference data from authoritative
            sources like the Tax Foundation and the Sales Tax Institute to keep our rate database accurate and current.
            Our last comprehensive rate review was completed in 2026.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginTop: 12 }}>
            That said, for any legal or financial filing, we always recommend verifying the exact rate directly with your
            state or local tax authority. Our rates are accurate averages — individual city or county rates can vary.
          </p>
        </div>

        {/* Contact */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: 48 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✉️</div>
          <h2 style={{ fontWeight: 700, fontSize: 22, color: 'var(--text-primary)', marginBottom: 12 }}>Get in Touch</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
            Have a question, a feature request, or spotted a rate that needs updating? We&apos;d genuinely love to hear from
            you. Reach out at{' '}
            <a href="mailto:salestaxreversecalculator@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
              salestaxreversecalculator@gmail.com
            </a>{' '}
            or use our{' '}
            <a href="/contact" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
              Contact page
            </a>
            . We respond to every message.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a
            href="/"
            style={{
              background: 'var(--primary)',
              color: '#000',
              padding: '16px 40px',
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 16,
              textDecoration: 'none',
              display: 'inline-block',
              border: '2px solid #000',
              boxShadow: '4px 4px 0px 0px #000',
            }}
          >
            Use the Calculator →
          </a>
        </div>
      </div>
    </main>
  );
}

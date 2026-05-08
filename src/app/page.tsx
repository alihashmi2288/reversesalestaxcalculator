import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import CalculatorCard from '@/components/calculator/CalculatorCard';
import HowItWorks from '@/components/HowItWorks';
import FAQSection from '@/components/FAQSection';
import StateTable from '@/components/StateTable';

export const metadata: Metadata = {
  title: 'Reverse Sales Tax Calculator — Calculate Original Price Before Tax | Free',
  alternates: { canonical: 'https://reversetaxcalculator.com' },
};

const USE_CASES = [
  '🧾 Verifying itemized receipts match advertised prices',
  '📦 Reconciling business expense reports',
  '🏠 Calculating pre-tax amounts for insurance claims',
  '💼 Accounting for sales tax on corporate purchases',
  '🛒 Comparing prices across states with different tax rates',
  '🌍 Converting VAT-inclusive prices to net amounts',
  '📊 Preparing tax returns that require pre-tax amounts',
  '🔍 Auditing vendor invoices for correct tax charges',
];

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0 100px', position: 'relative', borderBottom: '2px solid var(--border)' }}>
        <div className="container-main" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--primary)', border: '2px solid #000', borderRadius: 'var(--radius)', padding: '6px 16px', marginBottom: 24, boxShadow: '4px 4px 0px 0px rgba(255,255,255,0.1)' }}>
            <span style={{ color: '#000', fontSize: 13, fontWeight: 800, letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>SYS.CALC.FREE // NO.SIGNUP</span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 8vw, 84px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 24, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            Reverse Sales Tax<br />
            <span style={{ color: 'var(--primary)', textShadow: '4px 4px 0px #000' }}>
              Calculator
            </span>
          </h1>

          <p style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', color: 'var(--text-secondary)', maxWidth: 680, margin: '0 auto 40px', lineHeight: 1.6, fontFamily: 'var(--font-mono)' }}>
            &gt; Enter final price. Calculate original pre-tax base.<br />
            &gt; Valid for US50, CA, EU & Global modules.
          </p>

          {/* Trust Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
            {[
              { text: 'NO SIGNUP' },
              { text: 'FREE FOREVER' },
              { text: 'GLOBAL RATES' },
              { text: 'CLIENT-SIDE SECURE' },
            ].map(({ text }) => (
              <div key={text} className="trust-badge">
                <span>✓</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ad: Hero Leaderboard ─────────────────────────────── */}
      <div className="container-main" style={{ marginTop: -20, marginBottom: 8 }}>
        <AdSlot slot="hero-leaderboard" size="leaderboard" label="Leaderboard — Above Calculator" />
      </div>

      {/* ── Calculator (with sidebar layout on desktop) ───────── */}
      <div className="container-main" style={{ marginTop: 32, marginBottom: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }} className="calc-layout">
          <div>
            <CalculatorCard />
            {/* Ad: After Results */}
            <div style={{ marginTop: 24 }}>
              <AdSlot slot="results-rectangle" size="rectangle" label="Rectangle — After Calculator" />
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 80 }} className="sidebar">
            <AdSlot slot="sidebar-halfpage" size="halfpage" label="Sidebar 300×600" />

            {/* Quick Tips Card */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 16 }}>💡 Quick Tips</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Formula: Price ÷ (1 + rate/100)',
                  'Use the state dropdown for local rates',
                  'Quick-rate buttons for common rates',
                  'Batch mode for multiple receipts',
                ].map((tip) => (
                  <li key={tip} style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700, flexShrink: 0 }}>→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Links */}
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 16 }}>🔗 Related Tools</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { href: '/vat-calculator', label: 'VAT Calculator (EU)' },
                  { href: '/canada', label: 'Canada GST/HST' },
                  { href: '/us/california', label: 'California Tax Calc' },
                  { href: '/us/texas', label: 'Texas Tax Calc' },
                  { href: '/us/new-york', label: 'New York Tax Calc' },
                  { href: '/tax-rates', label: 'All State Rates' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
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
        @media (max-width: 900px) {
          .calc-layout { grid-template-columns: 1fr !important; }
          .sidebar { position: static !important; }
        }
      `}</style>

      {/* ── How It Works ─────────────────────────────────────── */}
      <div style={{ background: 'var(--card-bg)', borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', padding: '80px 0' }}>
        <div className="container-main">
          <HowItWorks />
        </div>
      </div>

      {/* ── Formula Box ──────────────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 80 }}>
        <div className="formula-box">
          <div style={{ fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: 16 }}>
            The Reverse Tax Formula
          </div>
          <div className="formula-text">Original Price = Final Price ÷ (1 + Tax Rate / 100)</div>
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, opacity: 0.85 }}>
            <div style={{ background: 'var(--bg)', border: '2px solid var(--border)', borderRadius: 'var(--radius)', padding: 14 }}>
              <div style={{ fontSize: 12, marginBottom: 4, opacity: 0.7 }}>EXAMPLE</div>
              <div style={{ fontSize: 14 }}>$107.50 ÷ (1 + 7.5/100)</div>
              <div style={{ fontSize: 14 }}>= $107.50 ÷ 1.075</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>= $100.00 ✓</div>
            </div>
            <div style={{ background: 'var(--bg)', border: '2px solid var(--border)', borderRadius: 'var(--radius)', padding: 14 }}>
              <div style={{ fontSize: 12, marginBottom: 4, opacity: 0.7 }}>TAX AMOUNT</div>
              <div style={{ fontSize: 14 }}>$107.50 − $100.00</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>= $7.50 tax paid</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Ad: In-Article 1 ─────────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 48 }}>
        <AdSlot slot="in-article-1" size="in-article" label="In-Article Unit 1" />
      </div>

      {/* ── What Is Section ──────────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 48 }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <span className="section-label">About</span>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
            What Is a Reverse Sales Tax Calculator?
          </h2>
          <div style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>
              A <strong>reverse sales tax calculator</strong> is a financial tool that works backwards from a tax-inclusive
              price to reveal the original pre-tax amount. Unlike a standard sales tax calculator that adds tax to a price,
              our tool removes the tax — answering the question: <em>"How much did this item actually cost before tax?"</em>
            </p>
            <p>
              This is particularly useful when you receive a receipt, invoice, or price tag that already includes tax, and you
              need to know the base price. The math isn't as simple as just subtracting the tax percentage — because the tax
              was calculated on the pre-tax price, not the total. That's why the correct formula divides by <code>(1 + rate/100)</code>.
            </p>
            <p>
              Our calculator supports all 50 US states plus DC with their current combined average tax rates (state + local),
              Canadian provincial taxes (GST, HST, PST/QST), and European VAT rates. All calculations happen instantly in
              your browser — no data is sent to any server, and no account is required.
            </p>
          </div>
        </div>
      </div>

      {/* ── Why You Might Need This ──────────────────────────── */}
      <div style={{ background: 'var(--bg)', borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', marginTop: 64, padding: '64px 0' }}>
        <div className="container-main">
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <span className="section-label">Use Cases</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 32px' }}>
              Why You Might Need Reverse Tax Calculation
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
              {USE_CASES.map((uc, i) => (
                <div key={i} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{uc.split(' ')[0]}</span>
                  <span style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{uc.substring(uc.indexOf(' ') + 1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── State Rates Table ─────────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 80 }}>
        <StateTable />
      </div>

      {/* ── Ad: In-Article 2 ─────────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 48 }}>
        <AdSlot slot="in-article-2" size="in-article" label="In-Article Unit 2" />
      </div>

      {/* ── Business Use Section ──────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 48 }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <span className="section-label">Business Use</span>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 20px' }}>
            How Businesses Use Reverse Tax Calculations
          </h2>
          <div style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>
              For businesses, reverse sales tax calculation is a daily necessity. Accounting departments regularly receive
              invoices and receipts with tax-inclusive totals and must extract the pre-tax base for proper bookkeeping,
              expense categorization, and financial reporting.
            </p>
            <p>
              <strong>Expense Reporting:</strong> When employees submit expense reports with tax-inclusive receipts, accountants
              need the pre-tax amount to correctly categorize expenses and claim input tax credits where applicable. Our batch
              mode lets you process an entire month&apos;s receipts in seconds.
            </p>
            <p>
              <strong>Vendor Invoice Verification:</strong> Businesses frequently need to verify that a vendor charged the
              correct tax amount on an invoice. By calculating the expected pre-tax price from the total, you can quickly
              spot discrepancies and potential billing errors.
            </p>
            <p>
              <strong>Cross-State Operations:</strong> Companies operating across multiple US states must account for different
              tax rates in each jurisdiction. Our state-specific calculators and filterable rate table make it easy to handle
              transactions from any state without manual lookup.
            </p>
            <p>
              <strong>Retail & E-Commerce:</strong> Online retailers selling to customers in multiple states need to verify
              sales tax collection accuracy. Reverse calculations help audit whether the correct amounts were charged during
              checkout and collected for remittance to state authorities.
            </p>
          </div>
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <div className="container-main" style={{ marginTop: 80 }}>
        <FAQSection />
      </div>

      {/* ── Related Tools ─────────────────────────────────────── */}
      <div style={{ background: 'var(--card-bg)', borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', marginTop: 64, padding: '64px 0' }}>
        <div className="container-main">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-label">Related Tools</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0' }}>
              More Free Tax Calculators
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { href: '/vat-calculator', icon: '🇪🇺', title: 'VAT Calculator', desc: 'Remove VAT from prices for UK, EU, and Australia' },
              { href: '/canada', icon: '🇨🇦', title: 'Canada Tax Calculator', desc: 'GST, HST, PST and Quebec QST reverse calculations' },
              { href: '/us/california', icon: '🌴', title: 'California Calculator', desc: "Pre-filled with California's 9.06% combined rate" },
              { href: '/us/texas', icon: '⭐', title: 'Texas Calculator', desc: "Pre-filled with Texas's 8.19% combined rate" },
              { href: '/us/new-york', icon: '🗽', title: 'New York Calculator', desc: "Pre-filled with New York's 8.54% combined rate" },
              { href: '/tax-rates', icon: '📊', title: 'All State Tax Rates', desc: 'Complete table of all 50 state combined tax rates' },
            ].map(({ href, icon, title, desc }) => (
              <Link key={href} href={href} className="tool-card">
                <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--primary)', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ad: Footer Leaderboard ───────────────────────────── */}
      <div className="container-main" style={{ marginTop: 48, marginBottom: 48 }}>
        <AdSlot slot="footer-leaderboard" size="leaderboard" label="Footer Leaderboard" />
      </div>
    </main>
  );
}

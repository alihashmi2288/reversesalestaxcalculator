import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import CanadaCalculator from './CanadaCalculator';

export const metadata: Metadata = {
  title: 'Canada Reverse Tax Calculator — GST, HST, PST by Province',
  description: 'Free Canada reverse sales tax calculator. Remove GST, HST, or PST from any price. Supports all 13 provinces and territories with current 2026 rates.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/canada' },
};

export default function CanadaPage() {
  return (
    <main>
      <section style={{ background: 'linear-gradient(135deg, #0f172a, #7c3aed)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <div style={{ fontSize: 48, marginBottom: 12 }}>🇨🇦</div>
          <h1 style={{ fontSize: 'clamp(26px,4.5vw,44px)', fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.15 }}>
            Canada Reverse Tax Calculator
          </h1>
          <p style={{ fontSize: 17, color: '#c4b5fd', maxWidth: 540, margin: '0 auto' }}>
            Remove GST, HST, or PST from any Canadian price. Supports all provinces and territories.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 16 }}>
        <AdSlot slot="canada-leaderboard" size="leaderboard" label="Canada — Leaderboard" />
      </div>

      <div className="container-main" style={{ marginTop: 32, marginBottom: 80 }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>Canada Calculator</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }} className="calc-layout">
          <div>
            <CanadaCalculator />
            <div style={{ marginTop: 24 }}>
              <AdSlot slot="canada-rectangle" size="rectangle" label="Canada — Rectangle" />
            </div>
          </div>
          <div>
            <div className="card">
              <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 16 }}>🇨🇦 Canadian Tax Rates</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Federal GST', value: '5%', note: 'All provinces' },
                  { label: 'Ontario HST', value: '13%', note: 'ON' },
                  { label: 'Maritime HST', value: '15%', note: 'NB, NL, NS, PE' },
                  { label: 'BC GST+PST', value: '12%', note: 'BC' },
                  { label: 'Quebec GST+QST', value: '14.975%', note: 'QC' },
                  { label: 'MB GST+PST', value: '12%', note: 'MB' },
                  { label: 'SK GST+PST', value: '11%', note: 'SK' },
                  { label: 'AB/NT/NU/YT', value: '5%', note: 'GST only' },
                ].map(({ label, value, note }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{note}</div>
                    </div>
                    <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 15 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- SEO Content Section --- */}
        <div style={{ marginTop: 64, maxWidth: 860, margin: '64px auto 0' }}>
          <div className="seo-content" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            
            <section>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
                Understanding Canadian Sales Tax (GST, HST, PST, QST)
              </h2>
              <div style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p>
                  Canadian sales tax can be quite complex because it varies significantly depending on which province or territory you are in. At the federal level, Canada imposes a blanket 5% Goods and Services Tax (GST). However, that is usually just the starting point, as most provinces add their own specific taxes on top.
                </p>
                <p>
                  In provinces like Ontario, New Brunswick, and Nova Scotia, the federal and provincial taxes are merged into a single Harmonized Sales Tax (HST), which ranges from 13% to 15%. Other provinces, such as British Columbia, Manitoba, and Saskatchewan, maintain a separate Provincial Sales Tax (PST) that is calculated alongside the 5% GST. Quebec operates its own unique system with the Quebec Sales Tax (QST) at 9.975%, which brings their effective combined rate to 14.975%. Meanwhile, Alberta and the territories (Northwest Territories, Nunavut, and Yukon) are the only regions that charge strictly the 5% GST with absolutely no provincial additions.
                </p>
                <p>
                  When you purchase items in Canada, these taxes are automatically added at the register. If you are looking at a final receipt and need to know the original price before tax was applied, our Canada Reverse Sales Tax Calculator allows you to work backwards instantly, no matter which province's tax rules apply to your purchase.
                </p>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>
                When to Use the Canadian Reverse Tax Calculator
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Claiming Input Tax Credits (ITCs)</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    For Canadian businesses registered for GST/HST, reclaiming taxes paid on business expenses is crucial. If a vendor receipt only shows a final total, our calculator extracts the exact GST/HST amount so you can accurately claim your ITCs from the CRA.
                  </p>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Cross-Border Budgeting</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    If you live in Alberta (5% tax) but are purchasing a vehicle or heavy equipment in British Columbia (12% tax), understanding the true cost of the item can be tricky. Use our tool to strip away the tax and see the actual sticker price of the goods you are buying.
                  </p>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Verifying Handwritten Receipts</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    Sometimes receipts from smaller vendors, contractors, or handwritten invoices only show a final total. Our tool helps you instantly verify that the correct tax rate was applied according to your specific province's HST, PST, or QST regulations.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24 }}>
                Frequently Asked Questions: Canada Taxes
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  {
                    q: 'How do I calculate a price before 13% HST in Ontario?',
                    a: 'To manually find the pre-tax price in Ontario, you divide the final total by 1.13. For example, if you paid $113.00 total, you divide by 1.13 to get the original pre-tax price of $100.00. Our calculator does this math for you automatically.'
                  },
                  {
                    q: 'Are groceries taxed in Canada?',
                    a: 'Basic groceries (like milk, bread, and fresh vegetables) are generally "zero-rated" in Canada, meaning they are taxed at 0%. However, snack foods, hot prepared meals, and alcohol are fully taxable under standard GST/HST/PST/QST rules.'
                  },
                  {
                    q: 'Does the calculator work for Quebec\'s QST?',
                    a: 'Yes! Quebec charges a 5% federal GST and a 9.975% provincial QST, bringing the combined rate to 14.975%. Our calculator natively supports Quebec\'s unique tax structure.'
                  },
                  {
                    q: 'Why do Alberta and the Territories only charge 5%?',
                    a: 'Alberta, the Northwest Territories, Nunavut, and Yukon do not have a provincial sales tax (PST). Residents and businesses in these areas only pay the federal 5% Goods and Services Tax (GST) on taxable items.'
                  }
                ].map((faq, idx) => (
                  <details key={idx} className="card" style={{ padding: '24px 32px', cursor: 'pointer', outline: 'none' }}>
                    <summary style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {faq.q}
                      <span style={{ color: 'var(--primary)', fontSize: 24 }}>+</span>
                    </summary>
                    <p style={{ marginTop: 16, fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>

          </div>
        </div>

        <style>{`@media(max-width:900px){.calc-layout{grid-template-columns:1fr!important}}`}</style>
      </div>
    </main>
  );
}

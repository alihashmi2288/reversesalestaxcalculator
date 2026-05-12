import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — ReverseTaxCalc',
  description: 'Terms of service for ReverseTaxCalc. For informational purposes only — not professional tax advice.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/terms-of-service' },
};

export default function TermsPage() {
  const updated = 'January 1, 2026';
  return (
    <main>
      <div className="container-main" style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px 80px' }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 40 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>Terms of Service</span>
        </nav>

        <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 40 }}>Last updated: {updated}</p>

        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 20, marginBottom: 40 }}>
          <p style={{ color: '#92400e', fontWeight: 600, fontSize: 15 }}>
            ⚠️ <strong>Important Disclaimer:</strong> ReverseTaxCalc is for informational and estimation purposes only.
            It does not constitute professional tax, legal, or financial advice. Always verify tax rates and calculations with
            official government sources or a qualified tax professional before making financial or legal decisions.
          </p>
        </div>

        {[
          {
            title: '1. Acceptance of Terms',
            body: 'By accessing and using https://www.salestaxreversecalculator.com, you accept and agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the website immediately.',
          },
          {
            title: '2. Description of Service',
            body: 'ReverseTaxCalc provides a free, browser-based tool for calculating reverse sales tax, VAT, and related tax computations. The service is provided "as is" and "as available" without warranties of any kind.',
          },
          {
            title: '3. Disclaimer of Accuracy',
            body: 'While we strive to maintain accurate and up-to-date tax rate information, we cannot guarantee that all rates displayed are current or applicable to your specific situation. Tax rates change frequently, and specific products or services may be taxed differently than standard rates. Always verify rates with your state\'s Department of Revenue or a qualified tax professional.',
          },
          {
            title: '4. Not Professional Advice',
            body: 'Nothing on this website constitutes tax, legal, accounting, or financial advice. The calculator is an educational and estimation tool only. For decisions involving tax compliance, business accounting, legal matters, or significant financial transactions, consult a licensed professional.',
          },
          {
            title: '5. Limitation of Liability',
            body: 'To the maximum extent permitted by law, ReverseTaxCalc and its operators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this service. This includes but is not limited to errors in tax calculations, incorrect rate data, or decisions made based on information provided by this tool.',
          },
          {
            title: '6. Intellectual Property',
            body: 'All content on this website, including text, graphics, design, and code, is the property of ReverseTaxCalc and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.',
          },
          {
            title: '7. Advertising',
            body: 'This website displays advertisements provided by Google AdSense and potentially other advertising networks. We are not responsible for the content of those advertisements. Advertisement revenue helps us maintain this free service.',
          },
          {
            title: '8. Changes to Terms',
            body: 'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes constitutes acceptance of the new terms.',
          },
          {
            title: '9. Governing Law',
            body: 'These Terms shall be governed by and construed in accordance with the laws of the United States. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of competent jurisdiction.',
          },
          {
            title: '10. Contact',
            body: 'For questions about these Terms of Service, please email us at salestaxreversecalculator@gmail.com.',
          },
        ].map(({ title, body }) => (
          <div key={title} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>{title}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>{body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

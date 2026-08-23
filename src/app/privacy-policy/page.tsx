import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy: PreTaxPrice',
  description: 'Privacy policy for PreTaxPrice. We collect no personal data — all calculations are performed locally in your browser.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  const updated = 'January 1, 2026';
  return (
    <main>
      <div className="container-main" style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px 80px' }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 40 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>Privacy Policy</span>
        </nav>

        <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 40 }}>Last updated: {updated}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <section>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>1. Overview</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              PreTaxPrice (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy describes how we handle information when you visit https://salestaxreversecalculator.com. The short version: we collect almost nothing, and what little we do collect is anonymous.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>2. Information We Do NOT Collect</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              We do not collect: your name, email address, or any personal identifiers; the prices or tax rates you enter into the calculator (all computations happen locally in your browser, never on our servers); financial data of any kind; login credentials (there are no accounts).
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>3. Automatically Collected Information</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              Like most websites, our hosting provider may collect standard server logs, including your IP address, browser type, referring URLs, and pages visited. This information is used only for security, uptime monitoring, and aggregate traffic analysis. We do not use this data to identify individuals.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>4. Cookies</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              We do not use first-party cookies to track you. We use Google AdSense to display advertisements, which may set its own cookies for ad personalization. You can opt out of personalized ads via Google&apos;s Ad Settings at adssettings.google.com. We also use Google Analytics (anonymized) to understand aggregate usage patterns.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>5. Google AdSense</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              This site participates in the Google AdSense program. Google may use cookies and similar technologies to serve ads based on your prior visits to this and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and other sites on the Internet. You may opt out of personalized advertising by visiting Google&apos;s Ads Settings.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>6. Ezoic Services and Advertising</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              This website uses the services of Ezoic Inc. (&ldquo;Ezoic&rdquo;) to manage third-party interest-based advertising and features. Ezoic and its advertising partners may use cookies, web beacons, and tracking technologies to collect anonymous usage data for ad personalization, optimization, and analytics. For more information regarding Ezoic&apos;s data collection and privacy practices, please review the{' '}
              <a
                href="https://www.ezoic.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary)', textDecoration: 'underline' }}
              >
                Ezoic Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>7. Third-Party Links</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              Our website may contain links to third-party websites (state tax authority sites, related tools, etc.). We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>8. Children&apos;s Privacy</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>9. Changes to This Policy</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              We may update this Privacy Policy from time to time. We will indicate the date of the last update at the top of this page. Your continued use of the site after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>10. Contact</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              If you have questions about this Privacy Policy, please contact us at salestaxreversecalculator@gmail.com — we typically respond within 1–2 business days.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

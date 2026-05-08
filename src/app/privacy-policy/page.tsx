import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — ReverseTax Calculator',
  description: 'Privacy policy for ReverseTax Calculator. We collect no personal data — all calculations are performed locally in your browser.',
  alternates: { canonical: 'https://reversetaxcalculator.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  const updated = 'January 1, 2024';
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

        {[
          {
            title: '1. Overview',
            body: 'ReverseTax Calculator ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy describes how we handle information when you visit reversetaxcalculator.com. The short version: we collect almost nothing, and what little we do collect is anonymous.',
          },
          {
            title: '2. Information We Do NOT Collect',
            body: 'We do not collect: your name, email address, or any personal identifiers; the prices or tax rates you enter into the calculator (all computations happen locally in your browser, never on our servers); financial data of any kind; login credentials (there are no accounts).',
          },
          {
            title: '3. Automatically Collected Information',
            body: 'Like most websites, our hosting provider may collect standard server logs, including your IP address, browser type, referring URLs, and pages visited. This information is used only for security, uptime monitoring, and aggregate traffic analysis. We do not use this data to identify individuals.',
          },
          {
            title: '4. Cookies',
            body: 'We do not use first-party cookies to track you. We use Google AdSense to display advertisements, which may set its own cookies for ad personalization. You can opt out of personalized ads via Google\'s Ad Settings at adssettings.google.com. We also use Google Analytics (anonymized) to understand aggregate usage patterns.',
          },
          {
            title: '5. Google AdSense',
            body: 'This site participates in the Google AdSense program. Google may use cookies and similar technologies to serve ads based on your prior visits to this and other websites. Google\'s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and other sites on the Internet. You may opt out of personalized advertising by visiting Google\'s Ads Settings.',
          },
          {
            title: '6. Third-Party Links',
            body: 'Our website may contain links to third-party websites (state tax authority sites, related tools, etc.). We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies before providing any personal information.',
          },
          {
            title: '7. Children\'s Privacy',
            body: 'Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.',
          },
          {
            title: '8. Changes to This Policy',
            body: 'We may update this Privacy Policy from time to time. We will indicate the date of the last update at the top of this page. Your continued use of the site after any changes constitutes your acceptance of the updated policy.',
          },
          {
            title: '9. Contact',
            body: 'If you have questions about this Privacy Policy, please contact us through our website\'s contact page.',
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

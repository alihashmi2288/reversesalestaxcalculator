import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sales Tax FAQ: Answers to Reverse Tax & Rate Questions',
  description: 'Answers to common questions about reverse sales tax calculations, formulas, US state tax rates, Canada GST/HST, and VAT removal.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/faq' },
  openGraph: {
    title: 'Sales Tax FAQ: Answers to Reverse Tax & Rate Questions',
    description: 'Answers to common questions about reverse sales tax calculations, formulas, US state tax rates, Canada GST/HST, and VAT removal.',
    url: 'https://salestaxreversecalculator.com/faq',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Sales Tax FAQ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Tax FAQ: Answers to Reverse Tax & Rate Questions',
    description: 'Answers to common questions about reverse sales tax calculations, formulas, US state tax rates, Canada GST/HST, and VAT removal.',
  },
};

const SITE_URL = 'https://salestaxreversecalculator.com';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` },
  ],
};

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a reverse sales tax calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A reverse sales tax calculator works backwards from the total price you paid (including tax) to find the original pre-tax price. Instead of adding tax onto a price, it removes the tax using division: Original Price = Final Price / (1 + Tax Rate / 100).'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the formula for reverse sales tax?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The reverse sales tax formula is: Original Price = Final Price / (1 + Tax Rate / 100). For example, if you paid $107.50 with a 7.5% tax rate: $107.50 / 1.075 = $100.00 pre-tax price. The tax paid is $7.50.'
      }
    },
    {
      '@type': 'Question',
      name: 'Why do you divide instead of just subtracting the tax percentage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Because sales tax is calculated on the pre-tax price, not the final total. If you subtract 7.5% from $107.50, you get $99.44, which is mathematically incorrect. Division is the exact mathematical inverse of the original multiplication ($107.50 / 1.075 = $100.00).'
      }
    },
    {
      '@type': 'Question',
      name: 'Which US states have no sales tax?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Five US states have no statewide general sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. Localities in Alaska can levy local taxes, while Delaware, Montana, New Hampshire, and Oregon have 0% statewide and local sales tax on general goods.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the difference between sales tax and VAT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'US sales tax is assessed at the final retail point of sale, whereas VAT (Value Added Tax) is assessed at each supply chain stage. Despite this structural difference, the reverse calculation formula is identical: Net Price = Gross Price / (1 + Rate / 100).'
      }
    },
    {
      '@type': 'Question',
      name: 'Is this reverse tax calculator free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our reverse sales tax calculator is 100% free with no registration or download required. All calculations run client-side in your browser for complete data privacy.'
      }
    }
  ]
};

export default function FAQPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />

      <section style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a8a)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container-main">
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 560, margin: '0 auto' }}>
            Everything you need to know about reverse sales tax calculations, state rates, and VAT.
          </p>
        </div>
      </section>

      <div className="container-main" style={{ marginTop: 16 }}>
        <AdSlot slot="faq-leaderboard" size="leaderboard" label="Leaderboard" />
      </div>

      <div className="container-main" style={{ marginTop: 48, marginBottom: 80 }}>
        <nav style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 48 }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>FAQ</span>
        </nav>
        <FAQSection />
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/" style={{ background: 'var(--primary)', color: '#000', border: '2px solid #000', boxShadow: '3px 3px 0px 0px #000', padding: '16px 40px', borderRadius: 'var(--radius)', fontWeight: 800, fontSize: 16, textDecoration: 'none', display: 'inline-block', textTransform: 'uppercase' }}>
            Use the Calculator →
          </Link>
        </div>
      </div>
    </main>
  );
}

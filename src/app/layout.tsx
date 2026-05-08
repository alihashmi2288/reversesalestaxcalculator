import type { Metadata } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const SITE_URL = 'https://reversetaxcalculator.com';
const SITE_NAME = 'ReverseTax Calculator';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Reverse Sales Tax Calculator — Calculate Original Price Before Tax | Free',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Free reverse sales tax calculator. Enter your total price and tax rate to instantly find the original price before tax. Works for US, Canada & worldwide. No signup.',
  keywords: [
    'reverse sales tax calculator',
    'calculate original price before tax',
    'remove tax from price',
    'pre-tax price calculator',
    'sales tax reverse calculation',
    'how to calculate tax backwards',
    'US state sales tax',
    'reverse VAT calculator',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: 'Reverse Sales Tax Calculator — Free & Instant',
    description: 'Calculate the original price before tax instantly. Free, no signup, works for all US states, Canada, and worldwide.',
    url: SITE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Reverse Sales Tax Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Sales Tax Calculator — Free & Instant',
    description: 'Calculate pre-tax price from any total. Supports all US states, Canada GST/HST, and European VAT.',
    images: ['/og-image.png'],
  },
};

// JSON-LD Schemas
const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Reverse Sales Tax Calculator',
  url: SITE_URL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online reverse sales tax calculator. Calculate the original pre-tax price from any total amount including tax.',
  featureList: [
    'Reverse sales tax calculation',
    'US state tax rate database',
    'Multiple items calculator',
    'Tax rate finder',
    'Batch processing with CSV export',
    'Canada GST/HST calculator',
    'European VAT calculator',
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate the Original Price Before Sales Tax',
  description: 'Use a reverse sales tax calculator to find the pre-tax price from a total amount.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter the Total Price', text: 'Type in the full amount you paid including tax (the price on your receipt).' },
    { '@type': 'HowToStep', position: 2, name: 'Select the Tax Rate', text: 'Choose your US state from the dropdown for the combined rate, or enter a custom rate.' },
    { '@type': 'HowToStep', position: 3, name: 'Get Your Results', text: 'Click Calculate to instantly see the original pre-tax price, tax amount, and a full breakdown.' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a reverse sales tax calculator?', acceptedAnswer: { '@type': 'Answer', text: 'A reverse sales tax calculator works backwards from the total price you paid (including tax) to find the original pre-tax price.' } },
    { '@type': 'Question', name: 'How do I calculate the original price before tax?', acceptedAnswer: { '@type': 'Answer', text: 'Use the formula: Original Price = Final Price ÷ (1 + Tax Rate/100). For example, $107.50 ÷ 1.075 = $100.00.' } },
    { '@type': 'Question', name: 'Which US states have no sales tax?', acceptedAnswer: { '@type': 'Answer', text: 'Five states have no sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon.' } },
    { '@type': 'Question', name: 'Can I use this for VAT calculations?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Enter the VAT-inclusive price and VAT rate (e.g. 20% UK) to find the ex-VAT price.' } },
    { '@type': 'Question', name: 'What is the average US sales tax rate?', acceptedAnswer: { '@type': 'Answer', text: 'The average combined US sales tax rate is approximately 7.12% as of 2024, ranging from 0% to over 9.5%.' } },
    { '@type': 'Question', name: 'How is sales tax calculated in the US?', acceptedAnswer: { '@type': 'Answer', text: 'Sales tax = pre-tax price × (tax rate / 100). Total = pre-tax price + sales tax. Rates vary by state, county, and city.' } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#09090b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.04]"></div>
        <div className="grid-bg pointer-events-none fixed inset-0 z-[-1]"></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

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

const SITE_URL = 'https://salestaxreversecalculator.com';
const SITE_NAME = 'Reverse Sales Tax Calculator';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Reverse Sales Tax Calculator — Calculate Original Price Before Tax | Free',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Free reverse sales tax calculator. Enter your total price and tax rate to instantly find the original price before tax. Works for US, Canada & worldwide. No signup.',
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
    { '@type': 'Question', name: 'What is a reverse sales tax calculator?', acceptedAnswer: { '@type': 'Answer', text: 'A reverse sales tax calculator works backwards from the total price you paid (including tax) to find the original pre-tax price. Instead of adding tax to a price, it removes the tax to reveal what the item cost before tax was applied.' } },
    { '@type': 'Question', name: 'What is the formula for reverse sales tax?', acceptedAnswer: { '@type': 'Answer', text: 'The formula is: Original Price = Final Price ÷ (1 + Tax Rate / 100). For example, if you paid $107.50 and the tax rate is 7.5%, the calculation is $107.50 ÷ 1.075 = $100.00 pre-tax price. The tax paid was $7.50.' } },
    { '@type': 'Question', name: 'Why do you divide instead of just subtracting the tax percentage?', acceptedAnswer: { '@type': 'Answer', text: 'Because sales tax is applied to the pre-tax price, not the final total. Division is the exact mathematical inverse of the multiplication used in the original tax calculation.' } },
    { '@type': 'Question', name: 'Which US states have no sales tax?', acceptedAnswer: { '@type': 'Answer', text: 'Five US states have no state-level sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. Some localities within Alaska do charge local sales taxes, giving a small combined average of 1.76%.' } },
    { '@type': 'Question', name: 'Which state has the highest combined sales tax rate?', acceptedAnswer: { '@type': 'Answer', text: 'Louisiana and Tennessee are tied for the highest combined average sales tax rate at 9.55%, followed by Arkansas (9.49%), Alabama (9.29%), and Oklahoma (8.99%).' } },
    { '@type': 'Question', name: 'What is the average US combined sales tax rate?', acceptedAnswer: { '@type': 'Answer', text: 'The average combined US sales tax rate (state base plus average local) is approximately 7.53% as of 2026, according to the Tax Foundation.' } },
    { '@type': 'Question', name: 'Can I use this calculator for VAT calculations?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The UK standard VAT rate is 20% — divide your VAT-inclusive price by 1.20. The formula is identical to US sales tax: Pre-tax price = Total ÷ (1 + rate/100).' } },
    { '@type': 'Question', name: 'Can I use this for Canadian GST/HST?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Visit our Canada calculator page for a dedicated tool with current GST (5%), HST rates by province, and Quebec QST (9.975%). Ontario HST is 13%: divide your total by 1.13.' } },
    { '@type': 'Question', name: 'How do businesses use reverse sales tax calculations?', acceptedAnswer: { '@type': 'Answer', text: 'Businesses use reverse tax calculations for expense reporting, vendor invoice verification, financial statement preparation, input tax credit claims, and sales tax audit support.' } },
    { '@type': 'Question', name: 'Does sales tax apply to food and groceries?', acceptedAnswer: { '@type': 'Answer', text: 'Most states exempt unprepared groceries from sales tax. However, Alabama, Mississippi, and South Dakota tax groceries at the full rate. Prepared hot foods and restaurant meals are typically taxable even in states that exempt grocery staples.' } },
    { '@type': 'Question', name: 'Does sales tax apply to online purchases?', acceptedAnswer: { '@type': 'Answer', text: 'After the 2018 Supreme Court ruling in South Dakota v. Wayfair, online retailers are required to collect sales tax if they meet economic nexus thresholds. Most large online purchases are now subject to your local sales tax rate.' } },
    { '@type': 'Question', name: 'Is this calculator free to use?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free with no account registration required. All calculations run entirely in your browser — no data is sent to our servers.' } },
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
        {/* Geo & Language signals for Google */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="English" />
        <meta httpEquiv="content-language" content="en-US" />
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

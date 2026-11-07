import type { Metadata } from 'next';
import { Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import HashScrollHandler from '@/components/HashScrollHandler';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  adjustFontFallback: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  adjustFontFallback: true,
});

const SITE_URL = 'https://salestaxreversecalculator.com';
const SITE_NAME = 'Reverse Sales Tax Calculator';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Reverse Sales Tax Calculator: Find Pre-Tax Price Free',
    template: '%s',
  },
  description:
    'Free reverse sales tax calculator. Find the pre-tax price from any receipt total instantly. Supports all 50 US states, Canada GST/HST, and VAT.',
  authors: [{ name: 'Reverse Sales Tax Calculator by PreTaxPrice' }],
  creator: 'Reverse Sales Tax Calculator',
  publisher: 'Reverse Sales Tax Calculator',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: { 
    canonical: SITE_URL,
    languages: {
      'x-default': SITE_URL,
      'en-US': SITE_URL,
      'en-CA': `${SITE_URL}/canada`,
      'en-GB': `${SITE_URL}/vat-calculator`,
    },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: 'Reverse Sales Tax Calculator: Find Pre-Tax Price Free',
    description: 'Free reverse sales tax calculator. Find the pre-tax price from any receipt total instantly. Supports all 50 US states, Canada GST/HST, and VAT.',
    url: SITE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Reverse Sales Tax Calculator and Pre-tax Price Finder Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Sales Tax Calculator: Find Pre-Tax Price Free',
    description: 'Free reverse sales tax calculator. Find the pre-tax price from any receipt total instantly. Supports all 50 US states, Canada GST/HST, and VAT.',
    images: ['/og-image.png'],
    site: '@PreTaxPrice',
    creator: '@PreTaxPrice',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  other: {
    'geo.region': 'US',
    'geo.placename': 'United States',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#008254',
};

// JSON-LD Schemas
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Reverse Sales Tax Calculator',
  alternateName: 'PreTaxPrice',
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  sameAs: [
    'https://www.instagram.com/pretaxprice/',
    'https://x.com/PreTaxPrice',
    'https://www.linkedin.com/company/pretaxprice/',
    'https://www.facebook.com/pretaxprice/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    'email': 'salestaxreversecalculator@gmail.com',
    'contactType': 'customer service',
    'url': `${SITE_URL}/contact`
  }
};

const speculationRules = {
  prefetch: [
    {
      source: 'list',
      urls: [
        '/us/california',
        '/us/texas',
        '/us/new-york',
        '/us/florida',
        '/us/pennsylvania',
        '/us/illinois',
        '/canada',
        '/vat-calculator',
        '/tax-rates',
      ],
      eagerness: 'moderate',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${montserrat.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(speculationRules) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--primary)] focus:text-white focus:rounded-[var(--radius-xs)] focus:font-bold focus:shadow-md focus-visible:outline-2 focus-visible:outline-[var(--forest)] focus-visible:outline-offset-2"
          style={{ color: '#ffffff', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
        >
          Skip to main content
        </a>
        <HashScrollHandler />
        {children}
      </body>
    </html>
  );
}

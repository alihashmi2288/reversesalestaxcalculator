import type { Metadata } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
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
  authors: [{ name: 'PreTaxPrice' }],
  creator: 'PreTaxPrice',
  publisher: 'PreTaxPrice',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: { 
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
      'en-CA': `${SITE_URL}/canada`,
      'en-GB': `${SITE_URL}/vat-calculator`,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'PreTaxPrice',
    title: 'Reverse Sales Tax Calculator — Free & Instant',
    description: 'Calculate the original price before tax instantly. Free, no signup, works for all US states, Canada, and worldwide.',
    url: SITE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Reverse Sales Tax Calculator and Pre-tax Price Finder Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Sales Tax Calculator — Free & Instant',
    description: 'Calculate pre-tax price from any total. Supports all US states, Canada GST/HST, and European VAT.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  other: {
    'geo.region': 'US',
    'geo.placename': 'United States',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// JSON-LD Schemas
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PreTaxPrice',
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    'email': 'salestaxreversecalculator@gmail.com',
    'contactType': 'customer service'
  }
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MVWDKTE5V4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MVWDKTE5V4');
          `}
        </Script>
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

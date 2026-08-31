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
    default: 'Reverse Sales Tax Calculator: Find Your Pre-Tax Price Free',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Free reverse sales tax calculator. Enter any receipt total and find the original pre-tax price instantly. Works for all 50 US states, Canada GST/HST, and EU VAT. No signup.',
  authors: [{ name: 'PreTaxPrice' }],
  creator: 'PreTaxPrice',
  publisher: 'PreTaxPrice',
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
      'en-US': SITE_URL,
      'en-CA': `${SITE_URL}/canada`,
      'en-GB': `${SITE_URL}/vat-calculator`,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'PreTaxPrice',
    title: 'Reverse Sales Tax Calculator: Find Your Pre-Tax Price Free',
    description: 'Free reverse sales tax calculator. Enter any receipt total and find the original pre-tax price instantly. Works for all 50 US states, Canada GST/HST, and EU VAT. No signup.',
    url: SITE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Reverse Sales Tax Calculator and Pre-tax Price Finder Tool' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Sales Tax Calculator: Find Your Pre-Tax Price Free',
    description: 'Free reverse sales tax calculator. Enter any receipt total and find the original pre-tax price instantly. Works for all 50 US states, Canada GST/HST, and EU VAT. No signup.',
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
  maximumScale: 5,
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
    'contactType': 'customer service',
    'url': `${SITE_URL}/contact`
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MVWDKTE5V4"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MVWDKTE5V4');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y4hti2qol5");
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

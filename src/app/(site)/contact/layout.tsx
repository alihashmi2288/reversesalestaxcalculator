import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Contact Us — Sales Tax Reverse Calculator' },
  description: 'Get in touch with the Sales Tax Reverse Calculator team. Report a rate update, suggest a feature, or ask a question. We respond to every message.',
  alternates: { canonical: 'https://salestaxreversecalculator.com/contact' },
  openGraph: {
    title: 'Contact Us — Sales Tax Reverse Calculator',
    description: 'Get in touch with the Sales Tax Reverse Calculator team. We respond to every message.',
    url: 'https://salestaxreversecalculator.com/contact',
    images: [{ url: 'https://salestaxreversecalculator.com/og-image.png', width: 1200, height: 630, alt: 'Contact Sales Tax Reverse Calculator' }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

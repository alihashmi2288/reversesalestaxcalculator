import type { Metadata } from 'next';
import EmbedCalculator from '@/components/calculator/EmbedCalculator';

export const metadata: Metadata = {
  title: 'Reverse Sales Tax Calculator Widget',
  description: 'Embeddable reverse sales tax calculator widget to calculate pre-tax price.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function EmbedPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        padding: '8px 0',
      }}
    >
      <EmbedCalculator />
    </main>
  );
}

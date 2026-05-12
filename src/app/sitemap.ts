import { MetadataRoute } from 'next';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';

const SITE_URL = 'https://salestaxreversecalculator.com';
const LAST_MODIFIED = new Date('2026-05-12'); // Rebranding and UI cleanup update

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/tax-rates',
    '/how-it-works',
    '/faq',
    '/vat-calculator',
    '/canada',
    '/about',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => {
    const isFrequent = route === '' || route === '/tax-rates' || route === '/canada' || route === '/vat-calculator';
    
    return {
      url: `${SITE_URL}${route}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: isFrequent ? ('monthly' as const) : ('yearly' as const),
      priority: route === '' ? 1.0 : isFrequent ? 0.9 : 0.5,
    };
  });

  const stateRoutes = STATE_TAX_RATES.map((state) => {
    const slug = state.state.toLowerCase().replace(/\s+/g, '-');
    return {
      url: `${SITE_URL}/us/${slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...stateRoutes];
}


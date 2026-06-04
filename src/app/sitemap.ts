import { MetadataRoute } from 'next';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';
import { CANADA_PROV_TAX_RATES } from '@/data/canadaTaxRates';
import { VAT_COUNTRY_RATES } from '@/data/vatTaxRates';

const SITE_URL = 'https://salestaxreversecalculator.com';
const LAST_MODIFIED = new Date('2026-06-04'); // Rebranding and UI cleanup update

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

  const canadaRoutes = CANADA_PROV_TAX_RATES.map((prov) => {
    return {
      url: `${SITE_URL}/canada/${prov.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  const vatRoutes = VAT_COUNTRY_RATES.map((country) => {
    return {
      url: `${SITE_URL}/vat-calculator/${country.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...stateRoutes, ...canadaRoutes, ...vatRoutes];
}


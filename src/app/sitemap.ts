import { MetadataRoute } from 'next';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';
import { CANADA_PROV_TAX_RATES } from '@/data/canadaTaxRates';
import { VAT_COUNTRY_RATES } from '@/data/vatTaxRates';

const SITE_URL = 'https://salestaxreversecalculator.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Tier 1: Homepage (Priority: 1.0, Changefreq: daily)
  const homeRoute: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Tier 2: Core Calculators & Tax Hubs (Priority: 0.9, Changefreq: weekly)
  const coreHubRoutes: MetadataRoute.Sitemap = [
    '/tax-rates',
    '/canada',
    '/vat-calculator',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Tier 4: All 51 US State Pages (Priority: 0.8, Changefreq: weekly)
  const stateRoutes: MetadataRoute.Sitemap = STATE_TAX_RATES.map((state) => {
    const slug = state.state.toLowerCase().replace(/\s+/g, '-');
    return {
      url: `${SITE_URL}/us/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  // Tier 5: All 13 Canadian Province Pages (Priority: 0.8, Changefreq: weekly)
  const canadaRoutes: MetadataRoute.Sitemap = CANADA_PROV_TAX_RATES.map((prov) => ({
    url: `${SITE_URL}/canada/${prov.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Tier 6: All 7 VAT Country Pages (Priority: 0.8, Changefreq: weekly)
  const vatRoutes: MetadataRoute.Sitemap = VAT_COUNTRY_RATES.map((country) => ({
    url: `${SITE_URL}/vat-calculator/${country.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Tier 7: Educational Guides & FAQ (Priority: 0.8, Changefreq: weekly)
  const educationalRoutes: MetadataRoute.Sitemap = [
    '/how-it-works',
    '/faq',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Tier 8: Informational & Legal Pages (Priority: 0.5, Changefreq: monthly)
  const infoRoutes: MetadataRoute.Sitemap = [
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [
    ...homeRoute,
    ...coreHubRoutes,
    ...stateRoutes,
    ...canadaRoutes,
    ...vatRoutes,
    ...educationalRoutes,
    ...infoRoutes,
  ];
}


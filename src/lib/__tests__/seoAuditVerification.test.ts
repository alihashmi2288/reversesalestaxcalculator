import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';
import { CANADA_PROV_TAX_RATES } from '@/data/canadaTaxRates';
import { generateMetadata as generateStateMetadata } from '@/app/(site)/us/[state]/page';
import fs from 'node:fs';
import path from 'node:path';

describe('SEO Audit Verification Tests', () => {
  test('all 51 US states generate standardized concise titles under 58 characters', async () => {
    for (const state of STATE_TAX_RATES) {
      const slug = state.state.toLowerCase().replace(/\s+/g, '-');
      const meta = await generateStateMetadata({ params: Promise.resolve({ state: slug }) });
      const title = String(meta.title || '');
      const description = String(meta.description || '');

      assert.ok(
        title.includes('Reverse Sales Tax Calculator'),
        `State ${state.state} title missing core head phrase: ${title}`
      );
      assert.ok(
        title.length <= 58,
        `State ${state.state} title (${title.length} chars) exceeds 58-character mobile SERP limit: "${title}"`
      );
      assert.ok(
        description.length <= 160,
        `State ${state.state} description (${description.length} chars) exceeds 160-character SERP limit: "${description}"`
      );

      if (state.rate === 0) {
        assert.ok(title.includes('(0% Tax-Free)'), `Zero-tax state ${state.state} must have (0% Tax-Free): ${title}`);
      }
    }
  });

  test('top 7 customized states (NY, CT, TX, CA, FL, AZ, SC) have standardized concise metadata and H1s under 58 chars', () => {
    const pageContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/page.tsx'), 'utf-8');

    // Check titles in generateMetadata overrides (<58 chars)
    assert.ok(
      pageContent.includes("title = 'New York Reverse Sales Tax Calculator (NYC 8.875%)'"),
      'New York title must be concise and highlight NYC 8.875%'
    );
    assert.ok(
      pageContent.includes("title = 'Connecticut Reverse Sales Tax Calculator (6.35%)'"),
      'Connecticut title must be concise'
    );
    assert.ok(
      pageContent.includes("title = 'Texas Reverse Sales Tax Calculator (8.25%)'"),
      'Texas title must be concise'
    );
    assert.ok(
      pageContent.includes("title = 'Florida Reverse Sales Tax Calculator (7.13%)'"),
      'Florida title must be concise'
    );
    assert.ok(
      pageContent.includes("title = 'California Reverse Sales Tax Calculator (8.85%)'"),
      'California title must be concise'
    );
    assert.ok(
      pageContent.includes("title = 'Arizona Reverse Sales Tax Calculator (8.51%)'"),
      'Arizona title must be concise'
    );
    assert.ok(
      pageContent.includes("title = 'South Carolina Reverse Sales Tax Calculator (7.51%)'"),
      'South Carolina title must be concise'
    );

    // Check H1s in custom components
    const nyContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/NewYorkPage.tsx'), 'utf-8');
    assert.ok(
      nyContent.includes('New York Reverse Sales Tax Calculator (NYC 8.875%)'),
      'NewYorkPage.tsx H1 must be standardized'
    );

    const ctContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/ConnecticutPage.tsx'), 'utf-8');
    assert.ok(
      ctContent.includes('Connecticut Reverse Sales Tax Calculator (6.35%)'),
      'ConnecticutPage.tsx H1 must be standardized'
    );

    const txContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/TexasPage.tsx'), 'utf-8');
    assert.ok(
      txContent.includes('Texas Reverse Sales Tax Calculator (8.25%)'),
      'TexasPage.tsx H1 must be standardized'
    );

    const caContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/CaliforniaPage.tsx'), 'utf-8');
    assert.ok(
      caContent.includes('California Reverse Sales Tax Calculator (8.85%)'),
      'CaliforniaPage.tsx H1 must be standardized'
    );
    assert.ok(
      caContent.includes("item: 'https://salestaxreversecalculator.com/tax-rates'"),
      'CaliforniaPage.tsx breadcrumb item 2 must link directly to /tax-rates without redirect hop'
    );

    const flContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/FloridaPage.tsx'), 'utf-8');
    assert.ok(
      flContent.includes('Florida Reverse Sales Tax Calculator (7.13%)'),
      'FloridaPage.tsx H1 must be standardized'
    );

    const azContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/ArizonaPage.tsx'), 'utf-8');
    assert.ok(
      azContent.includes('Arizona Reverse Sales Tax Calculator (8.51%)'),
      'ArizonaPage.tsx H1 must be standardized'
    );

    const scContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/SouthCarolinaPage.tsx'), 'utf-8');
    assert.ok(
      scContent.includes('South Carolina Reverse Sales Tax Calculator (7.51%)'),
      'South Carolina title must be standardized'
    );
  });

  test('custom state pages have synchronized bidirectional WebApplication structured data schemas', () => {
    const states = [
      { file: 'ConnecticutPage.tsx', name: 'Connecticut Sales Tax Calculator (Forward & Reverse 2026)' },
      { file: 'NewYorkPage.tsx', name: 'New York Sales Tax Calculator (Forward & Reverse 2026)' },
      { file: 'TexasPage.tsx', name: 'Texas Sales Tax Calculator (Forward & Reverse 2026)' },
      { file: 'FloridaPage.tsx', name: 'Florida Sales Tax Calculator (Forward & Reverse 2026)' },
      { file: 'ArizonaPage.tsx', name: 'Arizona Sales Tax Calculator (Forward & Reverse 2026)' },
      { file: 'SouthCarolinaPage.tsx', name: 'South Carolina Sales Tax Calculator (Forward & Reverse 2026)' },
    ];

    for (const { file, name } of states) {
      const content = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]', file), 'utf-8');
      assert.ok(
        content.includes(`name: '${name}'`) || content.includes(`"name": "${name}"`),
        `${file} WebApplication schema must have name "${name}"`
      );
    }
  });

  test('zero-tax state hero badges in generic state template show NO STATE SALES TAX (0%)', () => {
    const pageContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/page.tsx'), 'utf-8');
    assert.ok(
      pageContent.includes("stateData.rate > 0 ? `PRE-FILLED COMBINED RATE: ${stateData.rate}%` : 'NO STATE SALES TAX (0%)'"),
      'page.tsx must conditionally display NO STATE SALES TAX (0%) for zero-tax states'
    );
  });

  test('all 13 Canadian provinces use CRA statutory nomenclature (HST, GST/QST, GST/PST, GST) and include ITC reconciliation', () => {
    const provPageContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/canada/[province]/page.tsx'), 'utf-8');
    assert.ok(
      provPageContent.includes('Reverse ${taxLabel} Calculator 2026: Back Out'),
      'Canada [province] page must use dynamic CRA tax label in title and H1'
    );
    assert.ok(
      provPageContent.includes('Input Tax Credit (ITC) Reconciliation'),
      'Canada [province] page must contain dedicated Input Tax Credit (ITC) section'
    );

    // Validate CRA data structure across all provinces
    for (const prov of CANADA_PROV_TAX_RATES) {
      assert.ok(prov.itcGuide, `${prov.name} must have itcGuide data`);
      assert.ok(prov.itcGuide.eligibleTax, `${prov.name} itcGuide must specify eligibleTax`);
      assert.ok(prov.itcGuide.rules.length > 0, `${prov.name} itcGuide must specify rules`);
    }
  });

  test('all 13 Canadian provinces and territories are linked from /canada (zero orphan pages)', () => {
    const canadaPageContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/canada/page.tsx'), 'utf-8');
    assert.strictEqual(CANADA_PROV_TAX_RATES.length, 13, 'Must contain all 13 Canadian provinces and territories');
    assert.ok(
      canadaPageContent.includes('CANADA_PROV_TAX_RATES.map') && canadaPageContent.includes('href={`/canada/${prov.slug}`'),
      '/canada page must dynamically map and link all 13 provinces via CANADA_PROV_TAX_RATES to eliminate orphan pages'
    );
  });

  test('no internal links in src point to standalone /faq or /how-it-works (must use /#faq or /#how-it-works)', () => {
    const srcDir = path.resolve(process.cwd(), 'src');
    const checkDir = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          checkDir(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const invalidLinkRegex = /href=['"]\/(faq|how-it-works)['"]/g;
          const match = invalidLinkRegex.exec(content);
          assert.strictEqual(
            match,
            null,
            `File ${fullPath} contains deprecated internal link ${match ? match[0] : ''}. Must be /#faq or /#how-it-works`
          );
        }
      }
    };
    checkDir(srcDir);
  });

  test('vercel.json and next.config.ts define permanent 301 redirects for /faq and /how-it-works', () => {
    const vercelConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'vercel.json'), 'utf-8'));
    const redirects = vercelConfig.redirects || [];
    const faqRedirect = redirects.find((r: { source: string }) => r.source === '/faq');
    const howItWorksRedirect = redirects.find((r: { source: string }) => r.source === '/how-it-works');

    assert.ok(faqRedirect, 'vercel.json must define /faq redirect');
    assert.strictEqual(faqRedirect.destination, '/#faq');
    assert.strictEqual(faqRedirect.permanent, true);

    assert.ok(howItWorksRedirect, 'vercel.json must define /how-it-works redirect');
    assert.strictEqual(howItWorksRedirect.destination, '/#how-it-works');
    assert.strictEqual(howItWorksRedirect.permanent, true);
  });

  test('FAQSection and HomePage include Worked Math & Word Problems for high-impression GSC queries', () => {
    const faqContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/FAQSection.tsx'), 'utf-8');
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/page.tsx'), 'utf-8');

    assert.ok(
      faqContent.includes('Word Problems & Worked Math Examples'),
      'FAQSection must include dedicated Word Problems category'
    );
    assert.ok(
      faqContent.includes('$176') && faqContent.includes('6%'),
      'FAQSection must address the high-intent $176 at 6% shopping word problem'
    );
    assert.ok(
      faqContent.includes('$100') && faqContent.includes('8.875%'),
      'FAQSection must address the NYC 8.875% $100 purchase word problem'
    );
    assert.ok(
      homeContent.includes('How Our Reverse Tax Calculator Works'),
      'HomePage must use optimized H2 "How Our Reverse Tax Calculator Works" to target head keyword'
    );
    assert.ok(
      homeContent.includes('Pre-Tax Price = Receipt Total ÷ (1 + Tax Rate)'),
      'HomePage must prominently display the statutory reverse formula card'
    );
  });

  test('next.config.ts defines Content-Security-Policy (CSP) configured for Google AdSense and analytics', () => {
    const nextConfigContent = fs.readFileSync(path.resolve(process.cwd(), 'next.config.ts'), 'utf-8');

    assert.ok(
      nextConfigContent.includes("'Content-Security-Policy'"),
      'next.config.ts must define Content-Security-Policy header'
    );
    assert.ok(
      nextConfigContent.includes('pagead2.googlesyndication.com'),
      'CSP must permit Google AdSense scripts for monetization'
    );
    assert.ok(
      nextConfigContent.includes('googleads.g.doubleclick.net'),
      'CSP must permit Google Ads frames'
    );
  });

  test('utility pages (privacy-policy, terms-of-service, tax-rates, about, contact) have BreadcrumbList schema', () => {
    const pages = [
      'src/app/(site)/privacy-policy/page.tsx',
      'src/app/(site)/terms-of-service/page.tsx',
      'src/app/(site)/tax-rates/page.tsx',
      'src/app/(site)/about/page.tsx',
      'src/app/(site)/contact/page.tsx',
    ];

    for (const pagePath of pages) {
      const content = fs.readFileSync(path.resolve(process.cwd(), pagePath), 'utf-8');
      assert.ok(
        content.includes("'BreadcrumbList'") || content.includes('"BreadcrumbList"'),
        `Page ${pagePath} must contain Schema.org BreadcrumbList structured data`
      );
    }
  });

  test('Navbar does not mutate browser history with bare URL anchor fragments', () => {
    const navbarContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/Navbar.tsx'), 'utf-8');
    assert.ok(
      !navbarContent.includes('pushState(null, \'\', `/#${targetId}`)'),
      'Navbar must not push bare hash fragments into window.history to prevent GSC URL fragmentation'
    );
  });

  test('lateral border-state cross linking connects neighboring states across all 50 states', () => {
    const { STATE_NEIGHBORS, getNeighborStates } = require('@/data/stateNeighbors');
    const stateKeys = Object.keys(STATE_NEIGHBORS);
    assert.ok(stateKeys.length >= 50, 'Must cover all 50 US states');

    // Check specific high-priority border clusters from audit
    const nyNeighbors = getNeighborStates('new-york').map((s: { state: string }) => s.state);
    assert.ok(nyNeighbors.includes('New Jersey') && nyNeighbors.includes('Connecticut'), 'NY must link to NJ and CT');

    const caNeighbors = getNeighborStates('california').map((s: { state: string }) => s.state);
    assert.ok(caNeighbors.includes('Oregon') && caNeighbors.includes('Nevada'), 'CA must link to OR and NV');

    const txNeighbors = getNeighborStates('texas').map((s: { state: string }) => s.state);
    assert.ok(txNeighbors.includes('Louisiana') && txNeighbors.includes('Oklahoma'), 'TX must link to LA and OK');

    const pageContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/page.tsx'), 'utf-8');
    assert.ok(
      pageContent.includes('NeighborStateComparison'),
      'Generic state page must render NeighborStateComparison widget'
    );
  });

  test('HomePage webApplicationSchema includes AggregateRating with ratingValue 4.9 and 128 reviews', () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/page.tsx'), 'utf-8');
    assert.ok(
      homeContent.includes('"@type": "AggregateRating"') || homeContent.includes("'@type': 'AggregateRating'"),
      'HomePage must include AggregateRating schema'
    );
    assert.ok(
      homeContent.includes('"ratingValue": "4.9"') || homeContent.includes("'ratingValue': '4.9'"),
      'HomePage AggregateRating must specify ratingValue 4.9'
    );
    assert.ok(
      homeContent.includes('"reviewCount": "128"') || homeContent.includes("'reviewCount': '128'"),
      'HomePage AggregateRating must specify reviewCount 128'
    );
    assert.ok(
      homeContent.includes('@id') && homeContent.includes('/#webapp'),
      'HomePage WebApplication schema must include stable @id URI'
    );
  });

  test('Hero diagram Image component defines fetchPriority="high" and priority', () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/page.tsx'), 'utf-8');
    assert.ok(
      homeContent.includes('fetchPriority="high"'),
      'Hero diagram image must define fetchPriority="high" for optimal LCP'
    );
    assert.ok(
      homeContent.includes('priority={true}') || homeContent.includes('priority'),
      'Hero diagram image must define priority'
    );
  });

  test('HomePage includes striking-distance core terms and clean howToSchema step URLs', () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/page.tsx'), 'utf-8');
    
    // Striking-distance search query targeting
    assert.ok(
      homeContent.includes('formula to back out sales tax'),
      'HomePage must target "formula to back out sales tax"'
    );
    assert.ok(
      homeContent.includes('before tax calculator'),
      'HomePage must target "before tax calculator"'
    );
    assert.ok(
      homeContent.includes('reverse tax rate calculator'),
      'HomePage must target "reverse tax rate calculator"'
    );
    assert.ok(
      homeContent.includes('how to calculate sales tax backwards from total'),
      'HomePage must target "how to calculate sales tax backwards from total"'
    );

    // howToSchema step URL cleanliness (no fragment leakage into GSC)
    assert.ok(
      !homeContent.includes('url": `${SITE_URL}/#calculator`') && !homeContent.includes("url': `${SITE_URL}/#calculator`"),
      'howToSchema step URLs must not contain #calculator fragment'
    );
    assert.ok(
      !homeContent.includes('url": `${SITE_URL}/#formula`') && !homeContent.includes("url': `${SITE_URL}/#formula`"),
      'howToSchema step URLs must not contain #formula fragment'
    );
  });
});

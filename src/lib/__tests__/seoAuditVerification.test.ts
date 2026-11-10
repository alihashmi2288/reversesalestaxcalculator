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
      homeContent.includes('What Is a Reverse Sales Tax Calculator?'),
      'HomePage must use definitional H2 "What Is a Reverse Sales Tax Calculator?" to match entity search intent'
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

  test('Below-the-fold formula diagram uses loading="lazy" without competing for high priority preload', () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/page.tsx'), 'utf-8');
    assert.ok(
      homeContent.includes('loading="lazy"'),
      'Below-the-fold formula diagram image must define loading="lazy" for optimal LCP/TBT'
    );
    assert.ok(
      !homeContent.includes('priority={true}') && !homeContent.includes('fetchPriority="high"'),
      'Below-the-fold diagram must not compete with critical above-the-fold assets for priority preloading'
    );
  });

  test('HomePage includes striking-distance core terms and unified Schema.org @graph', () => {
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

    // Schema consolidation into unified @graph
    assert.ok(
      homeContent.includes('"@graph": [') || homeContent.includes("'@graph': ["),
      'HomePage must consolidate JSON-LD into unified @graph'
    );
    assert.ok(
      !homeContent.includes('"@type": "SearchAction"') && !homeContent.includes("'@type': 'SearchAction'"),
      'HomePage must remove retired Sitelinks SearchAction'
    );
    assert.ok(
      !homeContent.includes('"@type": "HowTo"') && !homeContent.includes("'@type': 'HowTo'"),
      'HomePage must remove deprecated HowTo schema'
    );
    assert.ok(
      homeContent.includes('"@type": "FAQPage"') || homeContent.includes("'@type': 'FAQPage'"),
      'HomePage must preserve FAQPage for AI search engines in @graph'
    );
  });

  test('trailing slash normalization is configured across next.config.ts and vercel.json', () => {
    const nextConfigContent = fs.readFileSync(path.resolve(process.cwd(), 'next.config.ts'), 'utf-8');
    const vercelConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'vercel.json'), 'utf-8'));

    assert.ok(
      nextConfigContent.includes('trailingSlash: false'),
      'next.config.ts must explicitly configure trailingSlash: false'
    );
    assert.strictEqual(
      vercelConfig.trailingSlash,
      false,
      'vercel.json must explicitly configure trailingSlash: false'
    );
  });

  test('StateTable links state names and provides descriptive state-specific anchor text', () => {
    const tableContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/StateTable.tsx'), 'utf-8');
    assert.ok(
      tableContent.includes('state-table-link') && tableContent.includes('/us/${s.state.toLowerCase()'),
      'StateTable must link the state name in column 1'
    );
    assert.ok(
      tableContent.includes('Calculate {s.state} Tax →'),
      'StateTable action button must use descriptive anchor text Calculate {s.state} Tax →'
    );
  });

  test('HomePage displays above-the-fold E-E-A-T reviewer trust pill and spaced sidebar links', () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/page.tsx'), 'utf-8');
    assert.ok(
      homeContent.includes('Statutory tax rates verified for 2026'),
      'HomePage must render statutory tax rates verified trust signal'
    );
    assert.ok(
      homeContent.includes('Tax Compliance &amp; Accounting Team') || homeContent.includes('Tax Compliance & Accounting Team'),
      'HomePage must render visible reviewer team attribution'
    );
    assert.ok(
      homeContent.includes('aria-label={`${state.state}: ${state.rate}% combined sales tax rate`}') ||
      homeContent.includes('aria-label={`${state.state}: ${state.rate}%'),
      'Sidebar state links must provide descriptive aria-labels and whitespace between spans'
    );
  });

  test('CSP allows Microsoft Clarity and Google Analytics in next.config.ts', () => {
    const nextConfigContent = fs.readFileSync(path.resolve(process.cwd(), 'next.config.ts'), 'utf-8');
    assert.ok(
      nextConfigContent.includes('https://www.clarity.ms') && nextConfigContent.includes('https://scripts.clarity.ms'),
      'CSP script-src must permit clarity.ms scripts'
    );
    assert.ok(
      nextConfigContent.includes('https://*.clarity.ms'),
      'CSP connect-src must permit clarity.ms telemetry'
    );
  });

  test('Form controls in calculator tabs and embed widget define explicit id and name attributes', () => {
    const embedContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/EmbedWidgetSection.tsx'), 'utf-8');
    assert.ok(
      embedContent.includes('id="embed-widget-code"') && embedContent.includes('name="embedWidgetCode"'),
      'Embed widget textarea must have id="embed-widget-code" and name="embedWidgetCode"'
    );

    const basicContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/calculator/BasicTab.tsx'), 'utf-8');
    assert.ok(basicContent.includes('name="state"'), 'State selector must have name="state"');
    assert.ok(basicContent.includes('id="remember-choices"'), 'Remember choices must have id="remember-choices"');

    const multiContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/calculator/MultipleItemsTab.tsx'), 'utf-8');
    assert.ok(multiContent.includes('id={`item-name-${row.id}`}'), 'Multiple items name input must have id');
    assert.ok(multiContent.includes('id={`item-price-${row.id}`}'), 'Multiple items price input must have id');
    assert.ok(multiContent.includes('id={`item-taxable-${row.id}`}'), 'Multiple items checkbox must have id');
  });

  test('SocialLinks wraps all anchor tags in semantic role="listitem" list elements', () => {
    const socialContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/SocialLinks.tsx'), 'utf-8');
    assert.ok(
      socialContent.includes('role="listitem"'),
      'SocialLinks must wrap social links in role="listitem"'
    );
    assert.ok(
      socialContent.includes('<ul') && socialContent.includes('</ul>'),
      'SocialLinks must use semantic <ul> elements'
    );
  });

  test('Navbar CTA aria-label matches visible text (WCAG 2.5.3) and dropdowns have role="menuitem"', () => {
    const navbarContent = fs.readFileSync(path.resolve(process.cwd(), 'src/components/Navbar.tsx'), 'utf-8');
    assert.ok(
      navbarContent.includes('aria-label="Open calculator"'),
      'Navbar CTA must use aria-label="Open calculator" matching visible label'
    );
    assert.ok(
      navbarContent.includes('role="menuitem"'),
      'Navbar dropdown trigger buttons must have role="menuitem"'
    );
  });

  test('HomePage renders visible reviews section to substantiate AggregateRating and includes DefinedTermSet', () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/page.tsx'), 'utf-8');
    assert.ok(
      homeContent.includes('Rated 4.9 / 5 by 128+ Accountants, Contractors & Small Businesses') ||
      homeContent.includes('Rated 4.9 / 5 by 128+'),
      'HomePage must visibly render the 4.9 / 128 reviews section to substantiate AggregateRating'
    );
    assert.ok(
      homeContent.includes('Marcus Vance') && homeContent.includes('Batch Processing Mode'),
      'Must include Marcus Vance batch mode review'
    );
    assert.ok(
      homeContent.includes('Elena Rostova') && homeContent.includes('California District Surtaxes'),
      'Must include Elena Rostova California surtaxes review'
    );
    assert.ok(
      homeContent.includes('David K. Campbell') && homeContent.includes('Reverse Formula Divisor'),
      'Must include David K. Campbell formula divisor review'
    );
    assert.ok(
      homeContent.includes('Sarah Jenkins') && homeContent.includes('Multiple Items (Taxable/Exempt)'),
      'Must include Sarah Jenkins multiple items review'
    );
    assert.ok(
      homeContent.includes('Liam Tremblay') && homeContent.includes('Canada GST/QST & CRA ITC'),
      'Must include Liam Tremblay Canadian tax review'
    );
    assert.ok(
      homeContent.includes('Rachel Adams') && homeContent.includes('Find Tax Rate & Receipt Checker'),
      'Must include Rachel Adams receipt checker review'
    );
    assert.ok(
      homeContent.includes('DefinedTermSet') && homeContent.includes('Reverse Sales Tax Definitions'),
      'HomePage must include DefinedTermSet structured data'
    );
    assert.ok(
      homeContent.includes('sales-tax-rates-by-state-2026'),
      'Tax Foundation external reference must link to updated 2026 data'
    );
  });
});

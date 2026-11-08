import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { STATE_TAX_RATES } from '@/data/stateTaxRates';
import { CANADA_PROV_TAX_RATES } from '@/data/canadaTaxRates';
import fs from 'node:fs';
import path from 'node:path';

describe('SEO Audit Verification Tests', () => {
  test('all 51 US states generate standardized bidirectional titles and descriptions', () => {
    // Read page.tsx to verify the dynamic metadata template
    const pageContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/page.tsx'), 'utf-8');
    
    // Must contain bidirectional template in default metadata
    assert.ok(
      pageContent.includes('Sales Tax Calculator 2026: Calculate or Back Out Tax'),
      'src/app/(site)/us/[state]/page.tsx default title must include "Sales Tax Calculator 2026: Calculate or Back Out Tax"'
    );
    assert.ok(
      pageContent.includes('Calculate tax forward on purchases or back out tax from receipts instantly'),
      'src/app/(site)/us/[state]/page.tsx default description must include "Calculate tax forward on purchases or back out tax from receipts instantly"'
    );
  });

  test('top 7 customized states (NY, CT, TX, CA, FL, AZ, SC) have standardized bidirectional metadata and H1s', () => {
    const pageContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/page.tsx'), 'utf-8');

    // Check titles in generateMetadata overrides
    assert.ok(
      pageContent.includes("title = 'New York Sales Tax Calculator 2026: Calculate or Back Out Tax (NYC 8.875%)'"),
      'New York title must be standardized'
    );
    assert.ok(
      pageContent.includes("title = 'Connecticut Sales Tax Calculator 2026: Calculate or Back Out Tax (6.35%)'"),
      'Connecticut title must be standardized'
    );
    assert.ok(
      pageContent.includes("title = 'Texas Sales Tax Calculator 2026: Calculate or Back Out Tax (8.25%)'"),
      'Texas title must be standardized'
    );
    assert.ok(
      pageContent.includes("title = 'Florida Sales Tax Calculator 2026: Calculate or Back Out Tax (7.13%)'"),
      'Florida title must be standardized'
    );
    assert.ok(
      pageContent.includes("title = 'California Sales Tax Calculator 2026: Calculate or Back Out Tax (7.25% - 10.75%)'"),
      'California title must be standardized'
    );
    assert.ok(
      pageContent.includes("title = 'Arizona Sales Tax Calculator 2026: Calculate or Back Out Tax (8.51%)'"),
      'Arizona title must be standardized'
    );
    assert.ok(
      pageContent.includes("title = 'South Carolina Sales Tax Calculator 2026: Calculate or Back Out Tax (7.51%)'"),
      'South Carolina title must be standardized'
    );

    // Check H1s in custom components
    const nyContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/NewYorkPage.tsx'), 'utf-8');
    assert.ok(
      nyContent.includes('New York Sales Tax Calculator 2026: Calculate or Back Out Tax (NYC 8.875%)'),
      'NewYorkPage.tsx H1 must be standardized'
    );

    const ctContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/ConnecticutPage.tsx'), 'utf-8');
    assert.ok(
      ctContent.includes('Connecticut Sales Tax Calculator 2026: Calculate or Back Out Tax (6.35%)'),
      'ConnecticutPage.tsx H1 must be standardized'
    );

    const txContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/TexasPage.tsx'), 'utf-8');
    assert.ok(
      txContent.includes('Texas Sales Tax Calculator 2026: Calculate or Back Out Tax (8.25%)'),
      'TexasPage.tsx H1 must be standardized'
    );

    const caContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/CaliforniaPage.tsx'), 'utf-8');
    assert.ok(
      caContent.includes('California Sales Tax Calculator 2026: Calculate or Back Out Tax (7.25% – 10.75%)'),
      'CaliforniaPage.tsx H1 must be standardized'
    );

    const flContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/FloridaPage.tsx'), 'utf-8');
    assert.ok(
      flContent.includes('Florida Sales Tax Calculator 2026: Calculate or Back Out Tax (7.13%)'),
      'FloridaPage.tsx H1 must be standardized'
    );

    const azContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/ArizonaPage.tsx'), 'utf-8');
    assert.ok(
      azContent.includes('Arizona Sales Tax Calculator 2026: Calculate or Back Out Tax (8.51%)'),
      'ArizonaPage.tsx H1 must be standardized'
    );

    const scContent = fs.readFileSync(path.resolve(process.cwd(), 'src/app/(site)/us/[state]/SouthCarolinaPage.tsx'), 'utf-8');
    assert.ok(
      scContent.includes('South Carolina Sales Tax Calculator 2026: Calculate or Back Out Tax (7.51%)'),
      'SouthCarolinaPage.tsx H1 must be standardized'
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
});

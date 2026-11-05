import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const targetDir = process.argv[2] || 'audit/before-ui';
const baseUrl = process.argv[3] || 'http://localhost:3000';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const ROUTES = [
  { slug: 'home', path: '/' },
  { slug: 'about', path: '/about' },
  { slug: 'canada', path: '/canada' },
  { slug: 'contact', path: '/contact' },
  { slug: 'privacy-policy', path: '/privacy-policy' },
  { slug: 'tax-rates', path: '/tax-rates' },
  { slug: 'terms-of-service', path: '/terms-of-service' },
  { slug: 'vat-calculator', path: '/vat-calculator' }
];

async function extractPage(slug, routePath) {
  const pageDir = path.join(targetDir, slug);
  fs.mkdirSync(pageDir, { recursive: true });

  const url = `${baseUrl}${routePath}`;
  console.log(`[${slug}] Fetching ${url}...`);

  const res = await fetch(url);
  const html = await res.text();

  // 1. Raw HTML
  fs.writeFileSync(path.join(pageDir, 'page.html'), html, 'utf-8');

  // 2. Headings outline (H1-H6)
  const headingRegex = /<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = match[1].toLowerCase();
    const rawContent = match[2];
    const text = rawContent.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    headings.push({ level, text, raw: rawContent.trim() });
  }
  fs.writeFileSync(path.join(pageDir, 'headings.json'), JSON.stringify(headings, null, 2), 'utf-8');

  // 3. Meta, title, canonical, robots, og tags
  const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  const metaTags = [];
  const metaRegex = /<meta\b([^>]*?)\/?>/gi;
  while ((match = metaRegex.exec(html)) !== null) {
    const attrsStr = match[1];
    const attrs = {};
    const attrRegex = /([a-zA-Z0-9_:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
      attrs[attrMatch[1].toLowerCase()] = attrMatch[2] || attrMatch[3] || attrMatch[4] || '';
    }
    metaTags.push(attrs);
  }

  const linkTags = [];
  const linkRegex = /<link\b([^>]*?)\/?>/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    const attrsStr = match[1];
    const attrs = {};
    const attrRegex = /([a-zA-Z0-9_:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
      attrs[attrMatch[1].toLowerCase()] = attrMatch[2] || attrMatch[3] || attrMatch[4] || '';
    }
    linkTags.push(attrs);
  }

  const canonicalLink = linkTags.find(l => l.rel === 'canonical')?.href || null;

  const metaSummary = {
    title,
    canonical: canonicalLink,
    metaTags: metaTags.filter(m => m.name || m.property || m['http-equiv']),
    linkTags: linkTags.filter(l => l.rel)
  };
  fs.writeFileSync(path.join(pageDir, 'meta.json'), JSON.stringify(metaSummary, null, 2), 'utf-8');

  // 4. JSON-LD blocks
  const jsonLdRegex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const jsonLdBlocks = [];
  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      jsonLdBlocks.push(JSON.parse(match[1]));
    } catch (e) {
      jsonLdBlocks.push({ error: 'Failed to parse', raw: match[1].trim() });
    }
  }
  fs.writeFileSync(path.join(pageDir, 'jsonld.json'), JSON.stringify(jsonLdBlocks, null, 2), 'utf-8');

  // 5. Internal links with anchor text
  const aRegex = /<a\b([^>]*?)>([\s\S]*?)<\/a>/gi;
  const internalLinks = [];
  while ((match = aRegex.exec(html)) !== null) {
    const attrsStr = match[1];
    const rawContent = match[2];
    const text = rawContent.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const hrefMatch = attrsStr.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const href = hrefMatch ? (hrefMatch[1] || hrefMatch[2] || hrefMatch[3]) : '';
    
    if (href.startsWith('/') || href.startsWith('#') || href.includes('salestaxreversecalculator.com') || href.includes('pretaxprice.com')) {
      internalLinks.push({ href, text, rawContent: rawContent.trim() });
    }
  }
  fs.writeFileSync(path.join(pageDir, 'internal-links.json'), JSON.stringify(internalLinks, null, 2), 'utf-8');

  // 6. Element IDs
  const idRegex = /\bid\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  const ids = [];
  while ((match = idRegex.exec(html)) !== null) {
    const id = match[1] || match[2] || match[3];
    if (id && !ids.includes(id)) {
      ids.push(id);
    }
  }
  fs.writeFileSync(path.join(pageDir, 'ids.json'), JSON.stringify(ids, null, 2), 'utf-8');

  // 7. Visible text & Word count
  let bodyContent = html;
  bodyContent = bodyContent.replace(/<head\b[\s\S]*?<\/head>/gi, '');
  bodyContent = bodyContent.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  bodyContent = bodyContent.replace(/<style\b[\s\S]*?<\/style>/gi, '');
  bodyContent = bodyContent.replace(/<svg\b[\s\S]*?<\/svg>/gi, '');
  const textOnly = bodyContent.replace(/<[^>]+>/g, ' ').replace(/&[a-z0-9#]+;/gi, ' ').replace(/\s+/g, ' ').trim();
  const words = textOnly.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  fs.writeFileSync(path.join(pageDir, 'word-count.txt'), `Word count: ${wordCount}\nTotal words: ${wordCount}\n`, 'utf-8');
  fs.writeFileSync(path.join(pageDir, 'visible-text.txt'), textOnly, 'utf-8');

  // 8. Dump of every number token in visible text
  // Matches: percentages (e.g. 7.5%, 10%), currencies ($100, $90.91), decimals, integers
  const numberTokens = textOnly.match(/\$?\d+(?:,\d{3})*(?:\.\d+)?%?/g) || [];
  fs.writeFileSync(path.join(pageDir, 'numbers.json'), JSON.stringify(numberTokens, null, 2), 'utf-8');

  console.log(`[${slug}] Extracted: ${headings.length} headings, ${metaTags.length} meta, ${jsonLdBlocks.length} json-ld, ${internalLinks.length} links, ${ids.length} ids, ${wordCount} words, ${numberTokens.length} numbers`);
}

function captureScreenshots(slug, routePath) {
  const screenshotsDir = path.join(targetDir, 'screenshots');
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const viewports = [
    { width: 1354, height: 875, label: '1354' },
    { width: 768, height: 1024, label: '768' },
    { width: 390, height: 844, label: '390' }
  ];

  const url = `${baseUrl}${routePath}`;

  for (const vp of viewports) {
    const filename = `${slug}-${vp.label}.png`;
    const outputPath = path.join(screenshotsDir, filename);
    console.log(`[${slug}] Taking screenshot at ${vp.width}x${vp.height} -> ${filename}...`);
    try {
      execSync(`"${chromePath}" --headless --disable-gpu --window-size=${vp.width},${vp.height} --screenshot="${outputPath}" "${url}"`, { stdio: 'ignore' });
    } catch (e) {
      console.warn(`Failed to capture screenshot for ${slug} at ${vp.label}:`, e.message);
    }
  }
}

async function run() {
  console.log(`=== STARTING BASELINE EXTRACTION TO ${targetDir} ===`);
  fs.mkdirSync(targetDir, { recursive: true });

  for (const route of ROUTES) {
    await extractPage(route.slug, route.path);
  }

  // Capture screenshots for main page and tax-rates page
  console.log('=== CAPTURING SCREENSHOTS ===');
  captureScreenshots('home', '/');
  captureScreenshots('tax-rates', '/tax-rates');

  console.log('=== BASELINE EXTRACTION COMPLETE ===');
}

run().catch(console.error);

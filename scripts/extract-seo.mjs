import fs from 'fs';
import path from 'path';

const targetDir = process.argv[2] || 'audit/before';
const url = process.argv[3] || 'http://localhost:3000/';

async function run() {
  console.log(`Fetching ${url} into ${targetDir}...`);
  fs.mkdirSync(targetDir, { recursive: true });

  const res = await fetch(url);
  const html = await res.text();

  // 1. Raw HTML
  fs.writeFileSync(path.join(targetDir, 'home.html'), html, 'utf-8');

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
  fs.writeFileSync(path.join(targetDir, 'headings.json'), JSON.stringify(headings, null, 2), 'utf-8');

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
  fs.writeFileSync(path.join(targetDir, 'meta.json'), JSON.stringify(metaSummary, null, 2), 'utf-8');

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
  fs.writeFileSync(path.join(targetDir, 'jsonld.json'), JSON.stringify(jsonLdBlocks, null, 2), 'utf-8');

  // 5. Internal links with anchor text
  const aRegex = /<a\b([^>]*?)>([\s\S]*?)<\/a>/gi;
  const internalLinks = [];
  while ((match = aRegex.exec(html)) !== null) {
    const attrsStr = match[1];
    const rawContent = match[2];
    const text = rawContent.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const hrefMatch = attrsStr.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const href = hrefMatch ? (hrefMatch[1] || hrefMatch[2] || hrefMatch[3]) : '';
    
    // Check if internal (starts with /, #, or salestaxreversecalculator.com or pretaxprice.com)
    if (href.startsWith('/') || href.startsWith('#') || href.includes('salestaxreversecalculator.com') || href.includes('pretaxprice.com')) {
      internalLinks.push({ href, text, rawContent: rawContent.trim() });
    }
  }
  fs.writeFileSync(path.join(targetDir, 'internal-links.json'), JSON.stringify(internalLinks, null, 2), 'utf-8');

  // 6. Element IDs used as anchors or targets
  const idRegex = /\bid\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  const ids = [];
  while ((match = idRegex.exec(html)) !== null) {
    const id = match[1] || match[2] || match[3];
    if (id && !ids.includes(id)) {
      ids.push(id);
    }
  }
  fs.writeFileSync(path.join(targetDir, 'ids.json'), JSON.stringify(ids, null, 2), 'utf-8');

  // 7. Server-rendered word count
  // Strip head, scripts, styles, svg
  let bodyContent = html;
  bodyContent = bodyContent.replace(/<head\b[\s\S]*?<\/head>/gi, '');
  bodyContent = bodyContent.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  bodyContent = bodyContent.replace(/<style\b[\s\S]*?<\/style>/gi, '');
  bodyContent = bodyContent.replace(/<svg\b[\s\S]*?<\/svg>/gi, '');
  const textOnly = bodyContent.replace(/<[^>]+>/g, ' ').replace(/&[a-z0-9#]+;/gi, ' ').replace(/\s+/g, ' ').trim();
  const words = textOnly.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  fs.writeFileSync(path.join(targetDir, 'word-count.txt'), `Word count: ${wordCount}\nTotal words: ${wordCount}\n`, 'utf-8');

  console.log(`Extracted baseline successfully:
- Headings: ${headings.length}
- Meta tags: ${metaTags.length}
- JSON-LD blocks: ${jsonLdBlocks.length}
- Internal links: ${internalLinks.length}
- Unique IDs: ${ids.length}
- Word count: ${wordCount}`);
}

run().catch(console.error);

/* Post-build checks. Run: npm run check
   Catches the mistakes that are easy to make in a generated site: broken internal
   links, missing or duplicated SEO fields, images without alt text, headings out
   of order, and unparseable structured data. */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

const problems = [];
const warnings = [];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

if (!fs.existsSync(DIST)) {
  console.error('dist/ is missing. Run npm run build first.');
  process.exit(1);
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const relative = (f) => '/' + path.relative(DIST, f).split(path.sep).join('/');

/* Every address the site can serve, in the shapes a link may use. */
const served = new Set();
for (const file of files) {
  const rel = relative(file);
  served.add(rel);
  if (rel.endsWith('/index.html')) {
    const dirPath = rel.replace(/index\.html$/, '');
    served.add(dirPath);
    served.add(dirPath.replace(/\/$/, ''));
  }
}

const decode = (s) =>
  String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const titles = new Map();
const descriptions = new Map();

for (const file of htmlFiles) {
  const url = relative(file).replace(/index\.html$/, '');
  const html = fs.readFileSync(file, 'utf8');
  const at = (msg) => `${url}: ${msg}`;

  /* --- head --- */
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  if (!title) problems.push(at('no <title>'));
  else {
    if (title.length > 65) warnings.push(at(`title is ${title.length} characters (over 65): "${title}"`));
    if (titles.has(title)) problems.push(at(`duplicate title, also used by ${titles.get(title)}`));
    titles.set(title, url);
  }

  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  if (!desc) problems.push(at('no meta description'));
  else {
    if (desc.length > 160) warnings.push(at(`meta description is ${desc.length} characters (over 160)`));
    if (desc.length < 70) warnings.push(at(`meta description is only ${desc.length} characters`));
    if (descriptions.has(desc)) problems.push(at(`duplicate meta description, also used by ${descriptions.get(desc)}`));
    descriptions.set(desc, url);
  }

  if (!/<link rel="canonical"/.test(html)) problems.push(at('no canonical link'));
  if (!/<meta property="og:image"/.test(html)) problems.push(at('no og:image'));
  if (!/<html lang="/.test(html)) problems.push(at('no lang attribute'));

  /* --- headings --- */
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length === 0) problems.push(at('no <h1>'));
  if (h1s.length > 1) problems.push(at(`${h1s.length} <h1> elements`));

  const levels = [...html.matchAll(/<h([1-4])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] - levels[i - 1] > 1) {
      warnings.push(at(`heading jumps from h${levels[i - 1]} to h${levels[i]}`));
      break;
    }
  }

  /* --- images --- */
  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\balt=/.test(img)) problems.push(at(`<img> without alt: ${img.slice(0, 90)}`));
    const src = (img.match(/src="([^"]+)"/) || [])[1];
    if (src && src.startsWith('/') && !served.has(src)) problems.push(at(`image not found: ${src}`));
  }

  /* --- links --- */
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const [pathPart, hash] = href.split('#');
    if (!pathPart) continue;
    if (!served.has(pathPart)) problems.push(at(`broken internal link: ${href}`));
    if (hash && pathPart === url && !new RegExp(`id="${hash}"`).test(html)) {
      warnings.push(at(`anchor #${hash} not found on this page`));
    }
  }

  /* --- structured data --- */
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const parsed = JSON.parse(m[1]);
      if (!parsed['@context']) problems.push(at('JSON-LD without @context'));
    } catch (err) {
      problems.push(at(`JSON-LD does not parse: ${err.message}`));
    }
  }

  /* --- things that should never ship --- */
  if (/\bstyle="[^"]*(color|font-family|font-size)\s*:/.test(html)) {
    warnings.push(at('inline typography or color found; move it to a named class'));
  }
  if (/\bTODO\b|\bLorem ipsum\b/i.test(html)) problems.push(at('placeholder text found'));
}

/* --- site-level files --- */
for (const required of ['/sitemap.xml', '/robots.txt', '/404.html', '/favicon.svg']) {
  if (!served.has(required)) problems.push(`missing ${required}`);
}

const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const indexable = htmlFiles.filter((f) => !/<meta name="robots" content="noindex/.test(fs.readFileSync(f, 'utf8')));
for (const file of indexable) {
  const url = relative(file).replace(/index\.html$/, '');
  if (!sitemap.includes(`<loc>https://orchardpropertymgmt.com${url}</loc>`)) {
    problems.push(`${url}: indexable but missing from sitemap.xml`);
  }
}

/* --- report --- */
console.log(`Checked ${htmlFiles.length} pages.`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  ! ${w}`));
}
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  problems.forEach((p) => console.log(`  x ${p}`));
  process.exit(1);
}
console.log('\nNo problems found.');

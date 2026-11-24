/* Build: read page data and blog content, render every page through layout.render(),
   and write a static site to dist/. No dependencies, no framework. */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { site, specialties } from './data/site.mjs';
import { services } from './data/services.mjs';
import { categories, categoryBySlug } from './data/blog.mjs';
import { render } from './lib/layout.mjs';
import { parseFrontMatter, renderMarkdown, firstParagraph } from './lib/markdown.mjs';
import { plain, truncate } from './lib/html.mjs';

import { homePage } from './pages/home.mjs';
import { sellPage } from './pages/sell.mjs';
import { careersPage } from './pages/careers.mjs';
import { whatWeDoPage, specialtyPage } from './pages/what-we-do.mjs';
import { servicesPage, servicePage } from './pages/services.mjs';
import { aboutPage } from './pages/about.mjs';
import { contactPage, serviceAreasPage, thanksPage, privacyPage, accessibilityPage, notFoundPage } from './pages/misc.mjs';
import { blogIndexPages, categoryPages, postPage } from './pages/blog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');
const CONTENT = path.join(ROOT, 'src', 'content', 'blog');

/* ------------------------------------------------------------------ helpers */

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dest);
    else fs.copyFileSync(src, dest);
  }
}

function listFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listFiles(full, out);
    else out.push(full);
  }
  return out;
}

/**
 * Rename every stylesheet, script, and asset in dist/ to include a hash of its
 * own contents, and return a map from the original site path to the new one.
 *
 * Without this, a changed stylesheet keeps its URL, so a browser holding the
 * old copy under a long cache header goes on using it until the cache expires.
 * With it, changing a file changes its URL, which misses the cache immediately,
 * while a file that has not changed keeps its name and stays cached. That is
 * what makes the one-year immutable headers in vercel.json safe to set.
 *
 * Files outside these folders keep their names, because something external
 * refers to them by a fixed path: /favicon.svg, /apple-touch-icon.png,
 * /robots.txt, /sitemap.xml, and the pages themselves.
 */
function fingerprintAssets() {
  const map = new Map();
  for (const full of listFiles(DIST)) {
    const rel = path.relative(DIST, full).split(path.sep).join('/');
    if (!/^(css|js|assets)\//.test(rel)) continue;

    const hash = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex').slice(0, 8);
    const ext = path.extname(rel);
    const hashed = `${rel.slice(0, rel.length - ext.length)}.${hash}${ext}`;
    fs.renameSync(full, path.join(DIST, hashed));
    map.set(`/${rel}`, `/${hashed}`);
  }
  return map;
}

/** Point every reference in a rendered page at the hashed filename. */
function rewriteAssetPaths(html, assetMap) {
  let out = html;
  for (const [from, to] of assetMap) {
    // Site-absolute references, plus the absolute ones in og:image and JSON-LD.
    out = out.split(site.url + from).join(site.url + to);
    out = out.split(`"${from}"`).join(`"${to}"`);
    out = out.split(`'${from}'`).join(`'${to}'`);
  }
  return out;
}

function writePage(page, assetMap) {
  const html = rewriteAssetPaths(render(page), assetMap);
  const rel = page.rawPath ? page.path.replace(/^\//, '') : path.join(page.path.replace(/^\//, ''), 'index.html');
  const out = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, 'utf8');
  return { path: page.path, bytes: Buffer.byteLength(html), noindex: Boolean(page.noindex) };
}

const DATE_FMT = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/* -------------------------------------------------------------- blog loader */

function loadPosts() {
  if (!fs.existsSync(CONTENT)) return [];
  const files = fs.readdirSync(CONTENT).filter((f) => f.endsWith('.md'));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT, file), 'utf8');
    const { data, body } = parseFrontMatter(raw);
    const slug = data.slug || file.replace(/\.md$/, '');

    if (!data.title) throw new Error(`${file}: missing "title" in front matter`);
    if (!data.date) throw new Error(`${file}: missing "date" in front matter`);
    const category = categoryBySlug[data.category];
    if (!category) throw new Error(`${file}: unknown category "${data.category}"`);

    const html = renderMarkdown(body);
    const words = plain(html).split(/\s+/).filter(Boolean).length;
    const summary = data.summary || truncate(firstParagraph(body), 158);

    return {
      slug,
      url: `/blog/${slug}/`,
      title: data.title,
      summary,
      excerpt: truncate(summary, 150),
      date: data.date,
      updated: data.updated || '',
      dateLabel: DATE_FMT.format(new Date(`${data.date}T12:00:00Z`)),
      category: category.slug,
      categoryName: category.name,
      categoryUrl: category.url,
      tags: data.tags || [],
      image: data.image || '',
      imageAlt: data.imageAlt || '',
      author: data.author || site.name,
      html,
      wordCount: words,
      readingTime: `${Math.max(1, Math.round(words / 225))} min`,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/* ------------------------------------------------------------------- sitemap */

function writeSitemap(entries) {
  const urls = entries
    .filter((e) => !e.noindex && !e.path.endsWith('.html'))
    .map((e) => {
      const loc = site.url + e.path;
      const priority = e.path === '/' ? '1.0' : e.priority || '0.7';
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${e.lastmod || TODAY}</lastmod>\n    <changefreq>${e.changefreq || 'monthly'}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  fs.writeFileSync(
    path.join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    'utf8'
  );
}

function writeRobots() {
  fs.writeFileSync(
    path.join(DIST, 'robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: ${site.url}/sitemap.xml\n`,
    'utf8'
  );
}

const TODAY = new Date().toISOString().slice(0, 10);

/* ---------------------------------------------------------------------- run */

function build() {
  const started = Date.now();
  rmrf(DIST);
  fs.mkdirSync(DIST, { recursive: true });
  copyDir(PUBLIC, DIST);
  const assetMap = fingerprintAssets();

  const posts = loadPosts();
  const postsByCategory = Object.fromEntries(categories.map((c) => [c.slug, posts.filter((p) => p.category === c.slug)]));
  const usedCategories = categories.filter((c) => postsByCategory[c.slug].length > 0);

  const pages = [
    homePage({ posts }),
    servicesPage(),
    ...services.map((s) => servicePage(s)),
    whatWeDoPage(),
    ...specialties.map((s) => specialtyPage(s)),
    sellPage(),
    careersPage(),
    aboutPage(),
    serviceAreasPage(),
    contactPage(),
    ...blogIndexPages({ posts, categories: usedCategories }),
    ...categoryPages({ categories: usedCategories, postsByCategory }),
    ...posts.map((post) => {
      const related = posts.filter((p) => p.slug !== post.slug).sort((a, b) => (a.category === post.category ? -1 : 1)).slice(0, 3);
      return postPage(post, related);
    }),
    thanksPage(),
    privacyPage(),
    accessibilityPage(),
    notFoundPage(),
  ];

  const seen = new Set();
  const written = pages.map((page) => {
    if (seen.has(page.path)) throw new Error(`Duplicate page path: ${page.path}`);
    seen.add(page.path);
    return writePage(page, assetMap);
  });

  writeSitemap(
    written.map((entry) => ({
      ...entry,
      priority: entry.path === '/' ? '1.0' : ['/sell-your-business/', '/careers/'].includes(entry.path) ? '0.9' : entry.path.startsWith('/blog/') ? '0.6' : '0.7',
      changefreq: entry.path.startsWith('/blog') ? 'weekly' : 'monthly',
    }))
  );
  writeRobots();

  const bytes = written.reduce((sum, w) => sum + w.bytes, 0);
  console.log(`Built ${written.length} pages (${(bytes / 1024).toFixed(0)} KB of HTML) and ${posts.length} blog posts in ${Date.now() - started} ms`);
  console.log(written.map((w) => `  ${w.path}${w.noindex ? '  (noindex)' : ''}`).join('\n'));
}

build();

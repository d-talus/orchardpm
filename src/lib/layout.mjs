/* Page shell: head, structured data, header, footer. Every page in the site is
   produced by render() so the SEO contract is identical everywhere. */

import { site, nav, headerCta, footerColumns, legalLinks } from '../data/site.mjs';
import { esc, attrs, join, tidy, truncate } from './html.mjs';
import { icon } from './icons.mjs';

const YEAR = new Date().getFullYear();

function abs(href = '/') {
  if (/^https?:\/\//.test(href)) return href;
  return site.url + href;
}

function header(current) {
  const links = nav
    .map((item) => {
      const active = current === item.href || (item.href !== '/' && current.startsWith(item.href));
      return `<a class="nav__link" href="${item.href}"${active ? ' aria-current="page"' : ''}>${esc(item.label)}</a>`;
    })
    .join('\n          ');

  return `<header class="site-header">
    <div class="container site-header__bar">
      <a class="site-header__logo" href="/" aria-label="${esc(site.name)} home">
        <img src="/assets/logo/opm-lockup.png" alt="${esc(site.name)}" width="743" height="150">
      </a>
      <div class="site-header__nav" id="site-nav">
        <nav class="nav" aria-label="Main">
          ${links}
        </nav>
        <a class="btn btn--primary btn--sm" href="${headerCta.href}">${esc(headerCta.label)}</a>
      </div>
      <div class="site-header__actions">
        <a class="btn btn--primary btn--sm" href="${headerCta.href}">${esc(headerCta.label)}</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
          <span class="nav-toggle__open">${icon('menu')}</span>
          <span class="nav-toggle__close">${icon('close')}</span>
        </button>
      </div>
    </div>
  </header>`;
}

function footer() {
  const columns = footerColumns
    .map(
      (col) => `<div>
          <h2>${esc(col.title)}</h2>
          <ul>
            ${col.links.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('\n            ')}
          </ul>
        </div>`
    )
    .join('\n        ');

  return `<footer class="site-footer">
    <div class="container">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <img src="/assets/logo/opm-lockup-white.png" alt="${esc(site.name)}" width="743" height="150" loading="lazy">
          <p>${esc(site.tagline)}</p>
          <p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
        </div>
        ${columns}
      </div>
      <div class="site-footer__bottom">
        <p class="mb-0">&copy; ${YEAR} ${esc(site.legalName)}. A ${esc(site.parent.name)} company.</p>
        <div class="site-footer__legal">
          ${legalLinks.map((l) => `<a href="${l.href}">${esc(l.label)}</a>`).join('\n          ')}
        </div>
      </div>
    </div>
  </footer>`;
}

function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    alternateName: 'Orchard PM',
    url: site.url,
    logo: { '@type': 'ImageObject', url: abs('/assets/logo/opm-lockup.png'), width: 743, height: 150 },
    image: abs('/assets/img/og-default.jpg'),
    email: site.email,
    slogan: site.tagline,
    description: site.description,
    knowsAbout: [
      'Residential property management',
      'Community association management',
      'Homeowners association management',
      'Condominium management',
      'Commercial property management',
      'Property maintenance and facilities services',
    ],
    areaServed: [
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'State', name: 'Pennsylvania' },
      { '@type': 'State', name: 'New York' },
      { '@type': 'State', name: 'Delaware' },
    ],
    address: { '@type': 'PostalAddress', addressRegion: 'NJ', addressCountry: 'US' },
    founder: { '@type': 'Person', name: site.founder.name, jobTitle: site.founder.role },
    parentOrganization: { '@type': 'Organization', name: site.parent.name, url: site.parent.url },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Business acquisitions',
        email: site.email,
        areaServed: 'US-NJ',
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Recruitment',
        email: site.email,
        areaServed: 'US-NJ',
        availableLanguage: 'English',
      },
    ],
  };
}

function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { '@id': `${site.url}/#organization` },
    inLanguage: site.language,
  };
}

function breadcrumbSchema(crumbs, path) {
  if (!crumbs || !crumbs.length) return null;
  const items = [{ label: 'Home', href: '/' }, ...crumbs];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(path)}#breadcrumb`,
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: abs(c.href || path),
    })),
  };
}

/**
 * Render a full page.
 * @param {object} page
 * @param {string} page.path        Site-absolute path, e.g. '/careers/'
 * @param {string} page.title       <title> without the brand suffix
 * @param {string} page.description Meta description
 * @param {string} page.body        Page markup (already built by modules.mjs)
 * @param {Array}  [page.crumbs]    Breadcrumb trail, excluding Home
 * @param {Array}  [page.schema]    Extra JSON-LD nodes
 * @param {string} [page.ogImage]   Social image path
 * @param {boolean}[page.noindex]
 * @param {string} [page.bodyClass]
 */
export function render(page) {
  // Keep titles inside the ~60 character window search results show. A long page
  // title falls back to the short brand, then to no suffix at all, rather than
  // being cut off mid-word in the results.
  const candidates = [`${page.title} | ${site.name}`, `${page.title} | Orchard`, page.title];
  const title = page.titleFull || candidates.find((t) => t.length <= 62) || page.title;
  const description = truncate(page.description, 158);
  const canonical = abs(page.path);
  const ogImage = abs(page.ogImage || '/assets/img/og-default.jpg');

  const graph = [organizationSchema(), websiteSchema(), breadcrumbSchema(page.crumbs, page.path), ...(page.schema || [])].filter(Boolean);

  const head = join(
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}">`,
    `<link rel="canonical" href="${esc(canonical)}">`,
    page.noindex
      ? '<meta name="robots" content="noindex, follow">'
      : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">',
    `<meta name="theme-color" content="${site.themeColor}">`,
    '',
    `<meta property="og:type" content="${page.ogType || 'website'}">`,
    `<meta property="og:site_name" content="${esc(site.name)}">`,
    `<meta property="og:title" content="${esc(page.ogTitle || title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:url" content="${esc(canonical)}">`,
    `<meta property="og:image" content="${esc(ogImage)}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:locale" content="${site.locale}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${esc(page.ogTitle || title)}">`,
    `<meta name="twitter:description" content="${esc(description)}">`,
    `<meta name="twitter:image" content="${esc(ogImage)}">`,
    page.articleMeta || '',
    '',
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="stylesheet" href="/css/brand.css">',
    '<link rel="stylesheet" href="/css/site.css">',
    `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`
  );

  return tidy(`<!doctype html>
<html lang="${site.language}">
<head>
${head}
</head>
<body class="brand${page.bodyClass ? ' ' + page.bodyClass : ''}"${attrs({ 'data-page': page.id || '' })}>
<a class="skip-link" href="#main">Skip to content</a>
${header(page.path)}
<main id="main">
${page.body}
</main>
${footer()}
<script src="/js/site.js" defer></script>
</body>
</html>`);
}

export { abs };

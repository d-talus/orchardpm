/* Shared section builders. Pages are assembled from these, the way the Elevation
   generator assembles sections from modules.mjs, so a change here lands on every
   page that uses the section. */

import { esc, join, attrs, classes } from './html.mjs';
import { icon, iconBadge } from './icons.mjs';

/* ---------- small pieces ---------- */

export function eyebrow(text, plainStyle = false) {
  if (!text) return '';
  return `<p class="${classes('eyebrow', plainStyle && 'eyebrow--plain')}">${esc(text)}</p>`;
}

export function paragraphs(items = []) {
  return [].concat(items).filter(Boolean).map((p) => `<p>${p}</p>`).join('\n');
}

export function buttons(actions = [], extraClass = '') {
  if (!actions.length) return '';
  const html = actions
    .map((a, i) => {
      const variant = a.variant || (i === 0 ? 'btn--primary' : 'btn--outline');
      return `<a class="btn ${variant}" href="${a.href}"${attrs({ rel: a.rel, target: a.target })}>${esc(a.label)}</a>`;
    })
    .join('\n      ');
  return `<div class="${classes('actions', extraClass)}">\n      ${html}\n    </div>`;
}

export function breadcrumbs(crumbs = []) {
  if (!crumbs.length) return '';
  const items = [{ label: 'Home', href: '/' }, ...crumbs]
    .map((c, i, arr) =>
      i === arr.length - 1
        ? `<li aria-current="page">${esc(c.label)}</li>`
        : `<li><a href="${c.href}">${esc(c.label)}</a></li>`
    )
    .join('');
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${items}</ol></nav>`;
}

export function sectionHead({ eyebrow: eb, title, lede, center = false, level = 2 }) {
  return `<div class="${classes('section-head', center && 'section-head--center')}">
      ${eyebrow(eb)}
      ${title ? `<h${level}>${title}</h${level}>` : ''}
      ${lede ? `<p class="lead">${lede}</p>` : ''}
    </div>`;
}

/* ---------- heroes ---------- */

export function hero({ eyebrow: eb, title, lede, actions = [], image, crumbs = [], center = false, compact = false, graphic = false, titleTag = 'h1' }) {
  // A hero sits either over a photograph or over the brand gradient, never both.
  const useGraphic = graphic || !image;
  const style = useGraphic ? '' : ` style="background-image:url('${image}')"`;
  return `<section class="${classes('hero', center && 'hero--center', compact && 'hero--compact', useGraphic && 'hero--graphic')}"${style}>
    <div class="container">
      <div class="hero__inner">
        ${breadcrumbs(crumbs)}
        ${eyebrow(eb)}
        <${titleTag}>${title}</${titleTag}>
        ${lede ? `<p class="lead">${lede}</p>` : ''}
        ${buttons(actions)}
      </div>
    </div>
  </section>`;
}

/* ---------- content sections ---------- */

export function prose({ eyebrow: eb, title, body = [], actions = [], variant = '', center = false, id }) {
  return `<section class="${classes('section', variant)}"${attrs({ id })}>
    <div class="container">
      <div class="${classes('section-head', center && 'section-head--center')}">
        ${eyebrow(eb)}
        ${title ? `<h2>${title}</h2>` : ''}
      </div>
      <div class="${classes('measure', center && 'section-head--center')}">
        ${paragraphs(body)}
        ${buttons(actions, center ? 'actions--center' : '')}
      </div>
    </div>
  </section>`;
}

export function split({ eyebrow: eb, title, body = [], list = [], actions = [], image, imageAlt = '', reverse = false, variant = '', id, mediaShape = 'media--landscape', imageWidth = 900, imageHeight = 563 }) {
  const text = `<div>
        ${eyebrow(eb)}
        ${title ? `<h2>${title}</h2>` : ''}
        ${paragraphs(body)}
        ${list.length ? `<ul class="checklist">${list.map((l) => `<li>${l}</li>`).join('')}</ul>` : ''}
        ${buttons(actions)}
      </div>`;
  const media = image
    ? `<div class="media ${mediaShape}"><img src="${image}" alt="${esc(imageAlt)}" loading="lazy" decoding="async" width="${imageWidth}" height="${imageHeight}"></div>`
    : '';
  return `<section class="${classes('section', variant)}"${attrs({ id })}>
    <div class="container">
      <div class="grid grid--sidebar">
        ${reverse ? media + '\n        ' + text : text + '\n        ' + media}
      </div>
    </div>
  </section>`;
}

export function featureGrid({ eyebrow: eb, title, lede, items = [], columns = 3, variant = '', center = true, cardClass = '', id }) {
  const cards = items
    .map((item) => {
      const titleHtml = item.href
        ? `<h3><a href="${item.href}">${esc(item.title)}</a></h3>`
        : `<h3>${esc(item.title)}</h3>`;
      return `<article class="${classes('card', 'card--lift', cardClass, 'feature')}">
          ${item.icon ? iconBadge(item.icon) : ''}
          ${titleHtml}
          <p>${item.body}</p>
          ${item.href ? `<p class="feature__link"><a class="link-arrow" href="${item.href}">${esc(item.linkLabel || 'Learn more')}</a></p>` : ''}
        </article>`;
    })
    .join('\n        ');

  return `<section class="${classes('section', variant)}"${attrs({ id })}>
    <div class="container">
      ${title || eb || lede ? sectionHead({ eyebrow: eb, title, lede, center }) : ''}
      <div class="grid grid--${columns} grid--stretch">
        ${cards}
      </div>
    </div>
  </section>`;
}

export function steps({ eyebrow: eb, title, lede, items = [], variant = '', id, columns = 2 }) {
  const list = items
    .map(
      (s) => `<div class="step">
          <h3>${esc(s.title)}</h3>
          <p>${s.body}</p>
        </div>`
    )
    .join('\n        ');
  return `<section class="${classes('section', variant)}"${attrs({ id })}>
    <div class="container">
      ${sectionHead({ eyebrow: eb, title, lede })}
      <div class="grid grid--${columns} steps" style="--grid-gap:clamp(28px,3.4vw,44px)">
        ${list}
      </div>
    </div>
  </section>`;
}

export function statsBand({ eyebrow: eb, title, lede, items = [], variant = 'section--dark', id, footnote }) {
  const stats = items
    .map(
      (s) => `<div class="stat">
          <span class="stat__figure">${esc(s.figure)}</span>
          <span class="stat__label">${esc(s.label)}</span>
        </div>`
    )
    .join('\n        ');
  return `<section class="${classes('section', 'section--tight', variant)}"${attrs({ id })}>
    <div class="container">
      ${title || eb ? sectionHead({ eyebrow: eb, title, lede }) : ''}
      <div class="grid grid--${items.length === 3 ? 3 : 4}">
        ${stats}
      </div>
      ${footnote ? `<p class="help" style="margin-top:28px">${footnote}</p>` : ''}
    </div>
  </section>`;
}

export function twoColumnList({ eyebrow: eb, title, lede, columns = [], variant = '', id }) {
  const cols = columns
    .map(
      (c) => `<div class="card${c.dark ? ' card--dark' : ''}">
          ${c.icon ? iconBadge(c.icon) : ''}
          <h3>${esc(c.title)}</h3>
          ${c.body ? `<p>${c.body}</p>` : ''}
          ${c.list ? `<ul class="checklist">${c.list.map((l) => `<li>${l}</li>`).join('')}</ul>` : ''}
        </div>`
    )
    .join('\n        ');
  return `<section class="${classes('section', variant)}"${attrs({ id })}>
    <div class="container">
      ${sectionHead({ eyebrow: eb, title, lede })}
      <div class="grid grid--${columns.length === 3 ? 3 : 2} grid--stretch">
        ${cols}
      </div>
    </div>
  </section>`;
}

export function faq({ eyebrow: eb, title, lede, items = [], variant = '', id = 'faq' }) {
  const list = items
    .map(
      (q) => `<details class="accordion__item">
          <summary>${esc(q.q)}</summary>
          <div class="accordion__body">${paragraphs(q.a)}</div>
        </details>`
    )
    .join('\n        ');
  return `<section class="${classes('section', variant)}"${attrs({ id })}>
    <div class="container container--narrow">
      ${sectionHead({ eyebrow: eb, title, lede })}
      <div class="accordion">
        ${list}
      </div>
    </div>
  </section>`;
}

export function faqSchema(items = []) {
  if (!items.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: [].concat(q.a).join(' ').replace(/<[^>]+>/g, '') },
    })),
  };
}

export function ctaBand({ title, lede, actions = [], variant = 'section--surface', id }) {
  return `<section class="${classes('section', variant)}"${attrs({ id })}>
    <div class="container">
      <div class="cta-band">
        <div class="cta-band__inner">
          <div class="cta-band__text">
            <h2>${title}</h2>
            ${lede ? `<p class="lead mb-0">${lede}</p>` : ''}
          </div>
          ${buttons(actions)}
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------- forms ---------- */

function field(f) {
  const id = f.name;
  const req = f.required ? ' <span class="req" aria-hidden="true">*</span>' : '';
  const common = {
    id,
    name: f.name,
    required: f.required || false,
    autocomplete: f.autocomplete,
    placeholder: f.placeholder,
  };
  let control;
  if (f.type === 'textarea') {
    control = `<textarea class="input"${attrs({ ...common, rows: f.rows || 5 })}></textarea>`;
  } else if (f.type === 'select') {
    const opts = ['<option value="">Please choose</option>']
      .concat(f.options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`))
      .join('');
    control = `<select class="input"${attrs(common)}>${opts}</select>`;
  } else {
    control = `<input class="input"${attrs({ ...common, type: f.type || 'text' })}>`;
  }
  return `<div class="field${f.span ? ' field--span' : ''}">
          <label class="label" for="${id}">${esc(f.label)}${req}</label>
          ${control}
          ${f.help ? `<p class="help">${esc(f.help)}</p>` : ''}
        </div>`;
}

export function formSection({
  eyebrow: eb,
  title,
  lede,
  intro = [],
  fields = [],
  submitLabel = 'Send',
  formName,
  footnote,
  consent,
  variant = 'section--surface',
  id = 'contact',
}) {
  return `<section class="${classes('section', variant)}"${attrs({ id })}>
    <div class="container">
      <div class="grid grid--sidebar" style="align-items:start">
        <div>
          ${eyebrow(eb)}
          ${title ? `<h2>${title}</h2>` : ''}
          ${lede ? `<p class="lead">${lede}</p>` : ''}
          ${paragraphs(intro)}
        </div>
        <div class="form-card">
          <form class="js-lead-form" method="post" action="/api/lead" novalidate>
            <input type="hidden" name="form" value="${esc(formName)}">
            <div class="hp-field" aria-hidden="true">
              <label for="${esc(formName)}-company-website">Company website</label>
              <input id="${esc(formName)}-company-website" type="text" name="company_website" tabindex="-1" autocomplete="off">
            </div>
            <div class="form-status js-form-status" role="status" hidden></div>
            <div class="grid grid--form">
              ${fields.map(field).join('\n              ')}
            </div>
            ${consent ? `<label class="consent"><input type="checkbox" name="consent" required> <span>${consent}</span></label>` : ''}
            <div class="actions">
              <button class="btn btn--primary btn--block js-submit" type="submit">${esc(submitLabel)}</button>
            </div>
            ${footnote ? `<p class="form-footnote">${footnote}</p>` : ''}
          </form>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------- blog ---------- */

export function postCard(post) {
  return `<article class="card card--lift post-card">
          ${post.image ? `<div class="post-card__media"><img src="${post.image}" alt="${esc(post.imageAlt || '')}" loading="lazy" decoding="async" width="640" height="360"></div>` : ''}
          <div class="post-card__body">
            <p class="post-card__meta">${esc(post.categoryName)} &middot; ${esc(post.dateLabel)}</p>
            <h3><a href="${post.url}">${esc(post.title)}</a></h3>
            <p class="post-card__excerpt">${esc(post.excerpt)}</p>
            <p class="post-card__link"><a class="link-arrow" href="${post.url}">Read the article</a></p>
          </div>
        </article>`;
}

export function postGrid({ eyebrow: eb, title, lede, posts = [], columns = 3, variant = '', id, actions = [] }) {
  return `<section class="${classes('section', variant)}"${attrs({ id })}>
    <div class="container">
      ${title || eb ? sectionHead({ eyebrow: eb, title, lede }) : ''}
      <div class="grid grid--${columns} grid--stretch">
        ${posts.map(postCard).join('\n        ')}
      </div>
      ${buttons(actions)}
    </div>
  </section>`;
}

export { icon, iconBadge, join };

/** The lead article on a blog index: a wide card with the full summary. */
export function postLead(post) {
  return `<article class="card post-lead">
          ${post.image ? `<div class="post-lead__media"><img src="${post.image}" alt="${esc(post.imageAlt || '')}" loading="lazy" decoding="async" width="900" height="600"></div>` : ''}
          <div class="post-lead__body">
            <p class="post-card__meta">${esc(post.categoryName)} &middot; ${esc(post.dateLabel)} &middot; ${esc(post.readingTime)} read</p>
            <h2><a href="${post.url}">${esc(post.title)}</a></h2>
            <p>${esc(post.summary)}</p>
            <p class="mb-0"><a class="link-arrow" href="${post.url}">Read the article</a></p>
          </div>
        </article>`;
}

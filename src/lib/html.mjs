/* Small HTML helpers. Everything the build emits goes through esc() unless it is
   explicitly marked as pre-built markup, so page data can never inject raw HTML
   by accident. */

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function esc(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[&<>"']/g, (c) => ENTITIES[c]);
}

/** Build an attribute string from an object. Falsy values are dropped; `true` renders a bare attribute. */
export function attrs(map = {}) {
  return Object.entries(map)
    .filter(([, v]) => v !== false && v !== null && v !== undefined && v !== '')
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`))
    .join('');
}

/** Join template parts, dropping null/undefined/false so conditionals read cleanly. */
export function join(...parts) {
  return parts.flat(Infinity).filter(Boolean).join('\n');
}

export function classes(...names) {
  return names.flat(Infinity).filter(Boolean).join(' ');
}

/** Collapse runs of blank lines so the generated HTML stays readable. */
export function tidy(html) {
  return html.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

/** Strip tags and squeeze whitespace — used for meta descriptions and excerpts. */
export function plain(html) {
  return String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export function truncate(text, max = 158) {
  const t = plain(text);
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.—-]$/, '') + '…';
}

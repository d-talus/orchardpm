/* A deliberately small Markdown subset, so blog posts stay easy to write without
   pulling in a dependency. Supported: front matter, h2/h3/h4, paragraphs,
   unordered and ordered lists, blockquotes, horizontal rules, links, bold,
   italic, inline code, and image lines. Raw HTML in a post is escaped. */

import { esc } from './html.mjs';

/** Parse `--- key: value ---` front matter. Values are strings; `[a, b]` becomes an array. */
export function parseFrontMatter(raw) {
  const text = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: text.trim() };
  const data = {};
  for (const line of match[1].split('\n')) {
    const pair = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!pair) continue;
    let value = pair[2].trim().replace(/^["'](.*)["']$/, '$1');
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["'](.*)["']$/, '$1'))
        .filter(Boolean);
    }
    data[pair[1]] = value;
  }
  return { data, body: text.slice(match[0].length).trim() };
}

function inline(text) {
  let out = esc(text);
  // `code`
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  // [label](href)
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, href) => {
    const external = /^https?:\/\//.test(href) && !href.includes('orchardpropertymgmt.com');
    const rel = external ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${href}"${rel}>${label}</a>`;
  });
  // **bold** then *italic*
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return out;
}

export function renderMarkdown(body) {
  const lines = String(body).replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;

  const flushList = (ordered) => {
    const items = [];
    const re = ordered ? /^\s*\d+\.\s+(.*)$/ : /^\s*[-*]\s+(.*)$/;
    while (i < lines.length && re.test(lines[i])) {
      items.push(`<li>${inline(lines[i].match(re)[1])}</li>`);
      i += 1;
    }
    out.push(`<${ordered ? 'ol' : 'ul'}>\n${items.join('\n')}\n</${ordered ? 'ol' : 'ul'}>`);
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i += 1; continue; }

    const heading = line.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      out.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      i += 1;
      continue;
    }

    if (/^\s*(---|\*\*\*)\s*$/.test(line)) { out.push('<hr>'); i += 1; continue; }

    const image = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/);
    if (image) {
      out.push(`<figure class="article__figure"><img src="${image[2]}" alt="${esc(image[1])}" loading="lazy" decoding="async"></figure>`);
      i += 1;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) { flushList(false); continue; }
    if (/^\s*\d+\.\s+/.test(line)) { flushList(true); continue; }

    if (/^>\s?/.test(line)) {
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ''));
        i += 1;
      }
      out.push(`<blockquote><p>${inline(quote.join(' ').trim())}</p></blockquote>`);
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,4}\s|>\s?|\s*[-*]\s|\s*\d+\.\s|!\[)/.test(lines[i]) && !/^\s*(---|\*\*\*)\s*$/.test(lines[i])) {
      para.push(lines[i].trim());
      i += 1;
    }
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
  }

  return out.join('\n');
}

/** First paragraph of a post, as plain text — used for excerpts and meta descriptions. */
export function firstParagraph(body) {
  const match = String(body).replace(/\r\n/g, '\n').split('\n\n').find((block) => {
    const t = block.trim();
    return t && !/^(#|>|!\[|-|\*|\d+\.)/.test(t);
  });
  return match ? match.replace(/\s+/g, ' ').replace(/[*`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim() : '';
}

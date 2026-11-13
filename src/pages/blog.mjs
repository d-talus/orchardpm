import { site } from '../data/site.mjs';
import { hero, postCard, postLead, postGrid, ctaBand } from '../lib/modules.mjs';
import { join, esc, plain } from '../lib/html.mjs';

const PER_PAGE = 9;

/* Category links double as the blog's navigation. They are ordinary links, so
   they work without JavaScript and read correctly to a screen reader. */
function categoryNav(categories, activeSlug) {
  const items = [{ slug: '', name: 'All articles', url: '/blog/' }, ...categories]
    .map(
      (c) =>
        `<a class="post-filter" href="${c.url}"${(activeSlug || '') === c.slug ? ' aria-current="true"' : ''}>${esc(c.name)}</a>`
    )
    .join('\n          ');
  return `<nav class="post-filters" aria-label="Article categories">\n          ${items}\n        </nav>`;
}

function pagination(current, total, baseUrl) {
  if (total <= 1) return '';
  const link = (n) => (n === 1 ? baseUrl : `${baseUrl}page/${n}/`);
  const parts = [];
  if (current > 1) parts.push(`<a href="${link(current - 1)}" rel="prev" aria-label="Previous page">&larr;</a>`);
  for (let n = 1; n <= total; n += 1) {
    parts.push(n === current ? `<span aria-current="page">${n}</span>` : `<a href="${link(n)}">${n}</a>`);
  }
  if (current < total) parts.push(`<a href="${link(current + 1)}" rel="next" aria-label="Next page">&rarr;</a>`);
  return `<nav class="pagination" aria-label="Blog pages">${parts.join('')}</nav>`;
}

/* A short contents list built from the h2 headings the Markdown renderer gave
   ids to, so a long article stays navigable on a phone. */
function tableOfContents(html) {
  const headings = [...String(html).matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: plain(m[2]),
  }));
  if (headings.length < 3) return '';
  return `<nav class="toc" aria-label="On this page">
            <h2>On this page</h2>
            <ol>
              ${headings.map((h) => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join('\n              ')}
            </ol>
          </nav>`;
}

/** The /blog/ index, paginated, with the newest article given a wider card. */
export function blogIndexPages({ posts, categories }) {
  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const pages = [];

  for (let p = 1; p <= totalPages; p += 1) {
    const slice = posts.slice((p - 1) * PER_PAGE, p * PER_PAGE);
    const featured = p === 1 ? slice[0] : null;
    const rest = featured ? slice.slice(1) : slice;
    const path = p === 1 ? '/blog/' : `/blog/page/${p}/`;

    const body = join(
      hero({
        compact: true,
        graphic: true,
        crumbs: [{ label: 'Blog', href: '/blog/' }],
        eyebrow: 'Blog',
        title: p === 1 ? 'Notes on New Jersey property management' : `Notes on New Jersey property management, page ${p}`,
        lede:
          'Practical writing for the owners, managers, accountants, and technicians who keep managed property running. No press releases.',
      }),

      `<section class="section">
        <div class="container">
          <h2 class="sr-only">${p === 1 ? 'Latest articles' : `Articles, page ${p}`}</h2>
          ${categoryNav(categories, '')}
          ${featured ? postLead(featured) : ''}
          ${rest.length ? `<div class="grid grid--3 grid--stretch"${featured ? ' style="margin-top:var(--grid-gap)"' : ''}>
            ${rest.map(postCard).join('\n            ')}
          </div>` : ''}
          ${pagination(p, totalPages, '/blog/')}
        </div>
      </section>`,

      ctaBand({
        title: 'Want to talk about your own company?',
        lede: 'One confidential call, with no expectation that anything follows it.',
        actions: [{ label: 'Start a conversation', href: '/sell-your-business/#contact', variant: 'btn--primary' }],
        variant: 'section--surface',
      })
    );

    pages.push({
      id: 'blog-index',
      path,
      title: p === 1 ? 'Blog: New Jersey property management insight' : `Blog, page ${p}`,
      description:
        'Articles from Orchard Property Management on selling a management firm, running one well, and working in New Jersey property management.',
      crumbs: [{ label: 'Blog', href: '/blog/' }],
      noindex: p > 1,
      body,
      schema:
        p === 1
          ? [
              {
                '@type': 'Blog',
                '@id': `${site.url}/blog/#blog`,
                name: `${site.name} blog`,
                url: `${site.url}/blog/`,
                publisher: { '@id': `${site.url}/#organization` },
                blogPost: posts.slice(0, 10).map((post) => ({
                  '@type': 'BlogPosting',
                  headline: post.title,
                  url: site.url + post.url,
                  datePublished: post.date,
                })),
              },
            ]
          : [],
    });
  }

  return pages;
}

/** One archive page per category, so each topic has a page worth ranking. */
export function categoryPages({ categories, postsByCategory }) {
  return categories.map((cat) => {
    const posts = postsByCategory[cat.slug] || [];
    const body = join(
      hero({
        compact: true,
        graphic: true,
        crumbs: [
          { label: 'Blog', href: '/blog/' },
          { label: cat.name, href: cat.url },
        ],
        eyebrow: 'Blog',
        title: cat.name,
        lede: cat.description,
      }),

      `<section class="section">
        <div class="container">
          <h2 class="sr-only">Articles about ${esc(cat.name.toLowerCase())}</h2>
          ${categoryNav(categories, cat.slug)}
          <div class="grid grid--3 grid--stretch">
            ${posts.map(postCard).join('\n            ')}
          </div>
        </div>
      </section>`,

      ctaBand({
        title: 'Have a question we have not written about yet?',
        lede: 'Ask it directly and we will answer, on the phone or in a future article.',
        actions: [{ label: 'Contact Orchard', href: '/contact/', variant: 'btn--primary' }],
        variant: 'section--surface',
      })
    );

    return {
      id: `blog-category-${cat.slug}`,
      path: cat.url,
      title: `${cat.name}: articles from Orchard`,
      description: cat.description,
      crumbs: [
        { label: 'Blog', href: '/blog/' },
        { label: cat.name, href: cat.url },
      ],
      body,
      schema: [
        {
          '@type': 'CollectionPage',
          name: cat.name,
          url: site.url + cat.url,
          description: cat.description,
          isPartOf: { '@id': `${site.url}/blog/#blog` },
        },
      ],
    };
  });
}

export function postPage(post, related) {
  const body = join(
    hero({
      compact: true,
      graphic: true,
      crumbs: [
        { label: 'Blog', href: '/blog/' },
        { label: post.categoryName, href: post.categoryUrl },
      ],
      eyebrow: post.categoryName,
      title: post.title,
      lede: post.summary,
    }),

    `<section class="section">
      <div class="container">
        <article class="article">
          <p class="article__meta">
            <time datetime="${post.date}">${esc(post.dateLabel)}</time>
            &middot; ${esc(post.readingTime)} read
            ${post.author && post.author !== site.name ? `&middot; ${esc(post.author)}` : ''}
          </p>
          ${post.image ? `<div class="article__hero"><img src="${post.image}" alt="${esc(post.imageAlt || '')}" width="1200" height="514" decoding="async"></div>` : ''}
          ${tableOfContents(post.html)}
          <div class="article__body">
            ${post.html}
          </div>
          <p class="article__share">Questions about anything here? <a href="/contact/">Write to us</a>.</p>
        </article>
      </div>
    </section>`,

    related.length
      ? postGrid({
          eyebrow: 'Keep reading',
          title: 'Related articles',
          posts: related,
          columns: 3,
          variant: 'section--surface',
        })
      : '',

    ctaBand({
      title: 'Thinking about what comes next for your company?',
      lede: 'Start with a conversation. Nothing moves until you want it to.',
      actions: [
        { label: 'Sell your business', href: '/sell-your-business/', variant: 'btn--primary' },
        { label: 'Careers at Orchard', href: '/careers/', variant: 'btn--on-dark' },
      ],
      variant: related.length ? '' : 'section--surface',
    })
  );

  return {
    id: `post-${post.slug}`,
    path: post.url,
    title: post.title,
    description: post.summary,
    crumbs: [
      { label: 'Blog', href: '/blog/' },
      { label: post.categoryName, href: post.categoryUrl },
      { label: post.title, href: post.url },
    ],
    ogType: 'article',
    ogImage: post.image || '/assets/img/og-default.jpg',
    articleMeta: join(
      `<meta property="article:published_time" content="${post.date}">`,
      post.updated ? `<meta property="article:modified_time" content="${post.updated}">` : '',
      `<meta property="article:section" content="${esc(post.categoryName)}">`,
      ...(post.tags || []).map((t) => `<meta property="article:tag" content="${esc(t)}">`)
    ),
    body,
    schema: [
      {
        '@type': 'BlogPosting',
        '@id': `${site.url}${post.url}#article`,
        headline: post.title,
        description: post.summary,
        url: site.url + post.url,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        wordCount: post.wordCount,
        articleSection: post.categoryName,
        keywords: (post.tags || []).join(', '),
        image: site.url + (post.image || '/assets/img/og-default.jpg'),
        inLanguage: site.language,
        // Posts written in Orchard's voice are authored by the organization, not a person.
        author:
          !post.author || post.author === site.name
            ? { '@id': `${site.url}/#organization` }
            : { '@type': 'Person', name: post.author },
        publisher: { '@id': `${site.url}/#organization` },
        isPartOf: { '@id': `${site.url}/blog/#blog` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}${post.url}` },
      },
    ],
  };
}

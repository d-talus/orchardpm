import { site, serviceAreas } from '../data/site.mjs';
import { hero, formSection, featureGrid, ctaBand, sectionHead } from '../lib/modules.mjs';
import { join, esc } from '../lib/html.mjs';

/* ---------------------------------------------------------------- contact */

export function contactPage() {
  const body = join(
    hero({
      compact: true,
      graphic: true,
      crumbs: [{ label: 'Contact', href: '/contact/' }],
      eyebrow: 'Contact',
      title: 'Start a conversation with Orchard',
      lede:
        'Whether you own a firm, work in property management, or simply want to understand what we do, your message reaches a person rather than a queue.',
    }),

    `<section class="section section--tight">
      <div class="container">
        <h2 class="sr-only">Ways to reach ${esc(site.name)}</h2>
        <div class="grid grid--3 grid--stretch">
          <div class="card">
            <h3>Owners</h3>
            <p>Thinking about selling, or curious what a partnership looks like? Everything stays confidential, including the fact that we spoke.</p>
            <p><a class="link-arrow" href="/sell-your-business/">Sell your business</a></p>
          </div>
          <div class="card">
            <h3>Managers and technicians</h3>
            <p>Tell us your role, your licenses, and where you want to work, and we will point you to the right company in our group.</p>
            <p><a class="link-arrow" href="/careers/">See careers</a></p>
          </div>
          <div class="card">
            <h3>Everyone else</h3>
            <p>Brokers, advisers, attorneys, vendors, and local press are all welcome to write. Use the form below or email us directly.</p>
            <p><a class="link-arrow" href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
          </div>
        </div>
      </div>
    </section>`,

    formSection({
      eyebrow: 'Send a message',
      title: 'Write to us',
      lede: 'We read every message and reply personally.',
      intro: [
        `${esc(site.name)} is based in New Jersey and works across the state and the areas around it. You can reach our founder directly at <a href="mailto:${site.email}">${site.email}</a>.`,
        'If your message concerns a possible sale, say so and we will treat it as confidential from the first reply.',
      ],
      formName: 'general-contact',
      fields: [
        { name: 'first_name', label: 'First name', required: true, autocomplete: 'given-name' },
        { name: 'last_name', label: 'Last name', required: true, autocomplete: 'family-name' },
        { name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' },
        { name: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel' },
        {
          name: 'topic',
          label: 'What is this about?',
          type: 'select',
          required: true,
          span: true,
          options: [
            'Selling my business',
            'A job in property management',
            'I represent an owner',
            'Vendor or partner',
            'Media',
            'Something else',
          ],
        },
        { name: 'message', label: 'Your message', type: 'textarea', required: true, span: true },
      ],
      submitLabel: 'Send message',
      footnote: 'We use your details only to answer your message. We never sell or share them.',
      id: 'contact',
    })
  );

  return {
    id: 'contact',
    path: '/contact/',
    title: 'Contact Orchard Property Management',
    description:
      'Contact Orchard Property Management about selling a New Jersey management firm, a job in property management, or a partnership. Messages reach our founder and stay confidential.',
    crumbs: [{ label: 'Contact', href: '/contact/' }],
    body,
    schema: [
      {
        '@type': 'ContactPage',
        name: `Contact ${site.name}`,
        url: `${site.url}/contact/`,
        mainEntity: { '@id': `${site.url}/#organization` },
      },
    ],
  };
}

/* ----------------------------------------------------------- service areas */

export function serviceAreasPage() {
  const regions = serviceAreas
    .map(
      (r) => `<article class="card">
          <h3>${esc(r.region)}</h3>
          <p>${esc(r.blurb)}</p>
          <ul class="checklist">${r.counties.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
        </article>`
    )
    .join('\n        ');

  const body = join(
    hero({
      compact: true,
      graphic: true,
      crumbs: [{ label: 'Service areas', href: '/service-areas/' }],
      eyebrow: 'Where we work',
      title: 'New Jersey first, and the areas around it',
      lede:
        'Orchard Property Management looks for firms across all twenty-one New Jersey counties, and we will travel over the state line when the portfolio and the client base look like ours.',
    }),

    `<section class="section">
      <div class="container">
        ${sectionHead({
          eyebrow: 'Coverage',
          title: 'The regions we are actively looking in',
          lede:
            'Every part of this state has buildings, communities, and commercial property that somebody manages. The mix simply changes as you move from the Hudson waterfront toward the shore.',
        })}
        <div class="grid grid--2 grid--stretch">
          ${regions}
        </div>
      </div>
    </section>`,

    `<section class="section section--surface">
      <div class="container container--narrow">
        <h2>Why New Jersey</h2>
        <p>New Jersey is the most densely populated state in the country, and a great deal of that density lives in property somebody manages professionally. Condominium and homeowner associations sit alongside apartment portfolios, rental houses, retail centers, and flex industrial space, often within a few miles of each other.</p>
        <p>That mix suits a platform like ours. A community association manager in Monmouth County and a commercial manager in Bergen County serve very different clients, and they face the same pressures: hiring accountants, keeping good managers, replacing software that nobody likes, and running a back office that nobody started a firm to run.</p>
        <p>We are a New Jersey company and we expect to stay one. When we look across the state line, it is because a firm there serves the same kind of client in the same kind of way.</p>
      </div>
    </section>`,

    ctaBand({
      title: 'Not sure whether your area is on our list?',
      lede: 'Ask. We would much rather hear from a strong firm outside our map than miss it.',
      actions: [{ label: 'Start a conversation', href: '/sell-your-business/#contact', variant: 'btn--primary' }],
      variant: '',
    })
  );

  return {
    id: 'service-areas',
    path: '/service-areas/',
    title: 'Service areas across New Jersey',
    description:
      'Orchard Property Management partners with management firms across all twenty-one New Jersey counties, plus eastern Pennsylvania, Rockland and Orange County, and northern Delaware.',
    crumbs: [{ label: 'Service areas', href: '/service-areas/' }],
    body,
  };
}

/* ------------------------------------------------------------ thank you */

export function thanksPage() {
  const body = join(
    hero({
      compact: true,
      center: true,
      graphic: true,
      eyebrow: 'Message received',
      title: 'Thank you. We will be in touch.',
      lede: `Someone from ${site.name} reads every message and replies personally.`,
      actions: [{ label: 'Back to the home page', href: '/', variant: 'btn--primary' }],
    }),
    `<section class="section">
      <div class="container container--narrow">
        <h2>What happens next</h2>
        <p>If you wrote to us about your company, ${esc(site.founder.firstName)} reads it personally and replies himself. The first conversation is a phone call rather than a document request, and nothing you tell us goes beyond Orchard.</p>
        <p>If you wrote about a job, we route your details to the company in our group closest to you that is hiring for your role, and you will hear from someone there.</p>
        <p>In the meantime, you might find these useful.</p>
        <p><a class="link-arrow" href="/sell-your-business/#process">How a partnership works, step by step</a></p>
        <p><a class="link-arrow" href="/blog/">Articles for owners, managers, and technicians</a></p>
      </div>
    </section>`
  );

  return {
    id: 'thanks',
    path: '/thank-you/',
    title: 'Thank you',
    description: `Thank you for contacting ${site.name}. Every message reaches a person here rather than a queue, and we reply personally.`,
    noindex: true,
    body,
  };
}

/* --------------------------------------------------------------- legal */

export function privacyPage() {
  const body = join(
    hero({
      compact: true,
      graphic: true,
      crumbs: [{ label: 'Privacy policy', href: '/privacy/' }],
      eyebrow: 'Legal',
      title: 'Privacy policy',
      lede: `How ${site.name} handles the information you send us.`,
    }),
    `<section class="section">
      <div class="container container--narrow">
        <p class="text-muted">Last updated: November 2026</p>

        <h2>What we collect</h2>
        <p>We collect the information you choose to give us through the forms on this site or by email. Depending on the form, that includes your name, email address, phone number, company name, location, role, and anything you write in a message field. We do not ask for financial account details, Social Security numbers, or other sensitive personal information through this website.</p>
        <p>Our hosting provider records standard server information such as internet protocol (IP) address, browser type, and the pages requested. We use that only to keep the site running and secure.</p>

        <h2>How we use it</h2>
        <p>We use what you send us to reply to you, to evaluate a possible business partnership, or to match you with a hiring company in the Orchard group. We do not sell your information, and we do not share it with advertisers.</p>
        <p>We share information with service providers who help us operate, such as our website host and our email provider, and only to the extent they need it to do that work. We also share information where the law requires it.</p>

        <h2>Confidentiality for business owners</h2>
        <p>If you contact us about a possible sale, we treat the fact of the conversation as confidential. We do not contact your employees, clients, board members, or vendors without your written permission, and we are glad to sign a mutual non-disclosure agreement before you share anything substantive.</p>

        <h2>How long we keep it</h2>
        <p>We keep inquiries for as long as the relationship is active and for a reasonable period afterward, so that we can pick the conversation back up if you return to it. You can ask us to delete your information at any time.</p>

        <h2>Cookies</h2>
        <p>This site does not set advertising or tracking cookies. If we add analytics in the future, we will update this policy and describe what is collected before turning it on.</p>

        <h2>Your choices</h2>
        <p>Write to us at <a href="mailto:${esc(site.email)}">${esc(site.email)}</a> to see what we hold about you, correct it, or ask us to delete it. We respond to these requests within thirty days.</p>

        <h2>Children</h2>
        <p>This site addresses a business audience and is not directed at children under thirteen. We do not knowingly collect information from them.</p>

        <h2>Changes</h2>
        <p>If we change this policy, we will post the new version here with an updated date.</p>

        <h2>Contact</h2>
        <p>Questions about this policy go to <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>.</p>
      </div>
    </section>`
  );

  return {
    id: 'privacy',
    path: '/privacy/',
    title: 'Privacy policy',
    description: `How ${site.name} collects, uses, and protects the information you send through this website.`,
    crumbs: [{ label: 'Privacy policy', href: '/privacy/' }],
    body,
  };
}

export function accessibilityPage() {
  const body = join(
    hero({
      compact: true,
      graphic: true,
      crumbs: [{ label: 'Accessibility', href: '/accessibility/' }],
      eyebrow: 'Legal',
      title: 'Accessibility statement',
      lede: 'We want this site to work for everyone who visits it.',
    }),
    `<section class="section">
      <div class="container container--narrow">
        <p class="text-muted">Last updated: November 2026</p>
        <h2>Our aim</h2>
        <p>${esc(site.name)} aims to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA. We build the site with semantic headings and landmarks, visible keyboard focus, text alternatives for images, color contrast that meets the AA threshold for body text, and layouts that reflow down to a 320 pixel viewport.</p>
        <h2>Known limits</h2>
        <p>Accessibility work is never finished, and some of our photography carries decorative value rather than information. Where an image conveys meaning, we describe it in the alternative text.</p>
        <h2>Tell us about a problem</h2>
        <p>If something on this site is hard to use with a screen reader, a keyboard, or magnification, write to <a href="mailto:${esc(site.email)}">${esc(site.email)}</a> and describe what happened. We will reply within five business days and tell you what we are doing about it.</p>
        <p>If you need information from this site in another format, ask and we will send it.</p>
      </div>
    </section>`
  );

  return {
    id: 'accessibility',
    path: '/accessibility/',
    title: 'Accessibility statement',
    description: `${site.name} aims to meet WCAG 2.1 level AA. Tell us if something on this site is hard to use and we will fix it.`,
    crumbs: [{ label: 'Accessibility', href: '/accessibility/' }],
    body,
  };
}

export function notFoundPage() {
  const body = join(
    hero({
      compact: true,
      center: true,
      graphic: true,
      eyebrow: 'Page not found',
      title: 'We could not find that page',
      lede:
        'The link may be out of date, or the address may have a typo in it. These are the places people usually want.',
      actions: [
        { label: 'Go to the home page', href: '/', variant: 'btn--primary' },
        { label: 'Contact us', href: '/contact/', variant: 'btn--on-dark' },
      ],
    }),
    featureGrid({
      title: 'Try one of these',
      items: [
        {
          icon: 'handshake',
          title: 'Sell your business',
          body: 'How a partnership with Orchard works, from the first call to the day after closing.',
          href: '/sell-your-business/',
          linkLabel: 'Read more',
        },
        {
          icon: 'users',
          title: 'Careers at Orchard',
          body: 'Roles across our New Jersey companies, and how hiring works.',
          href: '/careers/',
          linkLabel: 'See roles',
        },
        {
          icon: 'building',
          title: 'What we do',
          body: 'The four kinds of management firm we partner with and what we look for in each.',
          href: '/what-we-do/',
          linkLabel: 'See the four',
        },
      ],
      columns: 3,
      center: false,
    })
  );

  return {
    id: 'not-found',
    path: '/404.html',
    rawPath: true,
    title: 'Page not found',
    description: `That page is not here. Find what you were looking for on the ${site.name} home page, the firms we partner with, or our careers page.`,
    noindex: true,
    body,
  };
}

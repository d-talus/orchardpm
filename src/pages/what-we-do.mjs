import { site, specialties, executiveSupport } from '../data/site.mjs';
import { hero, featureGrid, twoColumnList, ctaBand } from '../lib/modules.mjs';
import { join, esc } from '../lib/html.mjs';

export function whatWeDoPage() {
  const body = join(
    hero({
      compact: true,
      graphic: true,
      crumbs: [{ label: 'What we do', href: '/what-we-do/' }],
      eyebrow: 'What we do',
      title: 'Four kinds of management firm across New Jersey',
      lede:
        'Orchard Property Management acquires and operates the companies that manage homes, communities, and commercial property across New Jersey and the areas around it.',
    }),

    `<section class="section">
      <div class="container container--narrow">
        <p class="lead">We operate the companies we buy. We do not raise a fund, place a bet, and move on.</p>
        <p>Orchard Property Management acquires New Jersey management firms and runs them for the long term. We keep the local brand, the local leadership, and the staff, and we supply the capital, technology, and back-office depth that a strong independent firm usually cannot justify on its own.</p>
        <p>The four kinds of firm below share a useful quality. Each earns revenue that renews rather than revenue that has to be won again every quarter, each depends on people who are genuinely hard to replace, and each rewards the companies that answer the phone and follow through. Those are the businesses we want to own.</p>
      </div>
    </section>`,

    featureGrid({
      eyebrow: 'Where we partner',
      title: 'The firms we look for',
      items: specialties.map((s) => ({
        icon: s.icon,
        title: s.name,
        body: s.summary,
        href: `/what-we-do/${s.slug}/`,
        linkLabel: 'See what we look for',
      })),
      columns: 4,
      variant: 'section--surface',
      center: false,
    }),

    featureGrid({
      eyebrow: 'Executive support',
      title: 'What sits behind every Orchard company',
      lede:
        'A comprehensive suite of executive support services lets our operators stay focused on clients and employees, with access to specialists at every stage of growth.',
      items: executiveSupport.map((s) => ({ icon: s.icon, title: s.title, body: s.body })),
      columns: 4,
      center: false,
      id: 'support',
    }),

    twoColumnList({
      eyebrow: 'How we operate',
      title: 'Local in front, supported behind',
      lede:
        'An Orchard firm looks the same to a client the day after closing as it did the day before. Same name, same manager, same phone number, same reporting. The change sits behind the counter.',
      columns: [
        {
          icon: 'handshake',
          title: 'If you own one of these firms',
          body:
            'We buy for the long term, keep your people, and protect the name you built. The process stays confidential from the first call and moves at the pace you set.',
          list: [
            'Employees retained, with their portfolios and seniority intact',
            'Owner reporting and board meetings uninterrupted',
            'Accounting, software, and staffing funded',
            'Local leadership kept in place',
          ],
        },
        {
          icon: 'users',
          title: 'If you work in one of these firms',
          body:
            'You work for the local company with the local team, backed by a parent that funds the hiring and pays for the credentials.',
          list: [
            'Credential and continuing education costs covered',
            'Accounting and administrative support that takes work off your desk',
            'Promotion from inside wherever the person exists to promote',
            'Movement between Orchard companies when you want a change',
          ],
        },
      ],
      variant: 'section--surface',
    }),

    ctaBand({
      title: 'Which conversation would you like to have?',
      actions: [
        { label: 'Sell your business', href: '/sell-your-business/', variant: 'btn--primary' },
        { label: 'Work with us', href: '/careers/', variant: 'btn--on-dark' },
      ],
      variant: '',
    })
  );

  return {
    id: 'what-we-do',
    path: '/what-we-do/',
    title: 'Property management firms we partner with in NJ',
    description:
      'Orchard Property Management acquires and operates New Jersey residential, community association, commercial, and maintenance firms, keeping local brands, managers, and staff in place.',
    crumbs: [{ label: 'What we do', href: '/what-we-do/' }],
    body,
    schema: [
      {
        '@type': 'ItemList',
        name: 'Property management specialties Orchard Property Management partners in',
        itemListElement: specialties.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.name,
          url: `${site.url}/what-we-do/${s.slug}/`,
        })),
      },
    ],
  };
}

export function specialtyPage(specialty) {
  const others = specialties.filter((s) => s.slug !== specialty.slug);

  const bodySections = specialty.body
    .map(
      (sec, i) => `<section class="section${i % 2 === 1 ? ' section--surface' : ''}">
      <div class="container container--narrow">
        <h2>${esc(sec.heading)}</h2>
        ${sec.paragraphs.map((p) => `<p>${p}</p>`).join('\n        ')}
      </div>
    </section>`
    )
    .join('\n');

  const evenTail = specialty.body.length % 2 === 1;

  const body = join(
    hero({
      compact: true,
      graphic: true,
      crumbs: [
        { label: 'What we do', href: '/what-we-do/' },
        { label: specialty.shortName, href: `/what-we-do/${specialty.slug}/` },
      ],
      eyebrow: 'What we do',
      title: `${specialty.name} in New Jersey`,
      lede: specialty.heroLede,
      actions: [
        { label: 'Sell your business', href: '/sell-your-business/', variant: 'btn--primary' },
        { label: 'Work in this field', href: '/careers/', variant: 'btn--on-dark' },
      ],
    }),

    twoColumnList({
      eyebrow: 'Partnership',
      title: `What we look for in a ${specialty.name.toLowerCase()} firm`,
      lede:
        'Treat these as guidelines rather than rules. If your company is strong and sits close to this description, we would still like to talk.',
      columns: [
        { icon: 'growth', title: 'What makes a good fit', list: specialty.whatWeLookFor },
        { icon: 'wrench', title: 'What we invest in after closing', list: specialty.weInvestIn },
      ],
    }),

    bodySections,

    ctaBand({
      title: `Own a ${specialty.name.toLowerCase()} firm in New Jersey?`,
      lede: 'One confidential call, no obligation, and an honest answer quickly if the fit is wrong.',
      actions: [
        { label: 'Start a conversation', href: '/sell-your-business/#contact', variant: 'btn--primary' },
        { label: `Email ${site.email}`, href: `mailto:${site.email}`, variant: 'btn--on-dark' },
      ],
      variant: evenTail ? '' : 'section--surface',
    }),

    featureGrid({
      eyebrow: 'Also in our group',
      title: 'The other firms we partner with',
      items: others.map((s) => ({
        icon: s.icon,
        title: s.name,
        body: s.summary,
        href: `/what-we-do/${s.slug}/`,
        linkLabel: 'See what we look for',
      })),
      columns: 3,
      center: false,
      variant: evenTail ? 'section--surface' : '',
    })
  );

  return {
    id: `specialty-${specialty.slug}`,
    path: `/what-we-do/${specialty.slug}/`,
    title: `${specialty.name} in New Jersey`,
    description: `${specialty.summary} Orchard Property Management partners with New Jersey firms and keeps their teams and names in place.`,
    crumbs: [
      { label: 'What we do', href: '/what-we-do/' },
      { label: specialty.shortName, href: `/what-we-do/${specialty.slug}/` },
    ],
    body,
    schema: [
      {
        '@type': 'Service',
        name: `${specialty.name} company partnerships`,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: { '@type': 'State', name: 'New Jersey' },
        serviceType: specialty.name,
        description: specialty.summary,
      },
    ],
  };
}

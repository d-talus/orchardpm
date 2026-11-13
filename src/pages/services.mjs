import { site } from '../data/site.mjs';
import { services, serviceFeatures, newJerseyNotes } from '../data/services.mjs';
import { hero, featureGrid, twoColumnList, ctaBand, formSection } from '../lib/modules.mjs';
import { join, esc } from '../lib/html.mjs';

const serviceCards = (list) =>
  list.map((s) => ({
    icon: s.icon,
    title: s.name,
    body: s.summary,
    href: `/services/${s.slug}/`,
    linkLabel: 'What this covers',
  }));

const proposalForm = (variant = 'section--surface') =>
  formSection({
    eyebrow: 'Request a proposal',
    title: 'Tell us about your property',
    lede: 'Send the details and we will put you with the right company in our group.',
    intro: [
      'Boards and owners usually want three things before they switch: a straight answer on price, a clear picture of who would actually manage the property, and a transition plan that does not create a gap. We cover all three before you sign anything.',
      `If you would rather write directly, email <a href="mailto:${site.email}">${site.email}</a>.`,
    ],
    formName: 'proposal-request',
    fields: [
      { name: 'first_name', label: 'First name', required: true, autocomplete: 'given-name' },
      { name: 'last_name', label: 'Last name', required: true, autocomplete: 'family-name' },
      { name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' },
      { name: 'phone', label: 'Phone', type: 'tel', required: true, autocomplete: 'tel' },
      { name: 'organization', label: 'Community, building, or company', required: true, span: true, autocomplete: 'organization' },
      { name: 'town', label: 'Town or county', required: true, autocomplete: 'address-level2' },
      {
        name: 'role',
        label: 'Your role',
        type: 'select',
        required: true,
        options: [
          'Board member or trustee',
          'Property owner',
          'Developer or sponsor',
          'Self-managed board',
          'Resident or homeowner',
          'Something else',
        ],
      },
      {
        name: 'property_type',
        label: 'What you need managed',
        type: 'select',
        required: true,
        options: [...services.map((s) => s.name), 'More than one of these', 'Not sure yet'],
      },
      { name: 'size', label: 'Number of units or homes', placeholder: 'A rough number is fine' },
      {
        name: 'message',
        label: 'What are you trying to solve?',
        type: 'textarea',
        span: true,
        placeholder: 'Current manager, contract end date, and what is not working today',
      },
    ],
    submitLabel: 'Request a proposal',
    footnote:
      'We use these details only to prepare a proposal and to contact you about it. We never sell or share them.',
    variant,
    id: 'proposal',
  });

/* ------------------------------------------------------------------ index */

export function servicesPage() {
  const body = join(
    hero({
      graphic: true,
      crumbs: [{ label: 'Services', href: '/services/' }],
      eyebrow: 'Services',
      title: 'Property management across New Jersey, run by people who live here',
      lede:
        'Orchard Property Management companies manage community associations, apartment buildings, townhome communities, rentals, and commercial property across the state. The firm you deal with is local. The accounting, technology, and support behind it are not.',
      actions: [
        { label: 'Request a proposal', href: '#proposal', variant: 'btn--primary' },
        { label: 'See what we manage', href: '#what-we-manage', variant: 'btn--on-dark' },
      ],
    }),

    `<section class="section">
      <div class="container container--narrow">
        <p class="eyebrow">How this works</p>
        <h2>Locally led, centrally supported</h2>
        <p class="lead">You hire a local firm with a local manager. Orchard supplies everything behind that manager which a small company cannot build on its own.</p>
        <p>Orchard Property Management acquires established management firms and keeps them in place, with their name, their leadership, and their people. For a board or an owner, that means the person who knows your property stays, and the firm they work for gains an accounting department, a technology budget, a recruiting function, and the purchasing power of a group rather than a single office.</p>
        <p>Most firms in this industry sit at one end of a trade-off. A small local company knows your property and answers the phone, and struggles with staffing and systems. A national company has the systems and treats your community as one account in a portfolio. We are trying to take the useful half of each.</p>
        <p><a class="link-arrow" href="/about/">Read how Orchard is put together</a></p>
      </div>
    </section>`,

    featureGrid({
      eyebrow: 'What we manage',
      title: 'Five kinds of property, one standard of service',
      lede:
        'Each of these asks for something different from a manager. The common thread is that somebody has to answer when a system fails, a budget needs defending, or a resident needs an answer.',
      items: serviceCards(services),
      columns: 3,
      variant: 'section--surface',
      center: false,
      id: 'what-we-manage',
    }),

    featureGrid({
      eyebrow: 'What every property gets',
      title: 'The work behind the management agreement',
      lede:
        'These capabilities sit behind every property an Orchard company manages, whatever its type and wherever it is. They are the reason a local firm joining us can take on work it could not have taken on alone.',
      items: serviceFeatures,
      columns: 3,
      center: false,
      id: 'capabilities',
    }),

    featureGrid({
      eyebrow: 'New Jersey',
      title: 'What changes when the property is here',
      lede:
        'Property management is a local trade wearing a national job title. The service list looks much the same from one state to the next, and the rules underneath it do not. These are the differences that catch owners and boards out in New Jersey.',
      items: newJerseyNotes,
      columns: 3,
      cardClass: 'card--dark',
      variant: 'section--dark',
      center: false,
      id: 'new-jersey',
    }),

    `<section class="section">
      <div class="container container--narrow">
        <h2>How a transition actually goes</h2>
        <p>Changing managers worries boards more than almost anything else, and the fear is reasonable. A bad handover loses records, misses an assessment cycle, and leaves vendors unpaid while everyone works out who is responsible.</p>
        <p>We run the handover as a defined project rather than a scramble. Before the start date we collect the financial records, the governing documents, the vendor contracts and insurance certificates, the resident and owner roster, and the open maintenance items. We open and reconcile the bank accounts, confirm the assessment or rent billing for the first cycle, and introduce the manager to the board or the owner in person.</p>
        <p>Residents hear from us once, clearly, about what changes for them, which is usually nothing beyond a new payment portal. The work that used to sit with the outgoing manager is covered from day one.</p>
        <p><a class="link-arrow" href="#proposal">Ask us what a transition would look like for your property</a></p>
      </div>
    </section>`,

    proposalForm(),

    ctaBand({
      title: 'Own a management firm rather than a property?',
      lede: 'We partner with established New Jersey firms and hold them for the long term. That conversation starts here.',
      actions: [
        { label: 'Sell your business', href: '/sell-your-business/', variant: 'btn--primary' },
        { label: 'Who we partner with', href: '/what-we-do/', variant: 'btn--on-dark' },
      ],
      variant: '',
    })
  );

  return {
    id: 'services',
    path: '/services/',
    title: 'New Jersey property management services',
    description:
      'Orchard Property Management companies manage community associations, high-rise buildings, townhome communities, rentals, and commercial property across New Jersey. Request a proposal.',
    crumbs: [{ label: 'Services', href: '/services/' }],
    body,
    schema: [
      {
        '@type': 'ItemList',
        name: 'Property management services from Orchard Property Management',
        itemListElement: services.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.name,
          url: `${site.url}/services/${s.slug}/`,
        })),
      },
    ],
  };
}

/* ------------------------------------------------------------ detail page */

export function servicePage(service) {
  const others = services.filter((s) => s.slug !== service.slug);

  const bodySections = service.body
    .map(
      (sec, i) => `<section class="section${i % 2 === 1 ? ' section--surface' : ''}">
      <div class="container container--narrow">
        <h2>${esc(sec.heading)}</h2>
        ${sec.paragraphs.map((p) => `<p>${p}</p>`).join('\n        ')}
      </div>
    </section>`
    )
    .join('\n');

  const evenTail = service.body.length % 2 === 1;

  const body = join(
    hero({
      compact: true,
      graphic: true,
      crumbs: [
        { label: 'Services', href: '/services/' },
        { label: service.shortName, href: `/services/${service.slug}/` },
      ],
      eyebrow: 'Services',
      title: `${service.name} in New Jersey`,
      lede: service.heroLede,
      actions: [
        { label: 'Request a proposal', href: '#proposal', variant: 'btn--primary' },
        { label: 'See what every property gets', href: '/services/#capabilities', variant: 'btn--on-dark' },
      ],
    }),

    twoColumnList({
      eyebrow: 'Scope',
      title: `What ${service.name.toLowerCase()} covers`,
      lede:
        'Every property is a little different, and a proposal spells out exactly where the line sits. This is the shape of the work.',
      columns: [
        { icon: 'community', title: 'Who this is for', list: service.whoItIsFor },
        { icon: 'wrench', title: 'What we handle', list: service.whatWeHandle },
      ],
    }),

    bodySections,

    ctaBand({
      title: `Looking at ${service.name.toLowerCase()} for your property?`,
      lede: 'Tell us what you have and what is not working today. A proposal follows, with no pressure behind it.',
      actions: [
        { label: 'Request a proposal', href: '#proposal', variant: 'btn--primary' },
        { label: `Email ${site.email}`, href: `mailto:${site.email}`, variant: 'btn--on-dark' },
      ],
      variant: evenTail ? '' : 'section--surface',
    }),

    featureGrid({
      eyebrow: 'Also from Orchard',
      title: 'The rest of what we manage',
      items: serviceCards(others),
      columns: 2,
      center: false,
      variant: evenTail ? 'section--surface' : '',
    }),

    proposalForm(evenTail ? '' : 'section--surface')
  );

  return {
    id: `service-${service.slug}`,
    path: `/services/${service.slug}/`,
    title: `${service.name} in New Jersey`,
    description: `${service.summary} Orchard Property Management companies serve boards and owners across New Jersey.`,
    crumbs: [
      { label: 'Services', href: '/services/' },
      { label: service.shortName, href: `/services/${service.slug}/` },
    ],
    body,
    schema: [
      {
        '@type': 'Service',
        name: service.name,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: { '@type': 'State', name: 'New Jersey' },
        serviceType: service.name,
        description: service.summary,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${service.name} scope`,
          itemListElement: service.whatWeHandle.map((item) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: item },
          })),
        },
      },
    ],
  };
}

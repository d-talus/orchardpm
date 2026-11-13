import { site, specialties, executiveSupport } from '../data/site.mjs';
import { hero, featureGrid, ctaBand, postGrid, buttons } from '../lib/modules.mjs';
import { join } from '../lib/html.mjs';

export function homePage({ posts }) {
  const specialtyCards = specialties.map((s) => ({
    icon: s.icon,
    title: s.name,
    body: s.summary,
    href: `/what-we-do/${s.slug}/`,
    linkLabel: 'What we look for',
  }));

  const body = join(
    hero({
      graphic: true,
      eyebrow: 'New Jersey property management',
      title: 'A long-term home for the property management firms New Jersey depends on',
      lede:
        'Orchard Property Management partners with established management companies across the state and holds them for good. Your clients keep their manager, your residents keep their service, and your team keeps the standards that earned your reputation.',
      actions: [
        { label: 'Sell your business', href: '/sell-your-business/', variant: 'btn--primary' },
        { label: 'Work at Orchard', href: '/careers/', variant: 'btn--on-dark' },
      ],
    }),

    `<section class="section">
      <div class="container">
        <div class="grid grid--sidebar">
          <div>
            <p class="eyebrow">Who we are</p>
            <h2>We partner with good firms and keep them good</h2>
            <p class="lead">Orchard Property Management is a New Jersey platform that acquires and operates property management companies for the long term, with no fund timeline and no plan to resell.</p>
            <p>Owners in this industry tend to carry the same two worries when a buyer calls. The first is what happens to the staff who have answered the phone for a decade. The second is what happens to the name that boards and owners recommend to each other. We answer both the same way. Your people stay, your name stays, and the local leadership that made the firm work keeps making it work.</p>
            <p>Behind that, we supply what a strong independent firm rarely has the time or the capital to build. Accounting depth, so owner statements and association books stay current. Technology that residents and boards actually use. Recruiting that runs continuously instead of in a scramble. A finance team that closes the month, so nobody is reconciling on a Sunday night.</p>
            <p><a class="link-arrow" href="/about/">Read how Orchard started</a></p>
          </div>
          <div class="media media--landscape">
            <img src="/assets/img/property.jpg" alt="A property manager meeting two clients outside a managed home" loading="lazy" decoding="async" width="1400" height="933">
          </div>
        </div>
      </div>
    </section>`,

    featureGrid({
      eyebrow: 'Who we partner with',
      title: 'The firms we buy and hold',
      lede:
        'Each of these businesses answers to an owner, a board, or a resident who cannot postpone the problem. We look for the companies that already answer well, then give them the room to take on more.',
      items: specialtyCards,
      columns: 4,
      variant: 'section--surface',
      id: 'what-we-do',
      center: false,
    }),

    featureGrid({
      eyebrow: 'Why owners choose Orchard',
      title: 'A partner rather than an exit',
      lede:
        'We hold no investment timeline and answer to no outside shareholder waiting on a return, so the decisions we make are the ones the business actually needs.',
      items: [
        {
          icon: 'users',
          title: 'Your team stays in place',
          body:
            'We treat employees as the heart of the business. Managers keep their portfolios, staff keep their seniority, and we add management support only where an owner asks for it.',
        },
        {
          icon: 'shield',
          title: 'Your legacy keeps its name',
          body:
            'We understand the trust behind a name that boards and owners pass along by referral. We honor what you built and move the firm into the Orchard family at a pace that feels right.',
        },
        {
          icon: 'lock',
          title: 'Every conversation stays private',
          body:
            'A mutual non-disclosure agreement comes before anything else, and we speak with your employees, clients, or vendors only when you tell us to.',
        },
        {
          icon: 'chart',
          title: 'We invest in accounting and systems',
          body:
            'Accounting staff, software, and reporting get funded rather than deferred. These are the investments owners tell us they have been postponing the longest.',
        },
        {
          icon: 'clock',
          title: 'Service never pauses',
          body:
            'Owner reporting, board meetings, and maintenance response continue straight through the transition. Clients should notice nothing beyond a letter.',
        },
        {
          icon: 'handshake',
          title: 'A process that respects your time',
          body:
            'We give you a realistic timeline early and update it at each step. If the fit is wrong, we say so quickly rather than letting a process drag.',
        },
      ],
      columns: 3,
    }),

    featureGrid({
      eyebrow: 'Orchard with Talus Holdings',
      title: 'Small firm agility, backed by people who have done this before',
      lede:
        'Orchard Property Management is proud to partner with Talus Holdings, a team of seasoned operators and business builders who provide strategic guidance as the organization grows. Talus brings decades of experience in finance, operations, and organizational development.',
      items: [
        {
          icon: 'users',
          title: 'Leadership you can trust',
          body:
            'Talus is led by entrepreneurs and business builders who understand the challenges and the rewards of running a company, and who give hands-on support to the businesses they partner with.',
        },
        {
          icon: 'chart',
          title: 'Support at every stage',
          body:
            'A comprehensive suite of executive support services lets our operators stay focused on clients and employees, with access to a network of industry experts as the business grows.',
        },
        {
          icon: 'shield',
          title: 'Experience that has been tested',
          body:
            'Talus has built companies across a wide range of industries and worked through the problems a business runs into along the way. That judgment matters most during a transition.',
        },
        {
          icon: 'clock',
          title: 'A different kind of partner',
          body:
            'Talus is neither a private equity firm nor a venture capital fund. With no investment timelines and no external shareholders, decisions follow what the business needs.',
        },
      ],
      columns: 4,
      cardClass: 'card--dark',
      variant: 'section--dark',
      center: false,
    }),

    featureGrid({
      eyebrow: 'Executive support',
      title: 'The back office a local firm cannot staff on its own',
      lede:
        'Running a management company means wearing every hat in the building. We take the hats that have nothing to do with serving clients and hand them to people who do that work all day.',
      items: executiveSupport.map((s) => ({ icon: s.icon, title: s.title, body: s.body })),
      columns: 4,
      variant: 'section--surface',
      center: false,
      id: 'support',
    }),

    `<section class="section">
      <div class="container">
        <h2 class="sr-only">Where to go next</h2>
        <div class="grid grid--3 grid--stretch">
          <div class="card card--sage">
            <h3>Need a manager for your property?</h3>
            <p>Our companies manage community associations, apartment buildings, townhome communities, rentals, and commercial property across New Jersey.</p>
            ${buttons([{ label: 'See our services', href: '/services/', variant: 'btn--primary' }])}
          </div>
          <div class="card card--sage">
            <h3>Thinking about selling your firm?</h3>
            <p>We partner with owners who want the company to outlast the sale. Start with a conversation that goes nowhere near a price, and nothing moves forward until you want it to.</p>
            ${buttons([{ label: 'Sell your business', href: '/sell-your-business/', variant: 'btn--primary' }])}
          </div>
          <div class="card card--sage">
            <h3>Looking for a job in property management?</h3>
            <p>Orchard firms hire community association managers, property managers, accountants, leasing staff, and maintenance technicians across New Jersey. Tell us what you do.</p>
            ${buttons([{ label: 'See careers', href: '/careers/', variant: 'btn--secondary' }])}
          </div>
        </div>
      </div>
    </section>`,

    posts.length
      ? postGrid({
          eyebrow: 'From the blog',
          title: 'Writing for owners, managers, and boards',
          lede: 'Notes on the New Jersey property management market, written for the people who work in it.',
          posts: posts.slice(0, 3),
          columns: 3,
          variant: 'section--surface',
          actions: [{ label: 'Read the blog', href: '/blog/', variant: 'btn--outline' }],
        })
      : '',

    ctaBand({
      title: 'Start a conversation with Orchard',
      lede: 'Every inquiry reaches our founder directly, and it stays confidential whether or not anything comes of it.',
      actions: [
        { label: 'Contact us', href: '/contact/', variant: 'btn--primary' },
        { label: 'Email us', href: `mailto:${site.email}`, variant: 'btn--on-dark' },
      ],
      variant: '',
    })
  );

  return {
    id: 'home',
    path: '/',
    titleFull: 'New Jersey property management partner | Orchard PM',
    description:
      'Orchard Property Management partners with New Jersey residential, community association, commercial, and maintenance firms, keeping local staff, leadership, and reputations in place for the long term.',
    ogImage: '/assets/img/og-default.jpg',
    body,
    schema: [
      {
        '@type': 'WebPage',
        '@id': `${site.url}/#webpage`,
        url: `${site.url}/`,
        name: site.name,
        isPartOf: { '@id': `${site.url}/#website` },
        about: { '@id': `${site.url}/#organization` },
        description: site.description,
      },
    ],
  };
}

import { site } from '../data/site.mjs';
import { hero, featureGrid, steps, faq, faqSchema, formSection, twoColumnList, ctaBand } from '../lib/modules.mjs';
import { join } from '../lib/html.mjs';

const roles = [
  {
    icon: 'wrench',
    title: 'Maintenance technicians',
    body:
      'General maintenance technicians handling service calls, repairs, appliances, carpentry, and the hundred things a building asks for in a week. Experience matters more than a resume here.',
  },
  {
    icon: 'bolt',
    title: 'Licensed trades',
    body:
      'Plumbers, electricians, and heating, ventilation, and air conditioning (HVAC) technicians working across managed residential and commercial property. We cover licensing and certification costs for people working toward them.',
  },
  {
    icon: 'house',
    title: 'Make-ready and turnover crews',
    body:
      'Painting, flooring, punch lists, and the full turn between one resident and the next. Steady work with a clear standard and a schedule you can plan around.',
  },
  {
    icon: 'leaf',
    title: 'Groundskeeping and porters',
    body:
      'Grounds, common areas, trash and recycling, snow response, and the daily presence that tells residents somebody is paying attention to where they live.',
  },
  {
    icon: 'community',
    title: 'Community association managers',
    body:
      'Portfolio and on-site managers serving homeowners associations, condominiums, and co-ops. You run the meetings, the budgets, and the vendor relationships, with real support behind you.',
  },
  {
    icon: 'building',
    title: 'Property managers',
    body:
      'Residential, commercial, and mixed-use managers responsible for owner relationships, leasing, reporting, and keeping buildings in good order.',
  },
  {
    icon: 'finance-accounting',
    title: 'Property and association accountants',
    body:
      'Accountants and bookkeepers handling operating and reserve accounts, assessments, delinquencies, owner statements, and the annual audit. This is where we are hiring most.',
  },
  {
    icon: 'calendar',
    title: 'Leasing, resident services, and coordination',
    body:
      'Leasing consultants, resident services staff, and maintenance coordinators. The people who answer the phone and keep a promise to a resident matter as much as the people in the field.',
  },
];

const faqItems = [
  {
    q: 'Do I apply to Orchard or to a specific company?',
    a: [
      'Send your details to Orchard Property Management and we route you to the company in our group closest to you that is hiring for your role. You interview with that company and you work for that company.',
    ],
  },
  {
    q: 'What pay and benefits should I expect?',
    a: [
      'Each Orchard company sets its own pay and benefits for its market and its roles, so there is no single number we can quote honestly on a web page. Tell us the role you are after and we will give you the specifics for that company before you interview.',
    ],
  },
  {
    q: 'I am just starting out in the trades. Is it worth applying?',
    a: [
      'Yes. Property maintenance has an aging workforce and a real shortage of skilled people, which means a motivated technician has a clear path. We help cover the cost of licensing and certification for people who are working toward them, and we would rather train someone reliable than wait for a perfect resume.',
    ],
  },
  {
    q: 'Do I need a license to work in maintenance for Orchard?',
    a: [
      'It depends on the work. General maintenance technicians do not need a trade license, and plenty of excellent technicians learned on the job. Plumbing, electrical, and heating, ventilation, and air conditioning work requires the licensing your state and the job call for, and we help candidates earn it.',
      'Tell us what you hold today and what you are working toward, and we will be straight with you about what a given role requires.',
    ],
  },
  {
    q: 'Do I need experience in community association management?',
    a: [
      'It helps, and we also hire people moving across from residential or commercial management, from accounting, or from a board seat they served on themselves. The work rewards people who stay calm in a meeting and follow through afterward.',
      'If you are new to associations, say so. We will tell you what training and credential support looks like for that role.',
    ],
  },
  {
    q: 'Can I move between Orchard companies later?',
    a: [
      'Yes, and we encourage it. If you want a shorter commute, a different kind of property, or a step toward leadership, we would far rather move you inside the group than lose you.',
    ],
  },
  {
    q: 'How do I send a resume?',
    a: [
      `Use the form below and we will reply with an address to send it to, or email it straight to <a href="mailto:${site.email}">${site.email}</a> with the role in the subject line. A resume is helpful, and it is not required to start the conversation.`,
    ],
  },
];

export function careersPage() {
  const body = join(
    hero({
      graphic: true,
      crumbs: [{ label: 'Careers', href: '/careers/' }],
      eyebrow: 'Careers at Orchard',
      title: 'Skilled work close to home, with a company that is staying put',
      lede:
        'Orchard Property Management companies hire maintenance technicians, licensed trades, community association managers, property managers, and accountants across New Jersey. You work for the local company, with the local team, backed by an owner who funds the hiring and the training.',
      actions: [
        { label: 'Tell us what you do', href: '#apply', variant: 'btn--primary' },
        { label: 'See where we work', href: '/service-areas/', variant: 'btn--on-dark' },
      ],
    }),

    `<section class="section">
      <div class="container container--narrow">
        <p class="eyebrow">Why this work</p>
        <h2>Property management needs people, and it is not going anywhere</h2>
        <p class="lead">When a heating system quits in February or a water line lets go on a holiday weekend, somebody has to show up. That somebody is hard to replace and increasingly hard to find.</p>
        <p>New Jersey is the most densely populated state in the country, and much of that density lives in buildings and communities that somebody manages. The people who do that work, from the technician on the service call to the manager running a Tuesday night board meeting, are retiring faster than the industry replaces them. If you are good at this, you are in a stronger position than you may realize.</p>
        <p>Orchard Property Management exists to keep the firms that employ those people in local hands. We buy strong New Jersey management companies and run them for the long term, which means we spend on staff and systems rather than preparing a business for resale.</p>
        <p>For the person doing the work, the practical difference is simple. The second technician gets hired. The software gets replaced. The licensing gets paid for. The person who runs your office still lives in your county.</p>
      </div>
    </section>`,

    featureGrid({
      eyebrow: 'Roles',
      title: 'Who we hire',
      lede:
        'Openings move around as our companies grow, so tell us what you do even if you do not see it listed. We keep applications on file and come back to them.',
      items: roles,
      columns: 4,
      variant: 'section--surface',
      center: false,
      id: 'roles',
    }),

    twoColumnList({
      eyebrow: 'What we back',
      title: 'What Orchard puts behind a team',
      lede:
        'Our commitments to employees are the same ones we make to an owner when we buy their company, and they are a large part of why owners choose us.',
      columns: [
        {
          icon: 'wrench',
          title: 'Tools, training, and licensing',
          list: [
            'Vehicles, tooling, and stocked inventory funded rather than deferred another year',
            'Licensing, certification, and continuing education costs covered for people working toward them',
            'A clear path from helper to technician, and from technician to lead',
            'Safety programs run properly rather than filed and forgotten',
          ],
        },
        {
          icon: 'growth',
          title: 'A career with somewhere to go',
          list: [
            'Promotion from inside wherever the person exists to promote',
            'Movement between Orchard companies when you want a different property type or a shorter drive',
            'Accounting and administrative support that handles payroll, benefits, and paperwork properly',
            'Local leadership who know your name and sign off on your raise',
          ],
        },
      ],
      id: 'what-we-back',
    }),

    steps({
      eyebrow: 'Hiring',
      title: 'How hiring works',
      lede: 'Four steps, and we keep you informed at each one.',
      items: [
        {
          title: 'You tell us what you do',
          body:
            'Send the form below with your role, any licenses or certifications you hold, and the part of New Jersey you want to work in. It takes about two minutes.',
        },
        {
          title: 'We call you back',
          body:
            'Someone from Orchard calls you to understand what you are looking for, then points you at the right company in our group.',
        },
        {
          title: 'You meet the local company',
          body:
            'You interview with the people you would actually work with, see the office or the properties, and ask whatever you want about pay, schedule, on-call rotation, and benefits.',
        },
        {
          title: 'You get an answer',
          body:
            'An offer or a clear no, quickly. If the timing is wrong, we keep your details and come back to you when the right opening appears.',
        },
      ],
      variant: 'section--surface',
      id: 'hiring',
    }),

    faq({
      eyebrow: 'Questions',
      title: 'Questions we hear from candidates',
      items: faqItems,
      id: 'faq',
    }),

    formSection({
      eyebrow: 'Apply',
      title: 'Tell us what you do',
      lede: 'Two minutes now, and a real person calls you back.',
      intro: [
        'You do not need a resume to start. Give us your role, your licenses, and the area you want to work in, and we will find the right company in our group.',
        `If you would rather email, write to <a href="mailto:${site.email}">${site.email}</a> with the role in the subject line.`,
      ],
      formName: 'careers-application',
      fields: [
        { name: 'first_name', label: 'First name', required: true, autocomplete: 'given-name' },
        { name: 'last_name', label: 'Last name', required: true, autocomplete: 'family-name' },
        { name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' },
        { name: 'phone', label: 'Phone', type: 'tel', required: true, autocomplete: 'tel' },
        {
          name: 'role',
          label: 'Role you are after',
          type: 'select',
          required: true,
          options: roles.map((r) => r.title).concat(['Leadership or office role', 'Something else']),
        },
        {
          name: 'experience',
          label: 'Years of experience',
          type: 'select',
          options: ['Just starting out', '1 to 3 years', '3 to 7 years', '7 to 15 years', 'More than 15 years'],
        },
        {
          name: 'town',
          label: 'Town or county you want to work in',
          required: true,
          span: true,
          autocomplete: 'address-level2',
        },
        {
          name: 'licenses',
          label: 'Licenses, certifications, and software',
          span: true,
          placeholder: 'For example: NJ journeyman electrician, EPA 608, CMCA, AppFolio, Yardi',
        },
        {
          name: 'message',
          label: 'Anything else we should know',
          type: 'textarea',
          span: true,
          placeholder: 'Shift preference, on-call availability, a link to your resume or LinkedIn profile',
        },
      ],
      submitLabel: 'Send my details',
      footnote:
        'We use your details only to match you with hiring companies in the Orchard group. We never sell your information, and we will not contact your current employer.',
      variant: 'section--surface',
      id: 'apply',
    }),

    ctaBand({
      title: 'Know someone good?',
      lede: 'The best technicians and managers we meet come recommended by another technician or manager. Send them this page.',
      actions: [{ label: 'See the roles again', href: '#roles', variant: 'btn--primary' }],
      variant: '',
    })
  );

  return {
    id: 'careers',
    path: '/careers/',
    title: 'Property management careers in New Jersey',
    description:
      'Orchard Property Management companies hire maintenance technicians, licensed trades, community association managers, property managers, and accountants across New Jersey. Tell us what you do.',
    crumbs: [{ label: 'Careers', href: '/careers/' }],
    ogImage: '/assets/img/og-default.jpg',
    body,
    schema: [faqSchema(faqItems)],
  };
}

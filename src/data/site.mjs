/* Global site data: identity, navigation, footer, the kinds of management
   companies we partner with, and the geography we serve. Copy lives here,
   never in the templates. */

export const site = {
  name: 'Orchard Property Management',
  shortName: 'Orchard',
  legalName: 'Orchard Property Management',
  domain: 'orchardpropertymgmt.com',
  url: 'https://orchardpropertymgmt.com',
  locale: 'en_US',
  language: 'en-US',
  email: 'dgobbo@talusholdings.com',
  founder: {
    name: 'Devon Gobbo',
    firstName: 'Devon',
    role: 'Founder, Orchard Property Management',
    email: 'dgobbo@talusholdings.com',
  },
  parent: {
    name: 'Talus Holdings',
    url: 'https://talusholdings.com',
  },
  address: {
    region: 'NJ',
    regionName: 'New Jersey',
    country: 'US',
  },
  tagline: 'A New Jersey property management platform that keeps good local firms local.',
  description:
    'Orchard Property Management partners with established New Jersey property management companies, keeping local leadership, staff, and reputations in place while adding the systems and support of a much larger organization.',
  social: [],
  themeColor: '#124c1e',
};

export const nav = [
  { label: 'What we do', href: '/what-we-do/' },
  { label: 'Sell your business', href: '/sell-your-business/' },
  { label: 'Careers', href: '/careers/' },
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];

export const headerCta = { label: 'Start a conversation', href: '/sell-your-business/#contact' };

export const footerColumns = [
  {
    title: 'Company',
    links: [
      { label: 'What we do', href: '/what-we-do/' },
      { label: 'About Orchard', href: '/about/' },
      { label: 'Service areas', href: '/service-areas/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    title: 'Where we partner',
    links: [
      { label: 'Residential management', href: '/what-we-do/residential-property-management/' },
      { label: 'Community associations', href: '/what-we-do/community-association-management/' },
      { label: 'Commercial and mixed use', href: '/what-we-do/commercial-property-management/' },
      { label: 'Maintenance and facilities', href: '/what-we-do/maintenance-and-facilities/' },
    ],
  },
  {
    title: 'Join Orchard',
    links: [
      { label: 'Sell your business', href: '/sell-your-business/' },
      { label: 'Careers at Orchard', href: '/careers/' },
      { label: 'How a partnership works', href: '/sell-your-business/#process' },
      { label: 'Questions owners ask', href: '/sell-your-business/#faq' },
    ],
  },
];

export const legalLinks = [
  { label: 'Privacy policy', href: '/privacy/' },
  { label: 'Accessibility', href: '/accessibility/' },
  { label: 'Sitemap', href: '/sitemap.xml' },
];

/* ---------------------------------------------------------------------------
   The four kinds of management company we partner with. `slug` drives
   /what-we-do/<slug>/, and the same records build the overview grid, the
   footer, the service schema, and the seller form menu.
--------------------------------------------------------------------------- */
export const specialties = [
  {
    slug: 'residential-property-management',
    name: 'Residential property management',
    shortName: 'Residential management',
    icon: 'building',
    summary:
      'Firms managing single-family rentals, small apartment buildings, and mixed portfolios for owners who expect the phone to be answered.',
    heroLede:
      'Residential management lives on two relationships at once: the owner who trusts you with an asset, and the resident who lives inside it. Orchard Property Management partners with New Jersey firms that have held both for years, and we fund the systems and staffing that make the work sustainable.',
    keywords: [
      'sell my property management company New Jersey',
      'residential property management acquisition NJ',
      'New Jersey property management firm for sale',
    ],
    whatWeLookFor: [
      'A doors-under-management count that has grown steadily and stayed, rather than one that churns every renewal',
      'Management agreements with owners who renew because they want to, not because switching feels like a hassle',
      'A leasing and maintenance team you would be comfortable introducing to us',
      'Licensing in good standing for the work your state and your contracts require',
      'An owner who cares what happens to the staff and the client list after closing',
    ],
    weInvestIn: [
      'Property management software, owner portals, and resident portals that cut the phone traffic rather than adding to it',
      'Maintenance coordination and after-hours coverage, so the on-call phone stops living with one person',
      'Leasing and marketing support that fills vacancies faster',
      'Accounting staff and processes, so owner statements go out on time every month',
    ],
    body: [
      {
        heading: 'Why residential management suits a long-term owner',
        paragraphs: [
          'Residential management produces something unusual in small business: revenue you can forecast. A management agreement renews quietly, a resident signs another lease, and the portfolio grows by referral because an owner told another owner that you actually return calls. That steadiness takes years to build and very little time to spend.',
          'We look for firms that built it the slow way. When we find one, our plan is to protect the service standard that earned those renewals and to fund the parts of the business the owner has been deferring, usually software, staffing, and the maintenance coordination that quietly eats every evening.',
        ],
      },
      {
        heading: 'What changes after a partnership, and what does not',
        paragraphs: [
          'Your clients keep the same point of contact. Your residents keep the same portal and the same maintenance process. Your team keeps their roles, their seniority, and the manager they report to.',
          'What changes sits behind the counter. Orchard Property Management takes on payroll, benefits administration, financial reporting, and the technology decisions that nobody started a management firm to make, so your people spend their day on properties and the people in them.',
        ],
      },
    ],
  },
  {
    slug: 'community-association-management',
    name: 'Community association management',
    shortName: 'Community associations',
    icon: 'community',
    summary:
      'Managers serving homeowners associations, condominium associations, and co-ops, where governance, reserves, and resident trust all sit in the same job.',
    heroLede:
      'Managing a community association means serving a volunteer board, a budget, and several hundred neighbors at once. Orchard Property Management partners with New Jersey firms that do it well, and we give them the back office and the bench depth the work demands.',
    keywords: [
      'HOA management company acquisition New Jersey',
      'sell my community association management company',
      'condominium management company New Jersey',
    ],
    whatWeLookFor: [
      'A portfolio of homeowners association (HOA), condominium, and co-op clients with long tenure and renewed contracts',
      'Managers who handle a board meeting well and keep a reserve study current',
      'Clean association accounting, with reconciliations and audits that stand up to review',
      'A reputation among local boards, attorneys, and engineers that you would not want to see spent',
      'An owner planning for succession rather than a quick exit',
    ],
    weInvestIn: [
      'Association accounting staff and software, so assessments, delinquencies, and reserves stay current',
      'Manager recruiting, continuing education, and credential support',
      'Board and resident communication tools, including meeting portals and document libraries',
      'Transition support when a community joins or leaves, which is where most firms lose time',
    ],
    body: [
      {
        heading: 'A business that rewards institutional memory',
        paragraphs: [
          'Community association management is one of the few service businesses where knowing the history of a building is the product. A manager who remembers why the roof was phased over three years, which vendor did the work, and how the board voted on it saves a community real money and real argument.',
          'That knowledge walks out the door in most acquisitions, because the buyer reorganizes portfolios and the manager who held it leaves. We do the opposite. Keeping your managers with their communities is the first commitment we make, and the one we are most willing to put in writing.',
        ],
      },
      {
        heading: 'Where firms get stretched, and where we help',
        paragraphs: [
          'Owners tell us the pressure shows up in two places. Accounting staffing comes first, because association books carry operating accounts, reserve accounts, delinquencies, and an annual audit, and one departure leaves a real hole. Manager capacity comes second, since every added community means more evening meetings for the same people.',
          'Orchard Property Management funds both. We add accounting capacity centrally, recruit and train managers continuously rather than in a panic, and cover the credential and continuing education costs for the people working toward them.',
        ],
      },
    ],
  },
  {
    slug: 'commercial-property-management',
    name: 'Commercial and mixed-use management',
    shortName: 'Commercial and mixed use',
    icon: 'chart',
    summary:
      'Firms managing office, retail, flex, industrial, and mixed-use property, where leases are longer and the reporting expectations are higher.',
    heroLede:
      'Commercial management asks for a different discipline: common area maintenance reconciliations, capital planning, and owners who read the monthly package closely. Orchard Property Management partners with New Jersey firms that deliver it, and we add the depth to take on more.',
    keywords: [
      'commercial property management company for sale New Jersey',
      'sell my commercial management firm NJ',
      'mixed use property management New Jersey',
    ],
    whatWeLookFor: [
      'Management agreements across office, retail, flex, industrial, or mixed-use property with institutional or private owners',
      'Reliable common area maintenance (CAM) reconciliations and reporting your clients trust',
      'Relationships with tenants and brokers that survive a lease cycle',
      'Property managers and engineers who know the buildings rather than only the spreadsheets',
      'A profitable track record and books that hold up to review',
    ],
    weInvestIn: [
      'Accounting and lease administration staff, so reconciliations land on schedule',
      'Reporting and budgeting tools that match what sophisticated owners expect',
      'Building engineering and facilities staffing',
      'Business development support to win the next assignment without pulling a manager off a property',
    ],
    body: [
      {
        heading: 'Longer leases, higher expectations',
        paragraphs: [
          'A commercial owner judges a manager on the monthly package, the reconciliation, and whether the capital plan holds up. Those expectations reward firms with real accounting capacity and punish firms where the owner is still reviewing every statement personally.',
          'We fund that capacity. Adding lease administration and accounting staff is usually the fastest improvement we can make to a commercial management firm, and it shows up quickly in both client satisfaction and the hours the owner works.',
        ],
      },
      {
        heading: 'Growth without stretching the team thin',
        paragraphs: [
          'Most commercial firms we meet could take on more assignments than they do. The constraint is rarely demand. It is the risk of accepting a building and then serving it with a manager who already runs six.',
          'Orchard Property Management removes that constraint by hiring ahead of the work rather than behind it, which is a decision that is far easier to make with a parent company funding it.',
        ],
      },
    ],
  },
  {
    slug: 'maintenance-and-facilities',
    name: 'Maintenance and facilities services',
    shortName: 'Maintenance and facilities',
    icon: 'wrench',
    summary:
      'In-house maintenance arms and the trades companies that serve managed property: turnovers, repairs, janitorial, landscaping, and capital projects.',
    heroLede:
      'Maintenance decides whether a management contract renews. Orchard Property Management partners with the in-house maintenance operations and specialty service companies that keep managed property in good order, and we fund the trucks, tools, and technicians behind them.',
    keywords: [
      'property maintenance company acquisition New Jersey',
      'facilities services company for sale NJ',
      'apartment turnover and repair company New Jersey',
    ],
    whatWeLookFor: [
      'Recurring work from managed property rather than one-off projects alone',
      'Technicians and tradespeople who do clean work and show up when they say they will',
      'Licensing and insurance in good standing for the trades you perform',
      'Vehicles and equipment that have been looked after',
      'An owner who cares what happens to the crew',
    ],
    weInvestIn: [
      'Service vehicles, tooling, and stocked inventory',
      'Apprenticeship, licensing, and certification support for technicians who are working toward them',
      'Work order and dispatch software that cuts drive time and ends the whiteboard schedule',
      'Safety programs and compliance paperwork that otherwise land on the owner\'s desk',
    ],
    body: [
      {
        heading: 'The part of management that residents actually feel',
        paragraphs: [
          'An owner renews a management agreement because the building works. A resident renews a lease because the heat was fixed on a Saturday. Both outcomes come down to maintenance, which makes it the least glamorous and most decisive part of this industry.',
          'We treat a strong maintenance operation as an asset rather than a cost center. Where a management firm has built one, we fund it. Where a specialty trades company serves managed property well, we are glad to talk about a partnership on its own merits.',
        ],
      },
      {
        heading: 'Hiring is the constraint, so we fund hiring',
        paragraphs: [
          'Every maintenance operation we talk to describes the same bottleneck. The work is there, the technician is not, and every attempt to hire turns into a search for someone already licensed, already experienced, and already employed somewhere else.',
          'Orchard Property Management recruits across our companies continuously, supports apprentices through licensing, and covers certification costs, so a good technician has somewhere to grow without leaving.',
        ],
      },
    ],
  },
];

export const specialtyBySlug = Object.fromEntries(specialties.map((s) => [s.slug, s]));

/* ---------------------------------------------------------------------------
   Geography. All twenty-one New Jersey counties, plus the areas around them.
--------------------------------------------------------------------------- */
export const serviceAreas = [
  {
    region: 'North Jersey',
    blurb:
      'Dense suburban townships and urban centers with older housing stock, a deep base of condominium and homeowner associations, and steady demand for both residential and commercial management.',
    counties: ['Bergen', 'Passaic', 'Essex', 'Hudson', 'Morris', 'Sussex', 'Warren'],
  },
  {
    region: 'Central Jersey',
    blurb:
      'A broad band of residential growth and corporate campuses, where planned communities, townhome associations, and mixed-use property all run strong.',
    counties: ['Somerset', 'Hunterdon', 'Middlesex', 'Union', 'Monmouth', 'Mercer'],
  },
  {
    region: 'South Jersey and the Shore',
    blurb:
      'Shore communities, active adult developments, and suburban Philadelphia markets, where seasonal rentals and association management sit side by side.',
    counties: ['Ocean', 'Burlington', 'Camden', 'Gloucester', 'Salem', 'Cumberland', 'Atlantic', 'Cape May'],
  },
  {
    region: 'Surrounding areas',
    blurb:
      'We look at strong firms just over the state line when the portfolio and the client base look like the ones we serve in New Jersey.',
    counties: ['Eastern Pennsylvania', 'Rockland and Orange County, New York', 'Northern Delaware', 'Staten Island'],
  },
];

/* Executive support, straight from the Orchard platform overview. */
export const executiveSupport = [
  {
    icon: 'corporate-development',
    title: 'Corporate development',
    body: 'Mergers and acquisitions, market analytics, and industry data analysis.',
  },
  {
    icon: 'finance-accounting',
    title: 'Finance and accounting',
    body: 'Audit, banking, capital markets, and financial planning and analysis.',
  },
  {
    icon: 'legal',
    title: 'Legal',
    body: 'Transaction, contract, litigation, and corporate development support.',
  },
  {
    icon: 'lean-implementation',
    title: 'Lean implementation',
    body: 'Implementation of lean principles, training, and operational analysis.',
  },
  {
    icon: 'human-resources',
    title: 'Human resources',
    body: 'Payroll, benefits, and employee performance management.',
  },
  { icon: 'tax', title: 'Tax', body: 'Tax planning, compliance, and structuring support.' },
  { icon: 'sales', title: 'Sales', body: 'Sales strategy, pipeline development, and customer growth.' },
  {
    icon: 'marketing',
    title: 'Marketing',
    body: 'Branding, website, digital marketing, and lead generation.',
  },
];

/* The five values from the platform overview, used on the about page. */
export const values = [
  {
    icon: 'shield',
    title: 'Integrity',
    body: 'We do what we say we will do. We stay honest and transparent, and we do the right thing when nobody is looking.',
  },
  {
    icon: 'users',
    title: 'Empathy',
    body: 'We lead with respect and compassion. A sale is a personal event for an owner and an uncertain one for a staff, and we treat it that way.',
  },
  {
    icon: 'wrench',
    title: 'Grit',
    body: 'We expect hard work, persevere through challenges, and stay in the trenches alongside the team.',
  },
  {
    icon: 'growth',
    title: 'Continuous improvement',
    body: 'We keep looking for ways to innovate, learn, and adapt, in the field and in the office.',
  },
  {
    icon: 'handshake',
    title: 'Humility',
    body: 'We listen first, learn from the people closest to the work, and put the team ahead of ourselves.',
  },
  {
    icon: 'lock',
    title: 'Confidentiality',
    body: 'What an owner tells us stays with us, whether or not we ever reach an agreement.',
  },
];

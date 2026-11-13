/* The services our companies deliver to property owners, boards, and residents.
   This is the client-facing counterpart to src/data/site.mjs, which describes
   the kinds of firm we acquire.

   Keep the service features below jurisdiction-neutral. Everything specific to
   New Jersey lives in `newJerseyNotes`, so the same feature copy can carry a
   company in another state without rewriting it. */

export const services = [
  {
    slug: 'community-association-management',
    name: 'Community association management',
    shortName: 'Community associations',
    icon: 'community',
    summary:
      'Full management for homeowners associations, condominium associations, and co-ops, from the board packet to the reserve study.',
    heroLede:
      'A community association runs on a volunteer board, a budget, and the patience of several hundred neighbors. Orchard Property Management companies handle the governance, the money, and the property so the board can make decisions rather than chase them.',
    keywords: [
      'HOA management New Jersey',
      'condominium management company NJ',
      'community association management services New Jersey',
    ],
    whoItIsFor: [
      'Homeowners associations in single-family and townhome communities',
      'Condominium associations, from converted buildings to new construction',
      'Housing cooperatives and their boards',
      'Master associations coordinating several sub-associations',
      'Self-managed boards that have outgrown running it themselves',
    ],
    whatWeHandle: [
      'Board meeting preparation, attendance, minutes, and the follow-up that makes decisions real',
      'Operating and reserve accounting, assessment billing, collections, and delinquency tracking',
      'Annual budget preparation, reserve study coordination, and long-range capital planning',
      'Rule enforcement, violation notices, and architectural review administration',
      'Vendor bidding, contract administration, and oversight of work on site',
      'Resale and lender document requests, and the records a closing depends on',
    ],
    body: [
      {
        heading: 'Your manager stays your manager',
        paragraphs: [
          'The most valuable thing a community association manager has is memory. Knowing why the roof was phased over three years, which contractor did it, and how the board voted saves a community real money and a good deal of argument.',
          'Orchard companies keep managers with their communities. We do not reshuffle portfolios to fit a staffing chart, and when we acquire a firm the first commitment we make to its clients is that the person who knows the property keeps it.',
        ],
      },
      {
        heading: 'Accounting that stands up to an audit',
        paragraphs: [
          'Association books carry operating accounts, reserve accounts, assessments, delinquencies, and an annual audit, and they are the part of the job that most often goes wrong at a small firm when one person leaves.',
          'We staff accounting centrally and deeply, so reconciliations land on schedule, the audit has what it needs, and the treasurer is not reconstructing a ledger the week before an annual meeting.',
        ],
      },
    ],
  },
  {
    slug: 'high-rise-and-mid-rise-management',
    name: 'High-rise and mid-rise management',
    shortName: 'High-rise and mid-rise',
    icon: 'building',
    summary:
      'On-site management for elevator buildings, with building staff, life safety systems, and capital projects coordinated under one plan.',
    heroLede:
      'An elevator building is a small piece of infrastructure with people living in it. Orchard Property Management companies staff and run these properties with the systems, oversight, and vendor relationships the building needs to keep working.',
    keywords: [
      'high-rise property management New Jersey',
      'mid-rise condominium management NJ',
      'elevator building management New Jersey',
    ],
    whoItIsFor: [
      'Condominium and co-op boards in elevator buildings',
      'Mixed-income and mixed-tenure buildings with shared systems',
      'Buildings with on-site staff, a front desk, or a concierge',
      'Properties with amenity spaces that need scheduling and supervision',
    ],
    whatWeHandle: [
      'On-site management, front desk, porter, and building engineering staffing and supervision',
      'Elevator, boiler, fire alarm, sprinkler, and generator service contracts and inspection records',
      'Life safety testing schedules and the documentation that goes with them',
      'Amenity scheduling, move-in and move-out coordination, and certificate of insurance tracking',
      'Capital project management, from specification through bidding to punch list',
      'Energy and utility review, including shared metering and common area consumption',
    ],
    body: [
      {
        heading: 'The systems decide the budget',
        paragraphs: [
          'In an elevator building the mechanical systems drive most of the operating budget and nearly all of the emergencies. A chiller nobody has tracked, an elevator contract nobody has renegotiated, and a fire panel nearing end of life are the three line items most likely to surprise a board.',
          'We keep a condition and service record for each major system, review the contracts on a cycle rather than on renewal, and bring the capital plan to the board before the failure rather than after it.',
        ],
      },
      {
        heading: 'Staffing a building is its own discipline',
        paragraphs: [
          'A building with staff is an employer, with scheduling, coverage, training, and supervision to match. Boards rarely want to run that themselves, and they should not have to.',
          'Orchard companies hire, train, and supervise building staff directly, cover absences from within the group, and handle the payroll and benefits administration behind it.',
        ],
      },
    ],
  },
  {
    slug: 'townhome-and-planned-communities',
    name: 'Townhome and planned community management',
    shortName: 'Townhome communities',
    icon: 'house',
    summary:
      'Management for townhome, carriage home, and active adult communities, where the grounds, the roads, and the rules all need attention.',
    heroLede:
      'A townhome community has most of the obligations of an apartment building spread across dozens of separate roofs. Orchard Property Management companies handle the grounds, the shared structures, and the governance that holds it together.',
    keywords: [
      'townhome community management New Jersey',
      'planned community management NJ',
      'active adult community management New Jersey',
    ],
    whoItIsFor: [
      'Townhome and carriage home associations',
      'Active adult and age-restricted communities',
      'Planned communities with private roads and shared infrastructure',
      'Communities with clubhouses, pools, and recreation facilities',
    ],
    whatWeHandle: [
      'Landscaping, irrigation, snow and ice response, and seasonal grounds contracts',
      'Roof, siding, gutter, and paving reserve planning across many identical structures',
      'Private road maintenance, lighting, drainage, and stormwater basin upkeep',
      'Clubhouse, pool, and recreation facility operation, staffing, and permitting',
      'Architectural review, rule enforcement, and resident communication',
      'Municipal service claims where the community is eligible for them',
    ],
    body: [
      {
        heading: 'Repetition is the opportunity',
        paragraphs: [
          'Eighty identical roofs fail in roughly the same decade. That is a budgeting problem if nobody plans for it and a purchasing advantage if somebody does.',
          'We plan these replacements in phases, bid them at a scale a single community cannot reach on its own, and sequence the work so assessments stay predictable rather than arriving as a special assessment letter nobody expected.',
        ],
      },
      {
        heading: 'Grounds are what residents judge you on',
        paragraphs: [
          'Residents form their opinion of a management company from the condition of the common grounds and from how quickly the parking lot gets plowed. Those two things carry more weight in a community meeting than any financial statement.',
          'We hold grounds and snow contractors to a written standard, inspect the property on a schedule rather than on complaint, and give the board a record of what was done and when.',
        ],
      },
    ],
  },
  {
    slug: 'rental-and-multifamily-management',
    name: 'Rental and multifamily management',
    shortName: 'Rental and multifamily',
    icon: 'key',
    summary:
      'Leasing, resident services, maintenance, and owner reporting for single-family rentals, small portfolios, and apartment communities.',
    heroLede:
      'Rental management answers to two people at once: the owner who trusts you with an asset and the resident who lives inside it. Orchard Property Management companies keep both informed and keep the property full.',
    keywords: [
      'rental property management New Jersey',
      'apartment management company NJ',
      'single family rental management New Jersey',
    ],
    whoItIsFor: [
      'Owners of single-family rentals and small multifamily buildings',
      'Private portfolios that have grown past self-management',
      'Apartment communities needing on-site or portfolio management',
      'Owners inheriting property and deciding what to do with it',
    ],
    whatWeHandle: [
      'Marketing, showings, application screening, and lease preparation',
      'Rent collection, delinquency follow-up, and owner distributions',
      'Monthly owner statements, year-end reporting, and tax document preparation',
      'Maintenance intake, dispatch, and after-hours emergency response',
      'Turnovers, make-ready scheduling, and inspection documentation',
      'Registration, inspection, and habitability requirements that apply to the property',
    ],
    body: [
      {
        heading: 'Vacancy is the expensive part',
        paragraphs: [
          'Every week a unit sits empty costs more than most of the decisions an owner spends time on. Pricing a renewal correctly, starting the turn before the keys come back, and answering a prospect the same day matter more than almost anything else in this business.',
          'We price against what is actually leasing nearby rather than what the unit rented for two years ago, and we hold the turn to a schedule so the unit is showable when the market is looking.',
        ],
      },
      {
        heading: 'Owners should not have to ask what happened',
        paragraphs: [
          'Most owner frustration traces back to not knowing. A repair gets approved and then goes quiet, a resident gives notice and the owner hears about it a month later, and trust erodes over information rather than money.',
          'Our companies report on a schedule, put the maintenance history where an owner can see it, and call when something needs a decision rather than waiting for the monthly statement to explain it.',
        ],
      },
    ],
  },
  {
    slug: 'commercial-and-mixed-use-management',
    name: 'Commercial and mixed-use management',
    shortName: 'Commercial and mixed use',
    icon: 'chart',
    summary:
      'Office, retail, flex, industrial, and mixed-use management, with lease administration and reporting that hold up to an institutional owner.',
    heroLede:
      'Commercial owners judge a manager on the monthly package, the reconciliation, and whether the capital plan survives contact with the building. Orchard Property Management companies deliver all three.',
    keywords: [
      'commercial property management New Jersey',
      'mixed use property management NJ',
      'industrial flex property management New Jersey',
    ],
    whoItIsFor: [
      'Owners of office, retail, flex, and light industrial property',
      'Mixed-use buildings with retail below and residential above',
      'Private and institutional owners needing third-party management',
      'Owner-occupiers leasing out part of a building',
    ],
    whatWeHandle: [
      'Lease administration, critical date tracking, and tenant correspondence',
      'Common area maintenance reconciliations, escalations, and recovery billing',
      'Operating and capital budgets, variance reporting, and owner packages',
      'Building engineering, preventive maintenance, and service contract oversight',
      'Tenant improvement and capital project coordination',
      'Certificate of insurance tracking, compliance, and vendor management',
    ],
    body: [
      {
        heading: 'Reconciliations are where trust is won',
        paragraphs: [
          'A tenant who receives a clear, defensible common area maintenance reconciliation renews more easily than one who receives a number with no backup. An owner who receives the same thing stops reviewing every line personally.',
          'We staff lease administration and accounting properly so reconciliations land on schedule with the support behind them, which removes the single most common source of friction in commercial management.',
        ],
      },
      {
        heading: 'Capital plans that match the building',
        paragraphs: [
          'A roof, a parking field, and a rooftop unit all age on their own clock, and an owner needs those clocks in one place to make sensible decisions about holding, selling, or reinvesting.',
          'We maintain a condition assessment and a rolling capital plan for each property, update it after every major inspection, and bring it into the budget conversation rather than into an emergency.',
        ],
      },
    ],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

/* ---------------------------------------------------------------------------
   The capabilities behind every property we manage. Written to apply anywhere,
   so a company joining Orchard in another state inherits the same description.
--------------------------------------------------------------------------- */
export const serviceFeatures = [
  {
    icon: 'finance-accounting',
    title: 'Financial management and reporting',
    body:
      'Budgets, assessment and rent billing, collections, reconciliations, owner statements, and audit support, produced on a schedule rather than on request.',
  },
  {
    icon: 'wrench',
    title: 'Maintenance and work orders',
    body:
      'Intake, dispatch, and follow-through on every request, with the history attached to the unit or the building so the next technician arrives informed.',
  },
  {
    icon: 'clock',
    title: 'Around-the-clock response',
    body:
      'A real person reachable outside business hours for the failures that cannot wait, and a triage process so a dripping faucet does not become a midnight truck roll.',
  },
  {
    icon: 'community',
    title: 'Board and governance support',
    body:
      'Meeting packets, minutes, election administration, rule enforcement, and the follow-up that turns a board decision into work actually completed.',
  },
  {
    icon: 'key',
    title: 'Owner and resident portals',
    body:
      'Online payments, document libraries, maintenance requests, and statements, so the people who need information can get it without waiting for an email back.',
  },
  {
    icon: 'chart',
    title: 'Capital planning and reserves',
    body:
      'Condition assessments, reserve study coordination, and a rolling capital plan, so a major replacement arrives as a budget line rather than a special assessment.',
  },
  {
    icon: 'handshake',
    title: 'Vendor management and procurement',
    body:
      'Competitive bidding, written scopes, insurance verification, and performance review, with group pricing where our scale earns a better number than a single property can.',
  },
  {
    icon: 'shield',
    title: 'Insurance and claims support',
    body:
      'Coverage review at renewal, certificate tracking for vendors and residents, and hands-on help documenting and pursuing a claim after a loss.',
  },
  {
    icon: 'growth',
    title: 'Transition and onboarding',
    body:
      'A structured handover from a previous manager or a self-managed board, covering records, bank accounts, vendor contracts, and the first budget cycle.',
  },
];

/* ---------------------------------------------------------------------------
   What actually changes from one jurisdiction to another. Every claim here is
   specific to New Jersey and sourced; update it with care.
--------------------------------------------------------------------------- */
export const newJerseyNotes = [
  {
    icon: 'document',
    title: 'Associations answer to a state statute',
    body:
      'New Jersey governs community associations through the Planned Real Estate Development Full Disclosure Act. The Radburn Act amended it in 2017 and reset how associations run elections, nominate candidates, and give members access to records. Boards that have not revisited their bylaws since then are often out of step with it.',
  },
  {
    icon: 'users',
    title: 'Managers are not licensed by the state',
    body:
      'New Jersey does not license community association managers. A bill to create that requirement passed both houses in 2014 and was pocket-vetoed the following year. In practice, firms here qualify their people through experience and voluntary credentials rather than a state exam, which puts more weight on who a firm actually hires.',
  },
  {
    icon: 'map',
    title: 'Towns owe some communities money',
    body:
      'Under the Municipal Services Act, a municipality must either provide snow and ice removal, street lighting electricity, and collection of trash, recycling, and leaves to a qualified private community, or reimburse the association for them. A good many eligible associations never claim it, which is one of the first things we check.',
  },
  {
    icon: 'building',
    title: 'Multiple dwellings are registered and inspected',
    body:
      'Owners of multiple dwellings register with the Bureau of Housing Inspection at the Department of Community Affairs, which schedules cyclical inspections and tracks when they fall due. Keeping registrations current and the building ready is ordinary work here and unfamiliar to owners arriving from elsewhere.',
  },
  {
    icon: 'house',
    title: 'Rent rules change town by town',
    body:
      'New Jersey leaves rent regulation to municipalities rather than setting it statewide, so two buildings a few miles apart can sit under different rules, different allowable increases, and different registration requirements. Local knowledge is not a nicety in this state.',
  },
];

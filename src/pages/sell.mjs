import { site, specialties } from '../data/site.mjs';
import { hero, featureGrid, steps, faq, faqSchema, ctaBand, formSection, twoColumnList } from '../lib/modules.mjs';
import { join } from '../lib/html.mjs';

const faqItems = [
  {
    q: 'How do I start a conversation about selling my firm?',
    a: [
      `Send the form at the bottom of this page, or write to ${site.founder.name} directly at <a href="mailto:${site.email}">${site.email}</a>. The first conversation is a phone call, and it covers what you have built and what you want to happen next.`,
      'Nothing leaves Orchard, and we sign a mutual non-disclosure agreement before you hand over a single financial statement.',
    ],
  },
  {
    q: 'What kinds of firms does Orchard Property Management partner with?',
    a: [
      'We partner with profitable New Jersey management companies across four areas: residential property management, community association management, commercial and mixed-use management, and the maintenance and facilities operations that serve managed property.',
      'The firms that fit best have a long history in their market, managers and staff who stay, and client relationships that renew. We care a great deal more about how a company is run than about how large it is, so if yours is profitable and well regarded where it works, we would like to hear from you.',
    ],
  },
  {
    q: 'Will my employees or clients find out that we are talking?',
    a: [
      'Not unless you tell them. Confidentiality runs in both directions from the non-disclosure agreement forward, and we contact an employee, a client, a board member, or a vendor only with your written permission.',
      'When the time comes to tell your team, we plan that announcement with you rather than for you, and we show up in person to answer their questions.',
    ],
  },
  {
    q: 'What happens to my employees after the sale?',
    a: [
      'Keeping your people is the point of the exercise. In every acquisition we prioritize retaining employees, holding manager assignments and portfolios steady, and investing in the accounting and administrative support the team depends on.',
      'If you plan to step back from day-to-day leadership, we can help identify and support the right person for the future, including candidates already inside your company.',
    ],
  },
  {
    q: 'Does the company keep its name?',
    a: [
      'In most cases, yes. A local name in this industry carries years of referrals from boards, owners, attorneys, and brokers, and erasing it destroys value we just paid for. We discuss branding early so there are no surprises, and any change happens gradually and with your input.',
    ],
  },
  {
    q: 'What happens to our management agreements and board relationships?',
    a: [
      'They stay where they are. Community boards and property owners keep the manager they know, and the manager keeps the portfolio they know. We have no interest in reshuffling assignments to fit a staffing model.',
      'Where an agreement needs consent to assign, we work through that with you well before closing so nothing surprises a board at a meeting.',
    ],
  },
  {
    q: 'Do you keep our software, vendors, and processes?',
    a: [
      'We start by keeping them. Changing a property management platform, a bank, or a trusted vendor during a transition creates risk for the people we just promised continuity to.',
      'Later, if your team wants a better tool or more favorable vendor pricing, we help with that. The decision stays with the people who use it every day.',
    ],
  },
  {
    q: 'Do you buy the real estate as well as the business?',
    a: [
      'Either way works. We can purchase the business together with your office property, or purchase the business and lease the space from you on fair terms. Plenty of owners prefer to keep the building as an income stream.',
    ],
  },
  {
    q: 'How do you arrive at a value for my company?',
    a: [
      'We look at your revenue and profit history, the mix of recurring management fees against one-time and ancillary income, client tenure and renewal history, the strength and tenure of your managers and accounting staff, and the markets you serve.',
      'We put the basic terms, price included, in a letter of intent before either of us spends money on diligence, so you know what is on the table before the lawyers start.',
    ],
  },
  {
    q: 'How long does the process take?',
    a: [
      'It depends on your business and on how quickly financial records come together. Once we understand what we are working with, we give you a realistic timeline early in the conversation and update it at every step rather than leaving you to guess.',
    ],
  },
  {
    q: 'What should I have ready before we talk?',
    a: [
      'For the first call, nothing at all. For the stage after the non-disclosure agreement, it helps to gather three years of profit and loss statements, three years of tax returns, a list of management agreements with start dates and fee structures, a summary of doors or communities under management, your office lease or property details, and a simple summary of your team.',
      'If those records are not organized, say so. That is normal in owner-run firms, and we will walk through it with you.',
    ],
  },
  {
    q: 'Can I stay involved after I sell?',
    a: [
      'That is your call. Some owners retire at closing. Others stay through a defined transition period, and a few keep running the company for years because they enjoy it. We build the arrangement around what you want rather than around a template.',
    ],
  },
  {
    q: 'I am not ready to sell yet. Is it still worth talking?',
    a: [
      'Yes, and we encourage it. Owners who open the conversation two or three years ahead usually end up with a cleaner process and a better outcome, because there is time to tidy the financials, document the management agreements, and develop the next layer of leadership.',
      'A call now puts you under no obligation later.',
    ],
  },
  {
    q: 'Do I need a broker or an investment banker?',
    a: [
      'You do not need one to talk with us, and we work with brokers and bankers regularly when an owner prefers to have one. We always recommend you keep your own attorney and accountant involved before you sign anything.',
    ],
  },
];

export function sellPage() {
  const body = join(
    hero({
      image: '/assets/img/property.jpg',
      crumbs: [{ label: 'Sell your business', href: '/sell-your-business/' }],
      eyebrow: 'For owners',
      title: 'Sell your property management company to a partner who keeps it local',
      lede:
        'Orchard Property Management acquires New Jersey management firms and holds them for the long term. Your staff stay, your name stays, and your clients keep the service you taught your team to deliver.',
      actions: [
        { label: 'Start a confidential conversation', href: '#contact', variant: 'btn--primary' },
        { label: 'See how the process works', href: '#process', variant: 'btn--on-dark' },
      ],
    }),

    `<section class="section">
      <div class="container container--narrow">
        <p class="eyebrow">Why Orchard</p>
        <h2>Why owners choose us</h2>
        <p class="lead">Selling the company you built decides more than a number. It decides what happens to the people who show up every morning and to the name that boards and owners pass along.</p>
        <p>Orchard Property Management partners with residential, community association, commercial, and maintenance firms across New Jersey. We look for companies that earned their reputation the slow way, through managers who return calls, accounting that reconciles, and work that holds up when a board asks hard questions. When we find one, our plan is to keep it running the way it already runs and to fund the growth the owner never had the capital to pursue.</p>
        <p>We hold companies indefinitely. No fund timeline forces a resale in five years, and no outside shareholder presses for a number by a certain quarter, so we have every reason to protect the service quality that made the firm worth buying.</p>
        <p>Our founder, ${site.founder.name}, has spent his career partnering with founder-owned businesses. That experience turns out to be mostly about people: how to tell a staff their company has been sold, how to keep a board calm, and how to make a transition feel like continuity.</p>
        <p><a class="link-arrow" href="/about/">Meet ${site.founder.firstName} and read why Orchard exists</a></p>
      </div>
    </section>`,

    twoColumnList({
      eyebrow: 'Fit',
      title: 'What we look for, and what we are not',
      lede: 'We would rather tell you quickly that the fit is wrong than hold a process open while you wait on us.',
      columns: [
        {
          icon: 'growth',
          title: 'A good fit looks like this',
          list: [
            'A New Jersey management firm in one of our four areas, or close to it',
            'A profitable track record, and books that hold up to a straightforward review',
            'Management agreements and association contracts that renew year after year',
            'Managers, accountants, and maintenance staff who have stayed with you',
            'An owner who cares what happens to the team after closing',
          ],
        },
        {
          icon: 'clock',
          title: 'We are probably not your buyer if',
          list: [
            'One client or one community accounts for most of the revenue',
            'Most of the income comes from brokerage or development rather than recurring management',
            'The relationships and the licenses all sit with someone who leaves at closing',
            'You want the fastest possible close with no diligence',
            'You are looking purely for the highest number, with no interest in what follows',
          ],
        },
      ],
      variant: 'section--surface',
      id: 'fit',
    }),

    steps({
      eyebrow: 'How it works',
      title: 'Six steps from the first call to closing',
      lede:
        'You control the pace. Owners regularly pause for a season or a year between the first call and the next step, and that is a perfectly normal way to do this.',
      items: [
        {
          title: 'An introductory call',
          body:
            'A phone call. You describe the firm and what you want to happen next, we describe how Orchard operates, and we both decide whether a second conversation is worth having. No financials change hands.',
        },
        {
          title: 'A mutual non-disclosure agreement',
          body:
            'Before any numbers move, we sign a simple mutual non-disclosure agreement. Everything you share stays between you, our founder, and the small team that needs to see it.',
        },
        {
          title: 'A look at the business',
          body:
            'We review financials, the management agreements, the client base, and the team. We usually visit, meet you in person, and see the office. You still control who at your company knows we are there.',
        },
        {
          title: 'A letter of intent',
          body:
            'A letter of intent puts the price and the main terms in writing, so you know exactly what is on the table before either side spends money on lawyers and accountants.',
        },
        {
          title: 'Diligence and the team announcement',
          body:
            'Confirmatory diligence runs in the background while we plan how and when to tell your employees, and how to handle any client consents. We write that announcement together and answer questions in person.',
        },
        {
          title: 'Closing, and the day after',
          body:
            'Documents are signed and funds are wired. The next morning, the same manager answers the same phone, the board meeting on the calendar still happens, and we get to work on the hiring and the systems the firm has been waiting for.',
        },
      ],
      id: 'process',
    }),

    ctaBand({
      title: 'Want to find out what this could look like?',
      lede: 'One call, entirely confidential, with no expectation that anything follows it.',
      actions: [
        { label: 'Start the conversation', href: '#contact', variant: 'btn--primary' },
        { label: `Email ${site.email}`, href: `mailto:${site.email}`, variant: 'btn--on-dark' },
      ],
      variant: 'section--surface section--tight',
    }),

    featureGrid({
      eyebrow: 'Our commitments',
      title: 'What we promise an owner in writing',
      lede: 'These are the terms we hold ourselves to, and we are glad to put each of them in the purchase agreement.',
      items: [
        {
          icon: 'users',
          title: 'We retain your employees',
          body:
            'Managers, accountants, leasing staff, and maintenance technicians keep their jobs, their portfolios, and their seniority. Hiring more people is usually the first thing we fund.',
        },
        {
          icon: 'clock',
          title: 'We keep service uninterrupted',
          body:
            'Owner statements, board meetings, and maintenance response continue through the transition. Clients should see no change beyond a letter.',
        },
        {
          icon: 'chart',
          title: 'We invest in accounting and systems',
          body:
            'Capital goes into the staffing, software, and reporting your team uses every day, rather than into paying down the purchase as fast as possible.',
        },
        {
          icon: 'shield',
          title: 'We protect the reputation you built',
          body:
            'Your standards become our standards. We measure the business on client retention and service quality, not on how quickly we can raise fees.',
        },
        {
          icon: 'lock',
          title: 'We keep everything confidential',
          body: 'From the non-disclosure agreement forward, nobody learns about this conversation from us.',
        },
        {
          icon: 'handshake',
          title: 'We respect your time',
          body: 'You get a realistic timeline up front and an honest answer quickly if the fit is wrong.',
        },
      ],
    }),

    faq({
      eyebrow: 'Seller questions',
      title: 'Questions owners ask us first',
      lede: `If your question is not here, ask it in the form below and ${site.founder.firstName} will answer it personally.`,
      items: faqItems,
      variant: 'section--surface',
      id: 'faq',
    }),

    formSection({
      eyebrow: 'Confidential inquiry',
      title: 'Tell us about your company',
      lede: 'Your message reaches our founder directly, and the conversation stays between us.',
      intro: [
        'Fill in as much or as little as you like. The first four fields are all we need to call you back, and the rest simply saves us a question or two on that first call.',
        `If you would rather write directly, email <a href="mailto:${site.email}">${site.email}</a>.`,
      ],
      formName: 'seller-inquiry',
      fields: [
        { name: 'first_name', label: 'First name', required: true, autocomplete: 'given-name' },
        { name: 'last_name', label: 'Last name', required: true, autocomplete: 'family-name' },
        { name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' },
        { name: 'phone', label: 'Phone', type: 'tel', required: true, autocomplete: 'tel' },
        { name: 'company', label: 'Company name', required: true, span: true, autocomplete: 'organization' },
        { name: 'town', label: 'Town or county', autocomplete: 'address-level2' },
        {
          name: 'specialty',
          label: 'What you manage',
          type: 'select',
          options: [...specialties.map((s) => s.name), 'More than one of these', 'Something related'],
        },
        {
          name: 'timeline',
          label: 'When might you sell?',
          type: 'select',
          options: ['Within a year', 'One to three years', 'Three to five years', 'No timeline, just exploring'],
        },
        {
          name: 'message',
          label: 'Anything else we should know',
          type: 'textarea',
          span: true,
          placeholder: 'What matters most to you about who takes over?',
        },
      ],
      submitLabel: 'Send a confidential inquiry',
      footnote:
        'We use this information only to contact you about a possible partnership. We never sell or share it, and we will not contact your employees, clients, board members, or vendors without your written permission.',
      id: 'contact',
    })
  );

  return {
    id: 'sell',
    path: '/sell-your-business/',
    title: 'Sell your NJ property management company',
    description:
      'Sell your New Jersey property management, community association, or commercial management company to Orchard Property Management. We keep your staff and your name, and every conversation stays confidential.',
    crumbs: [{ label: 'Sell your business', href: '/sell-your-business/' }],
    ogImage: '/assets/img/og-default.jpg',
    body,
    schema: [faqSchema(faqItems)],
  };
}

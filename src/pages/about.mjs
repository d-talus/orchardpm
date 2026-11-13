import { site, executiveSupport, values } from '../data/site.mjs';
import { hero, split, featureGrid, prose, ctaBand, twoColumnList } from '../lib/modules.mjs';
import { join } from '../lib/html.mjs';

export function aboutPage() {
  const body = join(
    hero({
      compact: true,
      graphic: true,
      crumbs: [{ label: 'About', href: '/about/' }],
      eyebrow: 'About Orchard',
      title: 'A New Jersey platform that keeps good management firms local',
      lede:
        'Orchard Property Management acquires and operates the companies that manage homes, communities, and commercial property across New Jersey, and we hold them for the long term.',
    }),

    split({
      eyebrow: 'Our founder',
      title: site.founder.name,
      body: [
        'I grew up in New Jersey in a family built on hard work. My grandparents on both sides immigrated here and worked in the trades, and I take real pride in working with owners who have built strong, respected businesses in their communities.',
        'I built my career in private markets investing, partnering closely with owners and management teams on growth and operational improvement. Along the way I competed as a Division I wrestler at Harvard University while studying economics and psychology, and I earned my Master of Business Administration (MBA) from the Tuck School of Business at Dartmouth. Most of that career has gone into investing in and working alongside private, founder-owned businesses.',
        'I founded Orchard Property Management to give owners an alternative to the traditional private equity exit: a long-term home that protects their legacy and takes care of their people. My wife, our dog, and I live in Hoboken.',
        `Everything we do rests on integrity, respect, and confidentiality. If you are thinking about what happens to your company next, write to me directly at <a href="mailto:${site.email}">${site.email}</a>.`,
      ],
      image: '/assets/img/devon-gobbo.png',
      imageAlt: `${site.founder.name}, founder of ${site.name}`,
      mediaShape: 'media--person',
      imageWidth: 500,
      imageHeight: 500,
      actions: [{ label: 'Start a conversation', href: '/sell-your-business/#contact', variant: 'btn--primary' }],
    }),

    featureGrid({
      eyebrow: 'How we work',
      title: 'The principles we hire and buy against',
      lede:
        'These are the standards we hold ourselves to, and the ones we look for in the owners and teams who join us.',
      items: values,
      columns: 3,
      variant: 'section--surface',
      center: false,
    }),

    `<section class="section">
      <div class="container container--narrow">
        <p class="eyebrow">What we commit to</p>
        <h2>Commitments we make to every firm that joins us</h2>
        <h3>Quality</h3>
        <p>We partner exclusively with well-run property management companies that have earned solid reputations with owners, residents, and associations, and that employ talented teams. Our job is to maintain and raise the standards your business already set, not to find out how far they can be cut.</p>
        <h3>A seamless transition</h3>
        <p>We understand how important it is to handle transitions with care. In every acquisition we prioritize retaining employees, preserving owner and resident relationships, investing in systems, and protecting the reputation you built over the years.</p>
        <h3>Respect for your team</h3>
        <p>We view your employees as the heart of your business and work to keep them in place. Where an owner wants to step back, we can provide experienced managers and operational support, and we help identify and support the right leadership for what comes next.</p>
        <h3>Honoring your legacy</h3>
        <p>We understand the dedication it takes to build a strong business and the trust behind your name. Having partnered with founder-owned businesses before, we know how to make employees, clients, and communities feel comfortable through a smooth, respectful transition.</p>
        <h3>A thoughtful process</h3>
        <p>We recognize the value of your time and commit to making the process straightforward, efficient, and respectful of your priorities.</p>
      </div>
    </section>`,

    prose({
      eyebrow: 'Orchard with Talus Holdings',
      title: 'Guidance from people who have run businesses, not only financed them',
      body: [
        'Orchard Property Management is proud to partner with Talus Holdings, a team of seasoned operators and business builders who provide strategic guidance as the organization continues to grow.',
        'Talus brings decades of experience in finance, operations, and organizational development, which helps Orchard make thoughtful, long-term decisions that benefit employees, clients, and the businesses that join our platform.',
        'The people behind Talus have run companies across a wide range of industries and worked through the problems a business runs into along the way. That experience shows up where an owner feels it most, which is in how a transition is handled and how the company is treated in the years after it.',
      ],
      variant: 'section--dark',
    }),

    twoColumnList({
      eyebrow: 'A different kind of partner',
      title: 'Why the structure matters',
      columns: [
        {
          icon: 'clock',
          title: 'No clock running',
          body:
            'Talus is neither a private equity firm nor a venture capital fund. With no investment timeline and no external shareholders, decisions follow what the business needs, which makes it possible to build stable companies for the long term.',
        },
        {
          icon: 'chart',
          title: 'Executive support on tap',
          body:
            'A comprehensive suite of executive support services lets operators stay focused on what matters most, which is clients and employees, with access to a network of industry experts at every stage of growth.',
          list: executiveSupport.slice(0, 4).map((s) => `<strong>${s.title}.</strong> ${s.body}`),
        },
      ],
      variant: 'section--surface',
    }),

    ctaBand({
      title: 'Let us talk, whenever the timing suits you',
      lede: 'Every conversation stays confidential, and plenty of them happen years before a sale.',
      actions: [
        { label: 'Contact Orchard', href: '/contact/', variant: 'btn--primary' },
        { label: 'Sell your business', href: '/sell-your-business/', variant: 'btn--on-dark' },
      ],
      variant: '',
    })
  );

  return {
    id: 'about',
    path: '/about/',
    title: 'About Orchard Property Management',
    description:
      'Orchard Property Management is a New Jersey platform founded by Devon Gobbo and partnered with Talus Holdings. We acquire local property management firms and hold them for the long term.',
    crumbs: [{ label: 'About', href: '/about/' }],
    body,
    schema: [
      {
        '@type': 'AboutPage',
        name: `About ${site.name}`,
        url: `${site.url}/about/`,
        mainEntity: { '@id': `${site.url}/#organization` },
      },
      {
        '@type': 'Person',
        name: site.founder.name,
        jobTitle: 'Founder',
        worksFor: { '@id': `${site.url}/#organization` },
        email: site.email,
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'Harvard University' },
          { '@type': 'CollegeOrUniversity', name: 'Tuck School of Business at Dartmouth' },
        ],
        image: `${site.url}/assets/img/devon-gobbo.png`,
      },
    ],
  };
}

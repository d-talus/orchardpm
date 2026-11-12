/* Blog taxonomy. A post's `category` front matter must match one of these slugs. */

export const categories = [
  {
    slug: 'selling-your-business',
    name: 'Selling your business',
    url: '/blog/category/selling-your-business/',
    description:
      'What a sale actually looks like for an owner-run property management firm, from the drivers of value to the day you tell your team.',
  },
  {
    slug: 'running-your-firm',
    name: 'Running your firm',
    url: '/blog/category/running-your-firm/',
    description:
      'Staffing, software, accounting, and the operational problems that fill the week of a New Jersey property management owner.',
  },
  {
    slug: 'working-in-property-management',
    name: 'Working in property management',
    url: '/blog/category/working-in-property-management/',
    description:
      'Career paths, credentials, and day-to-day reality for property managers, maintenance technicians, and the people who support them.',
  },
  {
    slug: 'orchard-news',
    name: 'Orchard news',
    url: '/blog/category/orchard-news/',
    description:
      'Announcements and updates from Orchard Property Management, including the firms joining our New Jersey platform and what we are investing in next.',
  },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

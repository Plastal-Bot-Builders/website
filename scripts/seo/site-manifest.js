/**
 * SINGLE SOURCE OF TRUTH for SEO / AI-search metadata.
 *
 * Consumed by:
 *   - scripts/prerender.js       → writes per-route static HTML (head + crawlable body)
 *   - scripts/generate-sitemap.js → sitemap.xml + robots.txt
 *
 * TO ADD A PAGE: add a route object below and add the <Route> in src/App.tsx.
 * Metadata, JSON-LD, breadcrumbs, sitemap entry and the crawlable fallback
 * content are then generated automatically — no per-page configuration.
 *
 * ── ACCURACY RULE ───────────────────────────────────────────────────────────
 * Everything here may be quoted verbatim by AI assistants (ChatGPT, Gemini,
 * Perplexity, Copilot). Only put verifiable facts in this file. Figures that
 * are unconfirmed live in UNVERIFIED below and are deliberately kept OUT of
 * structured data until confirmed.
 */

const ORG = {
  name: 'Plastal-Bot Builders',
  legalName: 'Plastal-Bot Builders',
  tagline: 'Robotics and STEM education for young innovators in Zambia',
  description:
    'Plastal-Bot Builders is a youth robotics and STEM education organisation based in Lusaka, Zambia. ' +
    'It runs hands-on robotics workshops, bootcamps and community outreach programmes, builds open student ' +
    'engineering projects, and represents Zambia at international robotics competitions.',
  email: 'info@plastalbotbuilders.com',
  telephone: '+260 975 608103',
  city: 'Lusaka',
  country: 'ZM',
  countryName: 'Zambia',
  logo: '/resources/Logo/fred.svg',
  sameAs: [
    'https://www.linkedin.com/company/plastal-bot-builders/',
    'https://www.facebook.com/plastalbotbuiders',
    'https://medium.com/@plastalbotbuilders',
    'https://www.instagram.com',
  ],
};

/**
 * Facts confirmed from the project's own media/certificates. Safe to publish.
 */
const VERIFIED_FACTS = {
  competition2026: {
    nationalResult: 'Winner, AI for Good National Edition (Zambia), April 2026',
    internationalResult:
      'Finalist Team, AI for Good Robotics Competition, AI for Good Global Summit, Geneva, Switzerland, July 2026',
    countryRepresented: 'Zambia',
  },
  programmes: [
    'Spike Prime Robotics Bootcamp — a 6-week hands-on LEGO Spike Prime bootcamp run with the CBU Robotics Club',
    'Introduction to Robotics and Programming Workshop — an entry-level workshop covering electronics, Tinkercad simulation and Arduino programming',
  ],
  projects: [
    'Gypul — a low-cost self-balancing education robot using an IMU for stabilisation and an ESP32 for control',
    'Environmental Monitoring Rover — an Arduino-based rover that logs air and water quality data',
  ],
  partners: [
    'Technicbots (FIRST Tech Challenge Team 8565)',
    'Sounder Bots (FIRST Tech Challenge Team 23270)',
    'The Spartabots (FIRST Robotics Competition Team 2976)',
  ],
  supporters: [
    'MTN Zambia',
    'Zamtel',
    'KoBold Metals',
    'Absa Bank Zambia',
    'E-Mark',
    'EO Robotics Lab',
    'Government of Zambia',
  ],
};

/**
 * ⚠️  NOT published in structured data — needs confirmation from the team.
 * The site currently states 8,000+, 500+, 350+ and 30 students in different
 * places, and no founding date appears anywhere. Publishing a figure that
 * later proves wrong is worse than publishing none, because AI assistants
 * repeat it confidently. Fill these in and set `publish: true` to include them.
 */
const UNVERIFIED = {
  publish: false,
  foundingDate: null,          // e.g. '2022'
  studentsReached: null,       // site says 8,000+ / 500+ / 350+ in different places
  workshopsDelivered: null,
  schoolsReached: null,
};

/** Shared image used when a route doesn't specify its own. */
const DEFAULT_IMAGE = '/resources/Geneva2026/web/geneva-stage-celebration.jpg';

/**
 * Routes. `body` drives the crawlable fallback content that non-JavaScript
 * clients (most AI crawlers) receive; `schema` adds page-specific JSON-LD.
 */
const ROUTES = [
  {
    path: '/home',
    priority: '1.0',
    changefreq: 'weekly',
    title: 'Plastal-Bot Builders — Robotics & STEM Education in Zambia',
    description:
      'Plastal-Bot Builders is a Lusaka-based youth robotics organisation running hands-on STEM workshops and bootcamps, building student engineering projects, and representing Zambia at international robotics competitions.',
    image: DEFAULT_IMAGE,
    breadcrumb: [],
    body: {
      h1: 'Plastal-Bot Builders — empowering young innovators through robotics',
      summary:
        'Plastal-Bot Builders is a youth robotics and STEM education organisation based in Lusaka, Zambia. We teach robotics, programming and digital innovation through hands-on workshops and bootcamps, support students in building real engineering projects, and represent Zambia at international robotics competitions.',
      sections: [
        {
          h2: 'What we do',
          p: 'We run practical robotics and programming programmes for young people, from first-time learners to competition teams. Our work spans workshops in schools and communities, multi-week bootcamps, student-built engineering projects, and international competition participation.',
        },
        {
          h2: 'Our biggest milestone',
          p: 'After winning the AI for Good National Edition in Zambia in April 2026, our team represented Zambia at the AI for Good Robotics Competition at the AI for Good Global Summit in Geneva, Switzerland in July 2026, where they were recognised as a Finalist Team.',
        },
        {
          h2: 'Our programmes',
          list: VERIFIED_FACTS.programmes,
        },
        {
          h2: 'Our projects',
          list: VERIFIED_FACTS.projects,
        },
      ],
    },
    schema: ['WebSite', 'Organization'],
  },

  {
    path: '/about',
    priority: '0.9',
    changefreq: 'monthly',
    title: 'About Plastal-Bot Builders — Our Mission and Team',
    description:
      'Learn who Plastal-Bot Builders are: a Zambian youth robotics and STEM education organisation, our mission to empower young innovators, and the team behind our programmes.',
    breadcrumb: [{ name: 'About', path: '/about' }],
    body: {
      h1: 'About Plastal-Bot Builders',
      summary:
        'Plastal-Bot Builders is a robotics and STEM education organisation based in Lusaka, Zambia. Our mission is to empower young people to become innovators and problem-solvers by giving them practical skills in robotics, programming and engineering.',
      sections: [
        {
          h2: 'Our mission',
          p: 'To empower young people to become innovators and change-makers by equipping them with the skills and knowledge to create sustainable solutions through technology, robotics and environmental advocacy.',
        },
        {
          h2: 'Where we work',
          p: `Plastal-Bot Builders is based in ${ORG.city}, ${ORG.countryName}, and delivers programmes in schools and communities across the country.`,
        },
      ],
    },
    schema: ['Organization'],
  },

  {
    path: '/journey-to-geneva',
    priority: '0.9',
    changefreq: 'monthly',
    title: 'The Road to Geneva — Representing Zambia at the AI for Good Robotics Competition',
    description:
      'The full story of how Plastal-Bot Builders went from a hand-made practice field in Lusaka to winning the AI for Good National Edition and competing as a Finalist Team in Geneva, Switzerland.',
    image: '/resources/Geneva2026/web/geneva-stage-celebration.jpg',
    breadcrumb: [
      { name: 'News & Achievements', path: '/news' },
      { name: 'The Road to Geneva', path: '/journey-to-geneva' },
    ],
    body: {
      h1: 'The Road to Geneva',
      summary:
        'In 2026 Plastal-Bot Builders won the AI for Good National Edition in Zambia and went on to represent the country at the AI for Good Robotics Competition in Geneva, Switzerland, where the team was recognised as a Finalist Team. This is the full story, from the first robot built on a hand-made practice field to the world stage.',
      sections: [
        {
          h2: 'Building for the national competition (March 2026)',
          p: 'The team designed, built and programmed their robot over several weeks, marking out a competition field by hand so they could practise the missions repeatedly in their own workshop.',
        },
        {
          h2: 'Winning the national competition (April 2026)',
          p: 'Plastal-Bot Builders won the AI for Good National Edition in Zambia, earning the right to represent the country at the international competition in Geneva.',
        },
        {
          h2: 'Preparing for Switzerland (May–June 2026)',
          p: 'With additional robotics kits donated by the international FIRST community, the team built and tested several competing prototypes, refining drivetrains, attachments and sensor behaviour.',
        },
        {
          h2: 'Partners who made the journey possible',
          list: VERIFIED_FACTS.supporters,
        },
        {
          h2: 'The international robotics community',
          p: 'Mr. Chandra Polisetty purchased and donated two complete LEGO robotics kits and two expansion kits, which allowed the team to build and test multiple prototypes in parallel. Technicbots provided ongoing technical mentorship throughout development.',
          list: VERIFIED_FACTS.partners,
        },
        {
          h2: 'Geneva — the world stage (July 2026)',
          p: 'At the AI for Good Global Summit in Geneva, Switzerland, the team competed against teams from around the world, demonstrated their robot to delegates, and was recognised as a Finalist Team at the AI for Good Robotics Competition.',
        },
      ],
    },
    schema: ['Article', 'Event', 'Video'],
    article: {
      headline: 'Plastal-Bot Builders represents Zambia at the AI for Good Robotics Competition in Geneva',
      datePublished: '2026-07-20',
      section: 'Robotics competition',
    },
    event: {
      name: 'AI for Good Robotics Competition — AI for Good Global Summit',
      startDate: '2026-07-08',
      location: { name: 'AI for Good Global Summit', city: 'Geneva', country: 'CH' },
      description:
        'International robotics competition at the AI for Good Global Summit, where Plastal-Bot Builders represented Zambia and was recognised as a Finalist Team.',
    },
    video: {
      name: 'Competition highlights — AI for Good Robotics Competition, Geneva',
      description: 'Highlights of Plastal-Bot Builders competing in Geneva, Switzerland.',
      contentUrl: '/resources/Geneva2026/web/geneva-highlight.mp4',
      thumbnailUrl: '/resources/Geneva2026/web/geneva-highlight-poster.jpg',
      uploadDate: '2026-07-20',
    },
    faq: [
      {
        q: 'What competition did Plastal-Bot Builders compete in?',
        a: 'Plastal-Bot Builders won the AI for Good National Edition in Zambia in April 2026 and went on to compete in the AI for Good Robotics Competition at the AI for Good Global Summit in Geneva, Switzerland, in July 2026, where the team was recognised as a Finalist Team.',
      },
      {
        q: 'Which country did Plastal-Bot Builders represent?',
        a: 'Plastal-Bot Builders represented Zambia at the international competition in Geneva, Switzerland.',
      },
      {
        q: 'Who supported the team’s journey to Switzerland?',
        a: 'Zambian organisations including MTN Zambia, Zamtel, KoBold Metals, Absa Bank Zambia, E-Mark, EO Robotics Lab and the Government of Zambia supported the team, alongside international robotics partners including Mr. Chandra Polisetty, Technicbots (FTC 8565), Sounder Bots (FTC 23270) and The Spartabots (FRC 2976).',
      },
    ],
  },

  {
    path: '/news',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'News & Achievements — Plastal-Bot Builders',
    description:
      'Milestones from Plastal-Bot Builders: international robotics competitions, workshops, partnerships, awards and community outreach across Zambia and beyond.',
    breadcrumb: [{ name: 'News & Achievements', path: '/news' }],
    body: {
      h1: 'News & Achievements',
      summary:
        'A record of Plastal-Bot Builders milestones — competitions, workshops, partnerships and community outreach. The most recent milestone is representing Zambia at the AI for Good Robotics Competition in Geneva, Switzerland, in July 2026.',
      sections: [
        {
          h2: 'Recent milestones',
          list: [
            'Finalist Team, AI for Good Robotics Competition, Geneva, Switzerland — July 2026',
            'Winner, AI for Good National Edition, Zambia — April 2026',
            'Hosted by Zambia’s Presidential Delivery Unit, where the team demonstrated their robot to government officials — July 2026',
            'Spike Prime Robotics Bootcamp completed with the CBU Robotics Club',
          ],
        },
      ],
    },
    schema: ['CollectionPage'],
  },

  {
    path: '/programs',
    priority: '0.9',
    changefreq: 'monthly',
    title: 'Robotics Programmes & STEM Workshops — Plastal-Bot Builders',
    description:
      'Hands-on robotics bootcamps and STEM workshops from Plastal-Bot Builders, covering LEGO Spike Prime, Arduino, electronics, CAD, 3D printing and programming for young learners in Zambia.',
    breadcrumb: [{ name: 'Programmes', path: '/programs' }],
    body: {
      h1: 'Robotics programmes and STEM workshops',
      summary:
        'Plastal-Bot Builders runs hands-on robotics and programming programmes for young people in Zambia, from entry-level workshops through to multi-week bootcamps and competition preparation.',
      sections: [
        { h2: 'Our programmes', list: VERIFIED_FACTS.programmes },
        {
          h2: 'What learners cover',
          p: 'Programmes cover robotics fundamentals, electronics and circuit simulation, CAD modelling and 3D printing, programming with Python and Arduino, computer vision basics, and team-based problem solving.',
        },
      ],
    },
    schema: ['Course'],
    faq: [
      {
        q: 'What robotics programmes does Plastal-Bot Builders offer?',
        a: 'Plastal-Bot Builders runs the Spike Prime Robotics Bootcamp — a 6-week hands-on LEGO Spike Prime programme delivered with the CBU Robotics Club — and the Introduction to Robotics and Programming Workshop, an entry-level course covering electronics, Tinkercad simulation and Arduino programming.',
      },
      {
        q: 'Who can join a Plastal-Bot Builders workshop?',
        a: 'Programmes are designed for young people, including complete beginners. Past workshops have included learners as young as six, alongside secondary school and university-age participants.',
      },
      {
        q: 'Where are the workshops held?',
        a: 'Workshops and bootcamps are delivered in schools and community venues in Lusaka and across Zambia.',
      },
    ],
  },

  {
    path: '/projects',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Student Robotics Projects — Plastal-Bot Builders',
    description:
      'Open, hands-on robotics projects built by Plastal-Bot Builders students, including the Gypul self-balancing robot and an Arduino-based environmental monitoring rover.',
    breadcrumb: [{ name: 'Projects', path: '/projects' }],
    body: {
      h1: 'Student robotics projects',
      summary:
        'Engineering projects designed and built by Plastal-Bot Builders students and mentors, built to be classroom-ready and open for others to learn from.',
      sections: [{ h2: 'Featured projects', list: VERIFIED_FACTS.projects }],
    },
    schema: ['CollectionPage'],
  },

  {
    path: '/projects/gypul',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Gypul — Self-Balancing Education Robot | Plastal-Bot Builders',
    description:
      'Gypul is a low-cost self-balancing robot built by Plastal-Bot Builders for classrooms and makerspaces, using an IMU for stabilisation, an ESP32 for control and 3D-printed parts.',
    breadcrumb: [
      { name: 'Projects', path: '/projects' },
      { name: 'Gypul', path: '/projects/gypul' },
    ],
    body: {
      h1: 'Gypul — self-balancing education robot',
      summary:
        'Gypul is a low-cost self-balancing robot platform built for classrooms and makerspaces. It uses an IMU for stabilisation, an ESP32 microcontroller for control, and 3D-printed parts for easy assembly. Students use it to learn PID control, sensor fusion and embedded programming.',
      sections: [
        {
          h2: 'How it works',
          p: 'An inertial measurement unit reports the robot’s tilt angle, and a PID control loop running on the ESP32 drives the motors to keep the robot upright. The chassis is 3D printed so it can be reproduced cheaply.',
        },
      ],
    },
    schema: ['CreativeWork'],
  },

  {
    path: '/projects/enviro-monitor',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Environmental Monitoring Rover | Plastal-Bot Builders',
    description:
      'An Arduino-based rover built by Plastal-Bot Builders students that measures and logs air and water quality data for analysis.',
    breadcrumb: [
      { name: 'Projects', path: '/projects' },
      { name: 'Environmental Monitoring Rover', path: '/projects/enviro-monitor' },
    ],
    body: {
      h1: 'Environmental Monitoring Rover',
      summary:
        'A student-built rover that logs environmental data using Arduino-based sensors and uploads results to a central dashboard for analysis and visualisation.',
      sections: [
        {
          h2: 'What it measures',
          p: 'The rover carries sensors for air and water quality measurements, giving students a practical introduction to sensing, data logging and sustainability-focused engineering.',
        },
      ],
    },
    schema: ['CreativeWork'],
  },

  {
    path: '/events',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Upcoming Robotics Events & Workshops — Plastal-Bot Builders',
    description:
      'Register for upcoming Plastal-Bot Builders robotics workshops, bootcamps and STEM events in Zambia.',
    breadcrumb: [{ name: 'Events', path: '/events' }],
    body: {
      h1: 'Upcoming events and workshops',
      summary:
        'Plastal-Bot Builders runs hands-on robotics workshops, bootcamps and community STEM events. Upcoming sessions and registration details are listed on this page.',
      sections: [
        {
          h2: 'How to take part',
          p: 'Events are open to young people and are announced on this page. Registration is handled directly through the site.',
        },
      ],
    },
    schema: ['CollectionPage'],
  },

  {
    path: '/support',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Support Plastal-Bot Builders — Donate, Sponsor or Partner',
    description:
      'Ways to support robotics and STEM education in Zambia: donate, sponsor a programme, volunteer as a mentor, or partner with Plastal-Bot Builders as a company, school or nonprofit.',
    breadcrumb: [{ name: 'Support', path: '/support' }],
    body: {
      h1: 'Support Plastal-Bot Builders',
      summary:
        'Plastal-Bot Builders is supported by donations, sponsorships and partnerships. Support funds robotics kits, workshop delivery and competition participation for young people in Zambia.',
      sections: [
        {
          h2: 'Ways to support',
          list: [
            'Donate to fund robotics kits and workshop delivery',
            'Sponsor a specific programme, workshop or competition team',
            'Volunteer as a mentor or technical instructor',
            'Partner with us as a company, school or nonprofit organisation',
          ],
        },
      ],
    },
    schema: ['WebPage'],
    faq: [
      {
        q: 'How can I support Plastal-Bot Builders?',
        a: 'You can donate, sponsor a specific programme or competition team, volunteer as a mentor, or partner with Plastal-Bot Builders as a company, school or nonprofit. Contact info@plastalbotbuilders.com to discuss support.',
      },
      {
        q: 'What does a donation pay for?',
        a: 'Donations fund robotics kits and components, workshop delivery in schools and communities, and participation in national and international robotics competitions.',
      },
    ],
  },

  {
    path: '/blogs',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Blog — Robotics, STEM Education and Innovation in Zambia',
    description:
      'Articles from Plastal-Bot Builders on robotics education, STEM workshops, student projects and technology innovation in Zambia.',
    breadcrumb: [{ name: 'Blog', path: '/blogs' }],
    body: {
      h1: 'Blog',
      summary:
        'Writing from the Plastal-Bot Builders team on robotics education, workshops, student projects and technology in Zambia.',
      sections: [],
    },
    schema: ['Blog'],
  },

  {
    path: '/membershipform',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Become a Member — Join Plastal-Bot Builders',
    description:
      'Apply to join Plastal-Bot Builders as a student or professional member and take part in robotics programmes, mentorship and community projects in Zambia.',
    breadcrumb: [{ name: 'Become a Member', path: '/membershipform' }],
    body: {
      h1: 'Become a member',
      summary:
        'Join Plastal-Bot Builders as a student or professional member. Members take part in robotics programmes, mentorship, and community projects.',
      sections: [],
    },
    schema: ['WebPage'],
    robots: 'index, follow',
  },

  {
    path: '/team/technicbots',
    priority: '0.5',
    changefreq: 'yearly',
    title: 'Technicbots FTC Team 8565 — International Partner | Plastal-Bot Builders',
    description:
      'How Technicbots, FIRST Tech Challenge Team 8565, partners with Plastal-Bot Builders to provide mentorship, equipment support and international competition pathways for Zambian students.',
    breadcrumb: [
      { name: 'About', path: '/about' },
      { name: 'Technicbots', path: '/team/technicbots' },
    ],
    body: {
      h1: 'Technicbots — FIRST Tech Challenge Team 8565',
      summary:
        'Technicbots is a FIRST Tech Challenge team that partners with Plastal-Bot Builders, sharing resources, mentorship and technical guidance to support robotics education in Zambia.',
      sections: [],
    },
    schema: ['WebPage'],
  },
];

module.exports = { ORG, VERIFIED_FACTS, UNVERIFIED, ROUTES, DEFAULT_IMAGE };

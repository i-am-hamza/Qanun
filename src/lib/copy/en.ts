export const en = {
  siteName: 'Qanun',
  siteNameAr: 'قانون',
  tagline: 'Qatar regulatory library',
  disclaimer:
    'Qanun is not a law firm and does not provide legal advice. Content on this platform is for informational purposes only and should not be relied upon as legal advice. Always consult a qualified legal practitioner for advice specific to your situation.',
  preview: {
    ribbon: 'Preview data — not real regulatory content',
  },
  nav: {
    library: 'Library',
    check: 'Check what applies',
    updates: 'Updates',
    about: 'About',
    signIn: 'Sign in',
    menu: 'Menu',
  },
  hero: {
    h1: 'Which Qatar regulations apply to your company?',
    sub: 'Choose your sector and licence. See the laws, circulars and requirements that apply, each linked to the official text.',
    checkCta: 'See the full list',
    searchPlaceholder: 'Search a law, circular or requirement',
    searchHint: 'Try 13/2016',
    countApplies: (n: number) => `${n} regulation${n === 1 ? '' : 's'} apply`,
    countMayApply: (n: number) => `${n} may apply`,
    countBoth: (applies: number, mayApply: number) =>
      `${applies} regulation${applies === 1 ? '' : 's'} apply, ${mayApply} may apply`,
    selectSector: 'Select sector',
    selectLicence: 'Select licence or activity',
    listedLabel: 'Listed on Qatar Stock Exchange?',
    exampleResult: 'Example result',
    exampleResultNote:
      'Preview with sample data. Real results arrive when the library launches.',
    listedYes: 'Yes',
    listedNo: 'No',
    listedNotSure: 'Not sure',
  },
  sectors: {
    heading: 'Sectors covered',
    subHeading: 'Regulatory frameworks by industry',
    comingSoon: 'Coming soon',
    childSectors: 'Including',
    regulators: 'Regulators',
    instruments: 'Instruments',
  },
  recentChanges: {
    heading: 'Recent changes',
    linkAll: 'See all updates',
    new: 'New',
    amended: 'Amended',
    repealed: 'Repealed',
  },
  pipeline: {
    heading: 'How a requirement gets here',
    steps: [
      {
        label: 'Official source',
        description:
          'We start with the official gazette, regulatory website or published instrument.',
      },
      {
        label: 'Clauses',
        description: 'The instrument is split into individual provisions, each with its path.',
      },
      {
        label: 'Drafted',
        description:
          'A requirement statement is drafted from the clause — plain English, one obligation at a time.',
      },
      {
        label: 'Reviewed',
        description:
          'A person checks the draft against the original Arabic text and confirms it is accurate.',
      },
      {
        label: 'Published',
        description:
          'The requirement is published with a "last verified" date and a link to its source clause.',
      },
    ],
  },
  regulators: {
    heading: 'Regulators covered',
  },
  audiences: {
    heading: 'Built for two audiences',
    consultants: {
      title: 'Consultants & auditors',
      points: [
        'Clause-level traceability for every requirement',
        'Export to Excel for working papers and gap analyses',
        'Track compliance status across multiple clients',
      ],
    },
    businesses: {
      title: 'Businesses',
      points: [
        'Plain-English requirements, no legalese',
        'A check that shows exactly what applies to you',
        'Alerts when a law or regulation changes',
      ],
    },
  },
  faq: {
    heading: 'Frequently asked questions',
  },
  footer: {
    product: 'A One Sentient product',
    legal: {
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
    },
    copyright: (year: number) => `© ${year} Qanun`,
  },
  comingSoon: {
    heading: 'Coming soon',
    backHome: 'Back to home',
    descriptions: {
      library:
        'Browse and search all of Qatar\'s laws, circulars, rulebooks and requirements in one place.',
      check:
        'Answer three questions about your company and see exactly which regulations apply.',
      search:
        'Search across instruments, provisions and requirements by keyword or citation.',
      updates:
        'Track amendments, new instruments and repeals as they are confirmed.',
      about:
        'Learn how Qanun works, how requirements are verified, and who is behind it.',
      'sign-in':
        'Sign in to save your applicability profile and track compliance across audits.',
      regulations:
        'Read the full text and individual requirements of a Qatar regulation.',
      sectors: 'Browse the laws and regulations that apply to a specific sector.',
    } as Record<string, string>,
    fallback: 'This page is part of Qanun and will be available when the library launches.',
  },
} as const

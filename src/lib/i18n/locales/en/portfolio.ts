export const homeTeaser = {
      badge: 'Business',
      title: 'Impact by company',
      description:
        'SURA, Transvip, and Karri in fintech and mobility. Design system, discovery, and metrics in the full hub.',
      ctaNegocios: 'View all business',
      ctaProceso: 'View UX process',
    };

export const aboutTeaser = {
      badge: 'About',
      title: 'Regional UX Lead · Fintech & Mobility',
      lead:
        'From Senior Product Designer at Transvip/Karri to UX Lead at SURA Investments (Wealth, 5+ countries). Same method standard: research, Design Ops, design systems, and measured outcomes.',
      detail:
        'Brands in the narrative: SURA Investments · Transvip · Karri · Valuesite · Havas/Claro · Walmart · Maraña · teaching at Desafío Latam. Not just logos — context, role, and evidence per stage.',
      brandsLabel: 'Brands and contexts',
      // Chips only for brands without logo row (SURA/Transvip/Karri are logos)
      brands: [
        'Valuesite',
        'Havas / Claro',
        'Walmart',
        'Maraña',
        'Desafío Latam',
      ],
      cta: 'View full track record',
    };

export const upcomingCases = {
      badge: 'Coming soon',
      title: 'Cases in progress',
      description: 'Visual evidence and metrics being added to the business hub.',
      status: 'Evidence in progress',
      openFigma: 'Open in Figma',
    };

export const autosuggestPage = {
      title: 'Fund autosuggest',
      badge: 'UX pattern · SURA Investments',
      subtitle:
        'Product evidence — predictive search pattern, not a standalone case study.',
      intro:
        'This documents the autosuggest pattern inside the SURA Investments redesign: reduce friction when finding funds, preserve financial data depth, and meet WCAG 2.2 AA and CMF compliance.',
      metrics: [
        { value: '−45%', label: 'Time to find information' },
        { value: '+30%', label: 'Retail user engagement' },
        { value: 'NPS 72', label: '25-point lift vs. baseline' },
      ],
      sections: {
        challenge: {
          title: 'The challenge',
          body:
            'Investors needed to locate funds quickly without losing regulatory context or risk metrics. A generic search caused drop-off; exhaustive listings overwhelmed users.',
        },
        approach: {
          title: 'UX approach',
          body: 'Combined semantic autosuggest with progressive information layers:',
          items: [
            'Suggestions by name, ISIN, and category with empty, loading, and no-results states',
            'Progressive disclosure: summary in list, detail in side panel',
            'Visual hierarchy for risk, return, and horizon without cluttering the first view',
            'Keyboard and screen reader support: arrow navigation, aria-live on results',
          ],
        },
        outcomes: {
          title: 'Outcomes',
          items: [
            'Shorter time to first investment action',
            'Higher perceived confidence among retail users',
            'Clear dev handoff with documented error and validation states',
          ],
        },
      },
      cta: 'View investment platform',
      ctaSecondary: 'Explore UX Analytics process',
      relatedProjectId: 'sura-inversiones-dashboard',
      processId: 'ux-analytics',
    };

export const about = {
      badge: 'About',
      title: 'UX Manager · Viento Norte',
      subtitle: '7+ years craft · 3+ lead mobility→wealth',
      description:
        'Now UX Manager at Viento Norte (n2n) and AI Trainer at micro1. Previously UX Lead at SURA Investments (Wealth, 5+ countries, through Jun 2026). Research, Design Sprints, design systems, and −40% onboarding.',
      philosophy: {
        idea: {
          title: 'Idea',
          description: 'The conceptualization and strategy behind each experience. The thinking that shapes the solution.',
        },
        body: {
          title: 'Body',
          description: 'The tangible execution and interface. Materializing ideas into functional digital products.',
        },
      },
      values: {
        title: 'Values that guide my work',
        list: {
          nature: {
            title: 'Nature-inspired',
            description: 'Organic design based on natural patterns and real human behavior.',
          },
          contemplation: {
            title: 'Space to decide',
            description: 'Interfaces that give users time to reflect and make informed decisions.',
          },
          creativity: {
            title: 'Purposeful innovation',
            description: 'Creative solutions that solve real problems, not just aesthetics.',
          },
          accessibility: {
            title: 'Inclusive design',
            description: 'Accessible experiences for all users, no exceptions.',
          },
        },
      },
    };

export const projects = {
      badge: 'Portfolio',
      title: 'Professional Experience',
      description: 'Projects organized by company and role. Each case includes context, processes, and measurable results.',
      companies: {
        title: 'Companies I\'ve worked with',
        description: 'Experience in fintech and mobility tech. Click to see full projects.',
      },
      viewProjects: 'View business',
      projectCount: 'projects',
      backToCompanies: 'Back to companies',
      tabs: {
        processes: 'Processes',
        details: 'Results',
      },
      details: {
        challenge: 'Challenge',
        solution: 'Solution',
        results: 'Results',
        learnings: 'Learnings',
      },
      teamSize: 'Team',
      cta: 'View full case studies',
      stats: {
        experience: 'Years as Lead UX',
        projects: 'Completed projects',
        generation: 'UX/UI teaching cohort',
        designThinking: 'Design Thinking applied',
      },
    };

export const experience = {
      badge: 'Career',
      title: 'Professional Experience',
      description:
        'Story by stage: context, role, and impact — from agency and retail to regional fintech and mobility.',
      current: 'Present',
      yearsAbbr: 'y',
      viewCases: 'View cases and evidence',
      achievementsLabel: 'Key achievements',
      contextLabel: 'Context',
      roleLabel: 'Role',
      impactLabel: 'Impact',
      evidenceLabel: 'Evidence',
    };

export const skills = {
      badge: 'Skills',
      title: 'Skills & Tools',
      description: 'Technologies and methodologies I master to create exceptional experiences.',
      categories: {
        design: 'UX/UI Design',
        research: 'Research & Testing',
        tools: 'Tools',
        development: 'Frontend',
      },
    };

export const mockups = {
      badge: 'Visual evidence',
      defaultTitle: 'Project visual evidence',
      defaultDescription: 'High-fidelity mockups of the implemented UX/UI design',
      companyTitle: 'Evidence — {name}',
      projectTitle: 'Evidence — {name}',
      projectDescription:
        'High-fidelity captures and prototypes from the UX/UI design work on this project.',
      itemLabel: '{project} · View {current} of {total}',
      designTitle: 'Design artifacts',
      designDescription:
        'Screens, diagrams, and visual deliverables from the research and design process.',
      capturesTitle: 'Screenshots and mockups',
      capturesDescription: 'Complementary high-fidelity visual evidence.',
      swipeHint: 'Tap to zoom',
      expand: 'Expand image',
      galleryAria: 'Featured project capture',
      viewOf: 'View {current} of {total}',
      moreCaptures: 'View {n} more captures',
      showFeaturedOnly: 'Featured only',
    };

export const common = {
      viewMore: 'View more',
      viewLess: 'View less',
      loading: 'Loading...',
      error: 'Something went wrong',
      backToTop: 'Back to top',
      visitProject: 'Visit project',
    };

export const projectsList = {
      title: 'Roles and Featured Projects',
      description: 'Professional experience organized by company and role. Each project includes business context, applied processes, and measurable results.',
      filters: {
        all: 'All projects',
        featured: '⭐ Featured',
        fintech: 'Fintech',
        mobility: 'Mobility',
      },
      noResults: 'No projects found in this category',
      viewFullCases: 'View method & results',
    };

export const projectsHub = {
      otherProjects: 'Other projects',
      otherProjectsDesc: 'Independent projects and developed frameworks',
      featuredProjects: 'Featured projects',
      frameworkButton: 'How I work: The 5 UX processes',
    };

export const breadcrumbs = {
      home: 'Home',
      projects: 'Business',
      cases: 'Process',
      process: 'UX Process',
      framework: 'UX Framework',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy',
      news: 'News',
      designSystem: 'Design System',
      audit: 'Audit',
      consulting: 'Consulting',
      grafo: 'Graph',
      autosuggest: 'Autosuggest Funds',
      admin: 'Admin',
      notFound: 'Not found',
    };

export const privacyPage = {
      badge: 'Privacy by design',
      title: 'Fair data. Zero noise.',
      lead:
        'We process the minimum needed to reply. No ad cookies, no sales, no required account. Chile Law 21.719.',
      updated: 'Updated: 24 Aug 2026',
      principles: [
        {
          title: 'Minimization',
          body: 'Name, email, and message only if you send them. Nothing else by default.',
        },
        {
          title: 'Purpose',
          body: 'Reply to your inquiry or kickoff. No ad profiling.',
        },
        {
          title: 'Control',
          body: 'Access, rectification, erasure, objection, portability, restriction: one email.',
        },
        {
          title: 'No sale',
          body: 'We do not sell data. No advertising cookies.',
        },
      ],
      inventoryTitle: 'What we process on this site',
      inventoryHint:
        'The form, assistant, or an agent tool send over HTTPS to the Worker (Cloudflare) and Google Forms. Page analytics only if enabled in production (e.g. GTM on /#/consultoria).',
      inventoryHead: ['Data', 'Purpose', 'Legal basis', 'Retention'],
      inventoryRows: [
        {
          data: 'Name, email, message',
          purpose: 'Reply and follow up',
          basis: 'Consent (Law 21.719)',
          keep: 'Up to 12 months, unless legally required',
        },
        {
          data: 'Page events (if analytics on)',
          purpose: 'Improve the site',
          basis: 'No ad cookies; anonymous events',
          keep: 'Aggregated, never sold',
        },
      ],
      notTitle: 'What we do not do',
      notItems: [
        'Advertising cookies or ad pixels in this policy.',
        'Sell or share data for third-party marketing.',
        'Require an account to read the site.',
        'Mix the Polijuego board with the consulting form.',
      ],
      rightsTitle: 'Your rights (ARSOPL)',
      rightsLead:
        'Write to contacto@vientonorte.io. Response window: 15 business days.',
      rights: [
        { label: 'Access' },
        { label: 'Rectification' },
        { label: 'Erasure' },
        { label: 'Objection' },
        { label: 'Portability' },
        { label: 'Restriction' },
      ],
      appTitle: 'R.A.D.A.R. El Polijuego app',
      appBody:
        'The native game does not use this page. On-device board, AES-256-GCM vault, zero network for content, in-app purge.',
      appCta: 'Read the app policy',
      controllerTitle: 'Controller',
      controllerBody: 'Rodrigo Gaete Gaona · Viento Norte — Chile.',
    };

export const footer = {
      contact: 'Contact',
      linkedin: 'LinkedIn',
      privacy: 'Privacy',
      uxtools: 'UX Tools',
      copyright: 'Rodrigo Gaete Gaona · UX Lead',
      tagline: 'Designed with attention to detail and accessibility.',
    };

export const errors = {
      companyNotFound: 'We could not find that company.',
      projectNotFound: 'We could not find that project.',
      processNotFound: 'Process not found',
      pageNotFound:
        'We could not find this page. In this SPA the 404 code is from the app (not the server).',
      backToProjects: 'Back to business',
      backToHome: 'Back to home',
      back: 'Back',
      imageNotFound: 'Image not found',
      serverError: 'Application server error',
      contentUnavailable: 'Content unavailable',
    };

export const processDetail = {
      methodology: 'Methodology',
      methods: 'Methods applied',
      toolCategories: 'Categories',
      toolCategoriesTitle: 'Analysis tools and approaches',
      toolCategoriesSubtitle:
        'Category → subcategory taxonomy: quantitative, qualitative, ethnographic, platforms, and AI-assisted.',
      tools: 'Tools',
      benefits: 'Benefits',
      relatedProjects: 'Projects where I applied this',
      backToCaseStudies: 'Back to Case Studies',
      viewProject: 'View project',
      realCases: 'Real cases',
      relatedSubtitle: 'Projects where I applied {process} with measurable results',
      viewAllProjects: 'View all business',
      viewExternalProof: 'View external proof',
    };


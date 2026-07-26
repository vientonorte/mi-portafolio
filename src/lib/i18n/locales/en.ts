import type { HeroSearchSuggestion } from '../../hero-search';

export default {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Business',
      experience: 'Experience',
      skills: 'Skills',
      contact: 'Contact',
      designSystem: 'Design System',
      caseStudies: 'Case Studies',
      process: 'Process',
      more: 'More',
      consulting: 'Consulting ✦',
      audit: 'UX Audits',
      uxtools: 'UX Tools',
    },

    homeTeaser: {
      badge: 'Business',
      title: 'Impact by company',
      description:
        'SURA, Transvip, and Karri in fintech and mobility. Design system, discovery, and metrics in the full hub.',
      ctaNegocios: 'View all business',
      ctaProceso: 'View UX process',
    },
    
    seo: {
      keywords:
        'Design Ops, UX Lead, regulatory compliance, premium experiences, fintech, mobility, SURA, Transvip, Karri',
      pages: {
        home: {
          title: 'Rodrigo Gaete · UX Lead',
          description:
            'UX Lead using Design Ops as a method: regulated products and mobility. Cases at SURA, Transvip, and Karri.',
        },
        proyectos: {
          title: 'Business · UX Lead',
          description:
            'Case studies with evidence and metrics at SURA Investments, Transvip, and Karri. Fintech, mobility, enterprise.',
        },
        cases: {
          title: 'UX Framework & Cases',
          description:
            '5 UX processes — analytics, research, design, testing, refinement. Applied at SURA, Transvip, and Karri.',
        },
        framework: {
          title: 'UX Framework — 5 Processes',
          description:
            '5 macro-process methodology with real cases in enterprise fintech and mobility.',
        },
        about: {
          title: 'About',
          description:
            'Rodrigo Gaete, UX Lead in fintech & mobility. Design Ops, research, design systems, and cases at SURA, Transvip, Karri.',
        },
        contact: {
          title: 'Contact',
          description:
            'Contact Rodrigo Gaete for UX projects, consulting, or collaborations in fintech and mobility.',
        },
        designSystem: {
          title: 'Design System · Rodrigo Gaete',
          description:
            'Figma-ready tokens (Tokens Studio, W3C, CSS), minimal RG brand, matte surfaces, and measurable-evidence patterns from the Lead UX portfolio.',
        },
        privacy: {
          title: 'Privacy',
          description:
            'Portfolio privacy policy. No tracking cookies or data without consent.',
        },
        audit: {
          title: 'UX/UI Portfolio Audit',
          description:
            'Strategic UX/UI audit: risks, SEO quick wins, and a 3-session mentorship plan.',
        },
        consultoria: {
          title: 'UX Consulting · Viento Norte',
          description:
            'Free Radar entry: WCAG 2.2 AA on one critical flow. Diagnostic, prototype, process, or working app. SMBs · kickoff <24h.',
        },
        grafo: {
          title: 'Institutional friction network',
          description: 'Graph of institutional relationships and friction — territorial research.',
        },
        autosuggest: {
          title: 'Fund autosuggest',
          description:
            'UX pattern in SURA Investments: predictive fund search with progressive disclosure and WCAG 2.2 AA — product evidence, not a case study.',
        },
        admin: {
          title: 'Photo admin',
          description: 'Private portfolio image editor.',
        },
      },
    },

    aboutTeaser: {
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
    },

    upcomingCases: {
      badge: 'Coming soon',
      title: 'Cases in progress',
      description: 'Visual evidence and metrics being added to the business hub.',
      status: 'Evidence in progress',
    },

    uxAuditBanner: {
      badge: 'Free · Radar · SMBs',
      titleLead: 'Free Radar entry:',
      titleAccent: 'WCAG 2.2 AA',
      description:
        'WCAG 2.2 AA review of one critical flow. If it fits, let’s talk full Express diagnostic (Radar, 5–7 days). Built for SMBs that want less friction.',
      highlights: ['Free', 'WCAG 2.2 AA', '1 critical flow', 'Radar 5–7 days'],
      ctaPrimary: 'Book free entry',
      ctaSecondary: 'View consulting',
      metrics: {
        a11y: 'Accessibility',
        priority: 'Priority',
        recruiter: 'Recruiter test',
      },
      panelNote: 'SEM lead magnet: free Radar entry → full express diagnostic upsell.',
    },

    valueArsenal: {
      badge: 'Navigable social proof',
      title: 'Evidence you can open now',
      description:
        'Figma demos, live POCs, SURA/Transvip/Karri cases, and documented UX method. Each piece maps to a consulting format — explore before you book.',
      filterAriaLabel: 'Filter evidence',
      filters: {
        all: 'All',
        prototype: 'Prototypes',
        poc: 'POCs',
        audit: 'Audits',
        case: 'Cases',
      },
      evidenceCount: '{count} pieces ready to review',
      showingCount: 'Showing {visible} of {total}',
      loadMore: 'Load more evidence',
      viewProof: 'Open evidence',
      bundleFit: 'Format',
      bundleStripTitle: 'Ready for kickoff?',
      bundleStripDescription:
        'Pick a format or let the decision tree recommend one. No public pricing — scope and proposal in the first session (<24 business hours).',
      bundleStripBadge: 'Conversion · SEM/SEO',
      bundleCta: 'Start onboarding',
      treeCta: 'Find the right fit',
      recommended: 'Recommended',
    },

    valueCarousel: {
      sectionBadge: 'Value content',
      prevSlide: 'Previous',
      nextSlide: 'Next',
      slideOf: 'Slide {current} of {total}',
      slides: [
        {
          id: 'audit',
          badge: 'UX Audit',
          title: 'Prioritized findings',
          titleAccent: 'ready to execute',
          description:
            'Nielsen heuristics, WCAG 2.2 AA, and recruiter test in under 10 s. Executive deliverable with P0–P2 plan.',
          highlights: ['Nielsen heuristics', 'WCAG 2.2 AA', 'P0–P2 plan'],
          metrics: [
            { value: 'WCAG 2.2', label: 'Accessibility' },
            { value: 'P0–P2', label: 'Priority' },
            { value: '<10 s', label: 'Recruiter test' },
          ],
          cta: 'View sample audit',
          ctaSecondary: 'Choose consulting',
        },
        {
          id: 'sura-case',
          badge: 'Production case',
          title: 'RIA SURA US',
          titleAccent: '−40% onboarding',
          description:
            'Multi-profile onboarding for US advisors: 8 navigable prototypes, 3 auth flows, and progressive disclosure.',
          highlights: ['Regulated fintech', '8 prototypes', 'US market'],
          metrics: [
            { value: '−40%', label: 'Onboarding time' },
            { value: '8', label: 'Prototypes' },
            { value: 'NPS 72', label: 'Platform' },
          ],
          cta: 'View full case',
          ctaSecondary: 'View UX Analytics phase',
        },
        {
          id: 'consultoria',
          badge: 'Viento Norte',
          title: 'Find your format',
          titleAccent: 'in 2 questions',
          description:
            'Decision tree + 4-step onboarding. No public pricing — scope and proposal at kickoff.',
          highlights: ['Diagnostic · Strategy · Team', 'Pre-filled message', 'Kickoff <24 h'],
          metrics: [
            { value: '3', label: 'Formats' },
            { value: '4', label: 'Steps' },
            { value: '<24 h', label: 'Response' },
          ],
          cta: 'Start onboarding',
          ctaSecondary: 'Try decision tree',
        },
      ],
    },

    consultoria: {
      progressLabel: 'Onboarding',
      previewOnly: 'Preview',
      previewNote: 'Price and detail close at kickoff.',
      recommended: 'Recommended',
      back: 'Back',
      next: 'Continue',
      stickyCta: 'Book kickoff',
      entry: {
        selectedPackage: 'Selected format:',
        changePackage: 'Change',
      },
      landing: {
        badge: 'Viento Norte · SMBs',
        principleBadge: 'UX consulting',
        title: 'UX design for SMBs.',
        titleAccent: 'Pick the deliverable.',
        description:
          'Diagnostic, prototype, team process, or working app. For SMBs: start free with Radar.',
        transparencyLine:
          'Free Radar entry (Express diagnostic): WCAG 2.2 AA review of one critical flow. If it fits, let’s talk full Radar (5–7 days).',
        ctaPrimary: 'Book kickoff',
        ctaSecondary: 'See formats',
        ctaFree: 'Free entry · Radar',
        trustLine: 'Reply within 24 business hours',
        trustChips: ['Free · WCAG 2.2 AA', 'Radar 5–7 days', 'Reply <24 h'],
        segmentsLabel: 'What do you need?',
        segmentsHint: 'One tap = service and what you get.',
        segments: {
          diagnostic: {
            title: 'Diagnostic',
            hint: 'Report + plan · 5–7 days',
            cta: 'Start Radar',
          },
          prototype: {
            title: 'Prototype',
            hint: 'Screens ready to build',
            cta: 'Start Marco',
          },
          process: {
            title: 'Team process',
            hint: 'How the team designs and delivers',
            cta: 'Start Ops',
          },
          app: {
            title: 'Working app',
            hint: 'VN design · build via network',
            cta: 'Start app',
          },
        },
        techLayerLabel: 'References',
        techLayerTitle: 'Where the method comes from',
        techLayerDescription: 'Applied at SURA, Transvip, and Karri — sized for SMBs here.',
        techPatterns: [
          {
            source: 'SURA',
            pattern: 'Clear onboarding',
            forYou: 'Less drop-off at the start.',
          },
          {
            source: 'Transvip',
            pattern: 'Design system',
            forYou: 'Screens ready to build.',
          },
          {
            source: 'Karri',
            pattern: 'Usage metrics',
            forYou: 'You know if people understand the product.',
          },
        ],
        metrics: [
          { value: '3', label: 'Formats' },
          { value: '−40%', label: 'SURA onboarding' },
          { value: 'NPS 72', label: 'SURA' },
          { value: '<24 h', label: 'Reply' },
        ],
        nav: {
          n2n: 'Method',
          private: 'Data',
          education: 'Education',
          practices: 'Practices',
          packages: 'Formats',
          evidence: 'Examples',
          fit: 'Budget',
        },
      },
      n2n: {
        badge: 'How we work',
        title: 'From problem to deliverable',
        description:
          'Five steps: understand, explore, test, prototype, and hand off. If the deliverable is a working app, the last step includes handoff to the implementation network.',
        caseBadge: 'Open example',
        caseTitle: 'X | CMS',
        caseDescription: 'Method demo: idea → test → prototype ready to build.',
        ctaDemo: 'View demo',
        ctaSection: 'See on page',
        ctaOnboarding: 'Get started',
      },
      privateTooling: {
        badge: 'If it applies',
        title: 'Can your data not leave the company?',
        description:
          'Same consulting (diagnostic or prototype), done in your environment — without putting sensitive data on public tools.',
        antiPromise:
          'Not legal advice and not “an app in 24 hours”. Same UX work, with stricter data care.',
        layers: [
          {
            title: 'In your space',
            body: 'We work with your repo and access rules.',
          },
          {
            title: 'Less data exposed',
            body: 'Only what is needed. Nothing to public models without agreement.',
          },
          {
            title: 'Offline if needed',
            body: 'The critical flow can live offline, or with a clear plan.',
          },
          {
            title: 'Usable',
            body: 'Clear, accessible screens in what we deliver.',
          },
        ],
        dodTitle: 'What you get',
        dod: [
          'Documented diagnostic or prototype',
          'Delivery in your repository',
          'Practical data-care list (not a legal opinion)',
        ],
        faqTitle: 'FAQ',
        faq: [
          {
            q: 'Is this another pack?',
            a: 'No. It is diagnostic or prototype, with a private-environment condition.',
          },
          {
            q: 'Does it replace a lawyer or DPO?',
            a: 'No. You remain responsible for data processing.',
          },
          {
            q: 'Does AI see my data?',
            a: 'Not by default. We prefer local or private options.',
          },
        ],
        skuBadge: 'Sensitive data',
        skuTitle: 'Start with diagnostic or prototype',
        skuDescription:
          'If the project is sensitive, we flag it at kickoff. Choose Radar (fast) or Marco (prototype).',
        legalNote: 'Not legal advice.',
        ctaPrimary: 'Private-environment prototype',
        ctaSecondary: 'Diagnostic only',
        ctaN2N: 'See method',
      },
      practices: {
        badge: 'Playbook',
        title: 'Quality practices',
        description: 'Short criteria we use on every delivery.',
        filterAria: 'Filter practices',
        filterAll: 'All',
        showing: '{count} practices',
        showingCount: '{visible} of {total}',
        loadMore: 'Show more',
        showLess: 'Show less',
        checklistLabel: 'List',
        validationLabel: 'How we check',
        footnoteTitle: 'Note',
        footnote: 'The playbook is off the main landing path so the page stays light.',
      },
      packagesSection: {
        badge: 'How you hire',
        title: 'Three formats + app if you need it',
        description:
          'Pick diagnostic, prototype, or team process. If you need a working app, use the strip below.',
        deliverablesLabel: 'Includes',
        cta: 'Start',
        ctaForm: 'Write',
        note: 'No prices on the site — closed at kickoff.',
        freeStripBadge: 'Free',
        freeStripTitle: 'Start with accessibility on one flow',
        freeStripBody:
          'WCAG 2.2 AA review of one critical flow — free entry to Express diagnostic (Radar). Full diagnostic is 5–7 days if you need it.',
        freeStripCta: 'Start free',
        freeStripSecondary: 'Full diagnostic (5–7 days)',
        appStripTitle: 'Working app',
        appStripBody:
          'Design with Viento Norte. Build is done by the network, under our direction.',
        appStripCta: 'Start app',
      },
      educationPartner: {
        badge: 'Education',
        partnerLabel: 'Education projects',
        title: 'UX for education programs',
        description: 'Learning experience design and handoff to development.',
        highlights: [
          'Learning experience',
          'From brief to prototype',
          'Dev handoff',
          'Accessible',
        ],
        ctaLead: '25–30 min video call, no commitment.',
        ctaPrimary: 'Book a call',
        ctaSecondary: 'Continue on the web',
        note: 'If a calendar link exists, it opens in a new tab. Otherwise we take you to contact.',
      },
      steps: {
        welcome: 'Welcome',
        package: 'Format',
        context: 'Project',
        summary: 'Contact',
      },
      welcome: {
        title: "Let's start",
        description: 'Four short steps. Pick a deliverable and leave a ready message.',
        points: [
          'Diagnostic · Prototype · Process · App (with network)',
          'Working app: VN design + build via network, if you chose it',
          'Reply within 24 business hours',
        ],
      },
      context: {
        industry: 'Industry',
        timeline: 'Timeline',
        goal: 'What do you want to achieve?',
        goalPlaceholder:
          'E.g. site diagnostic, onboarding prototype, team process, working app…',
        goalHint: 'At least 20 characters.',
      },
      summary: {
        note: 'On confirm, you go to contact with a ready message.',
        cta: 'Go to contact',
      },
      treePreview: {
        badge: 'Quick help',
        title: 'Which deliverable fits?',
        description: 'One or two questions. No prices — guidance only.',
        pathLabel: 'Your path',
        reset: 'Start over',
        previewOnly: 'Preview',
        cta: 'Continue with this',
      },
      demo: {
        badge: 'Examples',
        title: 'Reference screens',
        description: 'Browse the example. To talk, use the same site form.',
        cta: 'View screens',
        ctaSecondary: 'Talk',
        ctaMakeLink: 'Editable file (optional)',
        previewCta: 'Enlarge',
        items: {
          'x-cms-n2n': {
            projectName: 'X | CMS',
            approach: 'From brief to a prototype ready to build.',
            highlights: ['Ideation', 'Test', 'Prototype'],
            embedTitle: 'X | CMS demo',
          },
          'gees-propuesta': {
            projectName: 'GEES · Proposal',
            approach: 'Quote and decision dashboard for stakeholders.',
            highlights: ['Dashboard', 'Quote', 'KPIs'],
            embedTitle: 'GEES · Proposal',
          },
        },
      },
      appQuoter: {
        badge: 'Budget',
        title: 'What fits your budget?',
        description:
          'Estimate UX consulting and deliverables. Working app = VN design + build via network (not a blind agency rate).',
        disclaimer:
          'Guidance only. Scope closes at kickoff. Default CLP. App is not “screens only”: it includes the build network if you choose it.',
        currencyLabel: 'Currency',
        currencies: {
          CLP: 'CLP · Chilean peso',
          UF: 'UF',
          USD: 'USD',
        },
        fxNote: 'Reference rates (not live).',
        budgetLabel: 'Budget',
        budgetPresetsLabel: 'Common amounts',
        expectationLabel: 'What deliverable do you need?',
        networkNote:
          'Working app: design and scope with Viento Norte; build with network under VN direction. Closed at kickoff.',
        tiers: {
          prototype: {
            label: 'Diagnostic / short prototype',
            hint: '5–7 days · Radar',
            deliverable: 'Report or scoped prototype + plan',
            includes: [
              'Understand the problem',
              'Prototype or priority findings',
              'Next-step plan',
            ],
          },
          web: {
            label: 'Site / web prototype',
            hint: 'Marco · multi-page',
            deliverable: 'Design ready to build',
            includes: [
              'Key screens',
              'Mobile and desktop',
              'Handoff to development',
            ],
          },
          app: {
            label: 'Working app',
            hint: 'VN design · build via network',
            deliverable: 'Working app — design + network build',
            includes: [
              'Flows and mobile prototype',
              'Design scope with VN',
              'Build with specialists under VN direction',
            ],
          },
          enterprise: {
            label: 'Team process',
            hint: 'Ops · 4–6 weeks',
            deliverable: 'Team guide + process',
            includes: [
              'Team workshops',
              'Process guide',
              'How to measure adoption',
            ],
          },
        },
        fit: {
          comfortable: 'Good fit',
          viable: 'Doable',
          tight: 'Tight',
          gap: 'Short',
        },
        result: {
          alignment: 'Budget · expectation fit',
          affordableTitle: 'With this budget you can',
          increaseHint: 'For the chosen scope, consider raising investment by about {low}–{high}%.',
          summary: {
            comfortable: 'Your budget covers this scope well.',
            viable: 'Budget fits. We close details at kickoff.',
            tight: 'It is tight. Narrow scope or go in phases.',
            gap: 'Budget is short. Start with diagnostic or prototype, or revisit investment.',
          },
        },
        cta: 'Go to kickoff',
      },
    },

    impactStats: {
      badge: 'Results',
      title: 'Metrics backed by method',
      description:
        'Every KPI comes from a macro-process shipped in production. Hover for the case spoiler — or jump straight into the framework phase.',
      viewPhase: 'View phase',
      tapHint: 'Tap to see context',
      tapNavigate: 'Tap again to open phase',
      stats: [
        {
          value: '−40%',
          label: 'Onboarding drop-off',
          description: 'SURA Ecosystem — 7-11 min vs 15+',
          spoiler:
            'Step-by-step drop-off analytics in the "Become a client" funnel: from 15+ min to 7-11 with 6 documented error cases.',
          phase: 'UX Analytics',
          processId: 'ux-analytics',
          company: 'SURA',
        },
        {
          value: 'NPS 72',
          label: 'SURA investments platform',
          description: '+25 pts above baseline',
          spoiler:
            '12 interviews + testing with retail and institutional users: transparency and progressive disclosure as trust drivers.',
          phase: 'UX Research',
          processId: 'ux-research',
          company: 'SURA',
        },
        {
          value: '+35%',
          label: 'Karri shopper activation',
          description: 'Earnings calculator',
          spoiler:
            'BOOSMAP/ZUBALE benchmark → interactive prototype: 92% comprehension in testing with direct activation correlation.',
          phase: 'UX/UI Design',
          processId: 'ux-ui-design',
          company: 'Karri',
        },
        {
          value: '+58%',
          label: 'Notification engagement',
          description: 'Karri centralized hub',
          spoiler:
            '40% of shoppers missed critical alerts: unified hub + simplified onboarding through continuous refinement.',
          phase: 'Refinement',
          processId: 'refinamiento',
          company: 'Karri',
        },
      ],
      featured: {
        badge: 'Featured Project',
        title: 'RIA SURA Investments US',
        subtitle: 'RIA platform for the US market',
        spoiler:
          'Multi-profile onboarding for US advisors: navigable prototypes, regulatory auth, and investment dashboard with progressive disclosure.',
        highlights: ['US onboarding', 'Regulatory auth', 'Progressive disclosure'],
        imageAriaLabel: 'Open RIA SURA Investments US case study',
        pathsLabel: 'What interests you?',
        paths: [
          {
            id: 'reclutadores',
            title: 'Experience and track record',
            hint: 'UX Lead role, companies, and outcomes in regulated fintech and mobility.',
            href: 'section/sobre-mi/experiencia',
            badge: 'Experience',
          },
          {
            id: 'leads',
            title: 'Full RIA case',
            hint: 'US onboarding, regulatory auth, navigable prototypes, and measurable outcomes.',
            href: 'project/sura-ria-us',
            badge: 'Case',
          },
          {
            id: 'auditoria',
            title: 'Review accessibility',
            hint: 'WCAG 2.2 AA checklist and critical flows with documented evidence.',
            href: 'route/auditoria',
            badge: 'Audit',
          },
        ],
        projectId: 'sura-ria-us',
      },
    },

    // Hero
    hero: {
      label: 'Design Ops for regulated products',
      headlineLead: 'Design that',
      headlineFocus: 'cuts the noise.',
      valueProp: 'UX Lead · Design Ops for regulated products — fintech and mobility.',
      specialties: ['Compliance', 'Premium UX', 'Fintech', 'Mobility'],
      unifiedBanner: {
        groupLabel: 'What do you need?',
        searchPlaceholder: 'Search cases, experience, or UX review…',
        searchAriaLabel: 'Intelligent portfolio search',
        suggestionsLabel: 'Suggestions',
        noResults: 'No matches — try another term or switch business line.',
        liveSuggestionsCount: '{{count}} suggestions available',
        liveSuggestionsActive: '{{count}} suggestions. {{title}}, {{hint}}',
        tabs: {
          negocios: 'Companies',
          contacto: 'Recruiters',
          auditorias: 'Audit',
        },
        suggestions: [
          {
            id: 'reclutadores-cx',
            category: 'contacto',
            title: 'Experience & CX',
            hint: 'UX Lead profile, impact, and track record in fintech and mobility.',
            badge: 'Recruiters',
            keywords: [
              'cx',
              'recruiters',
              'hiring',
              'profile',
              'cv',
              'linkedin',
              'experience',
              'talent',
            ],
            href: 'section/sobre-mi/experiencia',
          },
          {
            id: 'consultoria-viento-norte',
            category: 'negocios',
            title: 'Viento Norte consulting',
            hint: 'Regulated-product method at SMB scale. Radar · Marco · Ops.',
            badge: 'Companies',
            keywords: [
              'consulting',
              'viento norte',
              'companies',
              'business',
              'design ops',
              'leads',
              'demo',
              'smb',
              'formats',
            ],
            href: 'route/consultoria',
          },
          {
            id: 'auditoria-accesibilidad',
            category: 'auditorias',
            title: 'Free Radar entry',
            hint: 'WCAG 2.2 AA on one critical flow. If needed, full Radar in 5–7 days.',
            badge: 'Free · Radar · SMBs',
            keywords: [
              'audit',
              'free',
              'accessibility',
              'wcag',
              'schedule',
              'book',
              'freemium',
              'radar',
              'diagnostic',
              'leads',
            ],
            href: 'route/radar-gratis',
          },
        ] satisfies HeroSearchSuggestion[],
        panels: {
          negocios: {
            badge: 'Companies',
            composerHint: 'Viento Norte for SMBs: diagnostic, prototype, process, or app.',
            description:
              'UX consulting. Free Radar entry (WCAG 2.2 AA on one flow). Kickoff <24 h.',
            highlights: ['Free · Radar', 'Prototype', 'App via network'],
            metrics: [],
            ctaPrimary: 'View consulting',
            ctaSecondary: 'Free entry',
          },
          contacto: {
            badge: 'Recruiters',
            composerHint: 'Track record, CV, and social proof for hiring managers.',
            description: 'UX Lead · remote or hybrid · reply within 24 h.',
            lead: 'Experience, companies, and contact channel.',
            highlights: ['Downloadable CV', 'Remote / Hybrid', 'LinkedIn'],
            metrics: [],
            ctaPrimary: 'View experience',
            ctaSecondary: 'Go to contact',
          },
          auditorias: {
            badge: 'Free · Radar · SMBs',
            composerHint:
              'Free Radar entry (Express diagnostic): WCAG 2.2 AA review of one critical flow.',
            description:
              'If it fits, let’s talk full Radar (5–7 days). SEM lead magnet for SMBs — not a fourth product.',
            highlights: ['WCAG 2.2 AA', '1 critical flow', 'Free', 'Radar 5–7 days'],
            privacyNote:
              'Forms via proprietary relay — we do not store your data on third-party servers.',
            metrics: [],
            ctaPrimary: 'Book free entry',
            ctaSecondary: 'View consulting',
          },
        },
      },
      resultsLabel: 'Results',
      resultCards: [
        { metric: '−40%', description: 'SURA onboarding', company: 'SURA Investments' },
        { metric: 'NPS 72', description: 'investments platform', company: 'SURA' },
        { metric: '+35%', description: 'shopper activation', company: 'Karri' },
      ],
    },

    flagshipCaseStudy: {
      badge: 'Full case study',
      title: 'Karri — Earnings Calculator',
      subtitle: 'From problem to measured impact using all 5 framework processes.',
      contextLabel: 'Context',
      context:
        'Karri shoppers could not estimate earnings before activating. High onboarding friction and 65% drop-off in the initial funnel.',
      challengeLabel: 'Challenge',
      challenge:
        'Deliver earnings transparency without overloading the UI or compromising operational compliance expectations.',
      processLabel: 'Process (5 macro-processes)',
      processSteps: [
        'UX Analytics — 65% drop-off, BOOSMAP/ZUBALE benchmark',
        'UX Research — 12 interviews, transparency = #1 decision factor',
        'UX/UI Design — interactive calculator + design system',
        'UX Testing — 92% comprehension, 0 critical errors',
        'Refinement — +35% activation correlated with feature use',
      ],
      solutionLabel: 'Solution',
      solution:
        'Configurable scenario calculator with commission education and competitive benchmark embedded in activation.',
      impactLabel: 'Measured impact',
      adoptionLabel: 'Feature adoption',
      learningsLabel: 'Learnings',
      learnings: [
        'Financial transparency reduces drop-off more than promotional incentives.',
        'Process-level validation prevents costly rework in development.',
      ],
      cta: 'View full case with evidence',
    },

    testimonials: {
      badge: 'Recommendations',
      title: 'What teams say',
      description:
        'LinkedIn recommendations from leaders in fintech and premium mobility I worked with.',
      linkedInCta: 'View LinkedIn profile',
      linkedInHref: 'https://www.linkedin.com/in/rodrigo-gaete-ux/',
      items: [
        {
          quote:
            'What stands out is his ability to quickly understand user needs and turn them into simple, intuitive, grounded solutions. He was an excellent bridge between business, design, and technology in a highly regulated environment.',
          author: 'Pablo Matte R.',
          role: 'Chief Executive Officer — Principal | Registered Investment Advisor',
          company: 'Miami, FL, USA',
          context: 'Feb 2022 – May 2026 · 4 yrs 4 mos',
        },
        {
          quote:
            "He's shown collaborative, cross-functional work with distributed teams across Latin America. Passionate about UX—every contribution added real value to the organization.",
          author: 'Arturo Ruiz Palafox',
          role: 'Product Owner — Digital MX',
          company: 'SURA',
          context: 'Full-time · Aug 2022 – Present · 4 yrs',
        },
        {
          quote:
            'His UX/UI skills are outstanding—I saw real impact on users and on organizational culture. I especially value his methodological approach and ability to include underrepresented users.',
          author: 'Francco Frugone',
          role: 'Deputy Product Manager',
          company: 'Transvip Chile',
          context:
            'Full-time · 4 yrs 1 mos · Remote, Chile · May 2023 – Apr 2025 · 2 yrs',
        },
      ],
    },

    autosuggestPage: {
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
    },
    
    // About
    about: {
      badge: 'About',
      title: 'Experience Designer',
      subtitle: 'Idea + Body',
      description:
        'From Senior Product Designer at Transvip/Karri to UX Lead at SURA Investments (Wealth, 5+ countries). Research, Design Sprints, design systems, and measurable results — including −40% onboarding.',
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
    },
    
    // Projects
    projects: {
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
    },
    
    // Experience
    experience: {
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
    },

    // Skills
    skills: {
      badge: 'Skills',
      title: 'Skills & Tools',
      description: 'Technologies and methodologies I master to create exceptional experiences.',
      categories: {
        design: 'UX/UI Design',
        research: 'Research & Testing',
        tools: 'Tools',
        development: 'Frontend',
      },
    },
    
    // Contact
    contact: {
      badge: 'Let\'s talk',
      title: 'Get in touch',
      description: 'Available for freelance projects and full-time opportunities. Typical reply: under 24 h.',
      responseBadge: 'Typical reply: under 24 h',
      tabs: {
        assistant: 'Assistant',
        form: 'Write directly',
        preferForm: 'Prefer the classic form',
        preferAssistant: 'Back to guided assistant',
      },
      info: {
        title: 'Contact information',
        description: 'Available for freelance projects and full-time opportunities',
        email: 'Email',
        modality: 'Modality',
        modalityValue: 'Remote / Hybrid',
        follow: 'Follow me',
      },
      form: {
        title: 'Send me a message',
        description: 'Fill out the form and I\'ll reply within 24 hours',
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'you@email.com',
        emailHint: 'Used only to reply to your inquiry. We don\'t share your email.',
        message: 'Message',
        messagePlaceholder: 'Tell me about your project or need...',
        submit: 'Send message',
        sending: 'Sending...',
        consent:
          'I agree my data is used only to reply to this inquiry (Chile Data Protection Law).',
        consentPrivacyLink: 'privacy policy',
        consentRequired: 'You must accept data processing to send',
        validationError: 'Please fix the errors in the form',
        success: 'Message sent! Check your email for a copy — reply within 24 h.',
        successFallback: 'Message sent! Check your email for a copy — reply within 24 h.',
        mailtoFallback: 'We couldn\'t send via the form',
        mailtoFallbackDesc: 'Open your email client with the message ready to send.',
        mailtoAction: 'Open email',
        errors: {
          nameRequired: 'Name is required',
          nameMin: 'Name must be at least 2 characters',
          emailRequired: 'Email is required',
          emailInvalid: 'Please enter a valid email',
          messageRequired: 'Message is required',
          messageMin: 'Message must be at least 10 characters',
        },
      },
      assistant: {
        title: 'Viento Norte Assistant',
        description: 'I guide you step by step to build your message with context.',
        descriptionReady: 'Your request is ready. Confirm your details and send.',
        typing: 'Typing…',
        composeTitle: 'Review and send',
        composeDescription: 'Edit the message if you want and confirm how to reach you.',
        draftBanner: {
          onboarding: 'Your consulting request is ready. Just confirm name, email, and consent.',
          quoter: 'Your quote is ready. Just confirm name, email, and consent.',
          'partner-edu':
            'Message ready to schedule a video call as a development partner for educational projects. Confirm name, email, and consent.',
          cta: 'Your message is ready. Confirm name, email, and consent to send it.',
        },
        steps: {
          intent: 'What would you like to discuss?',
          recruiter: 'What type of opportunity?',
          consulting: 'What do you need to solve first?',
          consultingDepth: 'How deep do you want to go?',
          freelance: 'Tell me briefly about your project',
          other: 'How can I help?',
          contact: 'How can I reach you?',
          review: 'Review your message before sending',
          compose: 'Review your message, confirm your details, and send',
        },
        intents: {
          recruiter: 'Job opportunity',
          consulting: 'UX consulting',
          freelance: 'Freelance project',
          other: 'Other',
        },
        recruiterModes: {
          fulltime: 'Full-time position',
          contract: 'Contract / project',
          exploratory: 'Exploratory chat',
        },
        consultingPaths: {
          portfolio: 'Portfolio or professional presence',
          product: 'Digital product (app / web)',
          team: 'Team UX process',
          auditOnly: 'Diagnosis and quick wins',
          full: 'Diagnosis + implementation',
          early: 'Early-stage product',
          growth: 'Growth-stage product',
          scale: 'Scale / Design Ops',
        },
        industries: ['Fintech', 'Mobility', 'Enterprise', 'SaaS', 'Retail', 'Other'],
        timelines: ['Immediate', '1–2 weeks', '1 month', 'Flexible'],
        goalPlaceholder: 'E.g.: improve conversion, audit regulated app, structure Design Ops…',
        goalHint: 'Minimum 20 characters',
        back: 'Back',
        continue: 'Continue',
        send: 'Send message',
        sending: 'Sending…',
        editMessage: 'You can edit the message before sending',
        privacyNote:
          'Your data goes to Google Forms (Viento Norte). You get an email copy; we receive it at contacto@vientonorte.cl — no marketing.',
        success: 'Done! I\'ll reply within 24 hours.',
      },
      social: {
        title: 'Or write me directly',
      },
    },
    
    mockups: {
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
    },

    // Common
    common: {
      viewMore: 'View more',
      viewLess: 'View less',
      loading: 'Loading...',
      error: 'Something went wrong',
      backToTop: 'Back to top',
      visitProject: 'Visit project',
    },
    
    // Case Studies
    caseStudies: {
      hero: {
        badge: 'Method in production',
        title: 'UX Process based on continuous improvement',
        description: '5 macro-processes applied in real environments — SURA, Transvip, and Karri — with measurable results in onboarding, activation, and NPS.',
        metricsTitle: 'Production results',
        stats: {
          processes: 'Macro-processes',
          experience: 'Years of experience',
          teaching: 'Teaching evaluation',
          students: 'Students trained',
        },
      },
      navigation: {
        hero: 'Introduction',
        challenge: 'The Challenge',
        process: 'The 5 Processes',
        valueChain: 'Value Chain',
        cta: 'Business',
      },
      challenge: {
        badge: 'The Challenge',
        title: 'From ambiguous processes to structured framework',
        subtitle: 'The initial problem',
        problem: 'Previously, the design process lacked defined tasks and relied on two states during sprints: "Design in progress" and "Design pending approval".',
        solution: 'Framework proposal',
        solutionText: 'Clearly define product design macro-processes, facilitating effort estimation, work tracking, and structured documentation.',
        sprintProgress: 'Design in progress',
        sprintApproval: 'Design pending approval',
        ambiguous: '❌ Ambiguous and hard to track',
        structured: '✓ Structured and measurable',
        phaseNames: ['Analytics', 'Research', 'Design', 'Testing', 'Refinement'],
      },
      process: {
        badge: 'My Process',
        title: 'The 5 macro-processes',
        flowTitle: 'Continuous Improvement Flow',
        description: 'Each phase is designed to add value through continuous improvement and constant validation.',
        viewApplication: 'View application',
        phases: {
          analytics: {
            title: 'UX Analytics',
            description: 'Quantitative analysis of user behavior through analytics tools. Identifying friction points and improvement opportunities based on real data.',
          },
          research: {
            title: 'UX Research',
            description: 'Qualitative research with end users. Interviews, surveys, and competitive analysis to understand needs, motivations, and usage contexts.',
          },
          design: {
            title: 'UX/UI Design',
            description: 'Collaborative ideation and solution design. Wireframes, interactive prototypes, and visual design aligned with the design system and business objectives.',
          },
          testing: {
            title: 'UX Testing',
            description: 'Prototype validation with real users. Usability testing, A/B testing, and stakeholder feedback before development.',
          },
          refinement: {
            title: 'Refinement',
            description: 'Continuous post-launch iteration. Metrics analysis, feedback-based adjustments, and experience optimization.',
          },
        },
      },
      valueChain: {
        badge: 'Value Chain',
        title: 'Active vs Passive Discovery',
        description: 'The purpose is to add value through Active Discovery that focuses on correcting errors detected by analytics, strategically prioritizing efforts.',
        activeDiscovery: {
          title: 'Active Discovery',
          description: 'Proactive problem detection through analytics tools. Data-driven decisions, not assumptions.',
        },
        passiveDiscovery: {
          title: 'Passive Discovery',
          description: 'Reaction to pain points detected in reviews or stakeholder conversations. Less efficient and more costly.',
        },
        benefit: 'By including collaborative Product Design from findings prioritization to user testing, we reduce design errors and unnecessary development.',
        activeBullets: [
          'Data-driven decisions',
          'Proactive problem identification',
          'Strategic effort prioritization',
        ],
        passiveBullets: [
          'Reaction to stakeholder complaints',
          'Lack of clear prioritization',
          'Costly post-development fixes',
        ],
        diagramTitle: 'UX/UI Design Value Chain',
        diagramMvp: 'MVP',
        diagramRefinement: 'Refinement',
        phases: {
          discovery: 'Active Discovery',
          productDesign: 'Product Design',
          development: 'Development Sprint',
        },
      },
      bridge: {
        badge: 'From method to result',
        title: 'Every phase, a measurable outcome',
        description: 'The framework doesn\'t live in slides: it runs in real sprints and validates with business metrics.',
        stripLabel: 'Method-to-result summary by phase',
      },
      navMobile: 'UX process sections',
      cta: {
        viewProjects: 'Explore business',
        backToPortfolio: 'Back to portfolio',
        sectionLabel: 'Real business',
        title: 'Want to see this framework in action?',
        description: 'Explore full cases by business where I applied this methodology at SURA, Transvip, and Karri.',
      },
    },

    caseStudiesGrid: {
      badge: 'Visual cases',
      title: 'Evidence of impact',
      description: 'Selected cases by business with real screenshots, metrics, and depth. Click to view the full study.',
      viewCase: 'View Case Study',
      altPrefix: 'Case study:',
    },

    featuredCaseStudies: {
      'sura-ux-enterprise': {
        title: 'Regional UX Enterprise Implementation',
        company: 'SURA Investments',
        description:
          'Adapted Design Thinking framework for regional technology initiatives: scalable UX/UI guidelines across 5+ countries.',
        tags: ['Fintech', 'Enterprise', 'Design Thinking', 'Regional'],
      },
      'sura-ria-us': {
        title: 'RIA UX/UI Design SURA US',
        company: 'SURA Investments',
        description:
          'End-to-end RIA platform for the US market: multi-profile onboarding, authentication, and investment dashboard.',
        tags: ['Fintech', 'RIA', 'Onboarding', 'US Market'],
      },
      'sura-inversiones-dashboard': {
        title: 'Investment Platform',
        company: 'SURA Investments',
        description:
          'Investment dashboard with progressive disclosure, restructured IA, and testing with retail and institutional users.',
        tags: ['Fintech', 'Dashboard', 'Research'],
      },
      'sura-ia-automation-dashboard': {
        title: 'DEI Dashboard · AI Analysis',
        company: 'SURA Investments',
        description:
          'Figma Sites POC: local PDF upload, DEI analysis, and automation flows with confidence states for digital strategy teams.',
        tags: ['AI', 'DEI', 'POC', 'Enterprise'],
      },
      'sura-ecosistema-digital': {
        title: 'Digital Ecosystem & Onboarding',
        company: 'SURA Investments',
        description:
          'Unification of 20+ public sites with CMS, Design System, and client onboarding flow with error handling.',
        tags: ['CMS', 'Design System', 'Onboarding'],
      },
      'transvip-app-premium': {
        title: 'Premium Passenger App',
        company: 'Transvip',
        description:
          'Design system + active discovery: −40% booking time, +25% conversion, and NPS 82 in premium mobility.',
        tags: ['Mobility', 'Design System', 'Premium'],
      },
      'karri-calculadora': {
        title: 'Earnings Calculator',
        company: 'Karri',
        description:
          'Income simulator with BOOSMAP/ZUBALE benchmark for earnings model transparency.',
        tags: ['Shoppers', 'Benchmark', 'Mobile'],
      },
      'karri-notificaciones': {
        title: 'Notification Hub',
        company: 'Karri',
        description:
          'Unified notification center and simplified shopper onboarding.',
        tags: ['Notifications', 'Onboarding', 'AI'],
      },
      'karri-design-sprint': {
        title: 'Product Strategy Workshop',
        company: 'Karri',
        description:
          '3 sessions: collaborative brief, journey map (24 touchpoints), and OKRs with 3 prioritized MVPs.',
        tags: ['Design Sprint', 'OKRs', 'Facilitation'],
      },
    },

    projectsList: {
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
    },

    projectsHub: {
      otherProjects: 'Other projects',
      otherProjectsDesc: 'Independent projects and developed frameworks',
      featuredProjects: 'Featured projects',
      frameworkButton: 'How I work: The 5 UX processes',
    },

    breadcrumbs: {
      home: 'Home',
      projects: 'Business',
      cases: 'Process',
      process: 'UX Process',
      framework: 'UX Framework',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy',
      designSystem: 'Design System',
      audit: 'Audit',
      consulting: 'Consulting',
      grafo: 'Graph',
      autosuggest: 'Autosuggest Funds',
      admin: 'Photo admin',
      notFound: 'Not found',
    },

    privacyPage: {
      title: 'Privacy Policy',
      updated: 'Last updated: July 2026',
      analytics: {
        title: 'Navigation and analytics',
        body:
          'This site may record anonymous navigation events (pages visited, CTA clicks) only if analytics is enabled in production. We do not use advertising cookies or sell data.',
      },
      contact: {
        title: 'Contact form',
        body:
          'If you submit the form or assistant, your name, email, and message are sent over HTTPS to Google Forms (Viento Norte account). Google may email you a copy of your response and notify us at contacto@vientonorte.cl (forwarded to gaete.gaona@gmail.com). We do not store that data in site databases or use it for marketing. Legal basis: explicit consent (Chile Data Protection Law 21.719).',
      },
      retention: {
        title: 'Retention',
        body:
          'Contact messages are kept in the controller\'s inbox as long as needed to reply and follow up professionally (up to 12 months unless legally required otherwise).',
      },
      rights: {
        title: 'Your rights',
        body:
          'You may request access, correction, or deletion of data you sent us by writing to',
      },
      controller: {
        title: 'Controller',
        body: 'Rodrigo Gaete Gaona · Viento Norte — Chile.',
      },
    },

    footer: {
      contact: 'Contact',
      linkedin: 'LinkedIn',
      privacy: 'Privacy',
      uxtools: 'UX Tools',
      copyright: 'Rodrigo Gaete Gaona · UX Lead',
      tagline: 'Designed with attention to detail and accessibility.',
    },

    errors: {
      companyNotFound: 'We could not find that company.',
      projectNotFound: 'We could not find that project.',
      processNotFound: 'Process not found',
      pageNotFound: 'We could not find this page.',
      backToProjects: 'Back to business',
      backToHome: 'Back to home',
      back: 'Back',
    },
    
    // Process Detail
    processDetail: {
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
    },
};

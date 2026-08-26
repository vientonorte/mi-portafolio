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
      /** Dock liquid label (no ✦ — mark is the only glyph) */
      consultingDock: 'Consulting',
      consultingDockAria: 'Viento Norte consulting',
      bottomNav: 'Bottom navigation',
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
      /** Root SEO keywords — Viento Norte brand, not personal portfolio */
      keywords:
        'Viento Norte, UXtech, UX consulting, custom modules, front office, fintech, Design Ops, WCAG accessibility, own your data, SMB',
      pages: {
        home: {
          title: 'Technology for business · Viento Norte',
          description:
            'Technology for business: the flow your customer already uses, in their CMS or CRM. Diagnostic in 5–7 days. Free: accessibility of one flow. 30 min kickoff.',
        },
        proyectos: {
          title: 'Business · UX Lead',
          description:
            'Case studies with evidence and metrics at SURA Investments, Transvip, and Karri. Fintech, mobility, enterprise.',
        },
        cases: {
          title: 'UX process',
          description:
            'Design that cuts the noise. 5 phases on your CMS or CRM: analytics, research, design, testing, refinement.',
        },
        framework: {
          title: 'UX Framework — 5 Processes',
          description:
            '5 macro-process methodology with real cases in enterprise fintech and mobility.',
        },
        about: {
          title: 'About',
          description:
            'Rodrigo Gaete, UX Manager at Viento Norte. Previously UX Lead at SURA Investments. Design Ops, research, design systems. SURA, Transvip, Karri.',
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
          title: 'Privacy · Viento Norte',
          description:
            'Privacy by design: minimization, purpose, control. No ad cookies, no data sales.',
        },
        audit: {
          title: 'UX/UI Portfolio Audit',
          description:
            'Strategic UX/UI audit: risks, SEO quick wins, and a 3-session mentorship plan.',
        },
        consultoria: {
          /** SEM final URL: https://vientonorte.io/#/consultoria — Ads message-match */
          title: 'UX Consulting · Choose your scope',
          description:
            'Diagnostic in 5–7 days of the flow your customer already uses, in their CMS or CRM. Free: WCAG 2.2 AA on one flow. 30 min kickoff.',
          keywords:
            'UX consulting, design sprint, fintech architecture, UX flows, UXtech, product modules, WCAG accessibility, front office, Viento Norte',
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
          title: 'Admin · Viento Norte',
          description: 'Internal panel: leads, bookings, diagnostics, and catalog.',
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
      stickyCta: 'Book a slot',
      entry: {
        selectedPackage: 'Selected format:',
        changePackage: 'Change',
      },
      landing: {
        badge: 'Viento Norte · SMBs',
        principleBadge: 'Design that cuts the noise',
        title: 'Technology for business.',
        titleAccent: '',
        description:
          'The flow your customer already uses, in their CMS or CRM. Diagnostic in 5–7 days. Free: WCAG 2.2 AA on one flow. 30 min kickoff.',
        transparencyLine:
          'Free Diagnostic entry: WCAG 2.2 AA review of one critical flow. If it fits, let’s talk full Diagnostic (5–7 days).',
        ctaPrimary: 'Book on Google Calendar',
        ctaSecondary: 'See options',
        ctaFreeA11y: 'Free · accessibility',
        /** Lead magnet — regulated-product job language, not WCAG jargon in the link */
        ctaFreeLink: 'Free review of one critical flow',
        ctaFreeLinkSchedule: 'Book 30 free minutes on Google Calendar',
        ctaFree: 'Request free review',
        trustLine: 'Reply within 24 h',
        trustChips: ['Reply <24 h', '30 min kickoff', 'No prices on the site'],
        storyLabel: 'Value context',
        storyTiles: [
          {
            id: 'flujo',
            label: 'People',
            title: 'Review of one flow',
            hint: 'Free: WCAG 2.2 AA on the flow your customer already uses.',
            alt: 'Two people review a form flow on a laptop with an accessibility checklist.',
          },
          {
            id: 'reserva',
            label: 'People',
            title: 'The flow that books',
            hint: 'Onboarding, payment, or booking: the step where people drop off.',
            alt: 'A customer using the booking flow on a laptop, in their own workplace.',
          },
          {
            id: 'stack',
            label: 'Technology',
            title: 'In their CMS or CRM',
            hint: 'The system they already run. We fit the flow — no stack swap.',
            alt: 'Laptop with a CMS and a monitor with checkout: the flow lives in their stack.',
          },
          {
            id: 'diagnostico',
            label: 'Technology',
            title: 'Diagnostic in 5–7 days',
            hint: 'Report + plan. Price on the 30 min kickoff.',
            alt: 'UX diagnostic screen with prioritized findings on the flow.',
          },
        ],
        segmentsLabel: 'What do you need?',
        segmentsHint: 'One tap = service and what you get.',
        segments: {
          diagnostic: {
            title: 'Diagnostic',
            hint: 'Report + plan · 5–7 days',
            cta: 'Start Diagnostic',
          },
          prototype: {
            title: 'Prototype',
            hint: 'Screens ready to build',
            cta: 'Start Prototype',
          },
          process: {
            title: 'Team process',
            hint: 'How the team designs and delivers',
            cta: 'Start Process',
          },
          app: {
            title: 'App end to end',
            hint: 'Idea → live app',
            cta: 'Talk about my app',
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
          start: 'Start',
          startAria: 'Start: go to consulting kickoff',
          evidence: 'Examples',
          contact: 'Contact',
          fit: 'Budget',
          ariaLabel: 'Consulting funnel',
        },
        onboarding: {
          badge: 'Start',
          titleEmpty: 'Pick a scope and book',
          titlePack: '30 min kickoff · {name}',
          bodyEmpty:
            'Diagnostic, prototype, or process. 30 min on Calendar or a short email.',
          bodyPack: 'Price on the call. One CTA above: Book 30 min.',
          packLabel: 'Format',
          ctaCalendar: 'Book 30 min',
          ctaMail: 'Write by email',
        },
      },
      n2n: {
        badge: 'How we work',
        title: 'From problem to deliverable',
        description:
          'Five steps: understand, explore, test, prototype, and hand off. If the deliverable is an app, we coordinate development through production.',
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
      pathDemos: {
        badge: 'Timed demos',
        title: 'Try the path before you book',
        description:
          'Each service has a time-limited demo. No real data. When it ends, book or write.',
        cta: 'See demo · {min} min',
      },
      timedDemo: {
        crumb: 'Demo',
        start: 'Start demo ({time})',
        rules: 'Session rules',
        live: 'Demo in progress',
        paused: 'Demo paused',
        timeLeft: 'Time left',
        warn: 'One minute or less remaining.',
        pause: 'Pause',
        resume: 'Resume',
        addMinute: 'Add 1 min',
        endedTitle: 'Session ended',
        endedBody:
          'The panel is locked. Book 30 minutes or tell us which service you need.',
        ctaSchedule: 'Book 30 min',
        ctaConsult: 'I want this service',
        ctaAgain: 'Another {min}-min session',
        ctaFormats: 'See formats',
        openTab: 'Open in a tab (no timer)',
        note: 'If the prototype does not load in the frame, open the tab. The clock and buttons stay on Viento Norte.',
        restrictionTime: 'Session limited to {min} minutes per visit.',
        restrictionExplore: 'Explore only: no editing, export, or real data.',
        restrictionLock: 'When time ends the panel locks and we offer the next step.',
        restrictionData: 'No client data or production environment.',
      },
      packagesSection: {
        badge: 'How you hire',
        title: 'Choose your scope',
        description:
          'One tap: Diagnostic, Prototype, or Team process. One step: Book 30 min. No prices on the site.',
        freeNote:
          'Free · accessibility of one flow — same calendar as Diagnostic.',
        deliverablesLabel: 'Includes',
        cta: 'Start',
        ctaDemo: 'See demo · {min} min',
        ctaForm: 'Write',
        note: 'No prices on the site — closed at kickoff.',
        freeStripBadge: 'Free · entry to Diagnostic',
        freeStripTitle: 'Free review of one critical flow',
        freeStripBody:
          'We look at one high-impact journey (onboarding, pay, auth). If it fits, full Diagnostic is 5–7 days.',
        freeStripCta: 'Request free review',
        freeStripCtaSchedule: 'Book 30 free minutes',
        freeStripCtaMessage: 'Prefer to write (no calendar)',
        freeStripSecondary: 'Full diagnostic (5–7 days)',
        appStripTitle: 'App end to end',
        appStripBody:
          'From idea to an app people use: experience, design, and development under one partner — Viento Norte.',
        appStripCta: 'Talk about my app',
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
          'Diagnostic · Prototype · Process',
          'Kickoff 30 min. Price on the call',
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
        note: 'On confirm, you stay on this page: contact opens with your message and VN title ready.',
        cta: 'Continue to contact',
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
        badge: 'References',
        title: 'Reference screens',
        description:
          'CMS dashboard, GEES consulting, SURA / Transvip / Karri cases, and campaigns. Also social media and ads optimization.',
        cta: 'View screen',
        ctaSecondary: 'Talk',
        ctaMakeLink: 'Editable file (optional)',
        previewCta: 'Enlarge',
        items: {
          'x-cms-n2n': {
            projectName: 'CMS · Dashboard',
            approach:
              'CMS dashboard view: content operations and structure in one place.',
            highlights: ['Dashboard', 'CMS', 'Content'],
            embedTitle: 'CMS · Dashboard',
          },
          'gees-propuesta': {
            projectName: 'GEES · Consulting',
            approach:
              'Consulting proposal with quote dashboard and KPIs for stakeholder decisions.',
            highlights: ['Consulting', 'Quote', 'KPIs', 'Stakeholders'],
            embedTitle: 'GEES · Consulting',
          },
          'sura-onboarding': {
            projectName: 'SURA · Onboarding',
            approach:
              'Production case: investments onboarding with less friction and Wealth metrics.',
            highlights: ['Fintech', 'Onboarding', '−40%', 'Enterprise'],
            embedTitle: 'SURA · Onboarding',
          },
          'transvip-app': {
            projectName: 'Transvip · App',
            approach:
              'Mobility product: app and design system with clear handoff to engineering.',
            highlights: ['Mobility', 'App', 'Design system'],
            embedTitle: 'Transvip · App',
          },
          'karri-shoppers': {
            projectName: 'Karri · Shoppers',
            approach:
              'Shopper activation and engagement with clear narrative and product metrics.',
            highlights: ['+35% activation', '+58% engagement', 'Mobility'],
            embedTitle: 'Karri · Shoppers',
          },
          'ads-campaigns': {
            projectName: 'Social & ads',
            approach:
              'Social media management, ads optimization, and SEM/paid campaigns aligned to UX and conversion. Viento Norte capability.',
            highlights: ['Social media', 'Ads', 'Campaigns', 'Conversion'],
            embedTitle: 'Social & ads',
          },
          'edu21-edu': {
            projectName: 'Edu 21 · Education',
            approach:
              'Edtech strategy and pitch: heuristics, benchmark, and commercial narrative.',
            highlights: ['Education', 'Strategy', 'Pitch'],
            embedTitle: 'Edu 21',
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
      label: 'UXtech · custom modules',
      headlineLead: 'Design that',
      headlineFocus: 'cuts the noise.',
      valueProp: 'We turn complexity into decision capacity. Software that installs. Client owns the data.',
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
      badge: 'References',
      title: 'Professional references',
      description:
        'LinkedIn recommendations from leaders in fintech, wealth, and mobility I worked with (SURA, Transvip, RIA context).',
      linkedInCta: 'View profile and references on LinkedIn',
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
      badge: "Let's talk",
      title: 'Get in touch',
      description: 'Available for freelance projects and full-time opportunities. Typical reply: under 24 h.',
      responseBadge: 'Typical reply: under 24 h',
      /** Free a11y Google schedule — visible block on #contacto */
      freeSchedule: {
        badge: 'Available now',
        title: 'Google Calendar · 30 free minutes',
        body: 'Review of one critical flow. Pick a slot on Viento Norte Calendar.',
        cta: 'Open online schedule',
      },
      /** Funnel surface /consultoria — no recruiter/freelance framing */
      consultingSurface: {
        badge: 'Viento Norte · SMBs',
        title: 'Write and we close scope',
        description:
          'End of the funnel: diagnostic, prototype, or process. Reply within 24 business hours.',
        responseBadge: 'Reply <24 business hours',
        infoTitle: 'Consulting contact',
        infoDescription: 'UX consulting for SMBs · remote or hybrid',
        assistantTitle: 'Consulting assistant',
        assistantDescription:
          'You’re already on consulting. Pick the focus and we’ll draft the message.',
      },
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
          'Your data goes to the Viento Norte Worker and Google Forms. We keep the lead to reply — no marketing.',
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
        tagline: 'Design that cuts the noise.',
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
      capa: {
        badge: 'Method layer',
        title: 'On your CMS or CRM',
        lead: 'Same method: product branding, analytics, applied research, content, and social — on your stack. Not a fifth paid pack.',
        stack: 'End-to-end front applied to your CMS or CRM — Jira, SharePoint, Salesforce, headless. The data and tenant stay yours.',
        items: [
          { title: 'Branding', body: 'Visual system and VN wordmark in the product.' },
          { title: 'Analytics', body: 'Funnels and CRM/CMS. Data-led decisions.' },
          { title: 'Applied research', body: 'Research on your flow, not showcase fieldwork.' },
          { title: 'Newsletter / CM', body: 'Mail sequence and tone. Publish with a Decider.' },
          { title: 'Social', body: 'Calendar and tone; no auto-post without OK.' },
        ],
      },
      cta: {
        viewProjects: 'Explore business',
        consulting: 'Book a diagnostic',
        backToPortfolio: 'Back to portfolio',
        sectionLabel: 'Real business',
        title: 'Want to see this framework in action?',
        description: 'Explore full cases by business where I applied this methodology at SURA, Transvip, and Karri. Paid entry stays diagnostic / accessibility of one flow.',
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
      admin: 'Admin',
      notFound: 'Not found',
    },

    privacyPage: {
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
        'The form, assistant, or an agent tool send over HTTPS to the Worker (Cloudflare) and Google Forms. Page analytics only if enabled in production (e.g. GTM on /s/consultoria).',
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
      pageNotFound:
        'We could not find this page. In this SPA the 404 code is from the app (not the server).',
      backToProjects: 'Back to business',
      backToHome: 'Back to home',
      back: 'Back',
      imageNotFound: 'Image not found',
      serverError: 'Application server error',
      contentUnavailable: 'Content unavailable',
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

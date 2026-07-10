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
            'N2N, offline tools in a private ecosystem, playbook (Act 21.719 · WCAG 2.2), 3 formats, and onboarding. Kickoff within 24 business hours.',
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
      title: 'Regional UX Lead · Fintech & Mobility',
      lead: 'UX Lead at SURA Investments. Design Ops as a method in regulated products and mobility.',
      detail: 'Background at Transvip/Karri, teaching at Desafío Latam, and agencies (Havas/Claro, Maraña, Walmart).',
      cta: 'View full profile',
    },

    upcomingCases: {
      badge: 'Coming soon',
      title: 'Cases in progress',
      description: 'Visual evidence and metrics being added to the business hub.',
      status: 'Evidence in progress',
    },

    uxAuditBanner: {
      badge: 'Viento Norte · UX Consulting',
      titleLead: 'UX audits with',
      titleAccent: 'measurable evidence',
      description:
        'Consulting for portfolios, digital products, and teams. From findings to a prioritized action plan.',
      highlights: ['Nielsen heuristics', 'WCAG 2.2 AA', 'SEO/AEO', 'P0–P2 plan'],
      ctaPrimary: 'Choose consulting',
      ctaSecondary: 'View sample audit',
      metrics: {
        a11y: 'Accessibility',
        priority: 'Priority',
        recruiter: 'Recruiter test',
      },
      panelNote: 'Executive deliverable + quick wins ready to implement.',
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
      previewNote: 'Scope and tailored proposal at kickoff — no public pricing.',
      recommended: 'Recommended',
      back: 'Back',
      next: 'Continue',
      stickyCta: 'Book kickoff',
      landing: {
        badge: 'Viento Norte consulting · Lead UX',
        title: 'UX with evidence,',
        titleAccent: 'not empty slides',
        description:
          'N2N method, offline tools in a private ecosystem (GitHub · governed AI · Act 21.719 · WCAG 2.2), documented playbook, and 4-step onboarding.',
        ctaPrimary: 'Start onboarding',
        ctaSecondary: 'View evidence',
        trustLine:
          'Kickoff < 24 h · N2N · offline/private · no public pricing · WCAG 2.2 AA',
        metrics: [
          { value: 'N2N', label: 'Brief → navigable prototype' },
          { value: '13', label: 'Documented best practices' },
          { value: 'C1', label: 'Offline · private · AI' },
          { value: '3', label: 'Formats with deliverables' },
        ],
        nav: {
          n2n: 'N2N',
          private: 'Offline',
          practices: 'Practices',
          packages: 'Formats',
          evidence: 'Evidence',
          fit: 'Your fit',
        },
      },
      n2n: {
        badge: 'N2N method',
        title: 'How we work · Needle-to-Needle',
        description:
          'From brief to navigable prototype with Design Thinking and Design Sprint. No skipping discovery or validation — the same standard as the X | CMS demo.',
        caseBadge: 'Published demo case',
        caseTitle: 'X | CMS · N2N on Figma Sites',
        caseDescription:
          'Open reference: ideation, sprint, and prototype for handoff. Use it as a method sample before kickoff.',
        ctaDemo: 'Open N2N demo',
        ctaSection: 'View embed on page',
        ctaOnboarding: 'Start with N2N',
      },
      privateTooling: {
        badge: 'Campaign C1 · Private Tooling',
        title: 'Offline tools in a private ecosystem',
        description:
          'N2N inside the client perimeter: offline-first, private GitHub, governed AI development, Act 21.719 by design, and WCAG 2.2 AA.',
        antiPromise:
          'We do not sell generic ChatGPT with your data in the cloud. We do not promise an app-store ship in 24 h. Code and data stay in your perimeter.',
        layers: [
          {
            title: 'Offline-first',
            body: 'Critical happy path without network, or explicit degradation. No third-party telemetry by default.',
          },
          {
            title: 'Private GitHub',
            body: "Client repo, branch protection, architecture docs, SECURITY, and data policy.",
          },
          {
            title: 'Governed AI',
            body: 'Classify data before every prompt. Personal/sensitive → no public models. Prefer local / VPC.',
          },
          {
            title: '21.719 + WCAG',
            body: 'Minimization, legal basis, notice at capture, ARSOPL. Accessibility AA as a release gate.',
          },
        ],
        dodTitle: 'C1 delivery DoD',
        dod: [
          'Prototype or tool with documented offline flow',
          'Handoff in private GitHub (not PDF-only)',
          'Act 21.719 checklist (inventory + minimization)',
          'WCAG 2.2 AA checklist on critical UI',
          'ai-governance.md if automation or copilots exist',
        ],
        faqTitle: 'Claim-defense FAQ',
        faq: [
          {
            q: 'Fully offline or offline-first?',
            a: 'Offline-first on the critical journey. Optional online only if the client asks and it is documented.',
          },
          {
            q: 'Does AI see my data?',
            a: 'By default no. Cloud APIs only with legal basis and contract; we prefer local/VPC for sensitive data.',
          },
          {
            q: 'Do you make my company 21.719-compliant?',
            a: 'We deliver UX/technical controls by design. The client remains the controller (DPO).',
          },
        ],
        skuBadge: 'C1 SKU',
        skuTitle: 'Perimeter diagnostic or private N2N build',
        skuDescription:
          'Radar (5–7 days) to diagnose. Marco (3–4 wks) for N2N prototype in repo. Ops for Design Ops and team adoption.',
        legalNote:
          'Operational checklist, not legal advice. Validate with the client DPO / compliance before release.',
        ctaPrimary: 'C1 onboarding · Strategy',
        ctaSecondary: 'Diagnostic only (Radar)',
        ctaN2N: 'View N2N method',
      },
      practices: {
        badge: 'Playbook',
        title: 'Documented best practices',
        description:
          'Operable criteria we apply in audit, strategy, and team process. Each practice has a reference standard, checklist, and validation method.',
        filterAria: 'Filter practices by category',
        filterAll: 'All',
        showing: '{count} practices in this view',
        checklistLabel: 'Checklist',
        validationLabel: 'How we validate',
        footnoteTitle: 'Why this is on the landing',
        footnote:
          'A consulting landing should demonstrate method, not just a promise. This playbook is the quality contract: what you measure, what you ship, and how you prove it before kickoff.',
      },
      packagesSection: {
        badge: 'Formats',
        title: 'Choose how we work',
        description:
          'Three paths by maturity and urgency. Public deliverables; fine scope and proposal at kickoff.',
        deliverablesLabel: 'Deliverables',
        cta: 'Continue with this',
        note: 'No public rates. The quoter and decision tree help align expectations before contact.',
      },
      steps: {
        welcome: 'Welcome · Viento Norte',
        package: 'Choose format',
        context: 'Project context',
        summary: 'Summary & contact',
      },
      welcome: {
        title: 'Viento Norte consulting',
        description:
          '4-step onboarding to define scope, format, and a pre-filled contact message.',
        points: [
          'Express diagnostic, guided strategy, or team process by maturity and urgency',
          'Rodrigo Gaete · UX Lead — fintech, mobility, and Design Ops',
          'Kickoff within 24 business hours after your request',
        ],
      },
      context: {
        industry: 'Industry',
        timeline: 'Desired timeline',
        goal: 'Primary goal',
        goalPlaceholder: 'E.g. improve portfolio conversion, audit regulated app, structure Design Ops…',
        goalHint: 'At least 20 characters to continue.',
      },
      summary: {
        note: 'On confirm, we take you to contact with the message ready to send.',
        cta: 'Go to contact',
      },
      treePreview: {
        badge: 'Answer tree',
        title: 'Preview · find your format',
        description:
          'Answer 1–2 questions and see the recommended format before full onboarding. No pricing — scope only.',
        pathLabel: 'Selected path',
        reset: 'Reset',
        previewOnly: 'Preview',
        cta: 'Continue with this format',
      },
      demo: {
        badge: 'Method demo',
        title: 'N2N design · Design Thinking + Sprint',
        description:
          'Published demo case: from brief to prototype on Figma Sites. Shows how we apply discovery, sprint, and handoff — the same standard as the landing playbook.',
        projectName: 'X | CMS',
        approach:
          'Needle-to-needle: Design Thinking ideation, Design Sprint validation, and navigable prototype for implementation handoff.',
        highlights: ['Design Thinking', 'Design Sprint', 'CMS', 'N2N', 'Figma Sites'],
        cta: 'Open published demo',
        ctaSecondary: 'Open in Figma Make',
        ctaMakeLink: 'View editable file in Figma Make',
        previewCta: 'Open full site',
        embedTitle: 'X | CMS demo — Figma Sites',
      },
      appQuoter: {
        badge: 'App & web quoter',
        title: 'Align budget and expectation',
        description:
          'Enter your reference investment and deliverable type. Get a viability read without public pricing — final scope is confirmed at kickoff.',
        disclaimer:
          'Indicative estimate for UX and digital product design. Excludes engineering build and third-party licenses.',
        budgetLabel: 'Reference budget (USD)',
        budgetPresetsLabel: 'Common budgets',
        expectationLabel: 'What do you expect to build?',
        tiers: {
          prototype: {
            label: 'Functional prototype',
            hint: 'Navigable Figma · key flows',
            deliverable: 'Concept validation and visual handoff',
            includes: [
              'Focused discovery and information architecture',
              'High-fidelity interactive prototype',
              'Quick wins and next-phase plan',
            ],
          },
          web: {
            label: 'Functional web',
            hint: 'Responsive MVP · CMS-ready',
            deliverable: 'Web experience ready to implement',
            includes: [
              'Research + IA + UI design for web MVP',
              'Initial design system and responsive patterns',
              'Specs and UX acceptance criteria',
            ],
          },
          app: {
            label: 'Functional app',
            hint: 'Mobile · auth · core journeys',
            deliverable: 'App product with critical journeys designed',
            includes: [
              'Onboarding, navigation, and error states',
              'Navigable mobile prototypes + UI specs',
              'Release plan and adoption metrics',
            ],
          },
          enterprise: {
            label: 'Enterprise development',
            hint: 'Multi-role · governance · ops',
            deliverable: 'Digital ecosystem with team process',
            includes: [
              'Enterprise UX blueprint and Design Ops',
              'Workshops with PM/PO/Engineering',
              'Playbook, metrics, and design governance',
            ],
          },
        },
        fit: {
          comfortable: 'Well aligned',
          viable: 'Viable',
          tight: 'Tight',
          gap: 'Gap',
        },
        result: {
          alignment: 'Budget · expectation alignment',
          affordableTitle: 'Achievable scope at this budget',
          increaseHint:
            'To approach the selected scope, consider increasing investment by roughly {low}–{high}%.',
          summary: {
            comfortable:
              'Your budget comfortably covers the expected scope. We can prioritize delivery quality and user validation.',
            viable:
              'The budget fits the scope. We recommend a kickoff to lock priorities and phases.',
            tight:
              'The scope is demanding for the budget. Narrow the MVP or plan in phases.',
            gap:
              'The expectation exceeds the current budget. Start with a smaller scope or revisit investment.',
          },
        },
        cta: 'Schedule kickoff',
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
        groupLabel: 'What are you looking for?',
        searchPlaceholder: 'Search cases, experience, or UX review…',
        searchAriaLabel: 'Intelligent portfolio search',
        suggestionsLabel: 'Suggestions',
        noResults: 'No matches — try another term or switch business line.',
        liveSuggestionsCount: '{{count}} suggestions available',
        liveSuggestionsActive: '{{count}} suggestions. {{title}}, {{hint}}',
        tabs: {
          negocios: 'Business',
          contacto: 'Contact',
          auditorias: 'UX Audits',
        },
        suggestions: [
          {
            id: 'negocios-demo',
            category: 'negocios',
            title: 'X | CMS demo',
            hint: 'From brief to published prototype — Design Thinking and Sprint for campaigns.',
            badge: 'Demo',
            keywords: ['demo', 'business', 'cms', 'sem', 'seo', 'case', 'x cms', 'consulting', 'leads'],
            href: 'section/consultoria/consultoria-demo',
          },
          {
            id: 'contacto-perfil',
            category: 'contacto',
            title: 'Experience and track record',
            hint: 'UX Lead role, companies, and outcomes in regulated fintech and mobility.',
            badge: 'Experience',
            keywords: ['profile', 'cv', 'recruiters', 'linkedin', 'experience', 'contact', 'sem', 'track record'],
            href: 'section/sobre-mi/experiencia',
          },
          {
            id: 'auditoria-freemium',
            category: 'auditorias',
            title: 'Review accessibility',
            hint: 'WCAG 2.2 AA checklist and critical flows with documented evidence.',
            badge: 'Audit',
            keywords: ['audit', 'freemium', 'leads', 'business', 'wcag', 'free', 'accessibility'],
            href: 'route/auditoria',
          },
        ] satisfies HeroSearchSuggestion[],
        panels: {
          negocios: {
            badge: 'Live case studies',
            composerHint: 'Cases with documented process, visual evidence, and measurable outcomes.',
            description: 'Regulated fintech, premium mobility, and Design Ops with production metrics.',
            highlights: ['Regulated fintech', 'Premium mobility', 'Design Ops'],
            metrics: [],
            ctaPrimary: 'View business cases',
            ctaSecondary: 'UX process',
          },
          contacto: {
            badge: 'Professional experience',
            composerHint: 'Track record, CV, and contact in one flow.',
            description: 'UX Lead · remote or hybrid · reply within 24 h.',
            lead: 'Experience, companies, and unified contact form.',
            highlights: ['Downloadable CV', 'Remote / Hybrid', 'Direct contact'],
            metrics: [],
            ctaPrimary: 'View experience',
            ctaSecondary: 'Go to contact',
          },
          auditorias: {
            badge: 'UX review',
            composerHint: 'Accessibility checklist and consulting formats with evidence.',
            description:
              'No-cost audit with WCAG 2.2 AA and privacy by design.',
            highlights: ['WCAG 2.2 AA', 'Privacy by design', 'Checklist included'],
            privacyNote:
              'Forms via proprietary relay — we do not store your data on third-party servers.',
            metrics: [],
            ctaPrimary: 'Start review',
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
      description: 'UX Lead with +3 years transforming ideas into digital products. My approach combines strategic thinking (Idea) with flawless execution (Body), creating experiences that connect with real users.',
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
      description: 'My journey from Product Designer to Lead UX in tech and finance companies.',
      current: 'Present',
      yearsAbbr: 'y',
      viewCases: 'View cases and evidence',
      achievementsLabel: 'Key achievements',
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
      swipeHint: 'Swipe to explore · Tap to zoom',
      expand: 'Expand image',
      galleryAria: 'Mockup gallery, swipe horizontally',
      viewOf: 'View {current} of {total}',
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

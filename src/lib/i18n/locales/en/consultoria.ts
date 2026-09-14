export const consultoria = {
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
        opsLabel: 'Digital operations',
        xcmsLabel: 'X|CMS',
        xcmsCaption: 'X|CMS · 5 min demo',
        ctaDemo: 'View X|CMS demo',
        ctaPrototype: 'See prototype',
        title: 'Technology for business.',
        titleAccent: '',
        description:
          'Digital operations and the flow your customer already uses, in their CMS or CRM. Diagnostic in 5–7 days. Free: WCAG 2.2 AA on one flow. 30 min kickoff.',
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
    };


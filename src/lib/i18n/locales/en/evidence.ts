export const valueArsenal = {
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
    };

export const valueCarousel = {
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
    };

export const impactStats = {
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
            href: 'route/radar-gratis',
            badge: 'Free · a11y',
          },
        ],
        projectId: 'sura-ria-us',
      },
    };

export const flagshipCaseStudy = {
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
    };

export const testimonials = {
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
    };


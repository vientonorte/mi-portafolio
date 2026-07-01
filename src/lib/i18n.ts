export type Language = 'es' | 'en';

export const translations = {
  es: {
    // Navigation
    nav: {
      about: 'Sobre mí',
      projects: 'Negocios',
      experience: 'Experiencia',
      skills: 'Habilidades',
      contact: 'Contacto',
      designSystem: 'Design System',
      caseStudies: 'Casos de Estudio',
      process: 'Proceso',
      more: 'Más',
    },

    homeTeaser: {
      badge: 'Negocios',
      title: 'Impacto por empresa',
      description:
        'Tres casos destacados en fintech y mobility. El hub completo incluye métricas, proceso y evidencia visual.',
      ctaNegocios: 'Ver todos los negocios',
      ctaProceso: 'Ver método UX',
    },
    
    seo: {
      keywords:
        'UX Lead, cumplimiento regulatorio, experiencias premium, fintech, mobility, SURA, Transvip, Karri',
      pages: {
        home: {
          title: 'Rodrigo Gaete · UX Lead Fintech & Mobility',
          description:
            'Diseño que reduce el ruido: cumplimiento regulatorio y experiencias premium. Casos en SURA, Transvip y Karri.',
        },
        proyectos: {
          title: 'Negocios · UX Lead',
          description:
            'Casos con evidencia y métricas en SURA Investments, Transvip y Karri. Fintech, mobility y enterprise.',
        },
        cases: {
          title: 'Framework UX y casos',
          description:
            '5 procesos UX — analytics, research, diseño, testing y refinamiento. Aplicados en SURA, Transvip y Karri.',
        },
        framework: {
          title: 'Framework UX — 5 procesos',
          description:
            'Metodología en 5 macroprocesos con casos reales en fintech y mobility enterprise.',
        },
        about: {
          title: 'Sobre mí',
          description:
            'Rodrigo Gaete, UX Lead en fintech y mobility. Research, design systems y Design Thinking en SURA, Transvip y Karri.',
        },
        contact: {
          title: 'Contacto',
          description:
            'Contacta a Rodrigo Gaete para proyectos UX, consultoría o colaboraciones en fintech y mobility.',
        },
        designSystem: {
          title: 'Design System',
          description:
            'Tokens, componentes y principios del design system del portafolio Lead UX.',
        },
        privacy: {
          title: 'Privacidad',
          description:
            'Política de privacidad del portafolio. Sin cookies de tracking ni datos sin consentimiento.',
        },
        audit: {
          title: 'Auditoría Portfolio UX/UI',
          description:
            'Auditoría estratégica UX/UI: riesgos, quick wins SEO y plan de mentoría en 3 sesiones.',
        },
        grafo: {
          title: 'Red de fricción institucional',
          description: 'Grafo de relaciones y fricción institucional — investigación territorial.',
        },
        autosuggest: {
          title: 'Autosuggest fondos',
          description: 'Caso SURA: autosuggest de fondos de inversión — detalle próximamente.',
        },
        admin: {
          title: 'Admin fotos',
          description: 'Editor privado de imágenes del portafolio.',
        },
      },
    },

    // Hero
    hero: {
      label: 'UX Lead · Compliance & Premium',
      headlineLead: 'Diseño que',
      headlineFocus: 'reduce el ruido.',
      valueProp:
        'Menos fricción, más claridad — donde el cumplimiento y la excelencia no compiten.',
      specialties: ['Cumplimiento', 'Experiencias premium', 'Fintech', 'Mobility'],
      cta: {
        primary: 'Ver negocios',
        secondary: 'Proceso UX',
      },
      scroll: 'Explorar',
      resultsLabel: 'Resultados',
      resultCards: [
        { metric: '−40%', description: 'onboarding SURA', company: 'SURA Investments' },
        { metric: 'NPS 72', description: 'plataforma inversiones', company: 'SURA' },
        { metric: '+35%', description: 'activación shoppers', company: 'Karri' },
      ],
    },

    flagshipCaseStudy: {
      badge: 'Caso completo',
      title: 'Karri — Calculadora de Ganancias',
      subtitle: 'Del problema al impacto medible con los 5 procesos del framework.',
      contextLabel: 'Contexto',
      context:
        'Shoppers de Karri no podían estimar ingresos antes de activarse. Alta fricción en onboarding y abandono del 65% en el funnel inicial.',
      challengeLabel: 'Desafío',
      challenge:
        'Dar transparencia al modelo de ganancias sin sobrecargar la interfaz ni violar expectativas de cumplimiento operativo.',
      processLabel: 'Proceso (5 macroprocesos)',
      processSteps: [
        'UX Analytics — abandono 65%, benchmark BOOSMAP/ZUBALE',
        'UX Research — 12 entrevistas, transparencia = factor #1',
        'UX/UI Design — calculadora interactiva + design system',
        'UX Testing — 92% comprensión, 0 errores críticos',
        'Refinamiento — +35% activación correlacionada con uso',
      ],
      solutionLabel: 'Solución',
      solution:
        'Calculadora con escenarios configurables, educación sobre comisiones y benchmark competitivo integrado en el flujo de activación.',
      impactLabel: 'Impacto medible',
      adoptionLabel: 'Adopción de la feature',
      learningsLabel: 'Aprendizajes',
      learnings: [
        'La transparencia financiera reduce abandono más que incentivos promocionales.',
        'Validar con datos de proceso evita re-trabajo en desarrollo.',
      ],
      cta: 'Ver caso completo con evidencias',
    },

    testimonials: {
      badge: 'Recomendaciones',
      title: 'Lo que dicen los equipos',
      description:
        'Recomendaciones de LinkedIn de líderes en fintech y movilidad premium con los que colaboré.',
      items: [
        {
          quote:
            'Destaco su capacidad para entender rápidamente las necesidades del usuario y transformarlas en soluciones simples, intuitivas y aterrizadas. Fue un excelente articulador entre negocio, diseño y tecnología en un entorno altamente regulado.',
          author: 'Pablo Matte R.',
          role: 'Chief Executive Officer — Principal | Registered Investment Advisor',
          company: 'Miami, FL, USA',
          context: 'feb. 2022 – may. 2026 · 4 años 4 meses',
        },
        {
          quote:
            'Ha demostrado capacidad de trabajar de forma colaborativa y transversal con equipos distribuidos en Latinoamérica. Es un apasionado del UX y cada intervención aportó gran valor a la organización.',
          author: 'Arturo Ruiz Palafox',
          role: 'Product Owner — Digital MX',
          company: 'SURA',
          context: 'Jornada completa · ago. 2022 – actualidad · 4 años',
        },
        {
          quote:
            'Sus habilidades UX/UI son tremendas: vi el gran impacto de su trabajo en usuarios y en la cultura de la organización. Destaco su approach metodológico y su capacidad de integrar usuarios no representados.',
          author: 'Francco Frugone',
          role: 'Subgerente de productos',
          company: 'Transvip Chile',
          context:
            'Jornada completa · 4 años 1 mes · Chile · En remoto · may. 2023 – abr. 2025 · 2 años',
        },
      ],
    },

    autosuggestPage: {
      title: 'Autosuggest de fondos',
      body: 'Caso SURA en la plataforma de inversiones: búsqueda predictiva de fondos con progressive disclosure. El detalle completo vive en el estudio de la plataforma.',
      cta: 'Ver plataforma de inversiones',
      relatedProjectId: 'sura-inversiones-dashboard',
    },
    
    // About
    about: {
      badge: 'Sobre mí',
      title: 'Diseñador de Experiencias',
      subtitle: 'Idea + Cuerpo',
      description: 'Lead UX Designer con +3 años transformando ideas en productos digitales. Mi enfoque combina pensamiento estratégico (Idea) con ejecución impecable (Cuerpo), creando experiencias que conectan con usuarios reales.',
      philosophy: {
        idea: {
          title: 'Idea',
          description: 'La conceptualización y estrategia detrás de cada experiencia. El pensamiento que da forma a la solución.',
        },
        body: {
          title: 'Cuerpo',
          description: 'La ejecución tangible y la interfaz. La materialización de las ideas en productos digitales funcionales.',
        },
      },
      values: {
        title: 'Valores que guían mi trabajo',
        list: {
          nature: {
            title: 'Inspirado en la naturaleza',
            description: 'Diseño orgánico basado en patrones naturales y comportamiento humano real.',
          },
          contemplation: {
            title: 'Espacio para decidir',
            description: 'Interfaces que dan tiempo al usuario para reflexionar y tomar decisiones informadas.',
          },
          creativity: {
            title: 'Innovación con propósito',
            description: 'Soluciones creativas que resuelven problemas reales, no solo estética.',
          },
          accessibility: {
            title: 'Diseño inclusivo',
            description: 'Experiencias accesibles para todos los usuarios, sin excepciones.',
          },
        },
      },
    },
    
    // Projects
    projects: {
      badge: 'Portfolio',
      title: 'Experiencia Profesional',
      description: 'Proyectos organizados por empresa y rol. Cada caso incluye contexto, procesos y resultados medibles.',
      companies: {
        title: 'Empresas donde he trabajado',
        description: 'Experiencia en fintech y mobility tech. Click para ver proyectos completos.',
      },
      viewProjects: 'Ver negocios',
      projectCount: 'proyectos',
      backToCompanies: 'Volver a empresas',
      tabs: {
        processes: 'Procesos',
        details: 'Resultados',
      },
      details: {
        challenge: 'Desafío',
        solution: 'Solución',
        results: 'Resultados',
        learnings: 'Aprendizajes',
      },
      teamSize: 'Equipo',
      cta: 'Ver casos de estudio completos',
      stats: {
        experience: 'Años como Lead UX',
        projects: 'Proyectos completados',
        generation: 'Generación docente UX/UI',
        designThinking: 'Design Thinking aplicado',
      },
    },
    
    // Experience
    experience: {
      badge: 'Trayectoria',
      title: 'Experiencia Profesional',
      description: 'Mi camino desde Product Designer hasta Lead UX en empresas tech y finance.',
      current: 'Actual',
      yearsAbbr: 'a',
    },
    
    // Skills
    skills: {
      badge: 'Habilidades',
      title: 'Skills & Herramientas',
      description: 'Tecnologías y metodologías que domino para crear experiencias excepcionales.',
      categories: {
        design: 'Diseño UX/UI',
        research: 'Research & Testing',
        tools: 'Herramientas',
        development: 'Frontend',
      },
    },
    
    // Contact
    contact: {
      badge: 'Contacto',
      title: '¿Trabajamos juntos?',
      description: 'Estoy disponible para proyectos freelance, colaboraciones o posiciones full-time. Conversemos sobre tu próximo desafío.',
      form: {
        name: 'Nombre',
        namePlaceholder: 'Tu nombre',
        email: 'Email',
        emailPlaceholder: 'tu@email.com',
        message: 'Mensaje',
        messagePlaceholder: 'Cuéntame sobre tu proyecto o idea...',
        submit: 'Enviar mensaje',
        sending: 'Enviando...',
      },
      social: {
        title: 'O escríbeme directamente',
      },
    },
    
    // Common
    common: {
      viewMore: 'Ver más',
      viewLess: 'Ver menos',
      loading: 'Cargando...',
      error: 'Algo salió mal',
      backToTop: 'Volver arriba',
      visitProject: 'Visitar proyecto',
    },
    
    // Case Studies
    caseStudies: {
      hero: {
        badge: 'Método en producción',
        title: 'Proceso UX basado en mejora continua',
        description: '5 macroprocesos aplicados en entornos reales — SURA, Transvip y Karri — con resultados medibles en onboarding, activación y NPS.',
        metricsTitle: 'Resultados en producción',
        stats: {
          processes: 'Macroprocesos',
          experience: 'Años de experiencia',
          teaching: 'Evaluación pedagógica',
          students: 'Estudiantes capacitados',
        },
      },
      navigation: {
        hero: 'Introducción',
        challenge: 'El Desafío',
        process: 'Los 5 Procesos',
        valueChain: 'Cadena de Valor',
        cta: 'Negocios',
      },
      challenge: {
        badge: 'El Desafío',
        title: 'De procesos ambiguos a framework estructurado',
        subtitle: 'El problema inicial',
        problem: 'Anteriormente, el proceso de diseño no contaba con tareas definidas y se sustentaba en dos estados durante los sprints: "Diseño en progreso" y "Diseño en aprobación".',
        solution: 'Propuesta de framework',
        solutionText: 'Definir claramente los macroprocesos del diseño de producto, facilitando la estimación de esfuerzos, el registro del trabajo y la documentación estructurada.',
        sprintProgress: 'Diseño en progreso',
        sprintApproval: 'Diseño en aprobación',
        ambiguous: '❌ Ambiguo y difícil de trackear',
        structured: '✓ Estructurado y medible',
        phaseNames: ['Analytics', 'Research', 'Design', 'Testing', 'Refinamiento'],
      },
      process: {
        badge: 'Mi Proceso',
        title: 'Los 5 macroprocesos',
        flowTitle: 'Flujo de Mejora Continua',
        description: 'Cada fase está pensada para agregar valor mediante mejora continua y validación constante.',
        viewApplication: 'Ver aplicación',
        phases: {
          analytics: {
            title: 'UX Analytics',
            description: 'Análisis cuantitativo de comportamiento de usuarios mediante herramientas de analytics. Identificación de puntos de fricción y oportunidades de mejora basadas en data real.',
          },
          research: {
            title: 'UX Research',
            description: 'Investigación cualitativa con usuarios finales. Entrevistas, encuestas y análisis competitivo para comprender necesidades, motivaciones y contextos de uso.',
          },
          design: {
            title: 'UX/UI Design',
            description: 'Ideación colaborativa y diseño de soluciones. Wireframes, prototipos interactivos y diseño visual alineado con el sistema de diseño y objetivos del negocio.',
          },
          testing: {
            title: 'UX Testing',
            description: 'Validación de prototipos con usuarios reales. Testing de usabilidad, A/B testing y feedback de stakeholders antes del desarrollo.',
          },
          refinement: {
            title: 'Refinamiento',
            description: 'Iteración continua post-lanzamiento. Análisis de métricas, ajustes basados en feedback y optimización de la experiencia.',
          },
        },
      },
      valueChain: {
        badge: 'Cadena de Valor',
        title: 'Discovery Activo vs Pasivo',
        description: 'El propósito es agregar valor mediante un Discovery Activo que se centra en corregir errores detectados por analytics, priorizando esfuerzos estratégicamente.',
        activeDiscovery: {
          title: 'Discovery Activo',
          description: 'Detección proactiva de problemas mediante herramientas de analítica. Decisiones basadas en data, no en suposiciones.',
        },
        passiveDiscovery: {
          title: 'Discovery Pasivo',
          description: 'Reacción a dolores detectados en reviews o conversaciones con stakeholders. Menos eficiente y más costoso.',
        },
        benefit: 'Al incluir Product Design colaborativo desde la jerarquización de hallazgos hasta el testeo con usuarios, disminuimos errores de diseño y desarrollos innecesarios.',
        activeBullets: [
          'Decisiones basadas en data real',
          'Identificación proactiva de problemas',
          'Priorización estratégica de esfuerzos',
        ],
        passiveBullets: [
          'Reacción a quejas de stakeholders',
          'Falta de priorización clara',
          'Correcciones costosas post-desarrollo',
        ],
        diagramTitle: 'Cadena de Valor UX/UI Design',
        diagramMvp: 'MVP',
        diagramRefinement: 'Refinamiento',
        phases: {
          discovery: 'Discovery Activo',
          productDesign: 'Product Design',
          development: 'Sprint Desarrollo',
        },
      },
      bridge: {
        badge: 'De método a resultado',
        title: 'Cada fase, un resultado medible',
        description: 'El framework no vive en slides: se aplica en sprints reales y se valida con métricas de negocio.',
        stripLabel: 'Resumen método a resultado por fase',
      },
      navMobile: 'Secciones del proceso UX',
      cta: {
        viewProjects: 'Explorar negocios',
        backToPortfolio: 'Volver al portfolio',
        sectionLabel: 'Negocios reales',
        title: '¿Quieres ver este framework en acción?',
        description: 'Explora los casos completos por negocio donde apliqué esta metodología en SURA, Transvip y Karri.',
      },
    },

    caseStudiesGrid: {
      badge: 'Casos visuales',
      title: 'Evidencia de impacto',
      description: 'Selección de casos por negocio con capturas reales, métricas y profundidad. Haz clic para ver el estudio completo.',
      viewCase: 'Ver Caso de Estudio',
      altPrefix: 'Caso de estudio:',
    },

    featuredCaseStudies: {
      'sura-ux-enterprise': {
        title: 'Implementación UX Enterprise Regional',
        company: 'SURA Investments',
        description:
          'Framework de Design Thinking adaptado para iniciativas tecnológicas regionales: lineamientos UX/UI escalables en 5+ países.',
        tags: ['Fintech', 'Enterprise', 'Design Thinking', 'Regional'],
      },
      'sura-ria-us': {
        title: 'Diseño UX UI RIA SURA US',
        company: 'SURA Investments',
        description:
          'Plataforma RIA end-to-end para el mercado estadounidense: onboarding multi-perfil, autenticación y dashboard de inversiones.',
        tags: ['Fintech', 'RIA', 'Onboarding', 'US Market'],
      },
      'sura-inversiones-dashboard': {
        title: 'Plataforma de Inversiones',
        company: 'SURA Investments',
        description:
          'Dashboard de inversiones con progressive disclosure, IA reestructurada y testing con usuarios retail e institucionales.',
        tags: ['Fintech', 'Dashboard', 'Research'],
      },
      'sura-ecosistema-digital': {
        title: 'Ecosistema Digital & Onboarding',
        company: 'SURA Investments',
        description:
          "Unificación de +20 sitios públicos con CMS, Design System y flujo 'Hazte cliente' con manejo de errores.",
        tags: ['CMS', 'Design System', 'Onboarding'],
      },
      'transvip-app-premium': {
        title: 'App Pasajeros Premium',
        company: 'Transvip',
        description:
          'Rediseño del flujo de reserva ejecutiva con selección de vehículo, fechas y reducción de fricción.',
        tags: ['Mobility', 'Premium', 'Mobile'],
      },
      'karri-calculadora': {
        title: 'Calculadora de Ganancias',
        company: 'Karri',
        description:
          'Simulador de ingresos con benchmark BOOSMAP/ZUBALE para transparencia del modelo de ganancias.',
        tags: ['Shoppers', 'Benchmark', 'Mobile'],
      },
      'karri-notificaciones': {
        title: 'Hub de Notificaciones',
        company: 'Karri',
        description:
          'Centro unificado de notificaciones y onboarding simplificado para shoppers.',
        tags: ['Notifications', 'Onboarding', 'IA'],
      },
      'karri-design-sprint': {
        title: 'Workshop Estrategia de Producto',
        company: 'Karri',
        description:
          '3 sesiones: brief colaborativo, journey map (24 touchpoints) y OKRs con 3 MVPs priorizados.',
        tags: ['Design Sprint', 'OKRs', 'Facilitation'],
      },
    },

    projectsList: {
      title: 'Roles y Proyectos Destacados',
      description: 'Experiencia profesional organizada por empresa y rol. Cada proyecto incluye contexto empresarial, procesos aplicados y resultados medibles.',
      filters: {
        all: 'Todos los proyectos',
        featured: '⭐ Destacados',
        fintech: 'Fintech',
        mobility: 'Mobility',
      },
      noResults: 'No se encontraron proyectos en esta categoría',
      viewFullCases: 'Ver método y resultados',
    },

    projectsHub: {
      otherProjects: 'Otros proyectos',
      otherProjectsDesc: 'Proyectos independientes y frameworks desarrollados',
      featuredProjects: 'Proyectos destacados',
      frameworkButton: 'Cómo trabajé: Los 5 procesos UX',
    },

    breadcrumbs: {
      home: 'Inicio',
      projects: 'Negocios',
      cases: 'Casos de estudio',
      process: 'Proceso UX',
      framework: 'Framework UX',
      about: 'Sobre mí',
      contact: 'Contacto',
      privacy: 'Privacidad',
      designSystem: 'Design System',
      audit: 'Auditoría',
      grafo: 'Grafo',
      autosuggest: 'Autosuggest Fondos',
      admin: 'Admin fotos',
      notFound: 'No encontrado',
    },

    footer: {
      contact: 'Contacto',
      linkedin: 'LinkedIn',
      privacy: 'Privacidad',
      research: 'Investigación',
      copyright: 'Rodrigo Gaete Gaona · Lead UX Designer',
      tagline: 'Diseñado con atención al detalle y accesibilidad.',
    },

    errors: {
      companyNotFound: 'No encontramos esa empresa.',
      projectNotFound: 'No encontramos ese proyecto.',
      processNotFound: 'Proceso no encontrado',
      backToProjects: 'Volver a negocios',
      back: 'Volver',
    },

    mockups: {
      badge: 'Evidencias',
      defaultTitle: 'Evidencias visuales del proyecto',
      defaultDescription: 'Mockups de alta fidelidad del diseño UX/UI implementado',
      companyTitle: 'Evidencias — {name}',
      projectTitle: 'Evidencias — {name}',
      projectDescription:
        'Capturas y prototipos de alta fidelidad del trabajo de diseño UX/UI en este proyecto.',
      itemLabel: '{project} · Vista {current} de {total}',
      designTitle: 'Artefactos de diseño',
      designDescription:
        'Pantallas, diagramas y entregables visuales del proceso de investigación y diseño.',
      capturesTitle: 'Capturas y mockups',
      capturesDescription: 'Evidencia visual complementaria en alta fidelidad.',
      swipeHint: 'Desliza para explorar · Toca para ampliar',
      expand: 'Ampliar imagen',
      galleryAria: 'Galería de mockups, desliza horizontalmente',
      viewOf: 'Vista {current} de {total}',
    },
    
    // Process Detail
    processDetail: {
      methodology: 'Metodología',
      methods: 'Métodos aplicados',
      tools: 'Herramientas',
      benefits: 'Beneficios',
      relatedProjects: 'Proyectos donde apliqué esto',
      backToCaseStudies: 'Volver a Case Studies',
      viewProject: 'Ver proyecto',
      realCases: 'Casos reales',
      relatedSubtitle: 'Proyectos donde apliqué {process} con resultados medibles',
      viewAllProjects: 'Ver todos los negocios',
    },
  },
  
  en: {
    // Navigation
    nav: {
      about: 'About',
      projects: 'Business',
      experience: 'Experience',
      skills: 'Skills',
      contact: 'Contact',
      designSystem: 'Design System',
      caseStudies: 'Case Studies',
      process: 'Process',
      more: 'More',
    },

    homeTeaser: {
      badge: 'Business',
      title: 'Impact by company',
      description:
        'Three featured cases in fintech and mobility. The full hub includes metrics, process, and visual evidence.',
      ctaNegocios: 'View all business',
      ctaProceso: 'View UX process',
    },
    
    seo: {
      keywords:
        'UX Lead, regulatory compliance, premium experiences, fintech, mobility, SURA, Transvip, Karri',
      pages: {
        home: {
          title: 'Rodrigo Gaete · Lead UX Fintech & Mobility',
          description:
            'Design that cuts the noise: regulatory compliance and premium experiences. Cases at SURA, Transvip, and Karri.',
        },
        proyectos: {
          title: 'Business · Lead UX',
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
            'Rodrigo Gaete, Lead UX in fintech & mobility. Research, design systems, and Design Thinking at SURA, Transvip, Karri.',
        },
        contact: {
          title: 'Contact',
          description:
            'Contact Rodrigo Gaete for UX projects, consulting, or collaborations in fintech and mobility.',
        },
        designSystem: {
          title: 'Design System',
          description:
            'Tokens, components, and principles from the Lead UX portfolio design system.',
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
        grafo: {
          title: 'Institutional friction network',
          description: 'Graph of institutional relationships and friction — territorial research.',
        },
        autosuggest: {
          title: 'Fund autosuggest',
          description: 'SURA case: investment fund autosuggest — full detail coming soon.',
        },
        admin: {
          title: 'Photo admin',
          description: 'Private portfolio image editor.',
        },
      },
    },

    // Hero
    hero: {
      label: 'Lead UX · Compliance & Premium',
      headlineLead: 'Design that',
      headlineFocus: 'cuts the noise.',
      valueProp:
        'Less friction, more clarity — where compliance and excellence don’t compete.',
      specialties: ['Compliance', 'Premium UX', 'Fintech', 'Mobility'],
      cta: {
        primary: 'View business',
        secondary: 'UX Process',
      },
      scroll: 'Explore',
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
      body: 'SURA case on the investment platform: predictive fund search with progressive disclosure. Full detail lives in the platform case study.',
      cta: 'View investment platform',
      relatedProjectId: 'sura-inversiones-dashboard',
    },
    
    // About
    about: {
      badge: 'About',
      title: 'Experience Designer',
      subtitle: 'Idea + Body',
      description: 'Lead UX Designer with +3 years transforming ideas into digital products. My approach combines strategic thinking (Idea) with flawless execution (Body), creating experiences that connect with real users.',
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
      current: 'Current',
      yearsAbbr: 'y',
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
      badge: 'Contact',
      title: 'Let\'s work together?',
      description: 'I\'m available for freelance projects, collaborations, or full-time positions. Let\'s talk about your next challenge.',
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'you@email.com',
        message: 'Message',
        messagePlaceholder: 'Tell me about your project or idea...',
        submit: 'Send message',
        sending: 'Sending...',
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
          'Executive booking flow redesign with vehicle selection, dates, and reduced friction.',
        tags: ['Mobility', 'Premium', 'Mobile'],
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
      cases: 'Case studies',
      process: 'UX Process',
      framework: 'UX Framework',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy',
      designSystem: 'Design System',
      audit: 'Audit',
      grafo: 'Graph',
      autosuggest: 'Autosuggest Funds',
      admin: 'Photo admin',
      notFound: 'Not found',
    },

    footer: {
      contact: 'Contact',
      linkedin: 'LinkedIn',
      privacy: 'Privacy',
      research: 'Research',
      copyright: 'Rodrigo Gaete Gaona · Lead UX Designer',
      tagline: 'Designed with attention to detail and accessibility.',
    },

    errors: {
      companyNotFound: 'We could not find that company.',
      projectNotFound: 'We could not find that project.',
      processNotFound: 'Process not found',
      backToProjects: 'Back to business',
      back: 'Back',
    },
    
    // Process Detail
    processDetail: {
      methodology: 'Methodology',
      methods: 'Methods applied',
      tools: 'Tools',
      benefits: 'Benefits',
      relatedProjects: 'Projects where I applied this',
      backToCaseStudies: 'Back to Case Studies',
      viewProject: 'View project',
      realCases: 'Real cases',
      relatedSubtitle: 'Projects where I applied {process} with measurable results',
      viewAllProjects: 'View all business',
    },
  },
};

export function useTranslation(lang: Language) {
  return translations[lang];
}
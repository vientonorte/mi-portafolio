import type { HeroSearchSuggestion } from '../../hero-search';

export default {
    // Navigation
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Negocios',
      experience: 'Experiencia',
      skills: 'Habilidades',
      contact: 'Contacto',
      designSystem: 'Design System',
      caseStudies: 'Casos de Estudio',
      process: 'Proceso',
      more: 'Más',
      consulting: 'Consultoría ✦',
      audit: 'Auditoría UX',
      uxtools: 'UX Tools',
    },

    homeTeaser: {
      badge: 'Negocios',
      title: 'Impacto por empresa',
      description:
        'SURA, Transvip y Karri en fintech y mobility. Design system, discovery y métricas en el hub completo.',
      ctaNegocios: 'Ver todos los negocios',
      ctaProceso: 'Ver proceso UX',
    },
    
    seo: {
      keywords:
        'Design Ops, UX Lead, cumplimiento regulatorio, experiencias premium, fintech, mobility, SURA, Transvip, Karri',
      pages: {
        home: {
          title: 'Rodrigo Gaete · UX Lead',
          description:
            'UX Lead con Design Ops como método: productos regulados y mobility. Casos en SURA, Transvip y Karri.',
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
            'Rodrigo Gaete, UX Lead en fintech y mobility. Design Ops, research, design systems y casos en SURA, Transvip y Karri.',
        },
        contact: {
          title: 'Contacto',
          description:
            'Contacta a Rodrigo Gaete para proyectos UX, consultoría o colaboraciones en fintech y mobility.',
        },
        designSystem: {
          title: 'Design System · Rodrigo Gaete',
          description:
            'Marca RG minimalista, tokens matte, evidencia medible y patrones de prueba social del portafolio UX Architect.',
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
        consultoria: {
          title: 'Consultoría UX · Viento Norte',
          description:
            'Consultoría Viento Norte: diagnóstico express, estrategia guiada y proceso de equipo con entregables medibles.',
        },
        grafo: {
          title: 'Red de fricción institucional',
          description: 'Grafo de relaciones y fricción institucional — investigación territorial.',
        },
        autosuggest: {
          title: 'Autosuggest fondos',
          description:
            'Patrón UX en SURA Inversiones: búsqueda predictiva de fondos con progressive disclosure y WCAG 2.2 AA — evidencia de producto, no case study.',
        },
        admin: {
          title: 'Admin fotos',
          description: 'Editor privado de imágenes del portafolio.',
        },
      },
    },

    aboutTeaser: {
      title: 'UX Lead regional · Fintech & Mobility',
      lead: 'UX Lead en SURA Investments. Design Ops como método en productos regulados y mobility.',
      detail: 'Trayectoria en Transvip/Karri, docencia en Desafío Latam y agencias (Havas/Claro, Maraña, Walmart).',
      cta: 'Ver perfil completo',
    },

    upcomingCases: {
      badge: 'Próximamente',
      title: 'Casos en preparación',
      description: 'Evidencia visual y métricas en curso para ampliar el hub de negocios.',
      status: 'Evidencia en curso',
    },

    uxAuditBanner: {
      badge: 'Viento Norte · Consultoría UX',
      titleLead: 'Auditorías UX con',
      titleAccent: 'evidencia medible',
      description:
        'Consultoría para portfolios, productos digitales y equipos. De hallazgo a plan de acción priorizado.',
      highlights: ['Heurísticas Nielsen', 'WCAG 2.2 AA', 'SEO/AEO', 'Plan P0–P2'],
      ctaPrimary: 'Elegir consultoría',
      ctaSecondary: 'Ver auditoría de ejemplo',
      metrics: {
        a11y: 'Accesibilidad',
        priority: 'Prioridad',
        recruiter: 'Test reclutador',
      },
      panelNote: 'Entregable ejecutivo + quick wins listos para implementar.',
    },

    valueArsenal: {
      badge: 'Contenido de valor',
      title: 'Prototipos y evidencia navegable',
      description:
        'Demos Figma, POCs live, casos SURA/Transvip/Karri, método UX y auditoría navegables. Explora antes de reservar consultoría.',
      filterAriaLabel: 'Filtrar evidencia',
      filters: {
        all: 'Todo',
        prototype: 'Prototipos',
        poc: 'POCs',
        audit: 'Auditorías',
        case: 'Casos',
      },
      evidenceCount: '{count} piezas listas para revisar',
      showingCount: 'Mostrando {visible} de {total}',
      loadMore: 'Cargar más evidencia',
      viewProof: 'Ver evidencia',
      bundleFit: 'Modalidad',
      bundleStripTitle: 'Consultoría Viento Norte',
      bundleStripDescription:
        'Diagnóstico express, estrategia guiada o proceso de equipo — kickoff en menos de 24 h hábiles. Sin precios públicos; alcance en la primera sesión.',
      bundleStripBadge: 'SEM · SEO ready',
      bundleCta: 'Reservar consultoría',
      treeCta: 'Encontrar modalidad',
      recommended: 'Recomendada',
    },

    valueCarousel: {
      sectionBadge: 'Contenido de valor',
      prevSlide: 'Anterior',
      nextSlide: 'Siguiente',
      slideOf: 'Diapositiva {current} de {total}',
      slides: [
        {
          id: 'audit',
          badge: 'Auditoría UX',
          title: 'Hallazgos priorizados',
          titleAccent: 'listos para ejecutar',
          description:
            'Heurísticas Nielsen, WCAG 2.2 AA y test reclutador en menos de 10 s. Entregable ejecutivo con plan P0–P2.',
          highlights: ['Heurísticas Nielsen', 'WCAG 2.2 AA', 'Plan P0–P2'],
          metrics: [
            { value: 'WCAG 2.2', label: 'Accesibilidad' },
            { value: 'P0–P2', label: 'Prioridad' },
            { value: '<10 s', label: 'Test reclutador' },
          ],
          cta: 'Ver auditoría de ejemplo',
          ctaSecondary: 'Elegir consultoría',
        },
        {
          id: 'sura-case',
          badge: 'Caso en producción',
          title: 'RIA SURA US',
          titleAccent: '−40% onboarding',
          description:
            'Onboarding multi-perfil para asesores USA: 8 prototipos navegables, 3 flujos de auth y progressive disclosure.',
          highlights: ['Fintech regulado', '8 prototipos', 'Mercado USA'],
          metrics: [
            { value: '−40%', label: 'Tiempo onboarding' },
            { value: '8', label: 'Prototipos' },
            { value: 'NPS 72', label: 'Plataforma' },
          ],
          cta: 'Ver caso completo',
          ctaSecondary: 'Ver fase UX Analytics',
        },
        {
          id: 'consultoria',
          badge: 'Viento Norte',
          title: 'Encuentra tu modalidad',
          titleAccent: 'en 2 preguntas',
          description:
            'Árbol de decisión + onboarding en 4 pasos. Sin precios públicos — alcance y propuesta en el kickoff.',
          highlights: ['Diagnóstico · Estrategia · Equipo', 'Mensaje prearmado', 'Kickoff <24 h'],
          metrics: [
            { value: '3', label: 'Modalidades' },
            { value: '4', label: 'Pasos' },
            { value: '<24 h', label: 'Respuesta' },
          ],
          cta: 'Iniciar onboarding',
          ctaSecondary: 'Probar árbol de decisión',
        },
      ],
    },

    consultoria: {
      progressLabel: 'Onboarding',
      previewOnly: 'Vista previa',
      previewNote: 'Alcance y propuesta personalizada en el kickoff — sin precios públicos.',
      recommended: 'Recomendada',
      back: 'Atrás',
      next: 'Continuar',
      steps: {
        welcome: 'Bienvenida · Viento Norte',
        package: 'Elige modalidad',
        context: 'Contexto del proyecto',
        summary: 'Resumen y contacto',
      },
      welcome: {
        title: 'Consultoría Viento Norte',
        description:
          'Onboarding en 4 pasos para definir alcance, modalidad y mensaje de contacto prearmado.',
        points: [
          'Diagnóstico express, estrategia guiada o proceso de equipo según madurez y urgencia',
          'Rodrigo Gaete · UX Lead — fintech, mobility y Design Ops',
          'Kickoff en menos de 24 h hábiles tras tu solicitud',
        ],
      },
      context: {
        industry: 'Industria',
        timeline: 'Plazo deseado',
        goal: 'Objetivo principal',
        goalPlaceholder: 'Ej.: mejorar conversión del portfolio, auditar app regulada, estructurar Design Ops…',
        goalHint: 'Mínimo 20 caracteres para continuar.',
      },
      summary: {
        note: 'Al confirmar, te llevamos a contacto con el mensaje listo para enviar.',
        cta: 'Ir a contacto',
      },
      treePreview: {
        badge: 'Árbol de respuestas',
        title: 'Preview · encuentra tu modalidad',
        description:
          'Responde 1–2 preguntas y ve la modalidad recomendada antes del onboarding completo. Sin precios — solo alcance.',
        pathLabel: 'Ruta seleccionada',
        reset: 'Reiniciar',
        previewOnly: 'Vista previa',
        cta: 'Continuar con esta modalidad',
      },
      demo: {
        badge: 'Demo consultoría',
        title: 'Diseño N2N · Design Thinking + Sprint',
        description:
          'Proyecto demo X | CMS publicado en Figma Sites: referencia de método completo (discovery → prototipo) en contexto CMS — alineado a estrategia guiada y proceso de equipo.',
        projectName: 'X | CMS',
        approach:
          'Diseño needle-to-needle: ideación con Design Thinking, validación en Design Sprint y prototipo navegable para handoff.',
        highlights: ['Design Thinking', 'Design Sprint', 'CMS', 'N2N', 'Figma Sites'],
        cta: 'Abrir demo publicada',
        ctaSecondary: 'Abrir en Figma Make',
        ctaMakeLink: 'Ver archivo editable en Figma Make',
        previewCta: 'Abrir sitio completo',
        embedTitle: 'Demo X | CMS — Figma Sites',
      },
      appQuoter: {
        badge: 'Cotizador app & web',
        title: 'Alinea presupuesto y expectativa',
        description:
          'Indica tu inversión de referencia y el tipo de entregable. Obtén una lectura de viabilidad sin precios públicos — el alcance fino se confirma en kickoff.',
        disclaimer:
          'Estimación orientativa de diseño UX y producto digital. No incluye desarrollo ni licencias de terceros.',
        budgetLabel: 'Presupuesto de referencia (USD)',
        budgetPresetsLabel: 'Presupuestos frecuentes',
        expectationLabel: '¿Qué esperas construir?',
        tiers: {
          prototype: {
            label: 'Prototipo funcional',
            hint: 'Figma navegable · flujos clave',
            deliverable: 'Validación de concepto y handoff visual',
            includes: [
              'Discovery focalizado y arquitectura de información',
              'Prototipo interactivo de alta fidelidad',
              'Quick wins y plan de siguiente fase',
            ],
          },
          web: {
            label: 'Web funcional',
            hint: 'MVP responsive · CMS-ready',
            deliverable: 'Experiencia web lista para implementar',
            includes: [
              'Research + IA + diseño UI del MVP web',
              'Design system inicial y patrones responsive',
              'Especificaciones y criterios de aceptación UX',
            ],
          },
          app: {
            label: 'App funcional',
            hint: 'Mobile · auth · flujos core',
            deliverable: 'Producto app con journeys críticos diseñados',
            includes: [
              'Onboarding, navegación y estados de error',
              'Prototipos mobile navegables + specs UI',
              'Plan de releases y métricas de adopción',
            ],
          },
          enterprise: {
            label: 'Desarrollo empresarial',
            hint: 'Multi-rol · governance · ops',
            deliverable: 'Ecosistema digital con proceso de equipo',
            includes: [
              'Blueprint UX enterprise y Design Ops',
              'Workshops con PM/PO/Engineering',
              'Playbook, métricas y gobierno de diseño',
            ],
          },
        },
        fit: {
          comfortable: 'Bien alineado',
          viable: 'Viable',
          tight: 'Ajustado',
          gap: 'Brecha',
        },
        result: {
          alignment: 'Alineación presupuesto · expectativa',
          affordableTitle: 'Alcance alcanzable con este presupuesto',
          increaseHint:
            'Para acercarte al alcance elegido, considera ampliar inversión aprox. {low}–{high}%.',
          summary: {
            comfortable:
              'Tu presupuesto cubre con holgura el alcance esperado. Podemos priorizar calidad de entrega y validación con usuarios.',
            viable:
              'El presupuesto es coherente con el alcance. Recomendamos kickoff para cerrar prioridades y fases.',
            tight:
              'El alcance es exigente para el presupuesto. Conviene acotar MVP o planificar por fases.',
            gap:
              'La expectativa supera el presupuesto actual. Puedes iniciar por un alcance menor o replantear inversión.',
          },
        },
        cta: 'Coordinar kickoff',
      },
    },

    impactStats: {
      badge: 'Resultados',
      title: 'Métricas con método detrás',
      description:
        'Cada KPI nace de un macroproceso aplicado en producción. Pasa el cursor para el spoiler del caso — o entra directo a la fase del framework.',
      viewPhase: 'Ver fase',
      tapHint: 'Toca para ver contexto',
      tapNavigate: 'Toca de nuevo para abrir la fase',
      stats: [
        {
          value: '−40%',
          label: 'Abandono en onboarding',
          description: 'SURA Ecosistema — 7-11 min vs 15+',
          spoiler:
            'Analytics de abandono paso a paso en el funnel "Hazte cliente": de 15+ min a 7-11 con 6 casos de error documentados.',
          phase: 'UX Analytics',
          processId: 'ux-analytics',
          company: 'SURA',
        },
        {
          value: 'NPS 72',
          label: 'Plataforma inversiones SURA',
          description: '+25 pts sobre baseline',
          spoiler:
            '12 entrevistas + testing con retail e institucionales: transparencia y progressive disclosure como drivers de confianza.',
          phase: 'UX Research',
          processId: 'ux-research',
          company: 'SURA',
        },
        {
          value: '+35%',
          label: 'Activación shoppers Karri',
          description: 'Calculadora de ganancias',
          spoiler:
            'Benchmark BOOSMAP/ZUBALE → prototipo interactivo: 92% comprensión en testing y correlación directa con activación.',
          phase: 'UX/UI Design',
          processId: 'ux-ui-design',
          company: 'Karri',
        },
        {
          value: '+58%',
          label: 'Engagement notificaciones',
          description: 'Hub centralizado Karri',
          spoiler:
            'El 40% de shoppers no encontraba avisos críticos: hub unificado + onboarding simplificado en refinamiento continuo.',
          phase: 'Refinamiento',
          processId: 'refinamiento',
          company: 'Karri',
        },
      ],
      featured: {
        badge: 'Proyecto Destacado',
        title: 'RIA SURA Investments US',
        subtitle: 'Plataforma RIA para mercado estadounidense',
        spoiler:
          'Onboarding multi-perfil para asesores USA: prototipos navegables, auth regulatorio y dashboard de inversiones con progressive disclosure.',
        highlights: ['Onboarding US', 'Auth regulatorio', 'Progressive disclosure'],
        imageAriaLabel: 'Abrir caso RIA SURA Investments US',
        pathsLabel: '¿Qué te interesa?',
        paths: [
          {
            id: 'reclutadores',
            title: 'Experiencia y trayectoria',
            hint: 'Rol UX Lead, empresas y resultados en fintech regulado y mobility.',
            href: 'section/sobre-mi/experiencia',
            badge: 'Experiencia',
          },
          {
            id: 'leads',
            title: 'Caso RIA completo',
            hint: 'Onboarding US, auth regulatorio, prototipos navegables y resultados medibles.',
            href: 'project/sura-ria-us',
            badge: 'Caso',
          },
          {
            id: 'auditoria',
            title: 'Revisar accesibilidad',
            hint: 'Checklist WCAG 2.2 AA y flujos críticos con evidencia documentada.',
            href: 'route/auditoria',
            badge: 'Auditoría',
          },
        ],
        projectId: 'sura-ria-us',
      },
    },

    // Hero
    hero: {
      label: 'Design Ops en productos regulados',
      headlineLead: 'Diseño que',
      headlineFocus: 'reduce el ruido.',
      valueProp: 'UX Lead · Design Ops en productos regulados — fintech y mobility.',
      specialties: ['Cumplimiento', 'Experiencias premium', 'Fintech', 'Mobility'],
      unifiedBanner: {
        groupLabel: '¿Qué buscas?',
        searchPlaceholder: 'Buscar casos, experiencia o revisión UX…',
        searchAriaLabel: 'Buscador inteligente del portafolio',
        suggestionsLabel: 'Sugerencias',
        noResults: 'Sin coincidencias — prueba otra palabra o cambia de línea.',
        tabs: {
          negocios: 'Negocios',
          contacto: 'Contacto',
          auditorias: 'Auditorías UX',
        },
        suggestions: [
          {
            id: 'negocios-demo',
            category: 'negocios',
            title: 'Demo X | CMS',
            hint: 'Del brief al prototipo publicado — Design Thinking y Sprint para campañas.',
            badge: 'Demo',
            keywords: ['demo', 'negocios', 'cms', 'sem', 'seo', 'caso', 'x cms', 'consultoría', 'leads'],
            href: 'section/consultoria/consultoria-demo',
          },
          {
            id: 'contacto-perfil',
            category: 'contacto',
            title: 'Experiencia y trayectoria',
            hint: 'Rol UX Lead, empresas y resultados en fintech regulado y mobility.',
            badge: 'Experiencia',
            keywords: ['perfil', 'cv', 'reclutadores', 'linkedin', 'experiencia', 'contacto', 'sem', 'trayectoria'],
            href: 'section/sobre-mi/experiencia',
          },
          {
            id: 'auditoria-freemium',
            category: 'auditorias',
            title: 'Revisar accesibilidad',
            hint: 'Checklist WCAG 2.2 AA y flujos críticos con evidencia documentada.',
            badge: 'Auditoría',
            keywords: ['auditoría', 'audit', 'freemium', 'leads', 'negocios', 'wcag', 'gratis', 'accesibilidad'],
            href: 'route/auditoria',
          },
        ] satisfies HeroSearchSuggestion[],
        panels: {
          negocios: {
            badge: 'Casos en producción',
            composerHint: 'Casos con proceso documentado, evidencia visual y resultados medibles.',
            description: 'Fintech regulado, mobility premium y Design Ops con métricas en producción.',
            highlights: ['Fintech regulado', 'Mobility premium', 'Design Ops'],
            metrics: [],
            ctaPrimary: 'Ver negocios',
            ctaSecondary: 'Proceso UX',
          },
          contacto: {
            badge: 'Experiencia profesional',
            composerHint: 'Trayectoria, CV y canal de contacto en un solo flujo.',
            description: 'UX Lead · remoto o híbrido · respuesta en menos de 24 h.',
            lead: 'Experiencia, empresas y formulario unificado.',
            highlights: ['CV descargable', 'Remoto / Híbrido', 'Contacto directo'],
            metrics: [],
            ctaPrimary: 'Ver experiencia',
            ctaSecondary: 'Ir a contacto',
          },
          auditorias: {
            badge: 'Revisión UX',
            composerHint: 'Checklist de accesibilidad y modalidades de consultoría con evidencia.',
            description:
              'Auditoría sin costo con WCAG 2.2 AA y privacidad por diseño.',
            highlights: ['WCAG 2.2 AA', 'Privacidad por diseño', 'Checklist incluida'],
            privacyNote:
              'Formularios vía relay propio — no almacenamos tus datos en servidores de terceros.',
            metrics: [],
            ctaPrimary: 'Iniciar revisión',
            ctaSecondary: 'Ver consultoría',
          },
        },
      },
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
      badge: 'Patrón UX · SURA Inversiones',
      subtitle:
        'Evidencia de producto — patrón de búsqueda predictiva, no un case study independiente.',
      intro:
        'Documento el patrón de autosuggest dentro del rediseño de SURA Inversiones: reducir fricción al encontrar fondos, mantener profundidad de datos financieros y cumplir WCAG 2.2 AA y compliance CMF.',
      metrics: [
        { value: '−45%', label: 'Tiempo de consulta de información' },
        { value: '+30%', label: 'Engagement usuarios retail' },
        { value: 'NPS 72', label: 'Mejora de 25 puntos vs. baseline' },
      ],
      sections: {
        challenge: {
          title: 'El desafío',
          body:
            'Los inversores necesitaban localizar fondos rápidamente sin perder contexto regulatorio ni métricas de riesgo. Un buscador genérico generaba abandono; un listado exhaustivo abrumaba.',
        },
        approach: {
          title: 'Enfoque UX',
          body: 'Combiné autosuggest semántico con capas de información progresiva:',
          items: [
            'Sugerencias por nombre, ISIN y categoría con estados vacío, carga y sin resultados',
            'Progressive disclosure: resumen en lista, detalle en panel lateral',
            'Jerarquía visual para riesgo, rentabilidad y horizonte sin saturar el primer pantallazo',
            'Teclado y lector de pantalla: navegación por flechas, aria-live en resultados',
          ],
        },
        outcomes: {
          title: 'Resultados',
          items: [
            'Menor tiempo hasta la primera acción de inversión',
            'Mayor confianza percibida en usuarios retail',
            'Handoff claro a desarrollo con estados de error y validación documentados',
          ],
        },
      },
      cta: 'Ver plataforma de inversiones',
      ctaSecondary: 'Explorar proceso UX Analytics',
      relatedProjectId: 'sura-inversiones-dashboard',
      processId: 'ux-analytics',
    },
    
    // About
    about: {
      badge: 'Sobre mí',
      title: 'Diseñador de Experiencias',
      subtitle: 'Idea + Cuerpo',
      description: 'UX Lead con +3 años transformando ideas en productos digitales. Mi enfoque combina pensamiento estratégico (Idea) con ejecución impecable (Cuerpo), creando experiencias que conectan con usuarios reales.',
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
      current: 'Actualidad',
      yearsAbbr: 'a',
      viewCases: 'Ver casos y evidencias',
      achievementsLabel: 'Logros principales',
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
      badge: 'Hablemos',
      title: 'Conversemos',
      description: 'Disponible para proyectos freelance y oportunidades full-time. Respuesta típica: menos de 24 h.',
      responseBadge: 'Respuesta típica: menos de 24 h',
      tabs: {
        assistant: 'Asistente',
        form: 'Escribir directo',
      },
      info: {
        title: 'Información de contacto',
        description: 'Disponible para proyectos freelance y oportunidades full-time',
        email: 'Email',
        modality: 'Modalidad',
        modalityValue: 'Remoto / Híbrido',
        follow: 'Sígueme en',
      },
      form: {
        title: 'Envíame un mensaje',
        description: 'Completa el formulario y te responderé en menos de 24 horas',
        name: 'Nombre',
        namePlaceholder: 'Tu nombre',
        email: 'Email',
        emailPlaceholder: 'tu@email.com',
        emailHint: 'Solo para responder tu consulta. No compartimos tu email.',
        message: 'Mensaje',
        messagePlaceholder: 'Cuéntame sobre tu proyecto o necesidad...',
        submit: 'Enviar mensaje',
        sending: 'Enviando...',
        consent:
          'Acepto que mis datos se usen solo para responder esta consulta (Ley 21.719).',
        consentPrivacyLink: 'política de privacidad',
        consentRequired: 'Debes aceptar el tratamiento de datos para enviar',
        validationError: 'Por favor corrige los errores en el formulario',
        success: '¡Mensaje enviado! Revisa tu email por la copia — respuesta en menos de 24 h.',
        successFallback: '¡Mensaje enviado! Revisa tu email por la copia — respuesta en menos de 24 h.',
        mailtoFallback: 'No pudimos enviar por el formulario',
        mailtoFallbackDesc: 'Abre tu cliente de correo con el mensaje listo para enviar.',
        mailtoAction: 'Abrir correo',
        errors: {
          nameRequired: 'El nombre es requerido',
          nameMin: 'El nombre debe tener al menos 2 caracteres',
          emailRequired: 'El email es requerido',
          emailInvalid: 'Por favor ingresa un email válido',
          messageRequired: 'El mensaje es requerido',
          messageMin: 'El mensaje debe tener al menos 10 caracteres',
        },
      },
      assistant: {
        title: 'Asistente Viento Norte',
        description: 'Te guío paso a paso para armar tu mensaje con contexto.',
        descriptionReady: 'Tu solicitud ya está armada. Confirma tus datos y envía.',
        typing: 'Escribiendo…',
        composeTitle: 'Revisa y envía',
        composeDescription: 'Edita el mensaje si quieres y confirma cómo contactarte.',
        draftBanner: {
          onboarding: 'Tu solicitud de consultoría está lista. Solo confirma nombre, email y consentimiento.',
          quoter: 'Tu cotización está lista. Solo confirma nombre, email y consentimiento.',
        },
        steps: {
          intent: '¿Qué te gustaría conversar?',
          recruiter: '¿Qué tipo de oportunidad?',
          consulting: '¿Qué necesitas resolver primero?',
          consultingDepth: '¿Qué profundidad buscas?',
          freelance: 'Cuéntame brevemente tu proyecto',
          other: '¿En qué puedo ayudarte?',
          contact: '¿Cómo te contacto?',
          review: 'Revisa tu mensaje antes de enviar',
          compose: 'Revisa tu mensaje, confirma tus datos y envía',
        },
        intents: {
          recruiter: 'Oportunidad laboral',
          consulting: 'Consultoría UX',
          freelance: 'Proyecto freelance',
          other: 'Otro',
        },
        recruiterModes: {
          fulltime: 'Posición full-time',
          contract: 'Contrato / proyecto',
          exploratory: 'Conversación exploratoria',
        },
        consultingPaths: {
          portfolio: 'Portfolio o presencia profesional',
          product: 'Producto digital (app / web)',
          team: 'Proceso UX del equipo',
          auditOnly: 'Diagnóstico y quick wins',
          full: 'Diagnóstico + implementación',
          early: 'Producto en etapa temprana',
          growth: 'Producto en crecimiento',
          scale: 'Escala / Design Ops',
        },
        industries: ['Fintech', 'Mobility', 'Enterprise', 'SaaS', 'Retail', 'Otro'],
        timelines: ['Inmediato', '1–2 semanas', '1 mes', 'Flexible'],
        goalPlaceholder: 'Ej.: mejorar conversión, auditar app regulada, estructurar Design Ops…',
        goalHint: 'Mínimo 20 caracteres',
        back: 'Atrás',
        continue: 'Continuar',
        send: 'Enviar mensaje',
        sending: 'Enviando…',
        editMessage: 'Puedes editar el mensaje antes de enviar',
        privacyNote:
          'Tus datos van a Google Forms (Viento Norte). Recibes copia por email; nos llega a contacto@vientonorte.cl — sin marketing.',
        success: '¡Listo! Te responderé en menos de 24 horas.',
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
      'sura-ia-automation-dashboard': {
        title: 'DEI Dashboard · Análisis con IA',
        company: 'SURA Investments',
        description:
          'POC Figma Sites: carga local de PDF, análisis DEI y flujos de automatización con estados de confianza para equipos de estrategia digital.',
        tags: ['AI', 'DEI', 'POC', 'Enterprise'],
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
          'Design system + discovery activo: −40% tiempo de reserva, +25% conversión y NPS 82 en mobility premium.',
        tags: ['Mobility', 'Design System', 'Premium'],
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
      cases: 'Proceso',
      process: 'Proceso UX',
      framework: 'Framework UX',
      about: 'Sobre mí',
      contact: 'Contacto',
      privacy: 'Privacidad',
      designSystem: 'Design System',
      audit: 'Auditoría',
      consulting: 'Consultoría',
      grafo: 'Grafo',
      autosuggest: 'Autosuggest Fondos',
      admin: 'Admin fotos',
      notFound: 'No encontrado',
    },

    privacyPage: {
      title: 'Política de Privacidad',
      updated: 'Última actualización: julio 2026',
      analytics: {
        title: 'Navegación y analytics',
        body:
          'Este sitio puede registrar eventos anónimos de navegación (páginas visitadas, clics en CTAs) solo si activas analytics en producción. No usamos cookies publicitarias ni vendemos datos.',
      },
      contact: {
        title: 'Formulario de contacto',
        body:
          'Si envías el formulario o el asistente, tu nombre, email y mensaje se transmiten por HTTPS a Google Forms (cuenta Viento Norte). Google puede enviarte copia de tu respuesta y notificarnos en contacto@vientonorte.cl (reenvío a gaete.gaona@gmail.com). No almacenamos esos datos en bases de datos del sitio ni los usamos para marketing. Base legal: consentimiento explícito (Ley 21.719).',
      },
      retention: {
        title: 'Conservación',
        body:
          'Los mensajes de contacto se conservan en el correo del responsable el tiempo necesario para responder y dar seguimiento comercial o profesional (máximo 12 meses salvo obligación legal).',
      },
      rights: {
        title: 'Tus derechos',
        body:
          'Puedes solicitar acceso, rectificación o eliminación de los datos que nos enviaste escribiendo a',
      },
      controller: {
        title: 'Responsable',
        body: 'Rodrigo Gaete Gaona · Viento Norte — Chile.',
      },
    },

    footer: {
      contact: 'Contacto',
      linkedin: 'LinkedIn',
      privacy: 'Privacidad',
      uxtools: 'UX Tools',
      copyright: 'Rodrigo Gaete Gaona · UX Lead',
      tagline: 'Diseñado con atención al detalle y accesibilidad.',
    },

    errors: {
      companyNotFound: 'No encontramos esa empresa.',
      projectNotFound: 'No encontramos ese proyecto.',
      processNotFound: 'Proceso no encontrado',
      pageNotFound: 'No encontramos esta página.',
      backToProjects: 'Volver a negocios',
      backToHome: 'Volver al inicio',
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
      toolCategories: 'Categorías',
      toolCategoriesTitle: 'Herramientas y enfoques de análisis',
      toolCategoriesSubtitle:
        'Taxonomía por categoría y subcategoría: cuantitativo, cualitativo, etnográfico, plataformas y IA asistida.',
      tools: 'Herramientas',
      benefits: 'Beneficios',
      relatedProjects: 'Proyectos donde apliqué esto',
      backToCaseStudies: 'Volver a Case Studies',
      viewProject: 'Ver proyecto',
      realCases: 'Casos reales',
      relatedSubtitle: 'Proyectos donde apliqué {process} con resultados medibles',
      viewAllProjects: 'Ver todos los negocios',
      viewExternalProof: 'Ver evidencia externa',
    },
};

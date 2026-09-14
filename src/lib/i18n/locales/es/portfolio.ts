export const homeTeaser = {
      badge: 'Negocios',
      title: 'Impacto por empresa',
      description:
        'SURA, Transvip y Karri en fintech y mobility. Design system, discovery y métricas en el hub completo.',
      ctaNegocios: 'Ver todos los negocios',
      ctaProceso: 'Ver proceso UX',
    };

export const aboutTeaser = {
      badge: 'Sobre mí',
      title: 'UX Lead regional · Fintech & Mobility',
      lead:
        'De Senior Product Designer en Transvip/Karri a UX Lead en SURA Investments (Wealth, 5+ países). Mismo estándar de método: research, Design Ops, design system y resultados medibles.',
      detail:
        'Marcas en el relato: SURA Investments · Transvip · Karri · Valuesite · Havas/Claro · Walmart · Maraña · docencia en Desafío Latam. No solo logos — contexto, rol y evidencia por etapa.',
      brandsLabel: 'Marcas y contextos',
      // Chips = relato sin wordmark en fila de logos (SURA/Transvip/Karri van como logos)
      brands: [
        'Valuesite',
        'Havas / Claro',
        'Walmart',
        'Maraña',
        'Desafío Latam',
      ],
      cta: 'Ver trayectoria completa',
    };

export const upcomingCases = {
      badge: 'Próximamente',
      title: 'Casos en preparación',
      description: 'Evidencia visual y métricas en curso para ampliar el hub de negocios.',
      status: 'Evidencia en curso',
      openFigma: 'Abrir en Figma',
    };

export const autosuggestPage = {
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
    };

export const about = {
      badge: 'Sobre mí',
      title: 'UX Manager · Viento Norte',
      subtitle: '7+ años craft · 3+ lead mobility→wealth',
      description:
        'Hoy UX Manager en Viento Norte (n2n) y AI Trainer en micro1. Antes UX Lead en SURA Investments (Wealth, 5+ países, hasta jun. 2026). Research, Design Sprints, design system y −40% onboarding.',
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
    };

export const projects = {
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
    };

export const experience = {
      badge: 'Trayectoria',
      title: 'Experiencia Profesional',
      description:
        'Relato por etapa: contexto, rol e impacto — de agencia y retail a fintech y mobility regional.',
      current: 'Actualidad',
      yearsAbbr: 'a',
      viewCases: 'Ver casos y evidencias',
      achievementsLabel: 'Logros principales',
      contextLabel: 'Contexto',
      roleLabel: 'Rol',
      impactLabel: 'Impacto',
      evidenceLabel: 'Evidencia',
    };

export const skills = {
      badge: 'Habilidades',
      title: 'Skills & Herramientas',
      description: 'Tecnologías y metodologías que domino para crear experiencias excepcionales.',
      categories: {
        design: 'Diseño UX/UI',
        research: 'Research & Testing',
        tools: 'Herramientas',
        development: 'Frontend',
      },
    };

export const common = {
      viewMore: 'Ver más',
      viewLess: 'Ver menos',
      loading: 'Cargando...',
      error: 'Algo salió mal',
      backToTop: 'Volver arriba',
      visitProject: 'Visitar proyecto',
    };

export const projectsList = {
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
    };

export const projectsHub = {
      otherProjects: 'Otros proyectos',
      otherProjectsDesc: 'Proyectos independientes y frameworks desarrollados',
      featuredProjects: 'Proyectos destacados',
      frameworkButton: 'Cómo trabajé: Los 5 procesos UX',
    };

export const breadcrumbs = {
      home: 'Inicio',
      projects: 'Negocios',
      cases: 'Proceso',
      process: 'Proceso UX',
      framework: 'Framework UX',
      about: 'Sobre mí',
      contact: 'Contacto',
      privacy: 'Privacidad',
      news: 'News',
      designSystem: 'Design System',
      audit: 'Auditoría',
      consulting: 'Consultoría',
      grafo: 'Grafo',
      autosuggest: 'Autosuggest Fondos',
      admin: 'Admin',
      notFound: 'No encontrado',
    };

export const privacyPage = {
      badge: 'Privacy by design',
      title: 'Datos justos. Ruido cero.',
      lead:
        'Tratamos lo mínimo para responderte. Sin cookies publicitarias, sin venta, sin cuenta obligatoria. Ley 21.719.',
      updated: 'Actualizado: 24 ago 2026',
      principles: [
        {
          title: 'Minimización',
          body: 'Nombre, email y mensaje solo si tú los envías. Nada más por defecto.',
        },
        {
          title: 'Finalidad',
          body: 'Responder tu consulta o kickoff. No perfilamos para ads.',
        },
        {
          title: 'Control',
          body: 'Acceso, rectificación, supresión, oposición, portabilidad y limitación: un mail.',
        },
        {
          title: 'Sin venta',
          body: 'No vendemos datos. No hay cookies publicitarias.',
        },
      ],
      inventoryTitle: 'Qué tratamos en este sitio',
      inventoryHint:
        'El formulario, el asistente o una tool de agente envían por HTTPS al Worker (Cloudflare) y a Google Forms. Analytics de página solo si está activo en producción (p. ej. GTM en /s/consultoria).',
      inventoryHead: ['Dato', 'Para qué', 'Base legal', 'Retención'],
      inventoryRows: [
        {
          data: 'Nombre, email, mensaje',
          purpose: 'Responder y dar seguimiento',
          basis: 'Consentimiento (Ley 21.719)',
          keep: 'Hasta 12 meses, salvo obligación legal',
        },
        {
          data: 'Eventos de página (si analytics on)',
          purpose: 'Mejorar el sitio',
          basis: 'No hay cookies publicitarias; eventos anónimos',
          keep: 'Agregado, sin vender',
        },
      ],
      notTitle: 'Qué no hacemos',
      notItems: [
        'Cookies publicitarias ni pixel de ads en esta política.',
        'Vender o ceder datos para marketing de terceros.',
        'Exigir una cuenta para leer el sitio.',
        'Mezclar el tablero de Polijuego con el formulario de consultoría.',
      ],
      rightsTitle: 'Tus derechos (ARSOPL)',
      rightsLead:
        'Escríbenos a contacto@vientonorte.io. Plazo de respuesta: 15 días hábiles.',
      rights: [
        { label: 'Acceso' },
        { label: 'Rectificación' },
        { label: 'Supresión' },
        { label: 'Oposición' },
        { label: 'Portabilidad' },
        { label: 'Limitación' },
      ],
      appTitle: 'App R.A.D.A.R. El Polijuego',
      appBody:
        'El juego nativo no usa esta página. Tablero en el teléfono, vault AES-256-GCM, cero red de contenido, purge in-app.',
      appCta: 'Ver política de la app',
      controllerTitle: 'Responsable',
      controllerBody: 'Rodrigo Gaete Gaona · Viento Norte — Chile.',
    };

export const footer = {
      contact: 'Contacto',
      linkedin: 'LinkedIn',
      privacy: 'Privacidad',
      uxtools: 'UX Tools',
      copyright: 'Rodrigo Gaete Gaona · UX Lead',
      tagline: 'Diseñado con atención al detalle y accesibilidad.',
    };

export const errors = {
      companyNotFound: 'No encontramos esa empresa.',
      projectNotFound: 'No encontramos ese proyecto.',
      processNotFound: 'Proceso no encontrado',
      pageNotFound:
        'No encontramos esta página. En esta SPA el código 404 es de la app (no del servidor).',
      backToProjects: 'Volver a negocios',
      backToHome: 'Volver al inicio',
      back: 'Volver',
      imageNotFound: 'Imagen no encontrada',
      serverError: 'Error del servidor de la app',
      contentUnavailable: 'Contenido no disponible',
    };

export const mockups = {
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
      swipeHint: 'Toca para ampliar',
      expand: 'Ampliar imagen',
      galleryAria: 'Captura destacada del proyecto',
      viewOf: 'Vista {current} de {total}',
      moreCaptures: 'Ver {n} capturas más',
      showFeaturedOnly: 'Solo la principal',
    };

export const processDetail = {
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
    };


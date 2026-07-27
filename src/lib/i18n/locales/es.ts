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
      /** Label dock liquid (sin ✦ — isologo es el único glifo) */
      consultingDock: 'Consultoría',
      consultingDockAria: 'Consultoría Viento Norte',
      bottomNav: 'Navegación inferior',
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
            'Tokens Figma-ready (Tokens Studio, W3C, CSS), marca RG minimalista, superficies matte y patrones de evidencia medible del portafolio Lead UX.',
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
            'Entrada gratis a Diagnóstico: WCAG 2.2 AA de un flujo crítico. Prototipo, proceso de equipo o app funcional. Pymes · kickoff <24 h.',
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
    },

    upcomingCases: {
      badge: 'Próximamente',
      title: 'Casos en preparación',
      description: 'Evidencia visual y métricas en curso para ampliar el hub de negocios.',
      status: 'Evidencia en curso',
    },

    uxAuditBanner: {
      badge: 'Gratis · Radar · pymes',
      titleLead: 'Entrada gratis a Radar:',
      titleAccent: 'WCAG 2.2 AA',
      description:
        'Revisión WCAG 2.2 AA de un flujo crítico. Si aplica, conversemos el Diagnóstico express completo (Radar, 5–7 días). Para pymes que quieren mejorar sin fricción.',
      highlights: ['Gratis', 'WCAG 2.2 AA', '1 flujo crítico', 'Radar 5–7 días'],
      ctaPrimary: 'Agendar entrada gratis',
      ctaSecondary: 'Ver consultoría',
      metrics: {
        a11y: 'Accesibilidad',
        priority: 'Prioridad',
        recruiter: 'Test reclutador',
      },
      panelNote: 'Lead magnet SEM: entrada a Radar → upsell diagnóstico express.',
    },

    valueArsenal: {
      badge: 'Prueba social navegable',
      title: 'Evidencia que puedes abrir ahora',
      description:
        'Demos Figma, POCs live, casos SURA/Transvip/Karri y método UX documentado. Cada pieza enlaza a una modalidad de consultoría — explora antes de reservar.',
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
      viewProof: 'Abrir evidencia',
      bundleFit: 'Modalidad',
      bundleStripTitle: '¿Listo para el kickoff?',
      bundleStripDescription:
        'Elige modalidad o deja que el árbol te recomiende. Sin precios públicos — alcance y propuesta en la primera sesión (<24 h hábiles).',
      bundleStripBadge: 'Conversión · SEM/SEO',
      bundleCta: 'Iniciar onboarding',
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
      previewNote: 'El precio y el detalle se cierran en el kickoff.',
      recommended: 'Recomendada',
      back: 'Atrás',
      next: 'Continuar',
      stickyCta: 'Empezar',
      entry: {
        selectedPackage: 'Modalidad elegida:',
        changePackage: 'Cambiar',
      },
      landing: {
        badge: 'Viento Norte · pymes',
        principleBadge: 'Consultoría UX',
        title: 'Tecnología para empresas.',
        titleAccent: 'Elige tu alcance.',
        description:
          'Diagnóstico, prototipo, proceso de equipo o app funcional.',
        transparencyLine:
          'Entrada gratis a Diagnóstico: revisión WCAG 2.2 AA de un flujo crítico. Si aplica, conversemos el Diagnóstico completo (5–7 días).',
        ctaPrimary: 'Empezar',
        ctaSecondary: 'Ver opciones',
        /** Free a11y — con agenda: copy de Calendar; sin agenda: mensaje */
        ctaFreeLink: 'Revisión gratis de un flujo crítico',
        ctaFreeLinkSchedule: 'Reservar 30 min gratis en Google Calendar',
        ctaFree: 'Pedir revisión gratis',
        trustLine: 'Respuesta en menos de 24 h',
        trustChips: ['Respuesta <24 h', '5–7 días', 'Sin precios en la web'],
        segmentsLabel: '¿Qué necesitas?',
        segmentsHint: 'Un clic = servicio y lo que te llevas.',
        segments: {
          diagnostic: {
            title: 'Diagnóstico',
            hint: 'Informe + plan · 5–7 días',
            cta: 'Empezar Diagnóstico',
          },
          prototype: {
            title: 'Prototipo',
            hint: 'Pantallas listas para construir',
            cta: 'Empezar Marco',
          },
          process: {
            title: 'Proceso de equipo',
            hint: 'Guía de cómo diseñan y entregan',
            cta: 'Empezar Ops',
          },
          app: {
            title: 'App de punta a punta',
            hint: 'Idea → app en uso',
            cta: 'Hablar de mi app',
          },
        },
        techLayerLabel: 'Referencias',
        techLayerTitle: 'De dónde viene el método',
        techLayerDescription: 'Aplicado en SURA, Transvip y Karri; aquí a escala pyme.',
        techPatterns: [
          {
            source: 'SURA',
            pattern: 'Onboarding claro',
            forYou: 'Menos abandono al empezar.',
          },
          {
            source: 'Transvip',
            pattern: 'Sistema de diseño',
            forYou: 'Pantallas listas para construir.',
          },
          {
            source: 'Karri',
            pattern: 'Métricas de uso',
            forYou: 'Sabes si la gente entiende el producto.',
          },
        ],
        metrics: [
          { value: '3', label: 'Modalidades' },
          { value: '−40%', label: 'Onboarding SURA' },
          { value: 'NPS 72', label: 'SURA' },
          { value: '<24 h', label: 'Respuesta' },
        ],
        nav: {
          n2n: 'Método',
          private: 'Datos',
          education: 'Educación',
          practices: 'Prácticas',
          packages: 'Modalidades',
          start: 'Empezar',
          startAria: 'Empezar: ir al kickoff de consultoría',
          evidence: 'Ejemplos',
          contact: 'Contacto',
          fit: 'Presupuesto',
          ariaLabel: 'Embudo de consultoría',
        },
      },
      n2n: {
        badge: 'Cómo trabajamos',
        title: 'Del problema al entregable',
        description:
          'Cinco pasos: entender, explorar, probar, prototipar y entregar. Si el entregable es una app, coordinamos el desarrollo hasta producción.',
        caseBadge: 'Ejemplo abierto',
        caseTitle: 'X | CMS',
        caseDescription: 'Demo del método: idea → prueba → prototipo listo para construir.',
        ctaDemo: 'Ver demo',
        ctaSection: 'Ver en la página',
        ctaOnboarding: 'Empezar',
      },
      privateTooling: {
        badge: 'Si te aplica',
        title: '¿Tus datos no pueden salir de tu empresa?',
        description:
          'Misma consultoría (diagnóstico o prototipo), hecha en tu entorno: sin colgar información sensible en herramientas públicas.',
        antiPromise:
          'No es un servicio legal ni un “app en 24 h”. Es el mismo trabajo de UX, con más cuidado del dato.',
        layers: [
          {
            title: 'En tu espacio',
            body: 'Trabajamos con tu repo y tus reglas de acceso.',
          },
          {
            title: 'Menos datos expuestos',
            body: 'Solo lo necesario. Nada a modelos públicos sin acuerdo.',
          },
          {
            title: 'Offline si hace falta',
            body: 'El flujo crítico puede vivir sin internet, o con un plan claro.',
          },
          {
            title: 'Usable',
            body: 'Pantallas claras y accesibles en lo que entregamos.',
          },
        ],
        dodTitle: 'Qué te llevas',
        dod: [
          'Diagnóstico o prototipo documentado',
          'Entrega en tu repositorio',
          'Lista práctica de cuidados de dato (no dictamen legal)',
        ],
        faqTitle: 'Preguntas frecuentes',
        faq: [
          {
            q: '¿Es otro pack?',
            a: 'No. Es el diagnóstico o el prototipo, con la condición de entorno privado.',
          },
          {
            q: '¿Reemplaza a un abogado o DPO?',
            a: 'No. Tú sigues siendo responsable del tratamiento de datos.',
          },
          {
            q: '¿La IA ve mis datos?',
            a: 'Por defecto no. Preferimos opciones locales o privadas.',
          },
        ],
        skuBadge: 'Datos sensibles',
        skuTitle: 'Empieza por diagnóstico o prototipo',
        skuDescription:
          'Si el proyecto es sensible, lo marcamos en el kickoff. Eliges Radar (rápido) o Marco (prototipo).',
        legalNote: 'No es asesoría legal.',
        ctaPrimary: 'Prototipo en entorno privado',
        ctaSecondary: 'Solo diagnóstico',
        ctaN2N: 'Ver método',
      },
      practices: {
        badge: 'Playbook',
        title: 'Prácticas de calidad',
        description: 'Criterios cortos que usamos en cada entrega.',
        filterAria: 'Filtrar prácticas',
        filterAll: 'Todas',
        showing: '{count} prácticas',
        showingCount: '{visible} de {total}',
        loadMore: 'Ver más',
        showLess: 'Ver menos',
        checklistLabel: 'Lista',
        validationLabel: 'Cómo se comprueba',
        footnoteTitle: 'Nota',
        footnote: 'El playbook vive fuera del camino principal de la landing para no saturar.',
      },
      packagesSection: {
        badge: 'Cómo se contrata',
        title: 'Tres formatos + app si la necesitas',
        description:
          'Elige diagnóstico, prototipo o proceso de equipo. Si necesitas una app en producción, usa la franja de abajo.',
        deliverablesLabel: 'Incluye',
        cta: 'Empezar',
        ctaForm: 'Escribir',
        note: 'Sin precios en la web: se cierran en el kickoff.',
        freeStripBadge: 'Gratis · entrada a Diagnóstico',
        freeStripTitle: 'Revisión gratis de un flujo crítico',
        freeStripBody:
          'Miramos un flujo de alto impacto (onboarding, pago o acceso). Si aplica, el Diagnóstico completo son 5–7 días.',
        freeStripCta: 'Pedir revisión gratis',
        freeStripCtaSchedule: 'Reservar 30 min gratis',
        freeStripSecondary: 'Diagnóstico completo (5–7 días)',
        appStripTitle: 'App de punta a punta',
        appStripBody:
          'De la idea a la app en uso: experiencia, diseño y desarrollo bajo un solo interlocutor — Viento Norte.',
        appStripCta: 'Hablar de mi app',
      },
      educationPartner: {
        badge: 'Educación',
        partnerLabel: 'Proyectos educativos',
        title: 'UX para programas de educación',
        description: 'Diseño de experiencia de aprendizaje y entrega a desarrollo.',
        highlights: [
          'Experiencia de aprendizaje',
          'Del brief al prototipo',
          'Entrega a desarrollo',
          'Accesible',
        ],
        ctaLead: 'Videollamada de 25–30 min, sin compromiso.',
        ctaPrimary: 'Agendar llamada',
        ctaSecondary: 'Seguir en la web',
        note: 'Si hay agenda, se abre en otra pestaña. Si no, te llevamos a contacto.',
      },
      steps: {
        welcome: 'Bienvenida',
        package: 'Modalidad',
        context: 'Proyecto',
        summary: 'Contacto',
      },
      welcome: {
        title: 'Empecemos',
        description: 'Cuatro pasos cortos. Eliges entregable y dejamos el mensaje listo.',
        points: [
          'Diagnóstico · Prototipo · Proceso · App de punta a punta',
          'App en uso: un solo interlocutor de idea a release',
          'Respuesta en menos de 24 h hábiles',
        ],
      },
      context: {
        industry: 'Industria',
        timeline: 'Plazo',
        goal: '¿Qué quieres lograr?',
        goalPlaceholder:
          'Ej.: diagnóstico del sitio, prototipo de onboarding, proceso del equipo, app funcional…',
        goalHint: 'Al menos 20 caracteres.',
      },
      summary: {
        note: 'Al confirmar, pasas a contacto en esta misma página con el mensaje y el título VN listos.',
        cta: 'Continuar a contacto',
      },
      treePreview: {
        badge: 'Ayuda rápida',
        title: '¿Qué entregable te sirve?',
        description: 'Una o dos preguntas. Sin precios: solo orientación.',
        pathLabel: 'Tu ruta',
        reset: 'Empezar de nuevo',
        previewOnly: 'Vista previa',
        cta: 'Continuar con esta',
      },
      demo: {
        badge: 'Referencias',
        title: 'Pantallas de referencia',
        description:
          'Dashboard CMS, consultoría GEES, casos SURA / Transvip / Karri y campañas. También social media y optimización de ads.',
        cta: 'Ver pantalla',
        ctaSecondary: 'Conversar',
        ctaMakeLink: 'Archivo editable (opcional)',
        previewCta: 'Ampliar',
        items: {
          'x-cms-n2n': {
            projectName: 'CMS · Dashboard',
            approach:
              'Vista de panel del CMS: operación de contenidos y estructura en un solo lugar.',
            highlights: ['Dashboard', 'CMS', 'Contenidos'],
            embedTitle: 'CMS · Dashboard',
          },
          'gees-propuesta': {
            projectName: 'GEES · Consultoría',
            approach:
              'Propuesta de consultoría con dashboard de cotización y KPIs para decidir con stakeholders.',
            highlights: ['Consultoría', 'Cotización', 'KPIs', 'Stakeholders'],
            embedTitle: 'GEES · Consultoría',
          },
          'sura-onboarding': {
            projectName: 'SURA · Onboarding',
            approach:
              'Caso en producción: onboarding de inversiones con menos fricción y métricas en Wealth.',
            highlights: ['Fintech', 'Onboarding', '−40%', 'Enterprise'],
            embedTitle: 'SURA · Onboarding',
          },
          'transvip-app': {
            projectName: 'Transvip · App',
            approach:
              'Producto mobility: app y design system con handoff claro a desarrollo.',
            highlights: ['Mobility', 'App', 'Design system'],
            embedTitle: 'Transvip · App',
          },
          'karri-shoppers': {
            projectName: 'Karri · Shoppers',
            approach:
              'Activación y engagement de shoppers con narrativa clara y métricas de producto.',
            highlights: ['+35% activación', '+58% engagement', 'Mobility'],
            embedTitle: 'Karri · Shoppers',
          },
          'ads-campaigns': {
            projectName: 'Social & ads',
            approach:
              'Gestión de redes, optimización de ads y campañas (SEM/paid) alineadas a UX y conversión. Capacidad Viento Norte.',
            highlights: ['Social media', 'Ads', 'Campañas', 'Conversión'],
            embedTitle: 'Social & ads',
          },
          'edu21-edu': {
            projectName: 'Edu 21 · Educación',
            approach:
              'Estrategia y pitch de producto educativo: heurística, benchmark y narrativa comercial.',
            highlights: ['Educación', 'Estrategia', 'Pitch'],
            embedTitle: 'Edu 21',
          },
        },
      },
      appQuoter: {
        badge: 'Presupuesto',
        title: '¿Qué cabe en tu presupuesto?',
        description:
          'Estima consultoría UX y entregables. App funcional = diseño VN + build con red (no tarifa de agencia a ciegas).',
        disclaimer:
          'Orientación. El alcance se cierra en kickoff. CLP por defecto. App no es “solo pantallas”: incluye red de implementación si la eliges.',
        currencyLabel: 'Moneda',
        currencies: {
          CLP: 'CLP · Peso chileno',
          UF: 'UF',
          USD: 'USD',
        },
        fxNote: 'Tasas de referencia (no en vivo).',
        budgetLabel: 'Presupuesto',
        budgetPresetsLabel: 'Montos frecuentes',
        expectationLabel: '¿Qué entregable necesitas?',
        networkNote:
          'App funcional: diseño y alcance con Viento Norte; programación con red bajo dirección VN. Se cierra en kickoff.',
        tiers: {
          prototype: {
            label: 'Diagnóstico / prototipo corto',
            hint: '5–7 días · Radar',
            deliverable: 'Informe o prototipo acotado + plan',
            includes: [
              'Entender el problema',
              'Prototipo o hallazgos prioritarios',
              'Plan de siguientes pasos',
            ],
          },
          web: {
            label: 'Sitio / prototipo web',
            hint: 'Marco · multipágina',
            deliverable: 'Diseño listo para construir',
            includes: [
              'Pantallas clave',
              'Mobile y desktop',
              'Entrega a desarrollo',
            ],
          },
          app: {
            label: 'App funcional',
            hint: 'Diseño VN · build con red',
            deliverable: 'App que funciona — diseño + implementación con red',
            includes: [
              'Flujos y prototipo mobile',
              'Alcance de diseño con VN',
              'Build con especialistas bajo dirección VN',
            ],
          },
          enterprise: {
            label: 'Proceso de equipo',
            hint: 'Ops · 4–6 semanas',
            deliverable: 'Guía del equipo + proceso',
            includes: [
              'Talleres con el equipo',
              'Guía de proceso',
              'Cómo medir adopción',
            ],
          },
        },
        fit: {
          comfortable: 'Bien',
          viable: 'Alcanzable',
          tight: 'Justo',
          gap: 'Corto',
        },
        result: {
          alignment: 'Ajuste presupuesto · expectativa',
          affordableTitle: 'Con este presupuesto puedes',
          increaseHint: 'Para el alcance elegido, conviene subir inversión aprox. {low}–{high}%.',
          summary: {
            comfortable: 'Tu presupuesto cubre bien este alcance.',
            viable: 'El presupuesto calza. Cerremos detalles en el kickoff.',
            tight: 'Es justo. Mejor acotar o ir por fases.',
            gap: 'El presupuesto no alcanza. Empieza por diagnóstico o prototipo, o revisa la inversión.',
          },
        },
        cta: 'Ir al kickoff',
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
        groupLabel: '¿Qué necesitas?',
        searchPlaceholder: 'Buscar casos, experiencia o revisión UX…',
        searchAriaLabel: 'Buscador inteligente del portafolio',
        suggestionsLabel: 'Sugerencias',
        noResults: 'Sin coincidencias — prueba otra palabra o cambia de línea.',
        liveSuggestionsCount: '{{count}} sugerencias disponibles',
        liveSuggestionsActive: '{{count}} sugerencias. {{title}}, {{hint}}',
        tabs: {
          negocios: 'Empresas',
          contacto: 'Reclutadores',
          auditorias: 'Auditoría',
        },
        suggestions: [
          {
            id: 'reclutadores-cx',
            category: 'contacto',
            title: 'Experiencia y CX',
            hint: 'Perfil UX Lead, impacto y trayectoria en fintech y mobility.',
            badge: 'Reclutadores',
            keywords: [
              'cx',
              'reclutadores',
              'recruiter',
              'perfil',
              'cv',
              'linkedin',
              'experiencia',
              'talento',
            ],
            href: 'section/sobre-mi/experiencia',
          },
          {
            id: 'consultoria-viento-norte',
            category: 'negocios',
            title: 'Consultoría Viento Norte',
            hint: 'Método de producto regulado a escala pyme. Radar · Marco · Ops.',
            badge: 'Empresas',
            keywords: [
              'consultoría',
              'viento norte',
              'empresas',
              'negocios',
              'design ops',
              'leads',
              'demo',
              'pyme',
              'modalidades',
            ],
            href: 'route/consultoria',
          },
          {
            id: 'auditoria-accesibilidad',
            category: 'auditorias',
            title: 'Entrada gratis a Radar',
            hint: 'WCAG 2.2 AA de un flujo crítico. Si aplica, Radar completo 5–7 días.',
            badge: 'Gratis · Radar · pymes',
            keywords: [
              'auditoría',
              'gratis',
              'gratuita',
              'accesibilidad',
              'wcag',
              'wcag 2.2',
              'aa',
              'agendar',
              'freemium',
              'radar',
              'diagnóstico',
              'express',
              'leads',
              'pyme',
              'sem',
            ],
            href: 'route/radar-gratis',
          },
        ] satisfies HeroSearchSuggestion[],
        panels: {
          negocios: {
            badge: 'Empresas',
            composerHint: 'Viento Norte para pymes: diagnóstico, prototipo, proceso o app.',
            description:
              'Consultoría UX. Entrada gratis a Radar (WCAG 2.2 AA de un flujo). Kickoff <24 h.',
            highlights: ['Gratis · Radar', 'Prototipo', 'App con red'],
            metrics: [],
            ctaPrimary: 'Ver consultoría',
            ctaSecondary: 'Entrada gratis',
          },
          contacto: {
            badge: 'Reclutadores',
            composerHint: 'Trayectoria, CV y prueba social para hiring managers.',
            description: 'UX Lead · remoto o híbrido · respuesta en menos de 24 h.',
            lead: 'Experiencia, empresas y canal de contacto.',
            highlights: ['CV descargable', 'Remoto / Híbrido', 'LinkedIn'],
            metrics: [],
            ctaPrimary: 'Ver experiencia',
            ctaSecondary: 'Ir a contacto',
          },
          auditorias: {
            badge: 'Gratis · Radar · pymes',
            composerHint:
              'Entrada gratis a Radar (Diagnóstico express): revisión WCAG 2.2 AA de un flujo crítico.',
            description:
              'Si aplica, conversemos el Radar completo (5–7 días). Lead magnet SEM para pymes — no es un 4º producto.',
            highlights: ['WCAG 2.2 AA', '1 flujo crítico', 'Gratis', 'Radar 5–7 días'],
            privacyNote:
              'Formularios vía relay propio — no almacenamos tus datos en servidores de terceros.',
            metrics: [],
            ctaPrimary: 'Agendar entrada gratis',
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
      linkedInCta: 'Ver perfil en LinkedIn',
      linkedInHref: 'https://www.linkedin.com/in/rodrigo-gaete-ux/',
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
      title: '3+ años. 2 verticales. Impacto regional.',
      subtitle: 'Lead UX · Fintech & Mobility',
      description:
        'De Senior Product Designer en Transvip/Karri a UX Lead en SURA Investments (Wealth, 5+ países). Research, Design Sprints, design system y resultados medibles — incluido −40% onboarding.',
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
      /** Agenda Google free a11y — bloque visible en #contacto */
      freeSchedule: {
        badge: 'Disponible ahora',
        title: 'Agenda Google · 30 min gratis',
        body: 'Revisión de un flujo crítico. Elige horario en Calendar de Viento Norte.',
        cta: 'Abrir agenda online',
      },
      /** Superficie embudo /consultoria — sin reclutador/freelance en el framing */
      consultingSurface: {
        badge: 'Viento Norte · pymes',
        title: 'Escribe y cerramos alcance',
        description:
          'Cierre del embudo: diagnóstico, prototipo, proceso o app. Respuesta en menos de 24 h hábiles.',
        responseBadge: 'Respuesta <24 h hábiles',
        infoTitle: 'Contacto consultoría',
        infoDescription: 'Consultoría UX para pymes · remoto o híbrido',
        assistantTitle: 'Asistente de consultoría',
        assistantDescription:
          'Ya estás en consultoría. Elegimos el foco y armamos el mensaje.',
      },
      tabs: {
        assistant: 'Asistente',
        form: 'Escribir directo',
        preferForm: 'Prefiero el formulario clásico',
        preferAssistant: 'Volver al asistente guiado',
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
          'partner-edu':
            'Mensaje listo para agendar videollamada como partner de desarrollo en proyectos educativos. Confirma nombre, email y consentimiento.',
          cta: 'Tu mensaje está listo. Confirma nombre, email y consentimiento para enviarlo.',
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
      swipeHint: 'Toca para ampliar',
      expand: 'Ampliar imagen',
      galleryAria: 'Captura destacada del proyecto',
      viewOf: 'Vista {current} de {total}',
      moreCaptures: 'Ver {n} capturas más',
      showFeaturedOnly: 'Solo la principal',
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

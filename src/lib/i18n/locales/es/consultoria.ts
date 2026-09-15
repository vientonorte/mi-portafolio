export const consultoria = {
      progressLabel: 'Onboarding',
      previewOnly: 'Vista previa',
      previewNote: 'El precio y el detalle se cierran en el kickoff.',
      recommended: 'Recomendada',
      back: 'Atrás',
      next: 'Continuar',
      stickyCta: 'Agendar',
      entry: {
        selectedPackage: 'Modalidad elegida:',
        changePackage: 'Cambiar',
      },
      landing: {
        badge: 'Viento Norte · pymes',
        principleBadge: 'Diseño que reduce el ruido',
        opsLabel: 'Operaciones digitales',
        xcmsLabel: 'X|CMS',
        xcmsCaption: 'X|CMS · demo 5 min',
        ctaDemo: 'Ver demo X|CMS',
        ctaPrototype: 'Ver prototipo',
        title: 'Tecnología para empresas.',
        titleAccent: '',
        description:
          'Operaciones digitales y el flujo que usa tu cliente, en su CMS o CRM. Diagnóstico 5–7 días. Gratis: accesibilidad WCAG 2.2 AA de un flujo. Kickoff 30 min.',
        transparencyLine:
          'Entrada gratis a Diagnóstico: revisión WCAG 2.2 AA de un flujo crítico. Si aplica, conversemos el Diagnóstico completo (5–7 días).',
        ctaPrimary: 'Agendar en Google Calendar',
        ctaSecondary: 'Ver opciones',
        ctaFreeA11y: 'Gratis · accesibilidad',
        /** Free a11y — con agenda: copy de Calendar; sin agenda: mensaje */
        ctaFreeLink: 'Revisión gratis de un flujo crítico',
        ctaFreeLinkSchedule: 'Reservar 30 min gratis en Google Calendar',
        ctaFree: 'Pedir revisión gratis',
        trustLine: 'Respuesta en menos de 24 h',
        trustChips: ['Respuesta <24 h', 'Kickoff 30 min', 'Sin precios en la web'],
        storyLabel: 'Contexto de valor',
        storyTiles: [
          {
            id: 'flujo',
            label: 'Personas',
            title: 'Revisión de un flujo',
            hint: 'Gratis: WCAG 2.2 AA del flujo que ya usa tu cliente.',
            alt: 'Dos personas revisan en un portátil el flujo de un formulario con checklist de accesibilidad.',
          },
          {
            id: 'reserva',
            label: 'Personas',
            title: 'El flujo que reserva',
            hint: 'Onboarding, pago o agenda: el paso donde se pierde gente.',
            alt: 'Cliente usando el flujo de reserva en un portátil, en su contexto de trabajo.',
          },
          {
            id: 'stack',
            label: 'Tecnología',
            title: 'En su CMS o CRM',
            hint: 'El sistema que ya tienen. Integramos el flujo, no cambiamos de casa.',
            alt: 'Portátil con CMS y monitor con checkout: el flujo vive en su stack.',
          },
          {
            id: 'diagnostico',
            label: 'Tecnología',
            title: 'Diagnóstico 5–7 días',
            hint: 'Informe + plan. Precio en el kickoff de 30 min.',
            alt: 'Pantalla de diagnóstico UX con hallazgos priorizados sobre el flujo.',
          },
        ],
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
            cta: 'Empezar Prototipo',
          },
          process: {
            title: 'Proceso de equipo',
            hint: 'Guía de cómo diseñan y entregan',
            cta: 'Empezar Proceso',
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
        onboarding: {
          badge: 'Empezar',
          titleEmpty: 'Elige un alcance y agenda',
          titlePack: 'Kickoff 30 min · {name}',
          bodyEmpty:
            'Diagnóstico, prototipo o proceso. 30 min en Calendar o un mail con el motivo.',
          bodyPack: 'Precio en la llamada. Un solo CTA arriba: Agendar 30 min.',
          packLabel: 'Modalidad',
          ctaCalendar: 'Agendar 30 min',
          ctaMail: 'Escribir por mail',
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
      pathDemos: {
        badge: 'Demos con reloj',
        title: 'Prueba el path antes de agendar',
        description:
          'Cada servicio tiene una demo con límite de tiempo. Sin datos reales. Al terminar, agenda o escribe.',
        cta: 'Ver demo · {min} min',
      },
      timedDemo: {
        crumb: 'Demo',
        start: 'Iniciar demo ({time})',
        rules: 'Reglas de la sesión',
        live: 'Demo en curso',
        paused: 'Demo en pausa',
        timeLeft: 'Tiempo restante',
        warn: 'Queda un minuto o menos.',
        pause: 'Pausar',
        resume: 'Seguir',
        addMinute: 'Sumar 1 min',
        endedTitle: 'La sesión terminó',
        endedBody:
          'El panel se bloqueó. Agenda 30 min o cuéntanos qué servicio necesitás.',
        ctaSchedule: 'Agendar 30 min',
        ctaConsult: 'Quiero este servicio',
        ctaAgain: 'Otra sesión de {min} min',
        ctaFormats: 'Ver modalidades',
        openTab: 'Abrir en pestaña (sin reloj)',
        note: 'Si el prototipo no carga en el recuadro, ábrelo en pestaña. El reloj y los botones siguen en Viento Norte.',
        restrictionTime: 'Sesión limitada a {min} minutos por visita.',
        restrictionExplore: 'Solo exploración: sin editar, exportar ni datos reales.',
        restrictionLock: 'Al terminar, el panel se bloquea y ofrecemos el siguiente paso.',
        restrictionData: 'Sin acceso a datos de clientes ni entorno productivo.',
      },
      packagesSection: {
        badge: 'Cómo se contrata',
        title: 'Elige tu alcance',
        description:
          'Un tap: Diagnóstico, Prototipo o Proceso de equipo. Un solo paso: Agendar 30 min. Sin precios en la web.',
        freeNote:
          'Gratis · accesibilidad de un flujo — misma agenda que Diagnóstico.',
        deliverablesLabel: 'Incluye',
        cta: 'Empezar',
        ctaDemo: 'Ver demo · {min} min',
        ctaForm: 'Escribir',
        note: 'Sin precios en la web: se cierran en el kickoff.',
        freeStripBadge: 'Gratis · entrada a Diagnóstico',
        freeStripTitle: 'Revisión gratis de un flujo crítico',
        freeStripBody:
          'Miramos un flujo de alto impacto (onboarding, pago o acceso). Si aplica, el Diagnóstico completo son 5–7 días.',
        freeStripCta: 'Pedir revisión gratis',
        freeStripCtaSchedule: 'Reservar 30 min gratis',
        freeStripCtaMessage: 'Prefiero escribir (sin agenda)',
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
          'Diagnóstico · Prototipo · Proceso',
          'Kickoff 30 min. Precio en la llamada',
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
    };


export const valueArsenal = {
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
    };

export const valueCarousel = {
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
    };

export const impactStats = {
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
            href: 'route/radar-gratis',
            badge: 'Gratis · a11y',
          },
        ],
        projectId: 'sura-ria-us',
      },
    };

export const flagshipCaseStudy = {
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
    };

export const testimonials = {
      badge: 'Referencias',
      title: 'Referencias profesionales',
      description:
        'Recomendaciones de LinkedIn de líderes en fintech, wealth y movilidad con los que colaboré (SURA, Transvip y entorno RIA).',
      linkedInCta: 'Ver perfil y referencias en LinkedIn',
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
    };


/**
 * Casos con URL limpia /casos/<slug>/ (nivel 2) y /casos/<slug>/<pieza>/ (nivel 3).
 * Cada pieza publica una selección de 3 a 5 láminas, no el archivo completo.
 * El mapa de nodos está en el SSOT privado de TL, no aquí.
 */
export const SLIDE_COUNT_MIN = 3;
export const SLIDE_COUNT_MAX = 5;

export interface CasoSlide {
  /** PNG de public/, sin barra inicial. */
  src: string;
  /** WebP del mismo recorte. */
  webp: string;
  /** WebP más chico, generado desde el archivo limpio. */
  webp800: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  alt: string;
}

export interface CasoPiece {
  slug: string;
  title: string;
  role: string;
  year: string;
  clientLabel: string;
  whatIDid: string;
  context: string;
  process: readonly string[];
  slides: readonly CasoSlide[];
  findings: readonly string[];
  permisoRef: string;
  /** /#/proyecto/<hashId> redirige a la URL limpia de la pieza. */
  hashId: string;
}

export interface Caso {
  slug: string;
  title: string;
  clientLabel: string;
  /** Índice del caso. No repite el cuerpo de las piezas. */
  summary: string;
  /** /#/proyecto/<hashId> redirige a /casos/<slug>/. */
  hashId: string;
  pieces: readonly CasoPiece[];
}

export interface CasoRoute {
  path: string;
  caso: string;
  piece: string;
}

function slide(
  dir: string,
  file: string,
  title: string,
  caption: string,
  alt: string,
): CasoSlide {
  return {
    src: `${dir}/${file}.png`,
    webp: `${dir}/${file}.webp`,
    webp800: `${dir}/${file}-800.webp`,
    width: 1600,
    height: 900,
    title,
    caption,
    alt,
  };
}

const MOBILIARIO_PITCH = "images/cases/mobiliario-edu/pitch-ventas";
const TRANSVIP_RESERVA = "images/cases/transvip/app-reserva";
const TRANSVIP_SD = "images/cases/transvip/system-design";

export const CASOS: readonly Caso[] = [
  {
    slug: "mobiliario-edu",
    title: "Pyme de mobiliario educacional",
    clientLabel: "Pyme de mobiliario educacional",
    summary:
      "Piezas publicadas de esta asesoría. Cada pieza muestra una selección de láminas, no el archivo completo.",
    hashId: "mobiliario-edu",
    pieces: [
      {
        slug: "pitch-ventas",
        title: "Pitch de ventas y simulación",
        role: "Service UX Designer",
        year: "2023",
        clientLabel: "Pyme de mobiliario educacional",
        whatIDid:
          "Investigué el proceso del equipo de ventas y, con esos hallazgos, escribí el pitch de entrada y el guion de una simulación tipo role-play: el flujo de la conversación, once preguntas para explorar dolores y los perfiles a interpretar.",
        context:
          "Una pyme de mobiliario educacional buscaba mejorar cómo conseguía nuevos posibles negocios. Esta pieza es la etapa comercial de la asesoría: pasar de la estrategia de servicios a la conversación de venta, con herramientas para el equipo y un ensayo controlado de esa conversación.",
        process: [
          "Investigar el proceso del equipo de ventas, para entender cómo se conseguían nuevos posibles negocios y en qué se trababa la conversación.",
          "Escribir el pitch de entrada: un flujo para conversar con cordialidad, empatía y escucha activa, identificar dolores del prospecto y llevar la conversación al siguiente nivel.",
          "Armar once preguntas arquetípicas para explorar dolores del establecimiento: planificación de proyectos educativos, gestión de recursos y tiempos, deserción y retención, calidad de enseñanza, uso de tecnología, implementación de soluciones y transformación de espacios educativos.",
          "Diseñar la simulación de ventas con dos condiciones de prospecto —«persona con tiempo» y «persona sin tiempo»— en reuniones por Google Meet. El criterio de feedback era concreto: si quien vende era capaz (o no) de explorar dolores, expectativas y necesidades, y de posicionar la oferta como valiosa para la institución. Los ensayos quedaron calendarizados para el 24 y el 25 de febrero.",
        ],
        slides: [
          slide(
            MOBILIARIO_PITCH,
            "01-portada-guion-acting",
            "Portada del guion de acting",
            "Portada del guion de acting para la simulación de ventas, marcada como uso interno y fechada en 2023. Abre la pieza: un ensayo de la conversación comercial, no una presentación al cliente final.",
            "Portada tipográfica de un guion de simulación, con el título «Guión Acting - Simulación» y la leyenda «Pitch Ventas - USO INTERNO», año 2023.",
          ),
          slide(
            MOBILIARIO_PITCH,
            "02-flujo-simulacion",
            "Flujo de la simulación",
            "El flujo de la simulación entrega herramientas comunicativas para situaciones ideales y también para las complejas. El objetivo no es cerrar en el momento, sino agendar una cita para mostrar la propuesta comercial. Se calendarizó para el 24 y el 25 de febrero, con ensayos de una «persona sin tiempo» y una «persona con tiempo».",
            "Lámina «Flujo / II. Simulación» con el objetivo de la actividad y las fechas de ensayo.",
          ),
          slide(
            MOBILIARIO_PITCH,
            "03-bio-persona-con-tiempo",
            "Bio de la persona con tiempo",
            "Perfil a interpretar en la simulación: la «persona con tiempo», que recibe el pitch en una reunión por Google Meet. Quien actúa ese rol devuelve feedback sobre si se exploraron dolores, expectativas y necesidades, y si la oferta quedó posicionada como valiosa para su institución.",
            "Lámina «Bio persona / II. Simulación» con las instrucciones del perfil «persona con tiempo».",
          ),
          slide(
            MOBILIARIO_PITCH,
            "04-flujo-pitch-de-entrada",
            "Flujo del pitch de entrada",
            "Flujo del pitch de entrada: ser cordial, empático y usar la escucha activa para llevar la conversación al siguiente nivel. El objetivo es identificar los dolores del prospecto para ofrecer la solución que necesita.",
            "Lámina «Flujo pitch de entrada» con las instrucciones de cordialidad, empatía y escucha activa.",
          ),
          slide(
            MOBILIARIO_PITCH,
            "05-exploracion-de-dolores",
            "Exploración de dolores",
            "Once preguntas arquetípicas para explorar dolores del establecimiento: planificación, gestión de recursos y tiempos, deserción, calidad de enseñanza, tecnología, implementación y transformación de espacios educativos. Sirven para orientar la conversación sin improvisar el diagnóstico.",
            "Lámina «11 preguntas arquetípicas / Exploración de dolores» con la lista de preguntas para el establecimiento educacional.",
          ),
        ],
        findings: [
          "Conseguir nuevos posibles negocios dependía de cómo el equipo conversaba en situaciones ideales y también en las complejas.",
          "El objetivo inmediato del pitch de entrada no era cerrar la venta, sino agendar una cita para mostrar la propuesta comercial.",
          "Había que ensayar al menos dos condiciones de prospecto: con tiempo y sin tiempo.",
          "Explorar dolores no podía improvisarse: el kit reúne once preguntas arquetípicas que cubren gestión del establecimiento, calidad de enseñanza, tecnología, implementación y transformación de espacios educativos.",
          "La simulación se diseñó para un feedback concreto: si quien vende explora dolores, expectativas y necesidades, y si posiciona la oferta como valiosa para la institución.",
          "[TODO Rö] Resultado real de los ensayos, si existe. Sin cifras inventadas.",
        ],
        permisoRef: "docs/staging/mobiliario-edu-pack/PERMISO.md",
        hashId: "mobiliario-edu-pitch-ventas",
      },
    ],
  },
  {
    slug: "transvip",
    title: "Transvip",
    clientLabel: "Transvip",
    summary:
      "Piezas publicadas del trabajo en movilidad premium: la app de reserva de pasajeros y el System Design App Cliente. Cada pieza muestra una selección de láminas, no el archivo completo. [TODO Rö] Publicación pendiente de OK, después de SURA RIA y SURA Tutoría CO.",
    hashId: "transvip",
    pieces: [
      {
        slug: "app-reserva",
        title: "App de reserva de pasajeros",
        role: "Senior Product Designer",
        year: "2022–2023",
        clientLabel: "Transvip",
        whatIDid:
          "Rediseñé el flujo de reserva de la app de pasajeros, de la selección de vehículo al paso de confirmación, y dejé prototipos de alta fidelidad listos para el handoff a desarrollo.",
        context:
          "En Transvip, movilidad premium, el trámite de un traslado se trababa si el flujo de reserva no se entendía. Esta pieza muestra la superficie pública de ese flujo en desktop, mobile y prototipo, no el archivo completo ni datos de analítica.",
        process: [
          "Investigar el trámite de reserva con usuarios premium: qué información necesitaban para elegir vehículo y continuar.",
          "Simplificar la selección de tipo de servicio (compartido, exclusivo, auto) y el paso de dirección, sin exponer direcciones ni horarios reales en las láminas.",
          "Prototipar el flujo en Figma y preparar el handoff junto al System Design de App Cliente.",
        ],
        slides: [
          slide(
            TRANSVIP_RESERVA,
            "01-reserva-desktop",
            "Reserva en desktop",
            "Pantalla de reserva en laptop: los pasos del trámite, la elección de vehículo (exclusivo, compartido, auto) y campos de fecha con el placeholder dd/mm/aaaa, sin horarios reales.",
            "Laptop con la pantalla de reserva Transvip: pasos del servicio, opciones de vehículo (exclusivo, compartido y auto) y campos de fecha con el placeholder dd/mm/aaaa.",
          ),
          slide(
            TRANSVIP_RESERVA,
            "02-reserva-mobile",
            "Reserva en mobile",
            "La misma lógica de reserva en el teléfono: tipo de vehículo, cupo y equipaje, con botones Volver y Continuar. El control de perfil es un icono genérico, no una foto personal.",
            "Teléfono con la pantalla Transvip «Elige tu Transvip»: van compartida, auto y van exclusiva, botones Volver y Continuar, y un icono genérico de perfil en la cabecera.",
          ),
          slide(
            TRANSVIP_RESERVA,
            "03-prototipo-reserva",
            "Prototipo de la reserva",
            "Prototipo navegable recortado al dispositivo, sin el cromo de Figma ni el listado interno de trabajo. Muestra el mismo flujo de selección de vehículo.",
            "iPhone con el prototipo del flujo de reserva Transvip recortado al dispositivo: selección de vehículo, Atrás, Siguiente y Continuar, sin interfaz de Figma alrededor.",
          ),
        ],
        findings: [
          "El flujo tenía que verse completo en una pantalla: tipo de vehículo, cupo, tiempo de viaje y equipaje, antes de continuar.",
          "Desktop y mobile comparten la misma lógica de reserva; cambia la densidad, no el trámite.",
          "El prototipo navegable sirvió de contrato con desarrollo, no como recorte de tickets internos.",
          "[TODO Rö] Publicación pendiente de OK, después de SURA RIA y SURA Tutoría CO.",
        ],
        permisoRef: "docs/staging/transvip-pack/PERMISO.md",
        hashId: "transvip-app-premium",
      },
      {
        slug: "system-design",
        title: "System Design · App Cliente",
        role: "Senior Product Designer",
        year: "2023",
        clientLabel: "Transvip",
        whatIDid:
          "Construí el System Design de App Cliente para web y aplicación: propósito del sistema, manual de uso, anatomía de componentes y el acuerdo de trabajo colaborativo con desarrollo.",
        context:
          "El equipo interno de Tecnología y Producto necesitaba un sistema compartido para no retrasar sprints ni resolver cada pantalla desde cero. Esta pieza publica cuatro láminas de ese sistema, no el archivo completo.",
        process: [
          "Definir el propósito del sistema: reducir retrabajo de diseño y dejar al equipo en los problemas reales del producto.",
          "Documentar el manual de uso, el inventario de páginas interiores y las deudas conocidas de tipografía y homologación.",
          "Explicar cómo están construidos los componentes (átomos, moléculas, organismos, templates) y cuándo documentar uno nuevo.",
          "Acordar el trabajo colaborativo con desarrollos internos (Scrum) y agencias externas, con acceso a las especificaciones en el sistema.",
        ],
        slides: [
          slide(
            TRANSVIP_SD,
            "01-proposito",
            "Propósito del sistema",
            "La lámina de propósito resume objetivos, el porqué, los beneficios y quién lo usa: el equipo interno de Tecnología y Producto.",
            "Lámina «Propósito» del System Design Transvip, con logos, objetivos, por qué, beneficios y usuarios del equipo interno de Tecnología y Producto.",
          ),
          slide(
            TRANSVIP_SD,
            "02-manual-uso",
            "Manual de uso",
            "Portada e índice del manual (agosto 2023), con las páginas interiores y las consideraciones de tipografía y homologación dejadas a la vista.",
            "Portada y manual de uso del System Design App Cliente (agosto 2023), con el índice de páginas interiores y las consideraciones de trabajo.",
          ),
          slide(
            TRANSVIP_SD,
            "03-componentes",
            "Sobre los componentes",
            "Los componentes siguen Atomic Design. Un cambio en un átomo puede llegar a un template, por eso el QA de diseño va antes del QA de desarrollo.",
            "Lámina «Sobre los componentes»: esquema Atomic Design (átomos, moléculas, organismos, templates) y la regla D.O.D. para documentar un componente nuevo.",
          ),
          slide(
            TRANSVIP_SD,
            "04-trabajo-colaborativo",
            "Trabajo colaborativo",
            "El sistema guía a desarrollo interno (Scrum) y a agencias externas, con acceso a las especificaciones desde el propio archivo.",
            "Lámina «Sobre el trabajo colaborativo»: acuerdo con desarrollo y agencias, y una vista del panel de especificaciones del sistema.",
          ),
        ],
        findings: [
          "El sistema está pensado para el equipo interno de Tecnología y Producto, no como un overlay de marca.",
          "Los componentes siguen Atomic Design; un cambio en un átomo puede llegar a templates, por eso el QA de diseño va antes del QA de desarrollo.",
          "El manual deja explícitas deudas de tipografía y homologación para no esconder el estado real del archivo.",
          "[TODO Rö] Publicación pendiente de OK, después de SURA RIA y SURA Tutoría CO.",
        ],
        permisoRef: "docs/staging/transvip-pack/PERMISO.md",
        hashId: "transvip-system-design",
      },
    ],
  },
];

export function assertSlideCount(count: number): void {
  if (count < SLIDE_COUNT_MIN || count > SLIDE_COUNT_MAX) {
    throw new Error(
      `una pieza publica entre ${SLIDE_COUNT_MIN} y ${SLIDE_COUNT_MAX} láminas (recibió ${count})`,
    );
  }
}

for (const caso of CASOS) {
  for (const piece of caso.pieces) assertSlideCount(piece.slides.length);
}

export function casoPath(slug: string): string {
  return `/casos/${slug}/`;
}

export function piezaPath(casoSlug: string, pieceSlug: string): string {
  return `/casos/${casoSlug}/${pieceSlug}/`;
}

/** Prefija la base de Vite ("/" o "/qa/") a una ruta que empieza con /. */
export function withSiteBase(path: string): string {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Ruta de public/ a URL publicada, respetando la base. */
export function publicAsset(path: string): string {
  return withSiteBase(`/${path.replace(/^\//, "")}`);
}

export function casoRoutes(casos: readonly Caso[] = CASOS): CasoRoute[] {
  const routes = casos.flatMap((caso) => [
    { path: casoPath(caso.slug), caso: caso.slug, piece: "" },
    ...caso.pieces.map((piece) => ({
      path: piezaPath(caso.slug, piece.slug),
      caso: caso.slug,
      piece: piece.slug,
    })),
  ]);
  return routes;
}

export function piecePublishesTodo(piece: CasoPiece): boolean {
  return JSON.stringify(piece).includes("[TODO");
}

/** TODO en la ficha del caso (no en las piezas) → el índice sale noindex. */
export function casoPublishesTodo(caso: Caso): boolean {
  return [caso.title, caso.summary, caso.clientLabel, caso.hashId].some((value) =>
    value.includes("[TODO"),
  );
}

export function cleanUrlForHashProject(id: string): string | null {
  for (const caso of CASOS) {
    if (caso.hashId === id) return casoPath(caso.slug);
    for (const piece of caso.pieces) {
      if (piece.hashId === id) return piezaPath(caso.slug, piece.slug);
    }
  }
  return null;
}

/** Mapa id de hash → ruta relativa sin barra inicial, para el script de index.html. */
export function hashProjectRedirects(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const caso of CASOS) {
    out[caso.hashId] = `casos/${caso.slug}/`;
    for (const piece of caso.pieces) {
      out[piece.hashId] = `casos/${caso.slug}/${piece.slug}/`;
    }
  }
  return out;
}

export function getCaso(slug: string): Caso {
  const caso = CASOS.find((item) => item.slug === slug);
  if (!caso) throw new Error(`caso desconocido: ${slug}`);
  return caso;
}

export function getPiece(casoSlug: string, pieceSlug: string): { caso: Caso; piece: CasoPiece; next: CasoPiece | null } {
  const caso = getCaso(casoSlug);
  const index = caso.pieces.findIndex((item) => item.slug === pieceSlug);
  if (index < 0) throw new Error(`pieza desconocida: ${casoSlug}/${pieceSlug}`);
  return { caso, piece: caso.pieces[index], next: caso.pieces[index + 1] ?? null };
}

export function todoMarkers(text: string): string[] {
  return text.match(/\[TODO Rö(?::[^\]]+)?\]/g) ?? [];
}

export function webpSrcSet(slide: CasoSlide): string {
  return `${publicAsset(slide.webp800)} 800w, ${publicAsset(slide.webp)} 1600w`;
}

export const KHURO_SOURCE = "https://khuro.pb.online/portafolio";

export interface KhuroArchiveItem {
  id: string;
  role: string;
  company: string;
  description: string;
  image?: string;
  href: string;
  tags: string[];
}

export const khuroArchiveCopy = {
  es: {
    badge: "Archivo",
    title: "Portafolio Khuro",
    description: "Piezas de community, consultoría, medio, cine y foto publicadas en Portfoliobox.",
    source: "Ver archivo original",
    open: "Abrir",
  },
  en: {
    badge: "Archive",
    title: "Khuro portfolio",
    description: "Community, consulting, media, film and photo pieces published on Portfoliobox.",
    source: "View original archive",
    open: "Open",
  },
} as const;

export const khuroArchiveItems: KhuroArchiveItem[] =
[
  {
    "id": "pareti",
    "role": "Community Manager",
    "company": "PARETI S.A",
    "description": "Como Community Manager del Grupo Pareti estuve enfocado en 3 áreas estratégicas del Marketing Digital:\n\nDiseño de Marketing y Campañas, esto se entiende como SEO y SEM. \n\nMonitoreo de Audiencias, Campañas, Presupuestos y Tendencias desde el punto de vista del Usuario y la Marca lo que se traduce en un informe constante de KPI de las métricas a través de Analytics, Ads e Insight.\n\nY finalmente pero no menos importante Branding, lo que es una combinación de relaciones entre la comunidad, distribuidores, sponsors, partners, embajadores e incluso competencias, conocer los individuos que componen tu comunidad para dotarles de una experiencia en torno a la marca es la tarea fundamental del Community Manager.",
    "href": "https://khuro.pb.online/pareti",
    "tags": [
      "Community",
      "SEO",
      "SEM",
      "Branding"
    ],
    "image": "https://dglb26w8rx2ld.cloudfront.net/000_clients/1209346/file/1209346ipsP0cW7.png"
  },
  {
    "id": "marana",
    "role": "Consultor Digital",
    "company": "Agencia Creativa Maraña",
    "description": "Para Maraña trabajé como Asesor de Marketing Digital, manteniendo las relaciones con los clientes para ir desarrollando soluciones digitales, en el marco de la transformación digital de sus negocios.\n\nDesarrollando E-commerces, CMS, Planes de Marketing, entre otros.",
    "href": "https://maraña.cl",
    "tags": [
      "Consultoría",
      "CMS",
      "E-commerce"
    ],
    "image": "https://dglb26w8rx2ld.cloudfront.net/000_clients/1209346/file/12093463sPlcFui.png"
  },
  {
    "id": "voz-cerros",
    "role": "Colaborador",
    "company": "La Voz de los Cerros",
    "description": "La Voz de los Cerros es un medio de comunicación popular y comunitario de Valparaíso. En el cual tuve la oportunidad de trabajar de manera colaborativa, creando contenido escrito, audiovisual y generando debate público, que luego socializamos a través de RR.SS",
    "href": "https://www.instagram.com/la.voz.de.los.cerros/",
    "tags": [
      "Medio comunitario",
      "Contenido",
      "RR.SS"
    ],
    "image": "https://dglb26w8rx2ld.cloudfront.net/000_clients/1209346/file/1209346WIPNlpTK.png"
  },
  {
    "id": "traduccion-saberes",
    "role": "Traducción de Saberes",
    "company": "Director",
    "description": "Traducción de Saberes es una Etnografía Audiovisual que busca comprender la realidad material que producen leyes y modelos económicos en contradicción con Culturas Ancestrales, a través de una serie documental online.",
    "href": "https://khuro.pb.online/portafolio",
    "tags": [
      "Documental",
      "Etnografía"
    ],
    "image": "https://dglb26w8rx2ld.cloudfront.net/000_clients/1209346/file/12093469018ups6.png"
  },
  {
    "id": "darandar",
    "role": "Darandar",
    "company": "Director de Fotografía",
    "description": "DARANDAR es un Cortometraje Audiovisual que gira en torno a la escasez hídrica en la región de Valparaíso.\n\nSu realización estuvo pensada para la intervención realizada en Sala Negra durante el 2019 de la mano de la Performance de Andreí Liberana dirigida por Karen Klaassen.",
    "href": "https://vimeo.com/345306652",
    "tags": [
      "Cine",
      "Dirección de fotografía"
    ],
    "image": "https://dglb26w8rx2ld.cloudfront.net/000_clients/1209346/file/12093462FJrQkYL.png"
  },
  {
    "id": "artistas-resistencia",
    "role": "Documentalista",
    "company": "Director",
    "description": "Durante el 18-O documenté los diversos procesos constituyentes que se autoconvocaron en la región de Valparaíso.\n\nDentro de ellas realicé esta cápsula audiovisual del colectivo \"Artistas en Resistencia\"",
    "href": "https://khuro.pb.online/portafolio",
    "tags": [
      "Documental",
      "18-O",
      "Valparaíso"
    ],
    "image": "https://dglb26w8rx2ld.cloudfront.net/000_clients/1209346/file/1209346dQwaOhtp.png"
  },
  {
    "id": "negra-colora",
    "role": "Editor Digital",
    "company": "La Negra Colorá",
    "description": "Para la Negra Colorá trabajé como colaborador en 3 áreas, como fotoreportero, diseñador multimedia y editor de contenidos.\n\nDesarrollé su manual de marca y piezas gráficas, administré sus RR.SS. y realicé investigaciones periodísticas.",
    "href": "https://www.facebook.com/lanegracolora/",
    "tags": [
      "Editorial",
      "Marca",
      "Periodismo"
    ],
    "image": "https://dglb26w8rx2ld.cloudfront.net/000_clients/1209346/file/1209346YVIUikFl.png"
  },
  {
    "id": "numeros-no-existen",
    "role": "Los Números No Existen",
    "company": "POEMARIO",
    "description": "Los números no existen es un poemario autogestionado, que compila años de poesía viajera.\n\nSu diseño está pensado para móviles y fue creado bajo la filosofía del código abierto.",
    "href": "https://khuro.pb.online/portafolio",
    "tags": [
      "Poesía",
      "Open source"
    ],
    "image": "https://dglb26w8rx2ld.cloudfront.net/000_clients/1209346/file/1209346kb5WBDUM.png"
  },
  {
    "id": "teatro-di-popolo",
    "role": "Fotógrafo Audiovisual",
    "company": "Teatro Di Popolo",
    "description": "Para la Cia. Teatro Di Popolo tuve el agrado de realizar su registro fotográfico y audiovisual.\n\nRealizando además el teaser audiovisual para presentar en diversos teatros de Chile.",
    "href": "https://www.behance.net/gallery/53888227/Sacco-Vanzetti",
    "tags": [
      "Fotografía",
      "Audiovisual",
      "Teatro"
    ],
    "image": "https://dglb26w8rx2ld.cloudfront.net/000_clients/1209346/file/1209346ecxHu9Ym.png"
  },
  {
    "id": "sushi-del-mar",
    "role": "Fotógrafo de productos",
    "company": "Sushi del Mar",
    "description": "Para Sushi del Mar realicé sesiones de Foodstyling con tal de reflejar sus productos Gourmet en sus canales digitales.",
    "href": "https://sushidelmar.cl",
    "tags": [
      "Foodstyling",
      "Producto"
    ],
    "image": "https://dglb26w8rx2ld.cloudfront.net/000_clients/1209346/file/12093460kw6P86B.png"
  },
  {
    "id": "nino-heroe",
    "role": "Director de Fotografía",
    "company": "Niño Héroe",
    "description": "Director de fotografía. Sin texto publicado en Portfoliobox.",
    "href": "https://khuro.pb.online/portafolio",
    "tags": [
      "Dirección de fotografía"
    ]
  }
];

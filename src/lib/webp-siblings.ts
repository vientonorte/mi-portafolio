/** public/ .webp hermanos de un .png/.jpg (mismo nombre). Test: src/__tests__/lib/webp-siblings.test.ts */
export const WEBP_SIBLINGS: ReadonlySet<string> = new Set([
  "images/branding/hero-ejemplo.webp",
  "images/cases/claro/claro-chile.webp",
  "images/cases/claro/prototipo-nav.webp",
  "images/cases/claro/tienda-equipos-mobile.webp",
  "images/cases/claro/tienda-equipos-screen.webp",
  "images/cases/terramar/benchmark-heuristica.webp",
  "images/cases/terramar/mapa.webp",
  "images/cases/todoclick/benchmark-heuristica.webp",
  "images/cases/todoclick/tienda.webp",
  "images/cases/transvip/system-design-proposito.webp",
  "images/cases/vientonorte/contraste-antes-despues.webp",
  "images/cases/walmart/catalogo-screen.webp",
  "images/cases/walmart/catalogo.webp",
  "images/consultoria/gees-dashboard.webp",
  "images/consultoria/x-cms-dashboard.webp",
  "images/poc-modules/pos-mobile.webp",
  "images/products/consultoria-estrategica/modulos.webp",
  "images/products/ratio/cfo-dashboard.webp",
  "images/products/x-cms/pos-productos.webp",
  "images/rubros/web-dental/card.webp",
  "images/rubros/web-dental/desktop.webp",
  "images/rubros/web-dental/mobile.webp",
  "images/sura/ia-automation-dashboard.webp",
  "images/transvip/app-mobile.webp",
]);

/** Si existe un .webp hermano del src (respetando BASE_URL), devuelve su URL. */
export function webpSiblingOf(src: string): string | null {
  const [path, query] = src.split("?");
  const base = import.meta.env.BASE_URL || "/";
  if (!path.startsWith(base)) return null;
  const rel = path.slice(base.length).replace(/^\//, "");
  const m = rel.match(/^(.*)\.(png|jpe?g)$/i);
  if (!m) return null;
  const webp = `${m[1]}.webp`;
  if (!WEBP_SIBLINGS.has(webp)) return null;
  return `${base}${webp}${query ? `?${query}` : ""}`;
}

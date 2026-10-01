/**
 * Gate del sitemap (ci/sitemap-gate). La política vive en UN solo lugar:
 * `src/data/sitemap-canon.json` (origen, denylist, excepciones).
 *
 * La lista canónica se DERIVA del build: cada `dist/**\/index.html` que sea indexable,
 * con canonical propio, sin meta refresh y fuera de la denylist (y de outsideSitemap). Así una página nueva (p. ej. /servicios/web-dental/)
 * entra al canon solo cuando existe en el build.
 *
 * Módulo puro (sin node:fs) para que tsc del app lo acepte; la lectura del disco
 * de dist/ vive en src/__tests__/lib/sitemap-gate.test.ts.
 */
import canon from "@/data/sitemap-canon.json";

export const SITEMAP_ORIGIN: string = canon.origin;
export const SITEMAP_DENY: readonly string[] = canon.deny;
/** Denylist de URLs externas (host + ruta, sin esquema). Ver `isDeniedUrl`. */
export const SITEMAP_DENY_URLS: readonly string[] = canon.denyUrls;
export const SITEMAP_DENY_EXCEPTIONS: readonly string[] = canon.denyExceptions;
export const SITEMAP_OUTSIDE: readonly string[] = canon.outsideSitemap;

const SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9";

export type BuildPage = { route: string; html: string };

/** Denylist por prefijo de ruta; `/#/` además se detecta en cualquier URL con fragmento hash-route. */
export function isDeniedPath(path: string): boolean {
  if (SITEMAP_DENY_EXCEPTIONS.some((ex) => path === ex || path.startsWith(ex))) return false;
  if (path.includes("#")) return true;
  return SITEMAP_DENY.some((d) => path === d || path.startsWith(d));
}

/**
 * Normaliza una URL a `host/ruta` en minúsculas para compararla con `denyUrls`:
 * quita `http:`/`https:` y `//` iniciales, colapsa `/#/` (hash-route) a `/`, quita el `#` final,
 * query, barras repetidas y la barra final. `https://Vnmkt.figma.site/#/` → `vnmkt.figma.site`.
 */
export function normalizeDenyUrl(value: string): string {
  let s = value.trim().toLowerCase();
  s = s.replace(/^(?:https?:)?\/\//, "");
  s = s.replace(/\/#\//g, "/").replace(/\/#$/, "/");
  s = s.replace(/[?#].*$/, "");
  s = s.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
  return s;
}

/** URL en la denylist externa (`denyUrls`): igual a la entrada o bajo ella (límite de segmento). */
export function isDeniedUrl(loc: string): boolean {
  const n = normalizeDenyUrl(loc);
  return SITEMAP_DENY_URLS.some((d) => {
    const e = normalizeDenyUrl(d);
    return n === e || n.startsWith(`${e}/`);
  });
}

/** `servicios/web-dental/index.html` → `/servicios/web-dental/`; `index.html` → `/`. */
export function routeFromIndexHtml(relPath: string): string {
  const posix = relPath.replace(/\\/g, "/");
  const dir = posix.replace(/(^|\/)index\.html$/, "");
  return dir ? `/${dir}/` : "/";
}

function metaContent(html: string, name: string): string | null {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const n = tag.match(/\b(?:name|http-equiv)\s*=\s*"([^"]*)"/i)?.[1];
    if (n?.toLowerCase() === name) return tag.match(/\bcontent\s*=\s*"([^"]*)"/i)?.[1] ?? "";
  }
  return null;
}

function canonicalHref(html: string): string | null {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (/\brel\s*=\s*"canonical"/i.test(tag)) return tag.match(/\bhref\s*=\s*"([^"]*)"/i)?.[1] ?? null;
  }
  return null;
}

/** Pública = indexable, sin redirección (meta refresh) y canonical propio (o ausente). */
export function isPublicPage(page: BuildPage, origin = SITEMAP_ORIGIN): boolean {
  const robots = metaContent(page.html, "robots");
  if (robots && /\bnoindex\b|\bnone\b/i.test(robots)) return false;
  if (metaContent(page.html, "refresh") !== null) return false;
  const canonical = canonicalHref(page.html);
  if (canonical !== null && canonical !== origin + page.route) return false;
  return true;
}

/** Rutas canónicas del sitemap derivadas de las páginas del build. Ordenadas. */
export function deriveCanonicalRoutes(pages: BuildPage[]): string[] {
  return [
    ...new Set(
      pages
        .filter((p) => !isDeniedPath(p.route))
        .filter((p) => !SITEMAP_OUTSIDE.includes(p.route))
        .filter((p) => isPublicPage(p))
        .map((p) => p.route)
    ),
  ].sort();
}

/** W3C Datetime (https://www.w3.org/TR/NOTE-datetime): YYYY, YYYY-MM, YYYY-MM-DD o con hora + TZD. */
export function isW3cDatetime(value: string): boolean {
  const m = value.match(
    /^(\d{4})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2}))?)?)?$/
  );
  if (!m) return false;
  const [, y, mo, d, h, mi, s] = m;
  if (mo && (+mo < 1 || +mo > 12)) return false;
  if (d) {
    const date = new Date(Date.UTC(+y, +mo - 1, +d));
    if (date.getUTCMonth() !== +mo - 1 || date.getUTCDate() !== +d) return false;
  }
  if (h && (+h > 23 || +mi > 59 || (s !== undefined && +s > 59))) return false;
  return true;
}

export type SitemapEntry = { loc: string; lastmod: string | null };

/** Parsea el XML de verdad (DOMParser). Lanza si no es XML bien formado o no es un urlset válido. */
export function parseSitemap(xml: string): SitemapEntry[] {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.getElementsByTagName("parsererror").length > 0) {
    throw new Error("sitemap: XML mal formado");
  }
  const root = doc.documentElement;
  if (root.localName !== "urlset" || root.namespaceURI !== SITEMAP_NS) {
    throw new Error(`sitemap: raíz debe ser <urlset xmlns="${SITEMAP_NS}">`);
  }
  return Array.from(root.getElementsByTagNameNS(SITEMAP_NS, "url")).map((url, i) => {
    const locs = url.getElementsByTagNameNS(SITEMAP_NS, "loc");
    if (locs.length !== 1) throw new Error(`sitemap: <url> #${i + 1} debe tener exactamente un <loc>`);
    const lastmods = url.getElementsByTagNameNS(SITEMAP_NS, "lastmod");
    if (lastmods.length > 1) throw new Error(`sitemap: <url> #${i + 1} tiene más de un <lastmod>`);
    return {
      loc: (locs[0].textContent ?? "").trim(),
      lastmod: lastmods.length ? (lastmods[0].textContent ?? "").trim() : null,
    };
  });
}

/**
 * Devuelve la lista de problemas (vacía = el sitemap pasa el gate).
 * `canonicalRoutes = null` aplica solo las reglas estáticas (XML, origen, denylist, lastmod,
 * duplicados) — sirve cuando no hay dist/ para derivar el canon.
 */
export function validateSitemap(xml: string, canonicalRoutes: string[] | null, now = new Date()): string[] {
  let entries: SitemapEntry[];
  try {
    entries = parseSitemap(xml);
  } catch (e) {
    return [(e as Error).message];
  }
  const errors: string[] = [];
  const routes: string[] = [];
  for (const { loc, lastmod } of entries) {
    if (isDeniedUrl(loc)) errors.push(`loc en denylist (URL externa): ${loc}`);
    let url: URL | null = null;
    try {
      url = new URL(loc);
    } catch {
      errors.push(`loc inválida: ${loc}`);
    }
    if (url) {
      if (url.origin !== SITEMAP_ORIGIN || !loc.startsWith(`${SITEMAP_ORIGIN}/`)) {
        errors.push(`loc fuera de ${SITEMAP_ORIGIN}: ${loc}`);
      } else if (url.search || url.hash || loc.includes("#")) {
        errors.push(`loc con query o fragmento: ${loc}`);
      }
      const path = loc.slice(SITEMAP_ORIGIN.length) || "/";
      if (isDeniedPath(path) || isDeniedPath(url.pathname)) errors.push(`loc en denylist: ${loc}`);
      routes.push(url.pathname);
    }
    if (lastmod === null) {
      errors.push(`sin <lastmod>: ${loc}`);
    } else if (!isW3cDatetime(lastmod)) {
      errors.push(`lastmod no es W3C datetime (ISO 8601): ${loc} → ${lastmod}`);
    } else if (new Date(lastmod).getTime() > now.getTime() + 24 * 3600 * 1000) {
      errors.push(`lastmod en el futuro: ${loc} → ${lastmod}`);
    }
  }
  const seen = new Set<string>();
  for (const r of routes) {
    if (seen.has(r)) errors.push(`ruta duplicada: ${r}`);
    seen.add(r);
  }
  if (canonicalRoutes === null) return errors;
  for (const r of canonicalRoutes) if (!seen.has(r)) errors.push(`falta ruta canónica: ${r}`);
  for (const r of seen) if (!canonicalRoutes.includes(r)) errors.push(`sobra ruta (no canónica): ${r}`);
  return errors;
}

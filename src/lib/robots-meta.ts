/**
 * Un solo `<meta name="robots">` por página (gate #292).
 *
 * El HTML estático ya trae uno (index.html, servicios/index.html; en el build de QA deploy-qa.yml lo
 * reescribe a `noindex, nofollow`). Antes SEOHead agregaba otro con Helmet (`index, follow`) encima
 * del noindex. Ahora se reutiliza el meta existente y se actualiza su `content`:
 * - noindex gana si la página lo pide (`noIndex`), si el build es de QA o si el HTML estático
 *   original ya era noindex;
 * - si no, `index, follow`.
 * Si por algún motivo hay más de uno, se dejan en uno.
 */
export const ROBOTS_INDEX = "index, follow";
export const ROBOTS_NOINDEX = "noindex, nofollow";

const STATIC_ATTR = "data-vn-static-robots";

export function isNoindex(content: string | null | undefined): boolean {
  return !!content && /\b(noindex|none)\b/i.test(content);
}

/** Build de QA (deploy-qa.yml: VITE_APP_ENV=qa, base /qa/). */
export function isQaBuild(): boolean {
  const env = import.meta.env;
  return env.VITE_APP_ENV === "qa" || env.BASE_URL === "/qa/";
}

export function resolveRobots(opts: { staticContent: string | null; noIndex: boolean; qa: boolean }): string {
  if (opts.noIndex || opts.qa || isNoindex(opts.staticContent)) return ROBOTS_NOINDEX;
  return ROBOTS_INDEX;
}

function robotsMetas(doc: Document): HTMLMetaElement[] {
  return Array.from(doc.querySelectorAll<HTMLMetaElement>("meta[name]")).filter(
    (m) => m.getAttribute("name")?.toLowerCase() === "robots"
  );
}

/** Contenido del meta robots que venía en el HTML (se recuerda la primera vez que se toca). */
function staticRobots(metas: HTMLMetaElement[]): string | null {
  const marked = metas.find((m) => m.hasAttribute(STATIC_ATTR));
  if (marked) return marked.getAttribute(STATIC_ATTR) || null;
  if (metas.length === 0) return null;
  const noindex = metas.find((m) => isNoindex(m.content));
  return (noindex ?? metas[0]).content;
}

/** Aplica la directiva y deja exactamente un `<meta name="robots">`. Devuelve el content final. */
export function applyRobotsMeta(
  doc: Document,
  opts: { noIndex: boolean; qa?: boolean }
): string {
  const metas = robotsMetas(doc);
  const original = staticRobots(metas);
  const content = resolveRobots({ staticContent: original, noIndex: opts.noIndex, qa: opts.qa ?? isQaBuild() });
  const [meta, ...extra] = metas;
  for (const m of extra) m.remove();
  const el = meta ?? doc.createElement("meta");
  if (!meta) {
    el.setAttribute("name", "robots");
    doc.head.appendChild(el);
  }
  el.setAttribute(STATIC_ATTR, original ?? "");
  el.setAttribute("content", content);
  return content;
}

/** Vuelve al valor del HTML estático (al desmontar la página); si el HTML no traía meta, lo quita (salvo QA). */
export function restoreRobotsMeta(doc: Document, qa = isQaBuild()): void {
  const metas = robotsMetas(doc);
  if (metas.length === 0) return;
  if (staticRobots(metas) === null && !qa) {
    for (const m of metas) m.remove();
    return;
  }
  applyRobotsMeta(doc, { noIndex: false, qa });
}

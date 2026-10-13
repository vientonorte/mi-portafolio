/**
 * Migas de pan para las páginas estáticas prerenderizadas (/servicios/, rubros, /noticias/,
 * /noticias/<slug>/, /privacidad/, /sobre-mi/). Un solo componente: <nav aria-label> + <ol>,
 * separadores ocultos al lector de pantalla y aria-current="page" en el último nivel.
 * Con `jsonLd` emite además el BreadcrumbList (schema.org) con URLs absolutas canónicas.
 */
export interface StaticCrumb {
  label: string;
  /** Ruta canónica desde la raíz del sitio, p. ej. "/servicios/". */
  path: string;
}

export const SITE_ORIGIN = "https://vientonorte.io";

/** Href local respetando la base de Vite ("/" en prod, "/qa/" en QA). */
export function crumbHref(path: string): string {
  const base = (import.meta.env?.BASE_URL as string | undefined) || "/";
  const b = base.endsWith("/") ? base : `${base}/`;
  return `${b}${path.replace(/^\//, "")}`;
}

export function breadcrumbListJsonLd(items: StaticCrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE_ORIGIN}${c.path}`,
    })),
  };
}

export function StaticBreadcrumbs({
  items,
  jsonLd = true,
  className = "mb-6 text-sm text-muted-foreground",
}: {
  items: StaticCrumb[];
  jsonLd?: boolean;
  className?: string;
}) {
  const last = items.length - 1;
  return (
    <nav aria-label="Migas de pan" className={className} data-breadcrumbs>
      <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
        {items.map((c, i) => (
          <li key={c.path} className="flex gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === last ? (
              <span aria-current="page">{c.label}</span>
            ) : (
              <a href={crumbHref(c.path)} className="underline underline-offset-2 hover:text-foreground">
                {c.label}
              </a>
            )}
          </li>
        ))}
      </ol>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd(items)) }}
        />
      )}
    </nav>
  );
}

import type { ReactNode } from "react";
import { LanguageProvider } from "../lib/LanguageContext";
import { Navigation } from "../components/organisms/Navigation";
import { ContactOnlyFooter } from "../components/Footer";
import { MockupGallery, type MockupItem } from "../components/molecules/MockupGallery";
import { homeHref, minimalNavLinks, siteServiciosHref } from "../lib/site-nav";
import {
  getCaso,
  getPiece,
  piezaPath,
  publicAsset,
  todoMarkers,
  webpSrcSet,
  withSiteBase,
  type CasoSlide,
} from "../data/casos";

const SECTION = "scroll-mt-[calc(var(--header-height)+0.75rem)] py-10 md:py-14";
const H2 = "text-2xl font-bold tracking-tight text-foreground sm:text-3xl";
const TODO_CLASS =
  "mx-0.5 inline rounded-sm border border-dashed border-amber-800/80 bg-amber-100 px-1 py-0.5 font-semibold text-foreground dark:border-amber-200/80 dark:bg-amber-950/70";

export function TodoText({ text }: { text: string }) {
  const parts = text.split(/(\[TODO Rö(?::[^\]]+)?\])/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("[TODO Rö") ? (
          <strong key={index} data-todo="ro" className={TODO_CLASS}>
            {part}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

function visibleTodo(slide: CasoSlide): string | undefined {
  const markers = todoMarkers(slide.alt).filter((marker) => !slide.caption.includes(marker));
  return markers.length ? markers.join(" ") : undefined;
}

function slideItems(slides: readonly CasoSlide[]): MockupItem[] {
  return slides.map((slide) => ({
    src: publicAsset(slide.src),
    alt: slide.alt,
    label: slide.caption,
    title: slide.title,
    note: visibleTodo(slide),
    width: slide.width,
    height: slide.height,
    webpSrcSet: webpSrcSet(slide),
  }));
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
    <>
      <a href="#main" className="skip-link">
        Ir al contenido principal
      </a>
      <Navigation
        staticLinks={minimalNavLinks({ contactHref: siteServiciosHref("contacto") })}
        staticHomeHref={homeHref()}
        staticEnglishHref={homeHref()}
      />
      <main id="main" tabIndex={-1} className="overflow-x-clip bg-background pt-[var(--header-height)] text-foreground">
        {children}
      </main>
      <ContactOnlyFooter />
    </>
    </LanguageProvider>
  );
}

function Crumbs({ casoTitle, casoHref, pieceTitle }: { casoTitle: string; casoHref: string; pieceTitle?: string }) {
  return (
    <nav aria-label="Migas de pan" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2 p-0">
        <li>
          <a href={homeHref()} className="underline underline-offset-4 hover:text-foreground">
            Inicio
          </a>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          {pieceTitle ? (
            <a href={casoHref} className="underline underline-offset-4 hover:text-foreground">
              {casoTitle}
            </a>
          ) : (
            <span aria-current="page">{casoTitle}</span>
          )}
        </li>
        {pieceTitle ? (
          <>
            <li aria-hidden="true">/</li>
            <li>
              <span aria-current="page">{pieceTitle}</span>
            </li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}

export function CasoIndex({ slug }: { slug: string }) {
  const caso = getCaso(slug);
  return (
    <Shell>
      <article data-page="caso" data-caso={caso.slug} className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <Crumbs casoTitle={caso.title} casoHref={withSiteBase(`/casos/${caso.slug}/`)} />
        <p className="text-sm font-semibold text-muted-foreground">{caso.clientLabel}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{caso.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{caso.summary}</p>
        <section className={SECTION} aria-labelledby="piezas-heading">
          <h2 id="piezas-heading" className={H2}>
            Piezas
          </h2>
          <ul className="mt-6 grid list-none gap-4 p-0">
            {caso.pieces.map((piece) => (
              <li key={piece.slug} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-xl font-semibold">
                  <a
                    href={withSiteBase(piezaPath(caso.slug, piece.slug))}
                    data-piece-link={piece.slug}
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    {piece.title}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {piece.role} · {piece.year}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Shell>
  );
}

function PieceNav({ casoHref, nextHref }: { casoHref: string; nextHref?: string }) {
  return (
    <nav aria-label="Pieza" className="mt-8 flex flex-wrap gap-4">
      <a href={casoHref} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-primary">
        Volver al caso
      </a>
      {nextHref ? (
        <a href={nextHref} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-primary">
          Siguiente pieza
        </a>
      ) : null}
    </nav>
  );
}

export function CasoPiece({ casoSlug, pieceSlug }: { casoSlug: string; pieceSlug: string }) {
  const { caso, piece, next } = getPiece(casoSlug, pieceSlug);
  const casoHref = withSiteBase(`/casos/${caso.slug}/`);
  const nextHref = next ? withSiteBase(piezaPath(caso.slug, next.slug)) : undefined;
  return (
    <Shell>
      <article data-page="pieza" data-caso={caso.slug} data-piece={piece.slug} className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <Crumbs casoTitle={caso.title} casoHref={casoHref} pieceTitle={piece.title} />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{piece.title}</h1>
        <PieceNav casoHref={casoHref} nextHref={nextHref} />

        <section className={SECTION} aria-labelledby="ficha-heading">
          <h2 id="ficha-heading" className={H2}>
            Ficha
          </h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {(
              [
                ["Cliente", piece.clientLabel],
                ["Año", piece.year],
                ["Rol", piece.role],
                ["Qué hice", piece.whatIDid],
              ] as const
            ).map(([term, value]) => (
              <div key={term} className="rounded-xl border border-border bg-card p-4">
                <dt className="text-sm font-semibold text-muted-foreground">{term}</dt>
                <dd className="mt-1 text-base leading-relaxed text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={SECTION} aria-labelledby="contexto-heading">
          <h2 id="contexto-heading" className={H2}>
            Contexto
          </h2>
          <p className="mt-4 text-base leading-relaxed">{piece.context}</p>
        </section>

        <section className={SECTION} aria-labelledby="proceso-heading">
          <h2 id="proceso-heading" className={H2}>
            Proceso
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed">
            {piece.process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className={SECTION} aria-labelledby="seleccion-heading">
          <h2 id="seleccion-heading" className={H2}>
            Selección
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {piece.slides.length} láminas de una selección. No es el archivo completo.
          </p>
          <MockupGallery mockups={slideItems(piece.slides)} language="es" embedded />
        </section>

        <section className={SECTION} aria-labelledby="hallazgos-heading">
          <h2 id="hallazgos-heading" className={H2}>
            Hallazgos
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed">
            {piece.findings.map((finding) => (
              <li key={finding}>
                <TodoText text={finding} />
              </li>
            ))}
          </ul>
        </section>

        <PieceNav casoHref={casoHref} nextHref={nextHref} />
      </article>
    </Shell>
  );
}

export function CasoView({ casoSlug, pieceSlug }: { casoSlug: string; pieceSlug?: string }) {
  if (!pieceSlug) return <CasoIndex slug={casoSlug} />;
  return <CasoPiece casoSlug={casoSlug} pieceSlug={pieceSlug} />;
}

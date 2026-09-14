import { Link } from "react-router-dom";
import { SERVICE_LANDINGS } from "../data/service-landings";
import { ROUTES } from "../lib/routes";

/** IA Hash `#/landings` → HTTP canónico `/servicios/*`. No Ads. */
export default function LandingsHub() {
  const indexable = SERVICE_LANDINGS.filter((l) => l.index && l.slug);
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
        Prototipo
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        El módulo en tu operación
      </h1>
      <p className="mt-4 text-base">
        Mapa interno (`/#/landings`). Google indexa HTTP{" "}
        <a href="/servicios/">/servicios/</a>. La oferta es{" "}
        <Link to={ROUTES.consulting}>/#/consultoria</Link>.
      </p>
      <figure className="mt-8 overflow-hidden rounded-3xl bg-[#0A0A0A] p-4 md:p-8">
        <img
          src="/images/poc-modules/dashboard.png"
          width={1200}
          height={750}
          alt="Prototipo X|CMS · dashboard en el CMS del cliente"
          className="w-full rounded-2xl"
        />
      </figure>
      <p className="mt-6">
        <Link
          className="inline-flex min-h-11 items-center rounded-full bg-foreground px-5 text-background"
          to={ROUTES.consulting}
        >
          Ver prototipo
        </Link>
      </p>
      <ul className="mt-10 space-y-3">
        {indexable.map((l) => (
          <li key={l.id}>
            <a className="underline" href={l.path}>
              {l.h1}
            </a>
            <span className="ml-2 text-sm text-muted-foreground">{l.path}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

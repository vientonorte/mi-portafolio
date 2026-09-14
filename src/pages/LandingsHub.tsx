import { Link } from "react-router-dom";
import { SERVICE_LANDINGS } from "../data/service-landings";
import { ROUTES } from "../lib/routes";

/** IA Hash `#/landings` → HTTP canónico `/servicios/*`. No Ads. */
export default function LandingsHub() {
  const indexable = SERVICE_LANDINGS.filter((l) => l.index && l.slug);
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
        Mapa interno
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Landings de servicios
      </h1>
      <p className="mt-4 text-base">
        Google indexa HTTP <a href="/servicios/">/servicios/</a>. Oferta SEM:{" "}
        <Link to={ROUTES.consulting}>/#/consultoria</Link>. POC Apple:{" "}
        <Link to={ROUTES.consultingModule("dashboard")}>
          /#/consultoria/modulos/dashboard
        </Link>
        .
      </p>
      <p className="mt-6">
        <Link
          className="inline-flex min-h-11 items-center rounded-full bg-foreground px-5 text-background"
          to={ROUTES.consultingModule("dashboard")}
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

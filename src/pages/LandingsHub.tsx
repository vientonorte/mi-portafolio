import { Link } from "react-router-dom";
import { SERVICE_LANDINGS } from "../data/service-landings";
import { ROUTES } from "../lib/routes";

/** IA Hash `#/landings` → HTTP canónico `/servicios/*`. No Ads. */
export default function LandingsHub() {
  const indexable = SERVICE_LANDINGS.filter((l) => l.index && l.slug);
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-muted-foreground">Viento Norte · Chile</p>
      <h1 className="mt-2 text-3xl font-semibold">Landings de servicios</h1>
      <p className="mt-4 text-base">
        Mapa interno (`/#/landings`). Lo que indexa Google es HTTP{" "}
        <a href="/servicios/">/servicios/</a>, no este hash.
      </p>
      <ul className="mt-8 space-y-3">
        {indexable.map((l) => (
          <li key={l.id}>
            <a className="underline" href={l.path}>
              {l.h1}
            </a>
            <span className="ml-2 text-sm text-muted-foreground">{l.path}</span>
          </li>
        ))}
      </ul>
      <p className="mt-10">
        <Link className="underline" to={ROUTES.consulting}>
          Hablemos · consultoría
        </Link>
      </p>
    </main>
  );
}

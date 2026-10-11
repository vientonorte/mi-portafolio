import { placeholdersEnabled } from "../components/marketing/marketing-env";
import { cn } from "../lib/utils";
import { serviciosHref } from "../lib/servicios-links";
import { ServicioPieceCard } from "./ServicioPieceCard";
import { ServiciosCasos } from "./ServiciosCasos";
import { conceptCases, type ConceptCase } from "./servicios-content";


function ConceptCard({ item }: { item: ConceptCase }) {
  // Asset pendiente (p. ej. MASCOTAPP): la card no se renderiza (sin caja placeholder).
  if (!item.image) return null;
  return (
    <ServicioPieceCard
      dataAttr="data-concept"
      id={item.id}
      name={item.name}
      rubro={item.tags.rubro}
      servicio={item.tags.servicio}
      summary={item.summary}
      findings={item.findings}
      image={item.image}
      addressBar={item.addressBar}
      fit={item.mockupFit ?? "cover"}
      pixelScale={item.pixelScale}
    />
  );
}

/** Solo conceptos con portada (Claro, Walmart, Transvip). Sin ninguno, la sección no se renderiza. */
export function ServiciosConceptos({ embedded = false }: { embedded?: boolean }) {
  const visible = conceptCases().filter((item) => item.image || placeholdersEnabled());
  if (visible.length === 0) return null;
  if (embedded) {
    return (
      <div id="conceptos" className="contents">
        {visible.map((item) => (
          <ConceptCard key={item.id} item={item} />
        ))}
      </div>
    );
  }
  // Home: la misma sección Experiencias que /servicios/ (un solo componente), con CTA HTTP a /servicios/#….
  return <ServiciosCasos ctaHref={serviciosHref} />;
}

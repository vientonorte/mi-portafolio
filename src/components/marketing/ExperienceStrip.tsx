import { CompanyLogo } from "../atoms/CompanyLogo";
import { getCompanyLogo } from "../../lib/company-logos";
import { assetUrl, SECTION_TITLE_CLASS } from "./marketing-env";

export interface ExperienceStripProps {
  heading: string;
  /** Mismos nombres que la franja. El wordmark sale del registro que usa /proyectos. */
  names: readonly string[];
}

/** Reescribe el src al BASE_URL de este render (prod o /qa/). */
function experienceLogoSrc(src: string): string {
  const query = src.includes("?") ? src.slice(src.indexOf("?")) : "";
  const match = src.match(/images\/([^?]+)/);
  if (!match) return src;
  return `${assetUrl(`images/${match[1]}`)}${query}`;
}

/** Franja de experiencia de Rö. Wordmarks oficiales; si no hay, el nombre en texto. */
export function ExperienceStrip({ heading, names }: ExperienceStripProps) {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-heading"
      className="border-b border-border/40 bg-background py-8 md:py-10"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2 id="experiencia-heading" className={SECTION_TITLE_CLASS}>
          {heading}
        </h2>
        <ul className="mt-5 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4">
          {names.map((name) => {
            const logo = getCompanyLogo(name);
            const src = logo?.wordmark ? experienceLogoSrc(logo.src) : null;
            return (
              <li
                key={name}
                className="flex min-h-16 items-center justify-center rounded-lg border border-border bg-card px-3 py-2"
              >
                {src ? (
                  <CompanyLogo src={src} alt={name} size="wordmark-md" wordmark flat />
                ) : (
                  <span className="text-center text-base font-semibold text-foreground">{name}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

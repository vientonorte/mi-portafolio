import { portfolioImages } from "./portfolio-image-urls";

type PortfolioImages = typeof portfolioImages;

const overrides = new Map<string, string>();

function setNested(obj: Record<string, unknown>, keys: string[], value: string) {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (typeof current[key] !== "object" || current[key] === null) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}

function clonePortfolioImages(): PortfolioImages {
  return JSON.parse(JSON.stringify(portfolioImages)) as PortfolioImages;
}

let mergedImages: PortfolioImages = clonePortfolioImages();

export function applyImageOverrides(manifest: Record<string, { url?: string; alt?: string }>) {
  overrides.clear();
  mergedImages = clonePortfolioImages();
  const mutable = mergedImages as unknown as Record<string, unknown>;

  for (const [id, meta] of Object.entries(manifest)) {
    if (meta.url) {
      overrides.set(id, meta.url);
      setNested(mutable, id.split("."), meta.url);
    }
  }
}

export function getPortfolioImages(): PortfolioImages {
  return mergedImages;
}

export function resolveImageUrl(id: string, fallback: string): string {
  return overrides.get(id) ?? fallback;
}

export async function fetchAndApplyManifest(apiUrl: string): Promise<void> {
  try {
    const res = await fetch(apiUrl, { credentials: "omit" });
    if (!res.ok) return;
    const data = (await res.json()) as { manifest?: Record<string, { url?: string; alt?: string }> };
    if (data.manifest) applyImageOverrides(data.manifest);
  } catch {
    // Sin worker o sin overrides: se mantienen assets estáticos
  }
}
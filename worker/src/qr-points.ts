// Allowlist estática de puntos QR FRUTA (no KV). Cambiar aquí = PR + deploy.
// Comuna de la estación de Metro de Santiago (fuente: es.wikipedia.org, ficha de cada estación, 27-oct-2026).
export interface QrPoint {
  slug: string;
  label: string;
  comuna: string;
}

export const QR_POINT_DEFS: readonly QrPoint[] = Object.freeze([
  { slug: 'general', label: 'General', comuna: '—' },
  { slug: 'los-leones', label: 'Los Leones', comuna: 'Providencia' },
  { slug: 'u-catolica', label: 'Universidad Católica', comuna: 'Santiago' },
  { slug: 'u-de-chile', label: 'Universidad de Chile', comuna: 'Santiago' },
  { slug: 'los-heroes', label: 'Los Héroes', comuna: 'Santiago' },
  { slug: 'estacion-central', label: 'Estación Central', comuna: 'Estación Central' },
  { slug: 'baquedano', label: 'Baquedano', comuna: 'Providencia' },
  { slug: 'union-latinoamericana', label: 'Unión Latinoamericana', comuna: 'Santiago' },
  { slug: 'las-rejas', label: 'Las Rejas', comuna: 'Estación Central / Lo Prado' },
  { slug: 'pajaritos', label: 'Pajaritos', comuna: 'Lo Prado' },
  { slug: 'san-pablo', label: 'San Pablo', comuna: 'Lo Prado' },
  { slug: 'plaza-de-maipu', label: 'Plaza de Maipú', comuna: 'Maipú' },
  { slug: 'av-matta', label: 'Av. Matta', comuna: '—' },
  { slug: 'compania-morande', label: 'Compañía de Jesús con Morandé', comuna: '—' },
  { slug: 'plaza-de-armas', label: 'Plaza de Armas', comuna: '—' },
  { slug: 'parque-bustamante', label: 'Parque Bustamante', comuna: '—' },
  { slug: 'bellas-artes', label: 'Bellas Artes', comuna: '—' },
  { slug: 'santa-isabel', label: 'Santa Isabel', comuna: '—' },
  { slug: 'irarrazaval', label: 'Irarrázaval', comuna: '—' },
]);

export const QR_POINTS: readonly string[] = Object.freeze(QR_POINT_DEFS.map((p) => p.slug));

// Allowlist estática de puntos QR FRUTA (no KV). Cambiar aquí = PR + deploy.
// Comuna de la estación de Metro de Santiago (fuente: es.wikipedia.org, ficha de cada estación, 27-oct-2026).
export interface QrPoint {
  slug: string;
  label: string;
  comuna: string;
  /** Responsable en terreno. Fuente: /workspace/fruta/afiche/points.json campo `who` (29-oct). */
  who?: 'Rö' | 'Jhordan';
}

export const QR_POINT_DEFS: readonly QrPoint[] = Object.freeze([
  { slug: 'general', label: 'General', comuna: '—' },
  { slug: 'los-leones', label: 'Los Leones', comuna: 'Providencia', who: 'Jhordan' },
  { slug: 'u-catolica', label: 'Universidad Católica', comuna: 'Santiago', who: 'Jhordan' },
  { slug: 'u-de-chile', label: 'Universidad de Chile', comuna: 'Santiago', who: 'Jhordan' },
  { slug: 'los-heroes', label: 'Los Héroes', comuna: 'Santiago', who: 'Jhordan' },
  { slug: 'estacion-central', label: 'Estación Central', comuna: 'Estación Central', who: 'Jhordan' },
  { slug: 'baquedano', label: 'Baquedano', comuna: 'Providencia', who: 'Rö' },
  { slug: 'union-latinoamericana', label: 'Unión Latinoamericana', comuna: 'Santiago', who: 'Rö' },
  { slug: 'las-rejas', label: 'Las Rejas', comuna: 'Estación Central / Lo Prado', who: 'Rö' },
  { slug: 'pajaritos', label: 'Pajaritos', comuna: 'Lo Prado', who: 'Rö' },
  { slug: 'san-pablo', label: 'San Pablo', comuna: 'Lo Prado', who: 'Rö' },
  { slug: 'plaza-de-maipu', label: 'Plaza de Maipú', comuna: 'Maipú', who: 'Rö' },
  { slug: 'av-matta', label: 'Av. Matta', comuna: '—', who: 'Rö' },
  { slug: 'compania-morande', label: 'Compañía de Jesús con Morandé', comuna: '—', who: 'Rö' },
  { slug: 'plaza-de-armas', label: 'Plaza de Armas', comuna: '—', who: 'Rö' },
  { slug: 'parque-bustamante', label: 'Parque Bustamante', comuna: '—', who: 'Rö' },
  { slug: 'bellas-artes', label: 'Bellas Artes', comuna: '—', who: 'Rö' },
  { slug: 'santa-isabel', label: 'Santa Isabel', comuna: '—', who: 'Rö' },
  { slug: 'irarrazaval', label: 'Irarrázaval', comuna: '—', who: 'Rö' },
  // Canal digital: mismo destino (QR_FORM_URL) que los-leones, contador propio.
  { slug: 'facebook', label: 'Facebook', comuna: '—' },
]);

export const QR_POINTS: readonly string[] = Object.freeze(QR_POINT_DEFS.map((p) => p.slug));

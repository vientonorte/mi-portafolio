// Lista documentada de conteos que NO son escaneos de terreno (docs/QR-FRUTA-PRUEBAS.md).
// KV guarda conteos por día (qr:<slug>:<fecha>), así que la exclusión es por slug + fecha.
// status 'prueba' = seguro que es prueba · 'por-confirmar' = mezcla o sin fuente; nunca se adivina.
export const QR_SMOKE_SLUGS_29OCT = Object.freeze([
  'av-matta', 'compania-morande', 'plaza-de-armas',
  'parque-bustamante', 'bellas-artes', 'santa-isabel', 'irarrazaval',
]);

// Rö, 30-oct 11:41: la ÚNICA prueba fue el primer escaneo del 27-oct. Todo lo demás es real.
// Se excluye 1 unidad (count), nunca un día ni un slug completo.
// slug '*' = no se sabe en qué punto cayó: se descuenta solo del total general, no de una fila.
export const QR_EXCLUSIONS = Object.freeze([
  { slug: '*', date: '2026-10-27', count: 1, status: 'prueba', reason: 'Primer escaneo de lanzamiento (Rö, 30-oct).' },
]);

export function exclusionFor(slug, date, list = QR_EXCLUSIONS) {
  return list.find((e) => e.slug === slug && e.date === date) || null;
}

/** Real / prueba de un punto. Solo resta unidades (count) de exclusiones con slug exacto. */
export function splitCounts(p, list = QR_EXCLUSIONS) {
  let prueba = 0;
  for (const [d, n] of Object.entries(p.days || {})) {
    const e = exclusionFor(p.slug, d, list);
    if (e) prueba += Math.min(n, e.count ?? 0);
  }
  return { real: Math.max(0, p.total - prueba), prueba, porConfirmar: 0, conPruebas: p.total };
}

/** Pruebas sin punto conocido (slug '*'): se restan del total general, acotadas a lo contado ese día. */
export function globalTestHits(puntos, list = QR_EXCLUSIONS) {
  return list
    .filter((e) => e.slug === '*')
    .reduce((a, e) => a + Math.min(e.count ?? 0, puntos.reduce((s, p) => s + ((p.days || {})[e.date] || 0), 0)), 0);
}

// Desde el 30-oct los códigos impresos marcan el lugar donde se pegan (decisión de Rö, 29-oct).
export const QR_RELABEL_FROM = '2026-10-30';
export const QR_RELABELS = Object.freeze({
  // MAT: lugar de pegado aún sin definir (por confirmar).
  'av-matta': '—',
  'compania-morande': 'Pajaritos · acceso/boletería',
  'plaza-de-armas': 'Pajaritos · andén',
  'parque-bustamante': 'Pajaritos · salida a buses',
  'bellas-artes': 'Plaza de Maipú · acceso/boletería',
  'santa-isabel': 'Plaza de Maipú · andén',
  irarrazaval: 'Plaza de Maipú · salida a la plaza',
});

export function labelFor(p, today) {
  const nuevo = QR_RELABELS[p.slug];
  if (!nuevo || today < QR_RELABEL_FROM || nuevo === p.label) return { label: p.label, before: null };
  return { label: nuevo, before: p.label };
}

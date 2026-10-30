// Lista documentada de conteos que NO son escaneos de terreno (docs/QR-FRUTA-PRUEBAS.md).
// KV guarda conteos por día (qr:<slug>:<fecha>), así que la exclusión es por slug + fecha.
// status 'prueba' = seguro que es prueba · 'por-confirmar' = mezcla o sin fuente; nunca se adivina.
export const QR_SMOKE_SLUGS_29OCT = Object.freeze([
  'av-matta', 'compania-morande', 'plaza-de-armas',
  'parque-bustamante', 'bellas-artes', 'santa-isabel', 'irarrazaval',
]);

export const QR_EXCLUSIONS = Object.freeze([
  { slug: '*', date: '2026-10-27', status: 'prueba', reason: 'Lanzamiento: todo el 27-oct son pruebas.' },
  ...QR_SMOKE_SLUGS_29OCT.map((slug) => ({
    slug,
    date: '2026-10-29',
    status: 'por-confirmar',
    reason:
      'Smoke del TL 17:58 + aperturas de Rö al pegar afiches (vista previa del link). Rö: solo el primer QR llegó a la encuesta; no se sabe cuál. KV no separa por hora.',
  })),
  {
    slug: 'facebook',
    date: '2026-10-29',
    status: 'por-confirmar',
    reason: 'Pruebas en Facebook: no hay registro de cuántas ni del slug exacto.',
  },
]);

export function exclusionFor(slug, date, list = QR_EXCLUSIONS) {
  return list.find((e) => (e.slug === slug || e.slug === '*') && e.date === date) || null;
}

/** Separa un punto en real / prueba / por confirmar. conPruebas = total contado. */
export function splitCounts(p, list = QR_EXCLUSIONS) {
  let prueba = 0;
  let porConfirmar = 0;
  for (const [d, n] of Object.entries(p.days || {})) {
    const e = exclusionFor(p.slug, d, list);
    if (!e) continue;
    if (e.status === 'prueba') prueba += n;
    else porConfirmar += n;
  }
  // Desfase (total guardado > suma de días): no se sabe de qué día es → por confirmar.
  const sumDays = Object.values(p.days || {}).reduce((a, n) => a + n, 0);
  porConfirmar += Math.max(0, p.total - sumDays);
  const real = Math.max(0, p.total - prueba - porConfirmar);
  return { real, prueba, porConfirmar, conPruebas: p.total };
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

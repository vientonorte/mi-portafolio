// Reporte diario QR FRUTA a Slack (cron, solo [env.qa] por ahora).
// Usa el mismo conteo que /q/stats (readQrStats + exclusiones). Sin SLACK_WEBHOOK_URL no hace nada.
import { readQrStats, santiagoDate } from './qr-fruta.js';
import { exclusionFor, globalTestHits } from './qr-exclusions.js';

/** Real por día = guardado del día − pruebas de ese slug/día − pruebas sin punto ('*') de ese día. */
export function realByDay(puntos) {
  const out = {};
  for (const p of puntos) {
    for (const [d, n] of Object.entries(p.days || {})) {
      const e = exclusionFor(p.slug, d);
      out[d] = (out[d] || 0) + n - (e ? Math.min(n, e.count ?? 0) : 0);
    }
  }
  for (const d of Object.keys(out)) {
    const g = exclusionFor('*', d);
    if (g) out[d] = Math.max(0, out[d] - (g.count ?? 0));
  }
  return out;
}

export function buildSlackText(puntos, now = new Date()) {
  const total = Math.max(0, puntos.reduce((a, p) => a + p.real, 0) - globalTestHits(puntos));
  const porPunto = puntos
    .filter((p) => p.real > 0)
    .sort((a, b) => b.real - a.real)
    .map((p) => `• ${p.label}: ${p.real}`);
  const porDia = Object.entries(realByDay(puntos))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([d, n]) => `• ${d}: ${n}`);
  return [
    `*QR FRUTA · reporte del ${santiagoDate(now)}*`,
    `Escaneos reales: *${total}*`,
    'Ya sin pruebas. Conteo aproximado.',
    '',
    '*Por punto*',
    ...(porPunto.length ? porPunto : ['• Sin escaneos aún']),
    '',
    '*Por día*',
    ...(porDia.length ? porDia : ['• Sin escaneos aún']),
  ].join('\n');
}

/** Devuelve true si envió. Nunca lanza: un error de Slack no debe romper el cron. */
export async function sendQrSlackReport(env, now = new Date(), fetchImpl = fetch) {
  if (!env || !env.SLACK_WEBHOOK_URL) return false;
  try {
    const puntos = await readQrStats(env);
    const res = await fetchImpl(env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: buildSlackText(puntos, now) }),
    });
    return !!res && res.ok;
  } catch {
    return false;
  }
}

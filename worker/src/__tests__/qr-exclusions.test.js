import { describe, it, expect } from 'vitest';
import worker from '../index.js';
import { splitCounts, exclusionFor, labelFor, globalTestHits, QR_EXCLUSIONS } from '../api/qr-exclusions.js';
import { renderStatsHtml, renderHome } from '../api/qr-fruta.js';

describe('QR exclusiones', () => {
  it('ningún día ni slug completo queda excluido', () => {
    for (const s of ['los-leones', 'general', 'san-pablo', 'av-matta', 'facebook'])
      for (const d of ['2026-10-27', '2026-10-28', '2026-10-29']) expect(exclusionFor(s, d)).toBeNull();
  });
  it('única exclusión: 1 unidad del 27-oct', () => {
    expect(QR_EXCLUSIONS).toHaveLength(1);
    expect(QR_EXCLUSIONS[0]).toMatchObject({ slug: '*', date: '2026-10-27', count: 1, status: 'prueba' });
  });
  it('splitCounts deja todo real por punto', () => {
    const r = splitCounts({ slug: 'av-matta', total: 10, days: { '2026-10-27': 3, '2026-10-29': 4, '2026-10-30': 3 } });
    expect(r).toEqual({ real: 10, prueba: 0, porConfirmar: 0, conPruebas: 10 });
  });
  it('splitCounts con slug exacto resta solo count', () => {
    const list = [{ slug: 'x', date: '2026-10-27', count: 1, status: 'prueba', reason: 't' }];
    expect(splitCounts({ slug: 'x', total: 5, days: { '2026-10-27': 3, '2026-10-28': 2 } }, list).real).toBe(4);
  });
  it('total general resta 1 solo si hubo conteo el 27-oct', () => {
    const pts = [{ slug: 'a', total: 4, days: { '2026-10-27': 2, '2026-10-29': 2 } }, { slug: 'b', total: 3, days: { '2026-10-28': 3 } }];
    expect(globalTestHits(pts)).toBe(1);
    expect(globalTestHits([{ slug: 'b', total: 3, days: { '2026-10-28': 3 } }])).toBe(0);
    const html = renderStatsHtml(pts.map((p) => ({ ...p, label: p.slug, comuna: '—' })));
    expect(html).toMatch(/id="total-real">6</);
    expect(html).toMatch(/id="total-con-pruebas">7</);
  });
  it('etiquetas nuevas solo desde 30-oct', () => {
    const p = { slug: 'compania-morande', label: 'Compañía de Jesús con Morandé' };
    expect(labelFor(p, '2026-10-29').label).toBe(p.label);
    expect(labelFor(p, '2026-10-30')).toEqual({ label: 'Pajaritos · acceso/boletería', before: p.label });
  });
});

describe('QR 7 códigos nuevos (desde 30-oct)', () => {
  it('MAT CMO PZA PBU BEA SIS IRZ con su lugar; baquedano mantiene nombre', async () => {
    const { QR_RELABELS } = await import('../api/qr-exclusions.js');
    expect(QR_RELABELS).toEqual({
      'av-matta': '—',
      'compania-morande': 'Pajaritos · acceso/boletería',
      'plaza-de-armas': 'Pajaritos · andén',
      'parque-bustamante': 'Pajaritos · salida a buses',
      'bellas-artes': 'Plaza de Maipú · acceso/boletería',
      'santa-isabel': 'Plaza de Maipú · andén',
      irarrazaval: 'Plaza de Maipú · salida a la plaza',
    });
    expect(labelFor({ slug: 'av-matta', label: 'Av. Matta' }, '2026-10-30')).toEqual({ label: '—', before: 'Av. Matta' });
    expect(labelFor({ slug: 'baquedano', label: 'Baquedano' }, '2026-10-30')).toEqual({ label: 'Baquedano', before: null });
  });
});

describe('QR vista accesible', () => {
  const pts = [{ slug: 'irarrazaval', label: 'Irarrázaval', comuna: '—', who: 'Rö', total: 5, days: { '2026-10-29': 2, '2026-10-30': 3 }, real: 3, prueba: 0, porConfirmar: 2 }];
  it('muestra total real y con pruebas, skip link y landmarks', () => {
    const html = renderStatsHtml(pts, new Date('2026-10-30T15:00:00Z'));
    expect(html).toMatch(/id="total-real">3</);
    expect(html).toMatch(/id="total-con-pruebas">5</);
    expect(html).toMatch(/id="total-por-confirmar">2</);
    expect(html).toContain('class="skip" href="#contenido"');
    expect(html).toContain('<main id="contenido"');
    expect(html).toContain('<nav aria-label="Principal">');
    expect(html).toContain('Plaza de Maipú · salida a la plaza');
    expect(html).toContain('Puntos de Rö');
  });
  it('portada enlaza al formulario sin clave', async () => {
    const res = await worker.fetch(new Request('https://contact.vientonorte.io/'), {}, { waitUntil() {} });
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain('href="/q/stats"');
    expect(html).not.toMatch(/[?&]k=/);
    expect(renderHome()).toContain('<header>');
  });
  it('/stats redirige a /q/stats sin reenviar la clave', async () => {
    const res = await worker.fetch(new Request('https://contact.vientonorte.io/stats?k=secreto'), {}, { waitUntil() {} });
    expect(res.status).toBe(302);
    expect(res.headers.get('Location')).toBe('/q/stats');
  });
});

describe('QR fixture ficticio que imita el KV del 30-oct (59 guardados)', () => {
  // Ficticio: solo replica las sumas por día (27: 31, 28: 4, 29: 23) y el desfase de facebook (total 5, día 4).
  const pts = [
    { slug: 'f27', total: 31, days: { '2026-10-27': 31 } },
    { slug: 'f28', total: 4, days: { '2026-10-28': 4 } },
    { slug: 'f29', total: 19, days: { '2026-10-29': 19 } },
    { slug: 'facebook', total: Math.max(5, 4), days: { '2026-10-29': 4 } },
  ].map((p) => ({ ...p, label: p.slug, comuna: '—' }));
  it('Total real 58 y con pruebas 59', () => {
    const html = renderStatsHtml(pts);
    expect(html).toMatch(/id="total-real">58</);
    expect(html).toMatch(/id="total-con-pruebas">59</);
  });
});

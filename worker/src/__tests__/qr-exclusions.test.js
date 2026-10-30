import { describe, it, expect } from 'vitest';
import worker from '../index.js';
import { splitCounts, exclusionFor, labelFor, QR_EXCLUSIONS } from '../api/qr-exclusions.js';
import { renderStatsHtml, renderHome } from '../api/qr-fruta.js';

describe('QR exclusiones', () => {
  it('27-oct completo es prueba en cualquier punto', () => {
    expect(exclusionFor('los-leones', '2026-10-27').status).toBe('prueba');
    expect(exclusionFor('general', '2026-10-28')).toBeNull();
  });
  it('29-oct en los 7 nuevos + facebook queda por confirmar; puntos de Jhordan no', () => {
    for (const s of ['av-matta', 'compania-morande', 'irarrazaval', 'facebook']) expect(exclusionFor(s, '2026-10-29').status).toBe('por-confirmar');
    expect(exclusionFor('los-leones', '2026-10-29')).toBeNull();
    expect(exclusionFor('baquedano', '2026-10-29')).toBeNull();
  });
  it('cada exclusión tiene slug, fecha y motivo', () => {
    for (const e of QR_EXCLUSIONS) expect(e.slug && /^\d{4}-\d{2}-\d{2}$/.test(e.date) && e.reason).toBeTruthy();
  });
  it('splitCounts separa real / prueba / por confirmar', () => {
    const r = splitCounts({ slug: 'av-matta', total: 10, days: { '2026-10-27': 3, '2026-10-29': 4, '2026-10-30': 3 } });
    expect(r).toEqual({ real: 3, prueba: 3, porConfirmar: 4, conPruebas: 10 });
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

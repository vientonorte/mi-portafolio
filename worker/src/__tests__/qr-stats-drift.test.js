import { describe, expect, it } from 'vitest';
import worker from '../index.js';
import { readQrStats, santiagoDate } from '../api/qr-fruta.js';

function makeKv(init = {}) {
  const store = new Map(Object.entries(init));
  return {
    store,
    async get(k) { return store.has(k) ? store.get(k) : null; },
    async put(k, v) { store.set(k, v); },
    async list({ prefix = '' } = {}) {
      return { keys: [...store.keys()].filter((k) => k.startsWith(prefix)).map((name) => ({ name })), list_complete: true };
    },
  };
}
const BASE = 'https://contact.vientonorte.io';
const VIEW = 'v'.repeat(43);

describe('QR conteo por punto + desfase total/día', () => {
  const slugs = ['los-leones', 'u-catolica', 'u-de-chile', 'los-heroes', 'estacion-central', 'facebook'];

  it.each(slugs)('%s cuenta total y día (fecha Chile), sin cruzar con otros', async (slug) => {
    const env = { ADMIN_KV: makeKv() };
    for (let i = 0; i < 3; i++) {
      const pending = [];
      const res = await worker.fetch(new Request(`${BASE}/q/${slug}`), env, { waitUntil: (p) => pending.push(p) });
      expect(res.status).toBe(302);
      await Promise.all(pending);
    }
    const day = santiagoDate();
    expect(env.ADMIN_KV.store.get(`qr:${slug}:total`)).toBe('3');
    expect(env.ADMIN_KV.store.get(`qr:${slug}:${day}`)).toBe('3');
    const others = [...env.ADMIN_KV.store.keys()].filter((k) => !k.startsWith(`qr:${slug}:`));
    expect(others).toEqual([]);
  });

  it('fecha Chile: 02:30 UTC del 30-oct sigue siendo 29-oct en Santiago', () => {
    expect(santiagoDate(new Date('2026-10-30T02:30:00Z'))).toBe('2026-10-29');
  });

  it('total corto o día corto → muestra el máximo y expone drift', async () => {
    const env = { ADMIN_KV: makeKv({ 'qr:facebook:total': '5', 'qr:facebook:2026-10-29': '4', 'qr:general:total': '1', 'qr:general:2026-10-28': '2' }) };
    const st = Object.fromEntries((await readQrStats(env)).map((p) => [p.slug, p]));
    expect(st.facebook.total).toBe(5);
    expect(st.facebook.drift).toBe(1);
    expect(st.general.total).toBe(2);
    expect(st.general.drift).toBe(-1);
  });

  it('ver /q/stats no incrementa contadores', async () => {
    const env = { ADMIN_KV: makeKv({ 'qr:facebook:total': '1' }), QR_VIEW_KEY: VIEW };
    const res = await worker.fetch(new Request(`${BASE}/q/stats?k=${VIEW}`), env, { waitUntil() {} });
    expect(res.status).toBe(200);
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    expect(env.ADMIN_KV.store.get('qr:facebook:total')).toBe('1');
    expect(env.ADMIN_KV.store.size).toBe(1);
  });
});

import { describe, expect, it } from 'vitest';
import { env } from 'cloudflare:test';
import { call, clearKv } from './helpers.js';

const CONTACTO = 'https://vientonorte.io/contacto/';
const HOME = 'https://vientonorte.io/';

function kvThatThrows() {
  const trap = () => {
    throw new Error('KV no debe usarse en rutas QR retiradas');
  };
  return { get: trap, put: trap, delete: trap, list: trap };
}

describe('QR retirado (fetch real + KV Miniflare)', () => {
  it('/q/<id> → 301 a /contacto/ sin query y sin operaciones de KV', async () => {
    await clearKv();
    await env.ADMIN_KV.put('qr:general:total', '9');
    const res = await call('/q/general?k=clave-de-vista&format=json', {
      origin: null,
      envOverrides: { ADMIN_KV: kvThatThrows() },
    });
    expect(res.status).toBe(301);
    expect(res.headers.get('Location')).toBe(CONTACTO);
    expect(await env.ADMIN_KV.get('qr:general:total')).toBe('9');
    const listed = await env.ADMIN_KV.list();
    expect(listed.keys.map((k) => k.name)).toEqual(['qr:general:total']);
  });

  it('GET / → 301 a https://vientonorte.io/ sin reenviar la query', async () => {
    await clearKv();
    const res = await call('/?k=clave-de-vista', {
      origin: null,
      envOverrides: { ADMIN_KV: kvThatThrows() },
    });
    expect(res.status).toBe(301);
    expect(res.headers.get('Location')).toBe(HOME);
    expect((await env.ADMIN_KV.list()).keys).toHaveLength(0);
  });

  it('/stats → 410 y no toca KV', async () => {
    await clearKv();
    const res = await call('/stats?k=clave-de-vista', {
      origin: null,
      envOverrides: { ADMIN_KV: kvThatThrows() },
    });
    expect(res.status).toBe(410);
    expect(res.headers.get('Location')).toBeNull();
    expect((await env.ADMIN_KV.list()).keys).toHaveLength(0);
  });
});

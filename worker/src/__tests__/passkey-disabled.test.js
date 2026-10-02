import { describe, expect, it, vi } from 'vitest';
import worker from '../index.js';

// HOTFIX C1: todas las rutas /api/admin/auth/passkey/* deben responder 404
// antes de que corra cualquier handler (no se toca ADMIN_KV).
const PASSKEY_ROUTES = [
  '/api/admin/auth/passkey/register/begin',
  '/api/admin/auth/passkey/register/finish',
  '/api/admin/auth/passkey/login/begin',
  '/api/admin/auth/passkey/login/finish',
];

const ORIGINS = [null, 'https://vientonorte.io'];

function makeEnv() {
  const kv = {
    get: vi.fn(async () => null),
    put: vi.fn(async () => {}),
    delete: vi.fn(async () => {}),
    list: vi.fn(async () => ({ keys: [] })),
  };
  return {
    kv,
    env: {
      ADMIN_KV: kv,
      ALLOWED_ORIGIN: 'https://vientonorte.io',
      SESSION_SECRET: 'test-secret',
    },
  };
}

function makeRequest(path, method, origin) {
  const headers = { 'Content-Type': 'application/json' };
  if (origin) headers.Origin = origin;
  return new Request(`https://contact.vientonorte.io${path}`, {
    method,
    headers,
    body: method === 'POST' ? JSON.stringify({ id: 'x', rawId: 'x', response: {} }) : undefined,
  });
}

describe('passkey routes disabled (C1 hotfix)', () => {
  for (const path of PASSKEY_ROUTES) {
    for (const method of ['GET', 'POST']) {
      for (const origin of ORIGINS) {
        it(`${method} ${path} → 404 (origin: ${origin ?? 'none'})`, async () => {
          const { env, kv } = makeEnv();
          const res = await worker.fetch(makeRequest(path, method, origin), env);
          expect(res.status).toBe(404);
          expect(res.headers.get('Set-Cookie')).toBeNull();
          expect(await res.json()).toEqual({ ok: false, error: 'Not found' });
          expect(kv.get).not.toHaveBeenCalled();
          expect(kv.put).not.toHaveBeenCalled();
          expect(kv.delete).not.toHaveBeenCalled();
        });
      }
    }
  }

  it('non-passkey admin auth routes are still routed (session GET without cookie → 200 ok:false)', async () => {
    const { env } = makeEnv();
    const res = await worker.fetch(
      makeRequest('/api/admin/auth/session', 'GET', 'https://vientonorte.io'),
      env
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: false });
  });
});

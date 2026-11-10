import { describe, expect, it, vi } from 'vitest';
import worker from '../index.js';

const BASE = 'https://contact.vientonorte.io';

const CONTACTO = 'https://vientonorte.io/contacto/';
const HOME = 'https://vientonorte.io/';

const QR_PATHS = [
  '/q',
  '/q/',
  '/q/general',
  '/q/general/',
  '/q/facebook',
  '/q/los-leones',
  '/q/baquedano',
  '/q/irarrazaval',
  '/q/otro',
  '/q/stats',
  '/q/stats/',
  '/q/stats?k=clave-de-vista',
  '/q/stats?k=clave-de-vista&format=json',
  '/q/stats?format=html',
  '/q/general?k=clave-de-vista&p=entry.1%3Dx',
];

const STATS_PATHS = ['/stats', '/stats/', '/stats?k=clave-de-vista'];

function makeKv() {
  const store = new Map();
  return {
    store,
    get: vi.fn(async (key) => store.get(key) ?? null),
    put: vi.fn(async (key, value) => {
      store.set(key, value);
    }),
    delete: vi.fn(async (key) => {
      store.delete(key);
    }),
    list: vi.fn(async () => ({
      keys: [...store.keys()].map((name) => ({ name })),
      list_complete: true,
    })),
  };
}

function makeEnv(kv = makeKv()) {
  return {
    kv,
    env: {
      ADMIN_KV: kv,
      ALLOWED_ORIGIN: 'https://vientonorte.io',
      CONTACT_INBOX: 'inbox@vientonorte.test',
      CONTACT_FROM: 'contacto@vientonorte.io',
      CONTACT_FROM_NAME: 'Viento Norte',
      QR_VIEW_KEY: 'view-key-must-not-authorize',
      QR_STATS_TOKEN: 'admin-token-must-not-authorize',
    },
  };
}

const ctx = { waitUntil() {} };

function call(path, { method = 'GET', headers = {}, body } = {}, env) {
  return worker.fetch(
    new Request(BASE + path, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
    env,
    ctx
  );
}

function expectNoKv(kv) {
  expect(kv.get).not.toHaveBeenCalled();
  expect(kv.put).not.toHaveBeenCalled();
  expect(kv.delete).not.toHaveBeenCalled();
  expect(kv.list).not.toHaveBeenCalled();
  expect([...kv.store.keys()]).toEqual([]);
}

describe('QR FRUTA retirado', () => {
  it.each(QR_PATHS)('GET %s → 301 a /contacto/ sin query y sin KV', async (path) => {
    const { env, kv } = makeEnv();
    const res = await call(path, {}, env);
    expect(res.status).toBe(301);
    expect(res.headers.get('Location')).toBe(CONTACTO);
    expectNoKv(kv);
  });

  it.each(['POST', 'OPTIONS', 'PUT'])('%s /q/stats → 301 sin reenviar la clave ni tocar KV', async (method) => {
    const { env, kv } = makeEnv();
    const res = await call(
      '/q/stats?k=clave-de-vista',
      {
        method,
        headers: {
          Authorization: 'Bearer admin-token-must-not-authorize',
          Accept: 'text/html',
          Origin: 'https://vientonorte.io',
        },
      },
      env
    );
    expect(res.status).toBe(301);
    expect(res.headers.get('Location')).toBe(CONTACTO);
    expectNoKv(kv);
  });

  it.each(STATS_PATHS)('GET %s → 410 y no escribe KV', async (path) => {
    const { env, kv } = makeEnv();
    const res = await call(path, {}, env);
    expect(res.status).toBe(410);
    expect(res.headers.get('Location')).toBeNull();
    expect(res.headers.get('Cache-Control')).toBe('no-store');
    expectNoKv(kv);
  });

  it('GET / → 301 al home público, sin reenviar la query', async () => {
    const { env, kv } = makeEnv();
    const res = await call('/?k=clave-de-vista', {}, env);
    expect(res.status).toBe(301);
    expect(res.headers.get('Location')).toBe(HOME);
    expectNoKv(kv);
  });

  it('POST / no es el redirect de GET /', async () => {
    const { env } = makeEnv();
    const res = await call('/', { method: 'POST', headers: { Origin: 'https://vientonorte.io' } }, env);
    expect(res.status).not.toBe(301);
    expect(res.headers.get('Location')).toBeNull();
  });

  it('rutas que no eran QR no caen en el 301 ni en el 410', async () => {
    const { env } = makeEnv();
    const queue = await call('/queue', { headers: { Origin: 'https://vientonorte.io' } }, env);
    expect(queue.status).toBe(404);
    expect(queue.headers.get('Access-Control-Allow-Origin')).toBe('https://vientonorte.io');

    const statsExtra = await call('/stats/extra', { headers: { Origin: 'https://vientonorte.io' } }, env);
    expect(statsExtra.status).toBe(404);
  });
});

describe('health y contact siguen', () => {
  it('GET /api/health → 200', async () => {
    const { env } = makeEnv();
    const res = await call('/api/health', { headers: { Origin: 'https://vientonorte.io' } }, env);
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://vientonorte.io');
    const body = await res.json();
    expect(body).toMatchObject({ ok: true, service: 'vientonorte-api', kv: true });
    expect(Number.isNaN(Date.parse(body.time))).toBe(false);
  });

  it('POST /api/contact sigue guardando el lead y avisando por EMAIL', async () => {
    const { env, kv } = makeEnv();
    const send = vi.fn().mockResolvedValue(undefined);
    env.EMAIL = { send };
    const res = await call(
      '/api/contact',
      {
        method: 'POST',
        headers: { Origin: 'https://vientonorte.io', 'Content-Type': 'application/json' },
        body: {
          name: 'Ana Prueba',
          email: 'ana@empresa.cl',
          message: 'Quiero una auditoría de accesibilidad.',
          consent: true,
          formStartedAt: Date.now() - 10_000,
        },
      },
      env
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toMatchObject({ ok: true, emailed: true });
    expect(data.leadId).toMatch(/^lead_/);
    expect(send).toHaveBeenCalled();
    expect([...kv.store.keys()].some((key) => key.startsWith('qr:'))).toBe(false);
    expect(kv.store.has('vn:leads')).toBe(true);
  });
});

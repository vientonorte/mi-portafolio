/**
 * H2 · anti-bot en POST /api/contact (revisión de seguridad 2026-10-02).
 *
 * - Rate limit por IP en KV (prefijo `rl:contact:`, IP hasheada) → 429.
 * - Honeypot `_gotcha` lleno → se descarta en silencio con respuesta neutra
 *   (misma forma que un envío real), sin correo, sin KV de leads, sin GA4.
 * - Tiempo mínimo de llenado con `formStartedAt` del frontend → 400.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { handleContact } from '../contact.js';
import worker from '../index.js';

const CORS = { 'Access-Control-Allow-Origin': 'https://vientonorte.io' };
const IP = '203.0.113.7';

function makeKv() {
  const store = new Map();
  return {
    store,
    get: vi.fn(async (key) => store.get(key) ?? null),
    put: vi.fn(async (key, value) => {
      store.set(key, value);
    }),
  };
}

function body(extra = {}) {
  return {
    name: 'Ana Prueba',
    email: 'ana@empresa.test',
    message: 'Quiero una auditoría de accesibilidad para mi sitio.',
    consent: true,
    formStartedAt: Date.now() - 10_000,
    ...extra,
  };
}

function makeRequest(payload, ip = IP, url = 'https://contact.vientonorte.io/api/contact') {
  return new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CF-Connecting-IP': ip,
      Origin: 'https://vientonorte.io',
    },
    body: JSON.stringify(payload),
  });
}

function makeEnv(overrides = {}) {
  return {
    ADMIN_KV: makeKv(),
    CONTACT_INBOX: 'inbox@vientonorte.test',
    EMAIL: { send: vi.fn().mockResolvedValue({ messageId: 'm' }) },
    ALLOWED_ORIGIN: 'https://vientonorte.io',
    ...overrides,
  };
}

function leads(env) {
  return JSON.parse(env.ADMIN_KV.store.get('vn:leads') || '[]');
}

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: 'true' }), { status: 200 }))
  );
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('H2 · rate limit por IP (KV)', () => {
  it('5 envíos por IP en la ventana pasan; el 6.º recibe 429 con Retry-After y no manda correo', async () => {
    const env = makeEnv();
    for (let i = 0; i < 5; i += 1) {
      const res = await handleContact(makeRequest(body()), env, CORS);
      expect(res.status).toBe(200);
    }
    const sendsBefore = env.EMAIL.send.mock.calls.length;
    const fetchesBefore = globalThis.fetch.mock.calls.length;
    const res = await handleContact(makeRequest(body()), env, CORS);
    expect(res.status).toBe(429);
    expect(Number(res.headers.get('Retry-After'))).toBeGreaterThan(0);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://vientonorte.io');
    expect((await res.json()).ok).toBe(false);
    expect(env.EMAIL.send.mock.calls.length).toBe(sendsBefore);
    expect(globalThis.fetch.mock.calls.length).toBe(fetchesBefore);
    expect(leads(env)).toHaveLength(5);
  });

  it('otra IP no comparte el contador', async () => {
    const env = makeEnv();
    for (let i = 0; i < 6; i += 1) await handleContact(makeRequest(body()), env, CORS);
    const res = await handleContact(makeRequest(body(), '198.51.100.9'), env, CORS);
    expect(res.status).toBe(200);
  });

  it('la clave KV usa el prefijo rl:contact:, no guarda la IP en claro y expira', async () => {
    const env = makeEnv();
    await handleContact(makeRequest(body()), env, CORS);
    const rlCalls = env.ADMIN_KV.put.mock.calls.filter(([key]) => key.startsWith('rl:contact:'));
    expect(rlCalls).toHaveLength(1);
    const [key, , opts] = rlCalls[0];
    expect(key).not.toContain(IP);
    expect(opts.expirationTtl).toBeGreaterThanOrEqual(60);
  });

  it('respeta CONTACT_RATE_LIMIT / CONTACT_RATE_WINDOW_SEC de env', async () => {
    const env = makeEnv({ CONTACT_RATE_LIMIT: '2', CONTACT_RATE_WINDOW_SEC: '60' });
    expect((await handleContact(makeRequest(body()), env, CORS)).status).toBe(200);
    expect((await handleContact(makeRequest(body()), env, CORS)).status).toBe(200);
    expect((await handleContact(makeRequest(body()), env, CORS)).status).toBe(429);
  });

  it('usa RATE_LIMIT_KV si existe (wrangler.contact.toml no tiene ADMIN_KV)', async () => {
    const rl = makeKv();
    const env = makeEnv({ ADMIN_KV: undefined, RATE_LIMIT_KV: rl, CONTACT_RATE_LIMIT: '1' });
    expect((await handleContact(makeRequest(body()), env, CORS)).status).toBe(200);
    expect((await handleContact(makeRequest(body()), env, CORS)).status).toBe(429);
    expect([...rl.store.keys()].every((k) => k.startsWith('rl:contact:'))).toBe(true);
  });

  it('los intentos con honeypot también consumen cupo', async () => {
    const env = makeEnv({ CONTACT_RATE_LIMIT: '2' });
    await handleContact(makeRequest(body({ _gotcha: 'x' })), env, CORS);
    await handleContact(makeRequest(body({ _gotcha: 'x' })), env, CORS);
    const res = await handleContact(makeRequest(body()), env, CORS);
    expect(res.status).toBe(429);
  });

  it('el router (index.js) aplica el límite en POST /api/contact', async () => {
    const env = makeEnv({ CONTACT_RATE_LIMIT: '1' });
    expect((await worker.fetch(makeRequest(body()), env)).status).toBe(200);
    const res = await worker.fetch(makeRequest(body()), env);
    expect(res.status).toBe(429);
  });
});

describe('H2 · honeypot', () => {
  it('honeypot lleno → 200 neutro con la misma forma que un envío real, sin correo ni lead ni GA4', async () => {
    const real = await handleContact(makeRequest(body()), makeEnv(), CORS);
    const realData = await real.json();

    globalThis.fetch.mockClear();
    const env = makeEnv({ GA4_MEASUREMENT_ID: 'G-TEST', GA4_MP_API_SECRET: 's' });
    const res = await handleContact(makeRequest(body({ _gotcha: 'https://spam.example' })), env, CORS);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Object.keys(data).sort()).toEqual(Object.keys(realData).sort());
    expect(data.ok).toBe(true);
    expect(typeof data.leadId).toBe('string');
    expect(env.EMAIL.send).not.toHaveBeenCalled();
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(leads(env)).toHaveLength(0);
  });
});

describe('H2 · tiempo mínimo de llenado', () => {
  const cases = [
    ['demasiado rápido (500 ms)', () => Date.now() - 500],
    ['sin formStartedAt', () => undefined],
    ['en el futuro', () => Date.now() + 60_000],
    ['más de 24 h', () => Date.now() - 25 * 60 * 60 * 1000],
    ['no numérico', () => 'ayer'],
  ];
  for (const [label, ts] of cases) {
    it(`${label} → 400 sin correo ni lead`, async () => {
      const env = makeEnv();
      const res = await handleContact(makeRequest(body({ formStartedAt: ts() })), env, CORS);
      expect(res.status).toBe(400);
      expect((await res.json()).ok).toBe(false);
      expect(env.EMAIL.send).not.toHaveBeenCalled();
      expect(globalThis.fetch).not.toHaveBeenCalled();
      expect(leads(env)).toHaveLength(0);
    });
  }

  it('acepta un envío humano (10 s) y respeta CONTACT_MIN_FILL_MS', async () => {
    expect((await handleContact(makeRequest(body()), makeEnv(), CORS)).status).toBe(200);
    const env = makeEnv({ CONTACT_MIN_FILL_MS: '20000' });
    expect((await handleContact(makeRequest(body()), env, CORS)).status).toBe(400);
  });
});

describe('H2 · config wrangler', () => {
  const here = dirname(fileURLToPath(import.meta.url));
  for (const file of ['wrangler.toml', 'wrangler.contact.toml']) {
    it(`${file}: declara límite, ventana y tiempo mínimo`, () => {
      const toml = readFileSync(resolve(here, '../../', file), 'utf8');
      expect(toml).toMatch(/CONTACT_RATE_LIMIT\s*=\s*"\d+"/);
      expect(toml).toMatch(/CONTACT_RATE_WINDOW_SEC\s*=\s*"\d+"/);
      expect(toml).toMatch(/CONTACT_MIN_FILL_MS\s*=\s*"\d+"/);
    });
  }
  it('wrangler.contact.toml tiene un KV para el rate limit', () => {
    const toml = readFileSync(resolve(here, '../../wrangler.contact.toml'), 'utf8');
    expect(toml).toMatch(/binding\s*=\s*"RATE_LIMIT_KV"/);
  });
});

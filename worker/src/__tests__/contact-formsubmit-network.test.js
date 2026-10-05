import { afterEach, describe, expect, it, vi } from 'vitest';
import { handleContact } from '../contact.js';

/**
 * Si el fetch a FormSubmit lanza (error de red), /api/contact no debe
 * responder 500: cae al binding EMAIL de Cloudflare.
 */
const CORS = { 'Access-Control-Allow-Origin': '*' };

function makeRequest() {
  return new Request('https://contact.vientonorte.io/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Ana Prueba',
      email: 'ana@empresa.cl',
      message: 'Quiero una auditoría de accesibilidad.',
      consent: true,
      // Inofensivo sin H2; con H2 (#303) pasa el tiempo mínimo de llenado.
      formStartedAt: Date.now() - 10_000,
    }),
  });
}

function makeKv() {
  const store = new Map();
  return {
    get: vi.fn(async (key) => store.get(key) ?? null),
    put: vi.fn(async (key, value) => {
      store.set(key, value);
    }),
  };
}

describe('handleContact · FormSubmit con error de red', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('cae a EMAIL (Cloudflare) y responde 200 en vez de 500', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetchMock = vi.fn().mockRejectedValue(new TypeError('Network connection lost.'));
    vi.stubGlobal('fetch', fetchMock);
    const send = vi.fn().mockResolvedValue(undefined);
    const env = {
      ADMIN_KV: makeKv(),
      EMAIL: { send },
      CONTACT_INBOX: 'inbox@vientonorte.test',
    };

    const res = await handleContact(makeRequest(), env, CORS);
    const data = await res.json();

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('formsubmit.co/ajax/'),
      expect.anything()
    );
    expect(res.status).toBe(200);
    expect(data).toMatchObject({ ok: true, emailed: true });
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: 'inbox@vientonorte.test' }));
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanLandingPath, cleanUtm, handleContact } from '../contact.js';
import { buildAdminEmail } from '../lib/email-templates.js';

const CORS = { 'Access-Control-Allow-Origin': '*' };

const BASE = {
  name: 'Ana Prueba',
  email: 'ana@empresa.cl',
  message: 'Quiero una auditoría de accesibilidad.',
  consent: true,
  intent: 'consulting',
  source: 'servicios',
};

function makeRequest(body) {
  return new Request('https://contact.vientonorte.io/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

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

async function submit(body, envOverrides = {}) {
  const kv = makeKv();
  const env = { ADMIN_KV: kv, ...envOverrides };
  const res = await handleContact(makeRequest(body), env, CORS);
  const leads = JSON.parse(kv.store.get('vn:leads') || '[]');
  return { res, data: await res.json(), lead: leads[0], env };
}

describe('handleContact · atribución UTM + landing_path', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: 'true' }), { status: 200 }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('acepta el payload viejo sin campos de atribución y guarda strings vacíos', async () => {
    const { res, data, lead } = await submit(BASE);
    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.leadId).toBe(lead.id);
    expect(lead).toMatchObject({
      name: 'Ana Prueba',
      email: 'ana@empresa.cl',
      intent: 'consulting',
      source: 'servicios',
      channel: 'contact',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      landing_path: '',
    });
  });

  it('guarda utm_source, utm_medium, utm_campaign y landing_path', async () => {
    const { res, lead } = await submit({
      ...BASE,
      utm_source: '  linkedin ',
      utm_medium: 'paid_social',
      utm_campaign: 'servicios-2026.q4~a',
      landing_path: ' /servicios/#contacto ',
    });
    expect(res.status).toBe(200);
    expect(lead.utm_source).toBe('linkedin');
    expect(lead.utm_medium).toBe('paid_social');
    expect(lead.utm_campaign).toBe('servicios-2026.q4~a');
    expect(lead.landing_path).toBe('/servicios/#contacto');
  });

  it('recorta utm a 100 y landing_path a 200', async () => {
    const { lead } = await submit({
      ...BASE,
      utm_source: 'a'.repeat(150),
      utm_medium: 'b'.repeat(100),
      utm_campaign: 'c'.repeat(101),
      landing_path: `/${'p'.repeat(300)}`,
    });
    expect(lead.utm_source).toHaveLength(100);
    expect(lead.utm_medium).toHaveLength(100);
    expect(lead.utm_campaign).toHaveLength(100);
    expect(lead.landing_path).toHaveLength(200);
    expect(lead.landing_path.startsWith('/')).toBe(true);
  });

  it('descarta caracteres fuera de la allowlist y deja vacío lo que no sobrevive', async () => {
    const { res, lead } = await submit({
      ...BASE,
      utm_source: 'goo<script>gle',
      utm_medium: 'c p c',
      utm_campaign: '<>"\'%$',
      landing_path: '/servicios/<img src=x>?utm_source=x&email=a',
    });
    expect(res.status).toBe(200);
    expect(lead.utm_source).toBe('gooscriptgle');
    expect(lead.utm_medium).toBe('cpc');
    expect(lead.utm_campaign).toBe('');
    expect(lead.landing_path).toBe('/servicios/imgsrcx');
  });

  it('rechaza landing_path que no empieza con / y valores que no son string', async () => {
    const { lead } = await submit({
      ...BASE,
      utm_source: 123,
      utm_medium: { x: 1 },
      utm_campaign: null,
      landing_path: 'https://evil.example/servicios',
    });
    expect(lead.utm_source).toBe('');
    expect(lead.utm_medium).toBe('');
    expect(lead.utm_campaign).toBe('');
    expect(lead.landing_path).toBe('');
  });

  it('no guarda un UTM que trae un email dentro', async () => {
    const { res, lead } = await submit({
      ...BASE,
      utm_source: 'newsletter',
      utm_campaign: 'juan.perez@gmail.com',
      utm_medium: ' email_juan@empresa.cl ',
    });
    expect(res.status).toBe(200);
    expect(lead.utm_source).toBe('newsletter');
    expect(lead.utm_campaign).toBe('');
    expect(lead.utm_medium).toBe('');
    expect(JSON.stringify(lead)).not.toMatch(/juan/);
  });

  it('agrega canal y campaña al correo de admin solo cuando hay atribución', () => {
    const base = { safeName: 'Ana', safeEmail: 'ana@empresa.cl', safeMessage: 'Hola hola hola', subject: 'VN' };
    const withUtm = buildAdminEmail({
      ...base,
      attribution: { utm_source: 'linkedin', utm_medium: 'cpc', utm_campaign: 'q4', landing_path: '/servicios/' },
    });
    expect(withUtm.text).toContain('Campaña: canal linkedin / cpc · campaña q4 · landing /servicios/');
    expect(withUtm.html).toContain('Campaña');
    const legacy = buildAdminEmail(base);
    expect(legacy.text).not.toContain('Campaña');
    expect(legacy.html).not.toContain('Campaña');
    const empty = buildAdminEmail({
      ...base,
      attribution: { utm_source: '', utm_medium: '', utm_campaign: '', landing_path: '' },
    });
    expect(empty.text).not.toContain('Campaña');
  });

  it('manda la atribución a GA4 MP sin params vacíos', async () => {
    await submit(
      { ...BASE, utm_source: 'linkedin', utm_campaign: 'q4', landing_path: '/servicios/' },
      { GA4_MP_API_SECRET: 'secret' }
    );
    const call = globalThis.fetch.mock.calls.find(([url]) => String(url).includes('google-analytics.com'));
    expect(call).toBeDefined();
    const params = JSON.parse(call[1].body).events[0].params;
    expect(params.utm_source).toBe('linkedin');
    expect(params.utm_campaign).toBe('q4');
    expect(params.landing_path).toBe('/servicios/');
    expect(params.utm_medium).toBeUndefined();
  });
});

describe('cleanUtm / cleanLandingPath', () => {
  it('normaliza utm', () => {
    expect(cleanUtm(' google ')).toBe('google');
    expect(cleanUtm('a.b_c~d-e')).toBe('a.b_c~d-e');
    expect(cleanUtm('áé ñ')).toBe('');
    expect(cleanUtm('x@y.cl')).toBe('');
    expect(cleanUtm(undefined)).toBe('');
  });

  it('normaliza landing_path', () => {
    expect(cleanLandingPath('/servicios/')).toBe('/servicios/');
    expect(cleanLandingPath('/a/b#c')).toBe('/a/b#c');
    expect(cleanLandingPath('servicios')).toBe('');
    expect(cleanLandingPath('   ')).toBe('');
    expect(cleanLandingPath('/s?q=1')).toBe('/s');
  });
});

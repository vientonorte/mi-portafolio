import { json } from '../lib/cors.js';
import { getCases, getCompany, getServices } from '../data/catalog.js';
import { SKILLS_CATALOG, getSkill, getSkills } from '../data/skills.js';
import { newId, nowIso, prependRecord } from '../lib/store.js';

const PROTOCOL = '2024-11-05';
const SERVER_INFO = { name: 'vientonorte', version: '1.1.0' };

const READ_TOOLS = new Set([
  'list_services',
  'get_cases',
  'get_company_info',
  'list_skills',
  'get_skill',
]);
const WRITE_TOOLS = new Set(['submit_lead', 'book_call', 'request_diagnostico']);

function tool(name, description, properties, required = []) {
  return {
    name,
    description,
    inputSchema: {
      type: 'object',
      properties,
      required,
      additionalProperties: false,
    },
  };
}

function toolsList() {
  return [
    tool('list_services', 'Lista paquetes (Radar/Marco/Ops) y módulos a medida de Viento Norte.', {
      kind: { type: 'string', enum: ['all', 'package', 'module'], description: 'Filtro opcional' },
    }),
    tool('get_cases', 'Casos publicados de Viento Norte (SURA, Transvip, Karri, X|CMS).', {}),
    tool('get_company_info', 'Propuesta de valor, ejes, contacto y diferenciadores.', {}),
    tool('list_skills', 'Catálogo público de skills VN (MCP + @vientonorte/skills).', {
      kind: { type: 'string', enum: ['all', 'router', 'vn', 'qa', 'ops'], description: 'Filtro opcional' },
    }),
    tool('get_skill', 'Detalle de una skill VN por id o slash (ej. vn-agent).', {
      id: { type: 'string', description: 'id o slash sin /' },
    }, ['id']),
    tool(
      'submit_lead',
      'Captura un lead de contacto. Requiere API key.',
      {
        name: { type: 'string' },
        email: { type: 'string' },
        message: { type: 'string' },
        intent: { type: 'string' },
      },
      ['name', 'email', 'message']
    ),
    tool(
      'book_call',
      'Registra una solicitud de agenda de 30 min y devuelve la URL de Calendar. Requiere API key.',
      {
        name: { type: 'string' },
        email: { type: 'string' },
        notes: { type: 'string' },
        intent: { type: 'string' },
      },
      ['name', 'email']
    ),
    tool(
      'request_diagnostico',
      'Solicita un diagnóstico rápido a partir de una fricción. Requiere API key.',
      {
        name: { type: 'string' },
        email: { type: 'string' },
        company: { type: 'string' },
        url: { type: 'string' },
        friction: { type: 'string' },
      },
      ['name', 'email', 'friction']
    ),
  ];
}

function hasApiKey(request, env) {
  const expected = env.VN_API_KEY;
  if (!expected) return false;
  const header = request.headers.get('X-VN-API-KEY') || '';
  const auth = request.headers.get('Authorization') || '';
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  return header === expected || bearer === expected;
}

function rpcResult(id, result) {
  return { jsonrpc: '2.0', id: id ?? null, result };
}

function rpcError(id, code, message) {
  return { jsonrpc: '2.0', id: id ?? null, error: { code, message } };
}

function textResult(payload) {
  return {
    content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }],
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''));
}

async function callTool(name, args, env) {
  const a = args && typeof args === 'object' ? args : {};

  if (name === 'list_services') {
    const kind = a.kind || 'all';
    const services = getServices().filter((s) => kind === 'all' || s.kind === kind);
    return textResult({ services });
  }
  if (name === 'get_cases') return textResult({ cases: getCases() });
  if (name === 'get_company_info') return textResult({ company: getCompany() });
  if (name === 'list_skills') {
    const kind = a.kind || 'all';
    return textResult({
      hosted: SKILLS_CATALOG.hosted,
      metodo_ro: SKILLS_CATALOG.metodo_ro,
      skills: getSkills(kind),
    });
  }
  if (name === 'get_skill') {
    const skill = getSkill(a.id);
    if (!skill) throw new Error('skill no encontrada');
    return textResult({ skill, metodo_ro: SKILLS_CATALOG.metodo_ro });
  }

  if (name === 'submit_lead') {
    if (!a.name || String(a.name).trim().length < 2) throw new Error('name inválido');
    if (!isValidEmail(a.email)) throw new Error('email inválido');
    if (!a.message || String(a.message).trim().length < 10) throw new Error('message demasiado corto');
    const record = {
      id: newId('lead'),
      createdAt: nowIso(),
      updatedAt: nowIso(),
      status: 'nuevo',
      name: String(a.name).trim().slice(0, 120),
      email: String(a.email).trim().toLowerCase(),
      message: String(a.message).trim().slice(0, 4000),
      intent: String(a.intent || 'mcp').slice(0, 80),
      source: 'mcp',
      language: 'es',
      channel: 'mcp',
    };
    await prependRecord(env, 'leads', record);
    return textResult({ ok: true, id: record.id });
  }

  if (name === 'book_call') {
    if (!a.name || String(a.name).trim().length < 2) throw new Error('name inválido');
    if (!isValidEmail(a.email)) throw new Error('email inválido');
    const calendarUrl =
      env.CALENDAR_BOOKING_URL || env.A11Y_FREE_SCHEDULE_URL || 'https://vientonorte.io/#/contacto';
    const record = {
      id: newId('book'),
      createdAt: nowIso(),
      updatedAt: nowIso(),
      status: 'pendiente',
      name: String(a.name).trim().slice(0, 120),
      email: String(a.email).trim().toLowerCase(),
      notes: String(a.notes || '').trim().slice(0, 2000),
      intent: String(a.intent || 'kickoff').slice(0, 80),
      calendarUrl,
    };
    await prependRecord(env, 'bookings', record);
    return textResult({ ok: true, id: record.id, calendarUrl, minutes: 30 });
  }

  if (name === 'request_diagnostico') {
    if (!a.name || String(a.name).trim().length < 2) throw new Error('name inválido');
    if (!isValidEmail(a.email)) throw new Error('email inválido');
    if (!a.friction || String(a.friction).trim().length < 10) throw new Error('friction demasiado corta');
    const record = {
      id: newId('dx'),
      createdAt: nowIso(),
      updatedAt: nowIso(),
      status: 'nuevo',
      name: String(a.name).trim().slice(0, 120),
      email: String(a.email).trim().toLowerCase(),
      company: String(a.company || '').trim().slice(0, 120),
      url: String(a.url || '').trim().slice(0, 400),
      friction: String(a.friction).trim().slice(0, 2000),
      response: {
        es: 'Diagnóstico recibido. Próximo paso: call de 30 min para cerrar Radar / Marco / Ops.',
        en: 'Diagnostic received. Next step: 30-min call to lock Radar / Marco / Ops.',
      },
    };
    await prependRecord(env, 'diagnosticos', record);
    return textResult({ ok: true, id: record.id, response: record.response });
  }

  throw new Error(`Tool desconocida: ${name}`);
}

async function handleRpc(message, request, env) {
  if (!message || message.jsonrpc !== '2.0') {
    return rpcError(null, -32600, 'Invalid Request');
  }

  const { id, method, params } = message;

  if (method === 'initialize') {
    return rpcResult(id, {
      protocolVersion: PROTOCOL,
      capabilities: { tools: { listChanged: false } },
      serverInfo: SERVER_INFO,
    });
  }

  if (method === 'notifications/initialized' || method === 'initialized') {
    return null;
  }

  if (method === 'ping') {
    return rpcResult(id, {});
  }

  if (method === 'tools/list') {
    return rpcResult(id, { tools: toolsList() });
  }

  if (method === 'tools/call') {
    const name = params?.name;
    if (!name) return rpcError(id, -32602, 'name requerido');
    if (WRITE_TOOLS.has(name) && !hasApiKey(request, env)) {
      return rpcError(id, -32001, 'API key requerida para tools de escritura (X-VN-API-KEY)');
    }
    if (!READ_TOOLS.has(name) && !WRITE_TOOLS.has(name)) {
      return rpcError(id, -32601, `Tool no encontrada: ${name}`);
    }
    try {
      const result = await callTool(name, params?.arguments || {}, env);
      return rpcResult(id, result);
    } catch (err) {
      return rpcError(id, -32000, err.message || 'Tool failed');
    }
  }

  return rpcError(id, -32601, `Method not found: ${method}`);
}

export async function handleMcp(request, env, cors) {
  if (request.method === 'GET') {
    return json(
      {
        ok: true,
        name: SERVER_INFO.name,
        version: SERVER_INFO.version,
        protocol: PROTOCOL,
        transport: 'json-rpc',
        tools: toolsList().map((t) => t.name),
      },
      200,
      cors
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(rpcError(null, -32700, 'Parse error'), 400, cors);
  }

  if (Array.isArray(body)) {
    const results = [];
    for (const msg of body) {
      const out = await handleRpc(msg, request, env);
      if (out) results.push(out);
    }
    return json(results, 200, cors);
  }

  const out = await handleRpc(body, request, env);
  if (!out) return new Response(null, { status: 204, headers: cors });
  return json(out, 200, cors);
}

import { json } from '../lib/cors.js';
import { requireAdmin } from '../lib/require-admin.js';
import {
  HEAT_PATHS,
  applyEvents,
  emptyBucket,
  heatKey,
  isHeatPath,
  normalizeEvent,
} from '../lib/demo-heat.js';

const MAX_BATCH = 40;

async function readBucket(env, pathId) {
  if (!env.ADMIN_KV) return emptyBucket();
  const raw = await env.ADMIN_KV.get(heatKey(pathId));
  if (!raw) return emptyBucket();
  try {
    const parsed = JSON.parse(raw);
    return {
      ...emptyBucket(),
      ...parsed,
      counts: { ...emptyBucket().counts, ...(parsed.counts || {}) },
      grid: Array.isArray(parsed.grid) ? parsed.grid : emptyBucket().grid,
      hits: Array.isArray(parsed.hits) ? parsed.hits : [],
    };
  } catch {
    return emptyBucket();
  }
}

export async function handleDemoHeatIngest(request, env, cors) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400, cors);
  }

  const pathId = typeof body.pathId === 'string' ? body.pathId.trim() : '';
  if (!isHeatPath(pathId)) {
    return json({ ok: false, error: 'pathId inválido' }, 400, cors);
  }

  const rawEvents = Array.isArray(body.events) ? body.events.slice(0, MAX_BATCH) : [];
  const events = rawEvents.map(normalizeEvent).filter(Boolean);
  if (!events.length) return json({ ok: true, accepted: 0 }, 200, cors);

  const current = await readBucket(env, pathId);
  const next = applyEvents(current, events);
  if (env.ADMIN_KV) {
    await env.ADMIN_KV.put(heatKey(pathId), JSON.stringify(next));
  }
  return json({ ok: true, accepted: events.length }, 202, cors);
}

export async function handleDemoHeatRead(request, env, cors) {
  const gate = await requireAdmin(request, env, cors);
  if (gate.error) return gate.error;

  const url = new URL(request.url);
  const only = url.searchParams.get('path') || '';
  const ids = isHeatPath(only) ? [only] : HEAT_PATHS;

  const paths = {};
  for (const id of ids) {
    const bucket = await readBucket(env, id);
    paths[id] = {
      counts: bucket.counts,
      sessions: bucket.sessions,
      grid: bucket.grid,
      hits: bucket.hits.slice(0, 240),
      updatedAt: bucket.updatedAt,
    };
  }
  return json({ ok: true, paths }, 200, cors);
}

const KEYS = {
  leads: 'vn:leads',
  bookings: 'vn:bookings',
  diagnosticos: 'vn:diagnosticos',
  skills: 'vn:skills',
};

const MAX_RECORDS = 2000;

export function newId(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function nowIso() {
  return new Date().toISOString();
}

function assertCollection(collection) {
  if (!KEYS[collection]) {
    throw new Error(`Colección desconocida: ${collection}`);
  }
}

export async function listRecords(env, collection) {
  assertCollection(collection);
  if (!env.ADMIN_KV) return [];
  const raw = await env.ADMIN_KV.get(KEYS[collection]);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function prependRecord(env, collection, record) {
  assertCollection(collection);
  const items = await listRecords(env, collection);
  items.unshift(record);
  const next = items.slice(0, MAX_RECORDS);
  if (env.ADMIN_KV) {
    await env.ADMIN_KV.put(KEYS[collection], JSON.stringify(next));
  }
  return record;
}

export async function updateRecord(env, collection, id, patch) {
  assertCollection(collection);
  const items = await listRecords(env, collection);
  const idx = items.findIndex((item) => item.id === id);
  if (idx < 0) return null;
  items[idx] = { ...items[idx], ...patch, updatedAt: nowIso() };
  if (env.ADMIN_KV) {
    await env.ADMIN_KV.put(KEYS[collection], JSON.stringify(items));
  }
  return items[idx];
}

export function countSince(items, sinceMs) {
  return items.filter((item) => {
    const ts = Date.parse(item.createdAt || '');
    return Number.isFinite(ts) && ts >= sinceMs;
  }).length;
}

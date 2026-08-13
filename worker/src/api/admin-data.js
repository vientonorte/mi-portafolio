import { json } from '../lib/cors.js';
import { getCases, getServices } from '../data/catalog.js';
import { requireAdmin } from '../lib/require-admin.js';
import { countSince, listRecords, updateRecord } from '../lib/store.js';

const COLLECTIONS = new Set(['leads', 'bookings', 'diagnosticos']);
const STATUSES = {
  leads: new Set(['nuevo', 'contactado', 'cerrado']),
  bookings: new Set(['pendiente', 'confirmado', 'cancelado', 'hecho']),
  diagnosticos: new Set(['nuevo', 'en_revision', 'respondido', 'cerrado']),
};

function dayStart(ms = Date.now()) {
  const d = new Date(ms);
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
}

export async function handleOverview(request, env, cors) {
  const gate = await requireAdmin(request, env, cors);
  if (gate.error) return gate.error;

  const [leads, bookings, diagnosticos] = await Promise.all([
    listRecords(env, 'leads'),
    listRecords(env, 'bookings'),
    listRecords(env, 'diagnosticos'),
  ]);

  const today = dayStart();
  const week = today - 6 * 24 * 60 * 60 * 1000;

  return json(
    {
      ok: true,
      overview: {
        today: {
          leads: countSince(leads, today),
          bookings: countSince(bookings, today),
          diagnosticos: countSince(diagnosticos, today),
        },
        week: {
          leads: countSince(leads, week),
          bookings: countSince(bookings, week),
          diagnosticos: countSince(diagnosticos, week),
        },
        totals: {
          leads: leads.length,
          bookings: bookings.length,
          diagnosticos: diagnosticos.length,
          services: getServices({ includeInactive: true }).length,
          cases: getCases({ includeUnpublished: true }).length,
        },
        recent: {
          leads: leads.slice(0, 5),
          bookings: bookings.slice(0, 5),
          diagnosticos: diagnosticos.slice(0, 5),
        },
      },
    },
    200,
    cors
  );
}

export async function handleListCollection(request, env, cors, collection) {
  const gate = await requireAdmin(request, env, cors);
  if (gate.error) return gate.error;
  if (!COLLECTIONS.has(collection)) {
    return json({ ok: false, error: 'Colección desconocida' }, 404, cors);
  }

  const url = new URL(request.url);
  const q = (url.searchParams.get('q') || '').trim().toLowerCase();
  const status = (url.searchParams.get('status') || '').trim();
  const items = await listRecords(env, collection);

  const filtered = items.filter((item) => {
    if (status && item.status !== status) return false;
    if (!q) return true;
    return JSON.stringify(item).toLowerCase().includes(q);
  });

  return json({ ok: true, items: filtered, total: filtered.length }, 200, cors);
}

export async function handlePatchCollection(request, env, cors, collection, id) {
  const gate = await requireAdmin(request, env, cors);
  if (gate.error) return gate.error;
  if (!COLLECTIONS.has(collection)) {
    return json({ ok: false, error: 'Colección desconocida' }, 404, cors);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400, cors);
  }

  const patch = {};
  if (typeof body.status === 'string') {
    if (!STATUSES[collection].has(body.status)) {
      return json({ ok: false, error: 'Estado inválido' }, 400, cors);
    }
    patch.status = body.status;
  }
  if (typeof body.notes === 'string') {
    patch.notes = body.notes.trim().slice(0, 2000);
  }
  if (Object.keys(patch).length === 0) {
    return json({ ok: false, error: 'Nada que actualizar' }, 400, cors);
  }

  const updated = await updateRecord(env, collection, id, patch);
  if (!updated) return json({ ok: false, error: 'No encontrado' }, 404, cors);
  return json({ ok: true, item: updated }, 200, cors);
}

export async function handleAdminCatalog(request, env, cors, kind) {
  const gate = await requireAdmin(request, env, cors);
  if (gate.error) return gate.error;
  if (kind === 'services') {
    return json({ ok: true, items: getServices({ includeInactive: true }) }, 200, cors);
  }
  if (kind === 'cases') {
    return json({ ok: true, items: getCases({ includeUnpublished: true }) }, 200, cors);
  }
  return json({ ok: false, error: 'Catálogo desconocido' }, 404, cors);
}

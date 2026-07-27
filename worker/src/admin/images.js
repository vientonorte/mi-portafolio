import { json } from '../lib/cors.js';
import { readSession } from '../lib/session.js';
import { IMAGE_REGISTRY, REGISTRY_BY_ID } from '../data/image-registry.js';

const MANIFEST_KEY = 'image:manifest';

async function getManifest(env) {
  const raw = await env.ADMIN_KV.get(MANIFEST_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveManifest(env, manifest) {
  await env.ADMIN_KV.put(MANIFEST_KEY, JSON.stringify(manifest));
}

function publicImageUrl(env, key) {
  const base = env.R2_PUBLIC_BASE || '';
  return `${base.replace(/\/$/, '')}/${key}`;
}

function buildImageRecord(entry, manifest, env) {
  const override = manifest[entry.id];
  const overridden = Boolean(override?.url);
  return {
    id: entry.id,
    url: override?.url || `${(env.STATIC_IMAGE_BASE || 'https://vientonorte.io/mi-portafolio/').replace(/\/$/, '')}/${entry.path.startsWith('profile') ? '' : 'images/'}${entry.path}`,
    alt: override?.alt || entry.alt,
    path: entry.path,
    category: entry.category,
    label: entry.label,
    overridden,
    updatedAt: override?.updatedAt,
  };
}

export async function handlePublicManifest(env, cors) {
  const manifest = await getManifest(env);
  return json({ manifest }, 200, cors);
}

export async function handleListImages(request, env, cors) {
  const user = await readSession(request, env);
  if (!user) return json({ ok: false, error: 'No autorizado' }, 401, cors);

  const manifest = await getManifest(env);
  const images = IMAGE_REGISTRY.map((entry) => buildImageRecord(entry, manifest, env));
  return json({ images }, 200, cors);
}

export async function handleUploadImage(request, env, cors, imageId) {
  const user = await readSession(request, env);
  if (!user) return json({ ok: false, error: 'No autorizado' }, 401, cors);

  const entry = REGISTRY_BY_ID[imageId];
  if (!entry) return json({ ok: false, error: 'Imagen no encontrada en catálogo' }, 404, cors);

  const form = await request.formData();
  const file = form.get('file');
  const altField = form.get('alt');

  if (!file || typeof file === 'string') {
    return json({ ok: false, error: 'Archivo requerido' }, 400, cors);
  }

  const contentType = file.type || 'image/png';
  if (!contentType.startsWith('image/')) {
    return json({ ok: false, error: 'Solo imágenes' }, 400, cors);
  }

  const r2Key = `portfolio/${entry.path}`;
  await env.IMAGES_BUCKET.put(r2Key, file.stream(), {
    httpMetadata: { contentType },
  });

  const manifest = await getManifest(env);
  manifest[imageId] = {
    url: publicImageUrl(env, r2Key),
    alt: typeof altField === 'string' && altField.trim() ? altField.trim() : entry.alt,
    path: entry.path,
    updatedAt: new Date().toISOString(),
    updatedBy: user.login,
  };
  await saveManifest(env, manifest);

  const image = buildImageRecord(entry, manifest, env);
  return json({ image }, 200, cors);
}

export async function handlePatchImage(request, env, cors, imageId) {
  const user = await readSession(request, env);
  if (!user) return json({ ok: false, error: 'No autorizado' }, 401, cors);

  const entry = REGISTRY_BY_ID[imageId];
  if (!entry) return json({ ok: false, error: 'Imagen no encontrada' }, 404, cors);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400, cors);
  }

  const manifest = await getManifest(env);
  const current = manifest[imageId] || { alt: entry.alt, path: entry.path };
  if (typeof body.alt === 'string') current.alt = body.alt.trim();
  current.updatedAt = new Date().toISOString();
  current.updatedBy = user.login;
  manifest[imageId] = current;
  await saveManifest(env, manifest);

  return json({ image: buildImageRecord(entry, manifest, env) }, 200, cors);
}

export async function handleDeleteImage(request, env, cors, imageId) {
  const user = await readSession(request, env);
  if (!user) return json({ ok: false, error: 'No autorizado' }, 401, cors);

  const entry = REGISTRY_BY_ID[imageId];
  if (!entry) return json({ ok: false, error: 'Imagen no encontrada' }, 404, cors);

  const manifest = await getManifest(env);
  const override = manifest[imageId];
  if (override) {
    const r2Key = `portfolio/${entry.path}`;
    try {
      await env.IMAGES_BUCKET.delete(r2Key);
    } catch {
      // ignore
    }
    delete manifest[imageId];
    await saveManifest(env, manifest);
  }

  return json({ ok: true }, 200, cors);
}
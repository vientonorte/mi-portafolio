import { json } from '../lib/cors.js';
import { readSession } from '../lib/session.js';
import { IMAGE_REGISTRY, REGISTRY_BY_ID } from '../data/image-registry.js';
import { IMAGE_WEB_ROLES, roleToEntry } from '../data/image-roles.js';
import { publishImagePr, shouldAutoPublish } from './github-content.js';

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

function staticUrl(env, entry) {
  const base = (env.STATIC_IMAGE_BASE || 'https://vientonorte.io/').replace(/\/$/, '');
  if (entry.repoPath || /^(favicon\.|icon-)/.test(entry.path || '')) {
    return `${base}/${entry.path}`;
  }
  if (entry.path?.startsWith('profile')) return `${base}/${entry.path}`;
  return `${base}/images/${entry.path}`;
}

function buildImageRecord(entry, manifest, env) {
  const override = manifest[entry.id];
  const overridden = Boolean(override?.url);
  return {
    id: entry.id,
    url: override?.url || staticUrl(env, entry),
    alt: override?.alt || entry.alt,
    path: override?.path || entry.path,
    category: entry.category || override?.category || 'Subidas',
    label: override?.label || entry.label,
    role: override?.role || entry.role || 'gallery',
    custom: Boolean(entry.custom || override?.custom),
    overridden,
    updatedAt: override?.updatedAt,
    prUrl: override?.prUrl,
    prNumber: override?.prNumber,
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
  const seen = new Set();
  const images = IMAGE_REGISTRY.map((entry) => {
    seen.add(entry.id);
    return buildImageRecord(entry, manifest, env);
  });
  for (const [id, rec] of Object.entries(manifest)) {
    if (seen.has(id) || !rec || typeof rec !== 'object') continue;
    if (!rec.custom && !id.startsWith('custom.')) continue;
    images.push(
      buildImageRecord(
        {
          id,
          category: rec.category || 'Subidas',
          label: rec.label || id,
          path: rec.path || `uploads/${id}`,
          alt: rec.alt || rec.label || id,
          role: rec.role || 'gallery',
          custom: true,
        },
        manifest,
        env
      )
    );
  }
  return json({ images, roles: IMAGE_WEB_ROLES }, 200, cors);
}

function extFromType(contentType, filename) {
  if (filename && /\.[a-z0-9]+$/i.test(filename)) {
    return filename.split('.').pop().toLowerCase();
  }
  if (contentType.includes('jpeg')) return 'jpg';
  if (contentType.includes('webp')) return 'webp';
  if (contentType.includes('svg')) return 'svg';
  if (contentType.includes('ico') || contentType.includes('icon')) return 'ico';
  return 'png';
}

function slugName(name) {
  return String(name || 'foto')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'foto';
}

function resolveEntry(imageId, manifest) {
  if (REGISTRY_BY_ID[imageId]) return REGISTRY_BY_ID[imageId];
  const rec = manifest[imageId];
  if (rec && (rec.custom || imageId.startsWith('custom.'))) {
    return {
      id: imageId,
      category: rec.category || 'Subidas',
      label: rec.label || imageId,
      path: rec.path,
      alt: rec.alt,
      role: rec.role || 'gallery',
      custom: true,
    };
  }
  return null;
}

export async function handleCreateImage(request, env, cors) {
  const user = await readSession(request, env);
  if (!user) return json({ ok: false, error: 'No autorizado' }, 401, cors);

  const form = await request.formData();
  const file = form.get('file');
  const label = typeof form.get('label') === 'string' ? form.get('label').trim() : '';
  const role = typeof form.get('role') === 'string' ? form.get('role').trim() : 'gallery';
  const altField = form.get('alt');

  if (!file || typeof file === 'string') {
    return json({ ok: false, error: 'Archivo requerido' }, 400, cors);
  }
  if (!label) {
    return json({ ok: false, error: 'Nombre requerido' }, 400, cors);
  }

  const mapped = roleToEntry(role, label);
  if (mapped) {
    return persistUpload(env, cors, user, mapped, file, altField, label, role);
  }

  const contentType = file.type || 'image/png';
  const ext = extFromType(contentType, file.name);
  const id = `custom.${Date.now()}`;
  const entry = {
    id,
    category: 'Subidas',
    label,
    path: `uploads/${slugName(label)}-${Date.now()}.${ext}`,
    alt: typeof altField === 'string' && altField.trim() ? altField.trim() : label,
    role: role === 'faq' ? 'faq' : 'gallery',
    custom: true,
  };
  return persistUpload(env, cors, user, entry, file, altField, label, entry.role);
}

export async function handleUploadImage(request, env, cors, imageId) {
  const user = await readSession(request, env);
  if (!user) return json({ ok: false, error: 'No autorizado' }, 401, cors);

  const manifest = await getManifest(env);
  const entry = resolveEntry(imageId, manifest);
  if (!entry) return json({ ok: false, error: 'Imagen no encontrada en catálogo' }, 404, cors);

  const form = await request.formData();
  const file = form.get('file');
  const altField = form.get('alt');
  const label = typeof form.get('label') === 'string' ? form.get('label').trim() : entry.label;
  const role = typeof form.get('role') === 'string' ? form.get('role').trim() : entry.role;

  if (!file || typeof file === 'string') {
    return json({ ok: false, error: 'Archivo requerido' }, 400, cors);
  }

  return persistUpload(env, cors, user, { ...entry, label, role }, file, altField, label, role);
}

async function persistUpload(env, cors, user, entry, file, altField, label, role) {
  const contentType = file.type || 'image/png';
  if (!contentType.startsWith('image/')) {
    return json({ ok: false, error: 'Solo imágenes' }, 400, cors);
  }

  const r2Key = `portfolio/${entry.path}`;
  const bytes = await file.arrayBuffer();
  await env.IMAGES_BUCKET.put(r2Key, bytes, {
    httpMetadata: { contentType },
  });

  const manifest = await getManifest(env);
  manifest[entry.id] = {
    url: publicImageUrl(env, r2Key),
    alt: typeof altField === 'string' && altField.trim() ? altField.trim() : entry.alt || label,
    path: entry.path,
    label: label || entry.label,
    role: role || entry.role || 'gallery',
    custom: Boolean(entry.custom),
    category: entry.category,
    updatedAt: new Date().toISOString(),
    updatedBy: user.login,
  };

  let publish = null;
  let publishError = null;
  if (shouldAutoPublish(entry)) {
    try {
      publish = await publishImagePr(env, entry, bytes, user.login);
      manifest[entry.id].prUrl = publish.html_url;
      manifest[entry.id].prNumber = publish.number;
    } catch (err) {
      publishError = err.message || 'No se pudo abrir el PR';
      console.warn('[images] publish PR failed:', publishError);
    }
  }

  await saveManifest(env, manifest);
  const image = buildImageRecord(entry, manifest, env);
  return json({ image, publish, publishError }, 200, cors);
}

export async function handlePublishImage(request, env, cors, imageId) {
  const user = await readSession(request, env);
  if (!user) return json({ ok: false, error: 'No autorizado' }, 401, cors);

  const manifestPeek = await getManifest(env);
  const entry = resolveEntry(imageId, manifestPeek);
  if (!entry) return json({ ok: false, error: 'Imagen no encontrada' }, 404, cors);

  const r2Key = `portfolio/${entry.path}`;
  const obj = await env.IMAGES_BUCKET.get(r2Key);
  if (!obj) {
    return json({ ok: false, error: 'No hay override en R2 para publicar' }, 404, cors);
  }

  try {
    const bytes = await obj.arrayBuffer();
    const publish = await publishImagePr(env, entry, bytes, user.login);
    const manifest = await getManifest(env);
    manifest[imageId] = {
      ...(manifest[imageId] || {}),
      path: entry.path,
      prUrl: publish.html_url,
      prNumber: publish.number,
      updatedAt: new Date().toISOString(),
      updatedBy: user.login,
    };
    await saveManifest(env, manifest);
    return json(
      { ok: true, publish, image: buildImageRecord(entry, manifest, env) },
      200,
      cors
    );
  } catch (err) {
    return json({ ok: false, error: err.message || 'PR falló' }, 502, cors);
  }
}

export async function handlePatchImage(request, env, cors, imageId) {
  const user = await readSession(request, env);
  if (!user) return json({ ok: false, error: 'No autorizado' }, 401, cors);

  const manifest = await getManifest(env);
  const entry = resolveEntry(imageId, manifest);
  if (!entry) return json({ ok: false, error: 'Imagen no encontrada' }, 404, cors);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400, cors);
  }

  const current = manifest[imageId] || { alt: entry.alt, path: entry.path, label: entry.label };
  if (typeof body.alt === 'string') current.alt = body.alt.trim();
  if (typeof body.label === 'string' && body.label.trim()) current.label = body.label.trim();
  if (typeof body.role === 'string' && body.role.trim()) current.role = body.role.trim();
  current.updatedAt = new Date().toISOString();
  current.updatedBy = user.login;
  manifest[imageId] = current;
  await saveManifest(env, manifest);

  return json({ image: buildImageRecord(entry, manifest, env) }, 200, cors);
}

export async function handleDeleteImage(request, env, cors, imageId) {
  const user = await readSession(request, env);
  if (!user) return json({ ok: false, error: 'No autorizado' }, 401, cors);

  const manifest = await getManifest(env);
  const entry = resolveEntry(imageId, manifest);
  if (!entry) return json({ ok: false, error: 'Imagen no encontrada' }, 404, cors);

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
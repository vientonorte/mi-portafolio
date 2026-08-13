const API = 'https://api.github.com';

function repoConfig(env) {
  return {
    owner: env.GH_OWNER || 'vientonorte',
    repo: env.GH_REPO || 'mi-portafolio',
    token: env.GITHUB_CONTENTS_TOKEN,
  };
}

export function shouldAutoPublish(entry) {
  const path = entry.path || '';
  return (
    path.startsWith('branding/') ||
    path.startsWith('og-') ||
    entry.id === 'branding.ogPortfolio'
  );
}

function repoPath(entry) {
  if (entry.path.startsWith('profile')) return `public/${entry.path}`;
  return `public/images/${entry.path}`;
}

async function gh(env, method, pathname, body) {
  const { owner, repo, token } = repoConfig(env);
  if (!token) throw new Error('GITHUB_CONTENTS_TOKEN no configurado');
  const res = await fetch(`${API}/repos/${owner}/${repo}${pathname}`, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'vientonorte-cms',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.message || `GitHub ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

function bytesToBase64(buffer) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let bin = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

function branchName() {
  const day = new Date().toISOString().slice(0, 10);
  return `cms/images-${day}`;
}

async function ensureBranch(env, name) {
  const main = await gh(env, 'GET', '/git/ref/heads/main');
  const mainSha = main.object.sha;
  try {
    await gh(env, 'GET', `/git/ref/heads/${name}`);
  } catch {
    await gh(env, 'POST', '/git/refs', {
      ref: `refs/heads/${name}`,
      sha: mainSha,
    });
  }
}

async function upsertFile(env, branch, path, base64, message) {
  let sha;
  try {
    const existing = await gh(env, 'GET', `/contents/${encodeURI(path)}?ref=${branch}`);
    sha = existing.sha;
  } catch {
    sha = undefined;
  }
  return gh(env, 'PUT', `/contents/${encodeURI(path)}`, {
    message,
    content: base64,
    branch,
    ...(sha ? { sha } : {}),
  });
}

async function ensurePull(env, branch, title, body) {
  const { owner } = repoConfig(env);
  const open = await gh(
    env,
    'GET',
    `/pulls?state=open&head=${encodeURIComponent(`${owner}:${branch}`)}`
  );
  if (Array.isArray(open) && open[0]) {
    return { number: open[0].number, html_url: open[0].html_url };
  }
  const pr = await gh(env, 'POST', '/pulls', {
    title,
    head: branch,
    base: 'main',
    body,
  });
  return { number: pr.number, html_url: pr.html_url };
}

export async function publishImagePr(env, entry, bytes, userLogin) {
  const branch = branchName();
  const path = repoPath(entry);
  await ensureBranch(env, branch);
  await upsertFile(
    env,
    branch,
    path,
    bytesToBase64(bytes),
    `cms(images): ${path} via admin (@${userLogin || 'vientonorte'})`
  );
  const pr = await ensurePull(
    env,
    branch,
    `cms(images): actualizar ${entry.path}`,
    [
      'PR automático desde `#/admin/fotos`.',
      '',
      `- Archivo: \`${path}\``,
      `- Catálogo: \`${entry.id}\``,
      '',
      'Al mergear, Pages publica `vientonorte.io/images/...` para crawlers (OG / LinkedIn / Meta).',
    ].join('\n')
  );
  return { ...pr, branch, path };
}

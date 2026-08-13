import { json } from './cors.js';
import { readSession } from './session.js';

export async function requireAdmin(request, env, cors) {
  const user = await readSession(request, env);
  if (!user) {
    return { user: null, error: json({ ok: false, error: 'Unauthorized' }, 401, cors) };
  }
  return { user, error: null };
}

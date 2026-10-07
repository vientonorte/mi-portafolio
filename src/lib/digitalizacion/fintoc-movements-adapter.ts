/**
 * Adaptador Fintoc Movements · SOLO SERVIDOR.
 *
 * ⚠️ No importar desde componentes del cliente: recibe la secret key.
 * El repo no tiene funciones serverless de Vercel (`/api`) para la SPA, así que
 * este módulo queda listo para montarse cuando exista un runtime de servidor
 * (ver docs/digitalizacion-fintoc.md). `createMovementsHandler` devuelve un
 * handler Web estándar (`Request → Response`), compatible con `api/fintoc/movements.ts`
 * de Vercel (export `GET`) o con un Worker.
 *
 * Sin `FINTOC_SECRET_KEY` + `FINTOC_LINK_TOKEN` devuelve los datos de ejemplo
 * con `sample: true`. El secreto nunca se devuelve ni se loguea.
 */
import type { FintocAccount, FintocMovement } from "./cashflow";
import { samplePayload, type MovementsPayload } from "./sample";

export { samplePayload, type MovementsPayload };

export const FINTOC_API_BASE = "https://api.fintoc.com/v1";

export interface FintocEnv {
  /** `sk_test_...` (sandbox) o `sk_live_...`. Solo servidor. */
  FINTOC_SECRET_KEY?: string;
  /** `link_token` del Link creado con el widget; guardado del lado del servidor. */
  FINTOC_LINK_TOKEN?: string;
  /** Opcional: id de la cuenta a leer. Si falta se usa la primera cuenta corriente. */
  FINTOC_ACCOUNT_ID?: string;
}

export interface GetMovementsOptions {
  env: FintocEnv;
  fetchImpl?: typeof fetch;
  /** YYYY-MM-DD */
  since?: string;
  until?: string;
  /** Tope de páginas a seguir vía header `Link` (rel="next"). */
  maxPages?: number;
}

export class FintocAdapterError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "FintocAdapterError";
  }
}

export function hasFintocCredentials(env: FintocEnv): boolean {
  return Boolean(env.FINTOC_SECRET_KEY?.trim() && env.FINTOC_LINK_TOKEN?.trim());
}

function nextLink(header: string | null): string | null {
  if (!header) return null;
  for (const part of header.split(",")) {
    const m = part.match(/<([^>]+)>\s*;\s*rel="?next"?/);
    if (m) return m[1];
  }
  return null;
}

async function fintocGet(url: string, secretKey: string, fetchImpl: typeof fetch): Promise<Response> {
  const res = await fetchImpl(url, {
    headers: { Authorization: secretKey, Accept: "application/json" },
  });
  if (!res.ok) {
    // Mensaje sin URL (lleva link_token) ni headers (lleva la secret key).
    throw new FintocAdapterError(`Fintoc respondió ${res.status}`, res.status);
  }
  return res;
}

export async function getMovements({
  env,
  fetchImpl = fetch,
  since,
  until,
  maxPages = 10,
}: GetMovementsOptions): Promise<MovementsPayload> {
  if (!hasFintocCredentials(env)) return samplePayload();

  const secret = env.FINTOC_SECRET_KEY!.trim();
  const linkToken = encodeURIComponent(env.FINTOC_LINK_TOKEN!.trim());

  const accountsRes = await fintocGet(`${FINTOC_API_BASE}/accounts?link_token=${linkToken}`, secret, fetchImpl);
  const accounts = (await accountsRes.json()) as FintocAccount[];
  const account =
    accounts.find((a) => a.id === env.FINTOC_ACCOUNT_ID) ??
    accounts.find((a) => a.type === "checking_account") ??
    accounts[0];
  if (!account) throw new FintocAdapterError("El Link no tiene cuentas");

  const params = new URLSearchParams({ per_page: "300" });
  if (since) params.set("since", since);
  if (until) params.set("until", until);
  let url: string | null =
    `${FINTOC_API_BASE}/accounts/${encodeURIComponent(account.id)}/movements?link_token=${linkToken}&${params}`;

  const movements: FintocMovement[] = [];
  for (let page = 0; url && page < maxPages; page++) {
    const res = await fintocGet(url, secret, fetchImpl);
    movements.push(...((await res.json()) as FintocMovement[]));
    url = nextLink(res.headers.get("link"));
  }

  return { sample: false, account, movements };
}

/** Handler Web estándar para `GET /api/fintoc/movements?since=YYYY-MM-DD&until=YYYY-MM-DD`. */
export function createMovementsHandler(env: FintocEnv, fetchImpl: typeof fetch = fetch) {
  return async (request: Request): Promise<Response> => {
    const q = new URL(request.url).searchParams;
    const day = /^\d{4}-\d{2}-\d{2}$/;
    const since = q.get("since") ?? undefined;
    const until = q.get("until") ?? undefined;
    if ((since && !day.test(since)) || (until && !day.test(until))) {
      return Response.json({ error: "since/until deben ser YYYY-MM-DD" }, { status: 400 });
    }
    try {
      const payload = await getMovements({ env, fetchImpl, since, until });
      return Response.json(payload, { headers: { "Cache-Control": "private, no-store" } });
    } catch (err) {
      const status = err instanceof FintocAdapterError && err.status ? 502 : 500;
      return Response.json({ error: "No se pudieron leer los movimientos" }, { status });
    }
  };
}

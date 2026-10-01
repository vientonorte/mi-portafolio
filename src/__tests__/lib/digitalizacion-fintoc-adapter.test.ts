import { describe, expect, it, vi } from "vitest";
import {
  FINTOC_API_BASE,
  createMovementsHandler,
  getMovements,
} from "@/lib/digitalizacion/fintoc-movements-adapter";

const SECRET = "sk_test_NOT_A_REAL_KEY";
const LINK = "link_TEST_token";

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" }, ...init });
}

describe("fintoc movements adapter", () => {
  it("returns sample data (sample: true) without credentials and never calls the network", async () => {
    const fetchImpl = vi.fn();
    const res = await getMovements({ env: {}, fetchImpl });
    expect(res.sample).toBe(true);
    expect(res.movements.length).toBeGreaterThan(0);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("calls /accounts and /accounts/{id}/movements with link_token and Authorization secret", async () => {
    const fetchImpl = vi.fn(async (url: string) => {
      if (url.includes("/movements")) {
        return jsonResponse([{ id: "mov_1", amount: 1000, currency: "CLP", description: "x", post_date: "2026-09-01", transaction_date: null, type: "other", pending: false, sender_account: null, recipient_account: null }]);
      }
      return jsonResponse([{ id: "acc_1", type: "checking_account", name: "CC", number: "1", currency: "CLP", balance: { available: 1, current: 1, limit: 1 } }]);
    });
    const res = await getMovements({ env: { FINTOC_SECRET_KEY: SECRET, FINTOC_LINK_TOKEN: LINK }, fetchImpl: fetchImpl as unknown as typeof fetch, since: "2026-01-01" });
    expect(res.sample).toBe(false);
    expect(res.movements).toHaveLength(1);
    const [u1, o1] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    const [u2] = fetchImpl.mock.calls[1] as unknown as [string];
    expect(u1).toBe(`${FINTOC_API_BASE}/accounts?link_token=${LINK}`);
    expect(u2).toContain(`${FINTOC_API_BASE}/accounts/acc_1/movements?link_token=${LINK}`);
    expect(u2).toContain("since=2026-01-01");
    expect((o1.headers as Record<string, string>).Authorization).toBe(SECRET);
  });

  it("handler never leaks the secret or the link token on errors", async () => {
    const log = vi.spyOn(console, "log");
    const err = vi.spyOn(console, "error");
    const fetchImpl = vi.fn(async () => new Response("unauthorized", { status: 401 }));
    const handler = createMovementsHandler({ FINTOC_SECRET_KEY: SECRET, FINTOC_LINK_TOKEN: LINK }, fetchImpl as unknown as typeof fetch);
    const res = await handler(new Request("https://example.test/api/fintoc/movements"));
    const text = await res.text();
    expect(res.status).toBe(502);
    expect(text).not.toContain(SECRET);
    expect(text).not.toContain(LINK);
    for (const spy of [log, err]) {
      for (const call of spy.mock.calls) expect(JSON.stringify(call)).not.toContain(SECRET);
    }
  });

  it("handler validates since/until", async () => {
    const res = await createMovementsHandler({})(new Request("https://example.test/api/fintoc/movements?since=ayer"));
    expect(res.status).toBe(400);
  });

  it("handler serves sample data with sample: true when env is missing", async () => {
    const res = await createMovementsHandler({})(new Request("https://example.test/api/fintoc/movements"));
    const body = await res.json();
    expect(body.sample).toBe(true);
  });
});

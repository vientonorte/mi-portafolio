import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { QueryProcessor } from "./src/query-processor.js";

const dir = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);

async function mockClient() {
  const fixture = JSON.parse(await readFile(path.join(dir, "ssot/fixture-2026-09-02.json"), "utf8"));
  return { async fetchKeywords() { return structuredClone(fixture); } };
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true, liveAds: false }));
      return;
    }
    if (req.method === "POST" && req.url && req.url.startsWith("/query")) {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}") : {};
      const report = await new QueryProcessor({ client: await mockClient() }).fetchKeywords({
        account: Boolean(body.account),
      });
      res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(report));
      return;
    }
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
  } catch (err) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: String(err) }));
  }
});

server.listen(PORT, () => console.log("vn-ads-query mock :" + PORT));

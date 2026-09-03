import http from "node:http";
import { createQueryProcessorDeps } from "./src/google-ads-client.js";
import { QueryProcessor } from "./src/query-processor.js";

const PORT = Number(process.env.PORT) || 3000;
const deps = createQueryProcessorDeps();
const processor = new QueryProcessor({
  client: deps.client,
  customerId: deps.customerId,
  campaignId: deps.campaignId,
});

console.log(`vn-ads-query ads client mode: ${deps.mode}`);

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8").trim();
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = req.url?.split("?")[0];
  if (req.method === "POST" && url === "/query") {
    try {
      const body = await readJson(req);
      const result = await processor.fetchKeywords({
        account: Boolean(body?.account),
      });
      const json = JSON.stringify(result);
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(json),
      });
      res.end(json);
    } catch (err) {
      const json = JSON.stringify({ error: "Bad Request", message: String(err.message || err) });
      res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
      res.end(json);
    }
    return;
  }
  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(PORT, () => {
  console.log("vn-ads-query listening on " + PORT);
});

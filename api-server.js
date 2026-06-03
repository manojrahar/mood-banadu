import http from "http";
import handler from "./api/ai.js";

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.url === "/api/ai" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const parsedBody = JSON.parse(body);
        req.body = parsedBody;

        // Custom res builder to mimic Express/Vercel serverless function response API
        const mockRes = {
          statusCode: 200,
          headers: {},
          setHeader(name, value) {
            this.headers[name] = value;
            return this;
          },
          status(code) {
            this.statusCode = code;
            return this;
          },
          json(data) {
            res.writeHead(this.statusCode, {
              "Content-Type": "application/json",
              ...this.headers,
            });
            res.end(JSON.stringify(data));
          },
        };

        await handler(req, mockRes);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`API backend server running on http://localhost:${PORT}`);
});

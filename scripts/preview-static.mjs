import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import { createChatHandler } from "../server/chat.mjs";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".pdf": "application/pdf" };

// Preview the static deployment without an SPA fallback masking missing URLs.
export function createStaticServer() {
  const chat = createChatHandler({ getEnv: () => loadEnv("production", fileURLToPath(new URL("../", import.meta.url)), "") });
  return createServer(async (request, response) => {
    try {
      if (request.url?.split("?")[0] === "/api/chat") { await chat(request, response); return; }
      if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405, { Allow: "GET, HEAD" }); response.end(); return; }
      const url = new URL(request.url, "http://localhost");
      const pathname = decodeURIComponent(url.pathname);
      const clean = pathname === "/index.html" ? "/" : pathname.replace(/\.html$/, "").replace(/\/+$/, "") || "/";
      if (clean !== pathname) { response.writeHead(308, { Location: clean + url.search }); response.end(); return; }
      const filename = pathname === "/" ? "index.html" : path.extname(pathname) ? pathname.slice(1) : `${pathname.slice(1)}.html`;
      const target = path.resolve(dist, filename);
      const relative = path.relative(dist, target);
      if (relative.startsWith("..") || path.isAbsolute(relative)) { response.writeHead(400); response.end(); return; }
      let content;
      let status = pathname === "/404" ? 404 : 200;
      let type = types[path.extname(target)] || "application/octet-stream";
      try {
        if (!(await stat(target)).isFile()) throw new Error("Not a file");
        content = await readFile(target);
      } catch {
        status = 404;
        type = types[".html"];
        content = await readFile(path.join(dist, "404.html"));
      }
      response.writeHead(status, { "Content-Type": type, "Content-Length": content.length, "Cache-Control": "no-cache", ...(status === 404 ? { "X-Robots-Tag": "noindex" } : {}) });
      response.end(request.method === "HEAD" ? undefined : content);
    } catch {
      response.writeHead(400);
      response.end("Invalid request, or production build missing. Run npm run build first.");
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const option = (name, fallback) => process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : fallback;
  const port = Number(option("--port", "4173"));
  const host = option("--host", "127.0.0.1");
  const server = createStaticServer();
  server.listen(port, host, () => console.log(`Static production preview: http://${host}:${port}`));
}

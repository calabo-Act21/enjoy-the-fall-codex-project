import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = await readFile(resolve(root, "index.html"), "utf8");
const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
if (!canonical) throw new Error("URL canonique introuvable dans index.html.");
const basePath = new URL(canonical).pathname;
const port = Number(process.argv[2] || 4173);
if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error("Port attendu : entier entre 1024 et 65535.");
}
const mime = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".xml": "application/xml", ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json", ".webp": "image/webp",
  ".avif": "image/avif", ".jpg": "image/jpeg", ".png": "image/png",
  ".woff2": "font/woff2"
};

createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);
  } catch {
    response.writeHead(400).end("Requete invalide");
    return;
  }
  if (basePath !== "/" && pathname === basePath.slice(0, -1)) {
    response.writeHead(301, { Location: basePath }).end();
    return;
  }
  const usesBasePath = basePath !== "/" && pathname.startsWith(basePath);
  if (usesBasePath) pathname = `/${pathname.slice(basePath.length)}`;
  const file = resolve(root, `.${pathname === "/" ? "/index.html" : pathname}`);
  if (!file.startsWith(root + sep)) {
    response.writeHead(403).end("Acces refuse");
    return;
  }
  try {
    const body = await readFile(file);
    response.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    if (error.code !== "ENOENT" && error.code !== "EISDIR") {
      console.error(error);
      response.writeHead(500).end("Erreur du serveur local");
      return;
    }
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    const notFound = await readFile(resolve(root, "404.html"), "utf8");
    response.end(request.method === "HEAD" ? undefined : notFound.replace(/<base href="[^"]*">/, `<base href="${usesBasePath ? basePath : "/"}">`));
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Enjoy The Fall : http://127.0.0.1:${port}`);
}).on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});

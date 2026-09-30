import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const input = process.argv[2];
if (!input) throw new Error("Usage : node site\\tools\\configure-domain.mjs https://votre-domaine.fr");
const domain = new URL(input);
if (domain.protocol !== "https:" || domain.pathname !== "/" || domain.search || domain.hash
  || domain.username || domain.password || domain.port
  || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain.hostname) || domain.hostname.endsWith(".example")) {
  throw new Error("Fournir un domaine HTTPS reel, sans chemin, port, identifiants ou parametres.");
}
const html = await readFile(resolve(root, "index.html"), "utf8");
const current = html.match(/<link rel="canonical" href="(https:\/\/[^/]+)\/">/)?.[1];
if (!current) throw new Error("URL canonique introuvable : verifier index.html.");
const files = ["index.html", "robots.txt", "sitemap.xml"];
const updates = await Promise.all(files.map(async (file) => {
  const text = await readFile(resolve(root, file), "utf8");
  if (!text.includes(current)) throw new Error(`Domaine incoherent dans ${file}.`);
  return [file, text.replaceAll(current, domain.origin)];
}));
for (const [file, text] of updates) await writeFile(resolve(root, file), text, "utf8");
console.log(`Domaine configure : ${domain.origin}\nVerifier canonical, partage social, JSON-LD, robots et sitemap avant de deployer.`);

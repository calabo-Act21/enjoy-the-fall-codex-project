import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const input = process.argv[2];
if (!input) throw new Error("Usage : node tools\\configure-domain.mjs https://votre-domaine.fr/chemin-optionnel/");
const domain = new URL(input);
if (domain.protocol !== "https:" || domain.search || domain.hash
  || domain.username || domain.password || domain.port
  || !/^\/(?:[a-zA-Z0-9_-]+\/?)*$/.test(domain.pathname)
  || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain.hostname) || domain.hostname.endsWith(".example")) {
  throw new Error("Fournir une URL HTTPS reelle, avec chemin optionnel, sans port, identifiants ou parametres.");
}
const baseUrl = `${domain.origin}${domain.pathname.replace(/\/?$/, "/")}`;
const html = await readFile(resolve(root, "index.html"), "utf8");
const current = html.match(/<link rel="canonical" href="(https:\/\/[^"]+\/)">/)?.[1];
if (!current) throw new Error("URL canonique introuvable : verifier index.html.");
const files = ["index.html", "robots.txt", "sitemap.xml"];
const updates = await Promise.all(files.map(async (file) => {
  const text = await readFile(resolve(root, file), "utf8");
  if (!text.includes(current)) throw new Error(`Domaine incoherent dans ${file}.`);
  return [file, text.replaceAll(current, baseUrl)];
}));
const notFound = await readFile(resolve(root, "404.html"), "utf8");
if (!/<base href="[^"]*">/.test(notFound)) throw new Error("Base URL introuvable dans 404.html.");
updates.push(["404.html", notFound.replace(/<base href="[^"]*">/, `<base href="${new URL(baseUrl).pathname}">`)]);
for (const [file, text] of updates) await writeFile(resolve(root, file), text, "utf8");
console.log(`URL configuree : ${baseUrl}\nVerifier canonical, partage social, JSON-LD, robots, sitemap et page 404 avant de deployer.`);

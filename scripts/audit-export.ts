import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import manifestData from "../guides/ia-sin-miedo/guide.json";
import type { GuideManifest } from "../lib/guides/types";
import { normalizeBasePath } from "../lib/paths";

const output = join(process.cwd(), "out");
const basePath = normalizeBasePath();
const guides = [manifestData as GuideManifest];
const expected = ["index.html", ...guides.filter((g) => g.status === "published").flatMap((g) => [`guias/${g.slug}/index.html`, ...g.navigation.filter((u) => u.status === "published").map((u) => `guias/${g.slug}/${u.path.join("/")}/index.html`)])];
const errors: string[] = [];
for (const file of expected) if (!existsSync(join(output, file))) errors.push(`Falta ${file}`);
if (!existsSync(join(output, ".nojekyll"))) errors.push("Falta .nojekyll");

function files(dir: string): string[] { return readdirSync(dir).flatMap((name) => { const path = join(dir, name); return statSync(path).isDirectory() ? files(path) : [path]; }); }
const inspected = files(output).filter((file) => /\.(html|css|js)$/.test(file));
const htmlFiles = inspected.filter((file) => file.endsWith(".html"));
if (basePath) for (const file of inspected) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/(?:href|src)=["'](\/[^"']*)["']/g)) {
    const url = match[1];
    if (!url.startsWith(`${basePath}/`) && !url.startsWith("//")) errors.push(`${relative(output,file)} apunta fuera del prefijo: ${url}`);
  }
  if (file.endsWith(".css")) for (const match of text.matchAll(/url\(["']?(\/[^)'\"]*)/g)) {
    if (!match[1].startsWith(`${basePath}/`) && !match[1].startsWith("//")) errors.push(`${relative(output,file)} contiene un recurso CSS fuera del prefijo: ${match[1]}`);
  }
}
for (const file of htmlFiles) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/href=["']([^"'#]+)["']/g)) {
    const href = match[1];
    if (!href.startsWith("/")) continue;
    const local = basePath && href.startsWith(basePath) ? href.slice(basePath.length) : href;
    if (local.startsWith("/_next/") || local === "/") continue;
    const target = join(output, local.replace(/^\//, ""), "index.html");
    if (!existsSync(target)) errors.push(`${relative(output,file)} enlaza a una página ausente: ${href}`);
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Exportación correcta: ${expected.length} páginas; ${inspected.length} archivos HTML/CSS/JS revisados; prefijo «${basePath || "/"}».`);

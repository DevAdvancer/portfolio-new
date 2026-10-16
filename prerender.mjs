import { createServer } from "vite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const vite = await createServer({ root, server: { middlewareMode: true, hmr: false }, appType: "custom" });
try {
  const { render, indexablePaths, getDiscoveryAssets } = await vite.ssrLoadModule("/src/entry-server.tsx");
  const template = await readFile(path.join(root, "dist/index.html"), "utf8");
  if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) throw new Error("Build template is missing prerender placeholders");
  const head = template.match(/<head>([\s\S]*?)<\/head>/)?.[1].replace("<!--app-head-->", "");
  if (!head) throw new Error("Build template is missing its head");
  const manifest = JSON.parse(await readFile(path.join(root, "dist/.vite/manifest.json"), "utf8"));
  const routeEntry = route => route === "/" ? "Index" : route === "/projects" ? "ProjectIndex" : route.startsWith("/projects/") ? "ProjectPage" : route === "/blog" ? "Blog" : route.startsWith("/blog/") ? "BlogPost" : route === "/contact" ? "Contact" : route === "/achievements" ? "Achievements" : "NotFound";
  const preloadRoute = route => {
    const files = new Set();
    const visit = key => {
      const entry = manifest[key];
      if (!entry || files.has(entry.file)) return;
      files.add(entry.file);
      entry.imports?.forEach(visit);
    };
    visit(`src/pages/${routeEntry(route)}.tsx`);
    return [...files].filter(file => !head.includes(`href="/${file}"`)).map(file => `<link rel="modulepreload" crossorigin href="/${file}" />`).join("");
  };
  for (const route of [...indexablePaths, "/404"]) {
    const document = await render(route, head + preloadRoute(route));
    // Extensionless URLs map to these files on Vercel (cleanUrls: true).
    const filename = route === "/" ? "index.html" : `${route.slice(1)}.html`;
    const target = path.join(root, "dist", filename);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, document);
    console.log(`Prerendered ${route}`);
  }
  for (const [filename, content] of Object.entries(getDiscoveryAssets())) {
    // Also refresh local public files so dev and production expose the same references.
    await writeFile(path.join(root, "public", filename), content);
    await writeFile(path.join(root, "dist", filename), content);
  }
  console.log(`Search assets generated; ${indexablePaths.length} indexable pages plus a noindex 404.`);
} finally {
  await vite.close();
}

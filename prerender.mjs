import { createServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

const routes = ["/", "/blog", "/achievements", "/contact"];

async function prerender() {
  const vite = await createServer({
    root: process.cwd(),
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    ssr: {
      noExternal: ["framer-motion"],
    },
    server: {
      port: 4173,
    },
  });

  const url = (pathname) => `http://localhost:4173${pathname}`;

  for (const route of routes) {
    console.log(`Prerendering ${route}...`);
    try {
      const html = await vite.transformIndexHtml(route, fs.readFileSync(path.resolve(__dirname, "dist/index.html"), "utf-8"));
      fs.writeFileSync(path.resolve(__dirname, `dist${route === "/" ? "/index" : route}.html`), html);
      console.log(`✓ ${route}`);
    } catch (e) {
      console.error(`✗ ${route}:`, e.message);
    }
  }

  await vite.close();
  console.log("Prerendering complete!");
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});

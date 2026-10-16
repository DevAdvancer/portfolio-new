import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    manifest: true,
    target: "es2020",
    cssCodeSplit: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Split vendor into logical chunks for better caching and parallel loading
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return undefined;

          // React core - critical, loaded immediately
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/scheduler/")) {
            return "react-core";
          }
          // Router - critical for SPA
          if (id.includes("node_modules/react-router") || id.includes("node_modules/@remix-run/router")) {
            return "router";
          }
          // Motion/animation - lazy load
          if (id.includes("framer-motion")) {
            return "motion-vendor";
          }
          // Radix UI - lazy load
          if (id.includes("@radix-ui")) {
            return "radix-vendor";
          }
          // Icons - lazy load
          if (id.includes("lucide-react")) {
            return "icons-vendor";
          }
          // Markdown rendering - lazy load
          if (id.includes("react-markdown") || id.includes("remark") || id.includes("unified") || id.includes("micromark") || id.includes("mdast")) {
            return "markdown-vendor";
          }
          // Forms - lazy load
          if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("zod")) {
            return "forms-vendor";
          }
          // UI utilities
          if (id.includes("class-variance-authority") || id.includes("clsx") || id.includes("tailwind-merge") || id.includes("cmdk") || id.includes("vaul") || id.includes("sonner") || id.includes("date-fns")) {
            return "ui-vendor";
          }
          // Everything else
          return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  esbuild: {
    legalComments: "none",
  },
}));

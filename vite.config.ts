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
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Keep React, React-DOM, and React-Router together
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            // Group all other node_modules
            if (id.includes('@radix-ui') || id.includes('lucide-react') ||
                id.includes('@tanstack') || id.includes('three') ||
                id.includes('@react-three')) {
              return 'vendor';
            }
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1600,
  },
}));

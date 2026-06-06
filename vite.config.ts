import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const base = isGitHubPages ? "/py/" : "/";

export default defineConfig({
  base,
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  define: {
    __APP_BASE__: JSON.stringify(base),
  },
  build: {
    target: "es2022",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "react-vendor";
          if (id.includes("@tanstack/react-router")) return "router-vendor";
          if (id.includes("@uiw/react-codemirror") || id.includes("@codemirror")) return "editor-vendor";
          if (id.includes("@base-ui-components") || id.includes("lucide-react")) return "ui-vendor";
          if (id.includes("node_modules/zod")) return "zod-vendor";
        },
      },
    },
  },
  worker: {
    format: "es",
  },
  optimizeDeps: {
    exclude: ["pyodide"],
  },
});

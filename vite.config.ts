import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Enable JS code splitting
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: {
          // Vendor chunks for better caching
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
          ],
          "vendor-lucide": ["lucide-react"],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Use default esbuild minifier (faster and already included)
    minify: "esbuild",
    // Generate sourcemaps for debugging
    sourcemap: false,
    // Mobile-specific optimizations: reduce initial bundle size
    target: "es2020",
    // Improve tree-shaking
    treeShaking: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
  // SSR build optimizations (keep separate for SSR scenarios)
  ssr: {
    noExternal: ["lucide-react"],
  },
}));

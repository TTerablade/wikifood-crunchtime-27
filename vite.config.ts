
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Server config
  const serverConfig = {
    host: "::",
    port: 8080,
    // Added proxy configuration in case it's needed for API calls
    proxy: {
      // Example: '/api': 'http://localhost:3000'
    }
  };

  // Return config object
  return {
    server: serverConfig,
    // Add base path - this allows for deployment in subdirectories
    base: './',
    build: {
      // Optimize build output
      outDir: 'dist',
      assetsDir: 'assets',
      // Generate source maps for production
      sourcemap: mode !== 'production',
      // Minification options
      minify: 'terser',
      // Chunk size warnings at 1000kb
      chunkSizeWarningLimit: 1000,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

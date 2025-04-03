
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Server config with enhanced caching controls
  const serverConfig = {
    host: "::",
    port: 8080,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Clear-Site-Data': '"cache"',
    },
    // Added proxy configuration in case it's needed for API calls
    proxy: {
      // Example: '/api': 'http://localhost:3000'
    }
  };

  // Return config object
  return {
    server: serverConfig,
    // Add base path - this allows for deployment in subdirectories
    base: '/',  // Changed from './' to '/' for consistent path resolution
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
      // Ensure static assets are handled correctly
      assetsInlineLimit: 4096,
      // Improve caching with content hash
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
          },
          entryFileNames: 'assets/[name]-[hash]-[timestamp].js',
          chunkFileNames: 'assets/[name]-[hash]-[timestamp].js',
          assetFileNames: 'assets/[name]-[hash]-[timestamp].[ext]'
        }
      }
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

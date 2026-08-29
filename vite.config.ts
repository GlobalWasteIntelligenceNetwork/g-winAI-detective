import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: '/g-winAIdetective/',
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 100000000,
  chunkSizeWarningLimit: 100000000,
  cssCodeSplit: false,
  rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});

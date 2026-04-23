import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths for the production bundle
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:9090'
    }
  }
});

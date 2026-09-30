import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Absolute base: nested routes (/portfolio/:slug) make relative asset
  // URLs resolve against the wrong directory. Requires an SPA fallback
  // rewrite on the host (see README note in the final report).
  base: '/',
});

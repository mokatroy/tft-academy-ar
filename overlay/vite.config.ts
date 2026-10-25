import process from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const allowedHost = process.env.VITE_ALLOWED_HOST;

/**
 * The overlay renderer is a normal web app: Vite serves it on :3200 during
 * development (loadable in a plain browser for quick design checks) and
 * Electron loads the built files through the privileged `app://` scheme.
 */
export default defineConfig({
  base: './',
  plugins: [react()],
  // Reuse the site's local champion/item icons and Tajawal webfonts as-is.
  publicDir: '../public',
  server: {
    host: '0.0.0.0',
    port: 3200,
    strictPort: true,
    allowedHosts: allowedHost ? [allowedHost] : undefined,
    fs: { allow: ['..'] },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'chrome126',
    assetsInlineLimit: 0,
  },
});

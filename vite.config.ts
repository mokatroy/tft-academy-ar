import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const allowedHost = process.env.VITE_ALLOWED_HOST;
const ARCHIVE = 'tft-academy-ar-source.zip';

const archiveDownloadPlugin = (): Plugin | undefined => {
  const file = resolve(process.cwd(), ARCHIVE);
  if (!existsSync(file)) return undefined;
  const data = readFileSync(file);
  return {
    name: 'archive-download',
    // configureServer runs only on the dev server; it never ships to production builds.
    configureServer(server) {
      server.middlewares.use(`/${ARCHIVE}`, (_req, res) => {
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Length', String(data.length));
        res.setHeader('Content-Disposition', `attachment; filename="${ARCHIVE}"`);
        res.end(data);
      });
    },
  };
};

export default defineConfig({
  plugins: [react(), archiveDownloadPlugin()].filter(Boolean),
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: allowedHost ? [allowedHost] : undefined,
  },
});
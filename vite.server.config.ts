import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'server.ts',
    outDir: 'dist-server',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-dom/server',
        'react-router-dom',
        'express',
        'compression',
        'fs',
        'path',
        'url',
      ],
      output: {
        format: 'esm',
      },
    },
  },
});

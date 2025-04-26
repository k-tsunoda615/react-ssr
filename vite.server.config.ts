import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    outDir: 'dist-server',
    rollupOptions: {
      input: 'server.ts',
      external: [
        'express',
        'fs',
        'path',
        'url',
        'react',
        'react-dom',
        'react-dom/server',
        'react/jsx-runtime',
      ],
    },
  },
});

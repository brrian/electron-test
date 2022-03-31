import react from '@vitejs/plugin-react';
import { builtinModules } from 'module';
import { join } from 'path';
import { defineConfig } from 'vite';
import { chrome } from '../../.electron-vendors.cache.json';

const PACKAGE_ROOT = __dirname;

export default defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '@/': join(PACKAGE_ROOT, 'src') + '/',
    },
  },
  plugins: [react()],
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: {
        app: join(PACKAGE_ROOT, 'app.html'),
      },
      external: [...builtinModules.flatMap(p => [p, `node:${p}`])],
    },
    emptyOutDir: true,
    brotliSize: false,
  },
  test: {
    coverage: {
      all: true,
      exclude: ['src/models', 'src/__fixtures__', '**/*.spec.{ts,tsx}'],
      include: ['src/**/*.{ts,tsx}'],
    },
    globals: true,
    environment: 'happy-dom',
    setupFiles: './setupTests.ts',
  },
});

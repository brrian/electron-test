import { builtinModules } from 'module';
import { join } from 'path';
import { defineConfig } from 'vite';
import { node } from '../../.electron-vendors.cache.json';

const PACKAGE_ROOT = __dirname;

export default defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: process.cwd(),
  resolve: {
    alias: {
      '@domain': join(PACKAGE_ROOT, '../domain'),
    },
  },
  build: {
    sourcemap: 'inline',
    target: `node${node}`,
    outDir: 'dist',
    assetsDir: '.',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [
        'electron',
        'electron-devtools-installer',
        ...builtinModules.flatMap(p => [p, `node:${p}`]),
      ],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
    brotliSize: false,
  },
  test: {
    clearMocks: true,
    coverage: {
      all: true,
      exclude: ['src/index.ts', 'src/**/__tests__/**/*.ts'],
      include: ['src/**/*.ts'],
    },
    globals: true,
  },
});

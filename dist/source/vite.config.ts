import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths({ root: './' }), solid()],
  base: './',
  build: {
    outDir: '../web',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name][extname]`,
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
      },
    },
  },
});

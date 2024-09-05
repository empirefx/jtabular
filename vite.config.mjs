import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'docs',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/lib/jtabular.js'),
      name: 'jtabular',
      fileName: 'jtabular',
    },
  },
})
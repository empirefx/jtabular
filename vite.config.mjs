import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/lib/jtabular.js'),
      name: 'MyLib',
      fileName: 'my-lib',
    },
  },
})
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: '../vue-myPortfolio-build',
    // sourcemap:true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // css:{
  //   preprocessorOptions:{
  //     scss:{
  //       additionalData: '@import "@/assets/styles/base.scss";'
  //     }
  //   }
  // },
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://127.0.0.1:3000/',
    },
  },
})

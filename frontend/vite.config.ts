import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
let port = process.env.PORT || 5000
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      "^/api": {
        target: `http://localhost:${port}/api`,
        // target: `http://192.168.1.3:${port}/api`, 
        // target: `https://83a2-72-252-230-37.ngrok.io/api`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      }
    }
  },
  build: {
    outDir: "../server/public"
  }

})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/petsApi": {
        target: "https://biggamesapi.io/api/collection/Pets",
        secure: false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/petsApi/, '')
      },
      "/rapApi": {
        target: "https://biggamesapi.io/api/rap",
        secure: false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/rapApi/, '')
      }
    },
  },
  plugins: [react()],
  base: "/pets/"
})

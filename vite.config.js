import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api': {
      //   target: 'https://biggamesapi.io/api',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // },
      '/pets/api': {
        target: 'https://biggamesapi.io/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pets\/api/, '/api'),
      },
    },
  },
  base: "/pets/"
});
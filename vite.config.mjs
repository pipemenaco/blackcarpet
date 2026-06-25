import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El frontend (Vite, puerto 5173) en desarrollo proxea las llamadas /api
// hacia el backend Express (puerto 3000). En producción Express sirve el build.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', 
  server: {
    proxy:{
      "/api/": "https://mymovieapp-production.up.railway.app",
      "/uploads/": "https://mymovieapp-production.up.railway.app",
    }
  }
})
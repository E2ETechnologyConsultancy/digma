import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Needed for Docker on Windows/Mac
    },
    host: true, // Needed for Docker
    strictPort: true,
    port: 3000
  }
})
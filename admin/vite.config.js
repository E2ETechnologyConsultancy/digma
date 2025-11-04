// vite.config.js
import react from '@vitejs/plugin-react'

export default {
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Needed for Docker on Windows/Mac
    },
    host: true, // Needed for Docker
    strictPort: true,
    port: 5173
  }
}
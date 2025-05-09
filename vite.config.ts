import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/kanban-board-app/',
  plugins: [react()],
  server: {
    port: 3000
  }
})
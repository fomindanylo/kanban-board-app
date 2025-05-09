import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/kanban-board-app/',
  plugins: [react()],
  server: {
    port: 3000
  }
}))
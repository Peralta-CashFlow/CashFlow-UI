import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/CashFlow-UI/',
  plugins: [react()],
  server: {
    port: 3000
  }
})

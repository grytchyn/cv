import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/portfolio-cv/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'docs',
  },
})

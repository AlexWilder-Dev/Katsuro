import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative asset paths: the HashRouter never changes the page path, so the
// build works at /Katsuro/ (the repo's Pages URL) or /katsuro/ alike.
export default defineConfig({
  base: './',
  plugins: [react()],
})

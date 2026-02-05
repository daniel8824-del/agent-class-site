import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.md'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-markdown': ['unified', 'remark-parse', 'remark-gfm', 'remark-rehype', 'rehype-raw', 'rehype-slug', 'rehype-stringify'],
          'vendor-ui': ['framer-motion', 'lucide-react', 'fuse.js'],
          'vendor-shiki': ['shiki'],
          'vendor-mermaid': ['mermaid'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})

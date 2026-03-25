import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    // Optimize assets and chunks
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Code splitting configuration
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor'
            }
            return 'vendor'
          }
        },
      },
    },
  },
  // Optimize assets
  assetsInclude: ['**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.webp'],
})

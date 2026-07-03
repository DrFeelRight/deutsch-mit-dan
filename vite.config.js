import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React rarely changes between deploys; a stable vendor chunk stays
          // cached on the client while app code iterates.
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});

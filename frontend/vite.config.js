import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression2';

export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  define: {
    global: {},
  },
  plugins: [
    react(),
    compression( {
      include: [/\.(js)$/, /\.(css)$/],
      threshold: 1000,
    })
  ],
});

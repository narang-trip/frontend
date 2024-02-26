import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer';
import inspector from 'vite-plugin-inspector';

export default defineConfig({
  server: {
    host: true,
    port: 3000
  },
  define: {
    global: {},
  },
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true, brotliSize: true }), // Rollup 플러그인을 이렇게 추가
    inspector(), // Vite 플러그인 인스펙터 추가
  ],
});

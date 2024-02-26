import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

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
    visualizer({ open: true, gzipSize: true, brotliSize: true }),
    viteCompression({ // 압축 플러그인 설정
      verbose: true, // 압축된 파일에 대한 로그를 출력
      disable: false, // 프로덕션 빌드에서 압축을 비활성화하려면 true로 설정
      threshold: 10240, // 압축을 적용할 최소 파일 크기 (바이트 단위)
      algorithm: 'gzip', 
      ext: '.gz', // 생성되는 파일 확장자
    }),
  ],
});

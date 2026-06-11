import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Router được build lúc runtime từ import.meta.glob('src/pages/**/index.tsx')
// trong src/router/index.tsx — không cần codegen plugin.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
});

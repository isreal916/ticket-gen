import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
  define: {
    __APP_ENV__: loadEnv('production', process.cwd(), ''),
  },
});

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // Proxy API calls to an edge function in production
        // In dev, the geminiService falls back to a direct call if API key is available
        proxy: env.GEMINI_API_KEY ? undefined : undefined,
      },
      plugins: [react()],
      define: {
        // Only expose the key in development mode — NEVER in production builds
        ...(mode === 'development' && env.GEMINI_API_KEY
          ? { 'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY) }
          : {}),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Ensure the API key is NOT in production builds
        define: {},
      }
    };
});

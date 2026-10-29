import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/bolsai': {
          target: 'https://api.usebolsai.com',
          changeOrigin: true,
          // Substitui /api/bolsai por /api/v1
          rewrite: (path) => path.replace(/^\/api\/bolsai/, '/api/v1'),
          headers: {
            'X-API-Key': env.BOLSAI_API_KEY || '',
          },
        },
      },
    },
  }
})
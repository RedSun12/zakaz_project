import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // это порт, на котором будет запущен Vite dev server
  },
  define: {
    'process.env': {
      VITE_API: '/api/v1',// ? все запросы, начинающиеся с /api, будут проксироваться
      VITE_BASE_URL: 'http://localhost:3100/',// ?  URL, на который будут перенаправлены запросы (=порт подключения клиента к серву)
    },
  },
});
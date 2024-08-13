import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, //Para carregar .env 
  },
  server: {
    proxy: {
      // Define um proxy para redirecionar chamadas para /api
      '/api': {
        target: 'http://18.191.214.173:8000', // URL do backend
        changeOrigin: true, // Altera a origem do pedido para o target
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove o prefixo /api do caminho
      },
    },
  },
});

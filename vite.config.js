import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Change to your desired port
  },
  resolve: {
    alias: {
      // Dominio
      '@Dominio': path.resolve(__dirname, 'src/Dominio'),
      '@Modelos': path.resolve(__dirname, 'src/Dominio/Modelos'),
      '@Repositorios': path.resolve(__dirname, 'src/Dominio/Repositorios'),
      '@Servicios': path.resolve(__dirname, 'src/Dominio/Servicios'),

      // Vistas
      '@Vistas': path.resolve(__dirname, 'src/Vistas'),
      '@Componentes': path.resolve(__dirname, 'src/Vistas/Componentes'),
      '@Paginas': path.resolve(__dirname, 'src/Vistas/Paginas'),
      '@Atomos': path.resolve(__dirname, 'src/Vistas/Componentes/Atomo'),
      '@Moleculas': path.resolve(__dirname, 'src/Vistas/Componentes/Molecula'),
      '@Organismos': path.resolve(__dirname, 'src/Vistas/Componentes/Organismo'),

      // Extras
      '@Rutas': path.resolve(__dirname, 'src/Rutas'),
      '@Constantes': path.resolve(__dirname, 'src/Constantes'),
      '@Hooks': path.resolve(__dirname, 'src/hooks'),
      '@Utilidades': path.resolve(__dirname, 'src/Utilidades'),
      '@Temporal': path.resolve(__dirname, 'src/temporal.jsx'),
    },
  },
});

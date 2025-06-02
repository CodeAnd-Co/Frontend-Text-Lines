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
      '@SRC': path.resolve(__dirname, 'src/'),

      // Dominio
      '@Dominio': path.resolve(__dirname, 'src/Dominio'),
      '@Modelos': path.resolve(__dirname, 'src/Dominio/Modelos'),
      '@Repositorios': path.resolve(__dirname, 'src/Dominio/Repositorios'),
      '@Servicios': path.resolve(__dirname, 'src/Dominio/Servicios'),

      // Vistas
      '@Vistas': path.resolve(__dirname, 'src/Vistas'),
      '@Componentes': path.resolve(__dirname, 'src/Vistas/Componentes'),
      '@Paginas': path.resolve(__dirname, 'src/Vistas/Paginas'),
      '@Atomos': path.resolve(__dirname, 'src/Vistas/Componentes/Atomos'),
      '@Moleculas': path.resolve(__dirname, 'src/Vistas/Componentes/Moleculas'),
      '@Organismos': path.resolve(__dirname, 'src/Vistas/Componentes/Organismos'),

      // Alias específicos para carpetas de páginas
      '@Categorias': path.resolve(__dirname, 'src/Vistas/Paginas/Categorias'),
      '@Clientes': path.resolve(__dirname, 'src/Vistas/Paginas/Clientes'),
      '@Configuracion': path.resolve(__dirname, 'src/Vistas/Paginas/Configuracion'),
      '@Cuotas': path.resolve(__dirname, 'src/Vistas/Paginas/Cuotas'),
      '@Empleados': path.resolve(__dirname, 'src/Vistas/Paginas/Empleados'),
      '@Errores': path.resolve(__dirname, 'src/Vistas/Paginas/Errores'),
      '@Eventos': path.resolve(__dirname, 'src/Vistas/Paginas/Eventos'),
      '@Pedidos': path.resolve(__dirname, 'src/Vistas/Paginas/Pedidos'),
      '@Productos': path.resolve(__dirname, 'src/Vistas/Paginas/Productos'),
      '@Roles': path.resolve(__dirname, 'src/Vistas/Paginas/Roles'),
      '@SetsProductos': path.resolve(__dirname, 'src/Vistas/Paginas/SetsProductos'),
      '@Usuarios': path.resolve(__dirname, 'src/Vistas/Paginas/Usuarios'),

      // Extras
      '@Rutas': path.resolve(__dirname, 'src/Rutas'),
      '@Constantes': path.resolve(__dirname, 'src/Utilidades/Constantes'),
      '@Hooks': path.resolve(__dirname, 'src/hooks'),
      '@Utilidades': path.resolve(__dirname, 'src/Utilidades'),
      '@Temporal': path.resolve(__dirname, 'src/temporal.jsx'),
      '@Tienda': path.resolve(__dirname, 'src/Vistas/Paginas/Tienda.jsx'),
    },
  },
});

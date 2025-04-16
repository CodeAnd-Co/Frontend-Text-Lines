export const RUTAS = {
  INICIO_SESION: '/iniciar-sesion',
  SISTEMA_ADMINISTRATIVO: {
    BASE: '/admin',
    CLIENTES: '/clientes',
    CONFIGURACION: '/configuracion',
    CUOTAS: '/cuotas',
    EMPLEADOS: '/empleados',
    EVENTOS: '/eventos',
    PRODUCTOS: '/productos',
    USUARIOS: {
      BASE: '/usuarios',
      CONSULTAR_ROLES: '/consultar-roles',
    },
  },
  SISTEMA_TIENDA: {
    BASE: '/tienda',
    CARRITO: '/carrito',
    CATALOGO: '/catalogo',
  },
  INICIO: '/',
  RAIZ: '/*',
};

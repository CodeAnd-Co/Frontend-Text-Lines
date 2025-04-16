export const RUTAS = {
  INICIO_SESION: '/iniciar-sesion',
  NO_AUTORIZADO: '/no-autorizado',
  NO_ENCONTRADO: '/no-encontrado',
  SISTEMA_ADMINISTRATIVO: {
    BASE: '/admin',
    TABLERO: '/tablero',
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

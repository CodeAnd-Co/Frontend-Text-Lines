export const RUTAS = {
  INICIO_SESION: '/iniciar-sesion',
  NO_AUTORIZADO: '/no-autorizado',
  NO_ENCONTRADO: '/no-encontrado',
  SISTEMA_ADMINISTRATIVO: {
    BASE: '/admin',
    TABLERO: '/tablero',
    CONFIGURACION: '/configuracion',
    CUOTAS: { BASE: '/cuotas', EDITAR_CUOTAS: '/editar-cuotas' },
    EMPLEADOS: '/empleados',
    EVENTOS: '/eventos',
    PRODUCTOS: '/productos',
    CATEGORIAS: '/categorias',
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

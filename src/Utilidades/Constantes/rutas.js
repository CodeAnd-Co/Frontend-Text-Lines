export const RUTAS = {
  INICIO_SESION: '/iniciar-sesion',
  NO_AUTORIZADO: '/no-autorizado',
  NO_ENCONTRADO: '/no-encontrado',
  SISTEMA_ADMINISTRATIVO: {
    BASE: '/admin',
    TABLERO: '/tablero',
    EMPLEADOS: {
      BASE: '/empleados',
      CONSULTAR_EMPLEADOS: '/consultar-lista',
      CONSULTAR_GRUPOS: '/consultar-grupos',
    },
    PRODUCTOS: {
      BASE: '/productos',
      CONSULTAR_PRODUCTOS: '/consultar-lista',
      CONSULTAR_SETS: '/consultar-sets',
      CONSULTAR_CATEGORIAS: '/consultar-categorias',
    },
    PEDIDOS: '/pedidos',
    CUOTAS: { BASE: '/cuotas', EDITAR_CUOTAS: '/editar-cuotas' },
    EVENTOS: '/eventos',
    CONFIGURACION: '/configuracion',
    CUOTAS: '/cuotas',
    EMPLEADOS: '/empleados',
    EVENTOS: '/eventos',
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

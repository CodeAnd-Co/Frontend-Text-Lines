const BASE_EMPLEADOS = 'empleados';
const BASE_PRODUCTOS = 'productos';
const BASE_PEDIDOS = 'pedidos';
const BASE_CUOTAS = 'cuotas';
const BASE_EVENTOS = 'eventos';

const BASE_ADMIN = 'admin';
const BASE_TABLERO = 'tablero';

export const RUTAS = {
  INICIO_SESION: '/iniciar-sesion',
  NO_AUTORIZADO: '/no-autorizado',
  NO_ENCONTRADO: '/no-encontrado',
  SISTEMA_ADMINISTRATIVO: {
    BASE: `/${BASE_ADMIN}`,
    TABLERO: `/${BASE_TABLERO}/`,

    BASE_TABLERO: `/${BASE_ADMIN}/${BASE_TABLERO}/`,

    EMPLEADOS: {
      BASE: `${BASE_EMPLEADOS}`,
      CONSULTAR_EMPLEADOS: `${BASE_EMPLEADOS}/consultar-lista`,
      CONSULTAR_GRUPOS: `${BASE_EMPLEADOS}/consultar-grupos`,
    },
    PRODUCTOS: {
      BASE: `${BASE_PRODUCTOS}`,
      CONSULTAR_PRODUCTOS: `${BASE_PRODUCTOS}/consultar-lista`,
      CONSULTAR_SETS_PRODUCTOS: `${BASE_PRODUCTOS}/consultar-sets`,
      CONSULTAR_CATEGORIAS: `${BASE_PRODUCTOS}/consultar-categorias`,
    },
    PEDIDOS: `${BASE_PEDIDOS}`,
    CUOTAS: { BASE: `${BASE_CUOTAS}`, EDITAR_CUOTAS: `${BASE_CUOTAS}/editar-cuotas` },
    EVENTOS: `${BASE_EVENTOS}`,
    CONFIGURACION: '/configuracion',
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

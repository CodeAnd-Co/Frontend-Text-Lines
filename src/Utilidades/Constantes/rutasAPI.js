const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_USUARIOS = `${BASE_URL}/api/usuarios`;
const BASE_CATEGORIAS = `${BASE_URL}/api/categorias`;
const BASE_PRODUCTOS = `${BASE_URL}/api/productos`;
const BASE_SETS_PRODUCTOS = `${BASE_URL}/api/sets-productos`;
const BASE_CLIENTES = `${BASE_URL}/api/clientes`;
const BASE_EMPLEADOS = `${BASE_URL}/api/empleados`;
const BASE_CUOTAS = `${BASE_URL}/api/cuotas`;
const BASE_ROLES = `${BASE_URL}/api/roles`;
const BASE_PEDIDOS = `${BASE_URL}/api/pedidos`;

export const RUTAS_API = {
  USUARIOS: {
    BASE: BASE_USUARIOS,
    CONSULTAR_LISTA: `${BASE_USUARIOS}/consultar-lista-usuarios`,
    CONSULTAR_USUARIO: `${BASE_USUARIOS}/consultar-usuario`,
    ELIMINAR_USUARIOS: `${BASE_USUARIOS}/eliminar-usuarios`,
  },
  CATEGORIAS: {
    BASE: BASE_CATEGORIAS,
    CONSULTAR_LISTA: `${BASE_CATEGORIAS}/consultar-lista-categorias`,
    CREAR: `${BASE_CATEGORIAS}/crear-categoria`,
    ELIMINAR_CATEGORIA: `${BASE_CATEGORIAS}/eliminar`,
  },
  PRODUCTOS: {
    BASE: BASE_PRODUCTOS,
    CONSULTAR_LISTA: `${BASE_PRODUCTOS}/consultar-lista`,
    ELIMINAR_PRODUCTO: `${BASE_PRODUCTOS}/eliminar`,
  },
  SETS_PRODUCTOS: {
    BASE: BASE_SETS_PRODUCTOS,
    CONSULTAR_LISTA: `${BASE_SETS_PRODUCTOS}/consultar-lista`,
    ELIMINAR_SET_PRODUCTOS: `${BASE_SETS_PRODUCTOS}/eliminar`,
  },
  CLIENTES: {
    BASE: BASE_CLIENTES,
    CONSULTAR_LISTA: `${BASE_CLIENTES}/consultar-lista`,
    CONSULTAR_SISTEMA: `${BASE_CLIENTES}/consultar-sistema`,
    ELIMINAR_CLIENTE: `${BASE_CLIENTES}/eliminar`,
  },
  EMPLEADOS: {
    BASE: BASE_EMPLEADOS,
    CONSULTAR_LISTA: `${BASE_EMPLEADOS}/consultar-lista`,
    CONSULTAR_GRUPOS: `${BASE_EMPLEADOS}/consultar-grupo`,
  },
  CUOTAS: {
    BASE: BASE_CUOTAS,
    CREAR_CUOTA: `${BASE_CUOTAS}/crear-cuota`,
    CONSULTAR_LISTA: `${BASE_CUOTAS}/consultar-lista`,
  },
  ROLES: {
    BASE: BASE_ROLES,
    CONSULTAR_LISTA: `${BASE_ROLES}/consultar-lista`,
    CREAR_ROL: `${BASE_ROLES}/crear-rol`,
  },
  PEDIDOS: {
    BASE: BASE_PEDIDOS,
    CONSULTAR_LISTA: `${BASE_PEDIDOS}/consultar-lista`,
    ELIMINAR_PEDIDO: `${BASE_PEDIDOS}/eliminar`,
  },
};

const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_CATEGORIAS = `${BASE_URL}/api/categorias`;
const BASE_PRODUCTOS = `${BASE_URL}/api/productos`;
const BASE_CLIENTES = `${BASE_URL}/api/clientes`;
const BASE_ROLES = `${BASE_URL}/api/roles`;
const BASE_EMPLEADOS = `${BASE_URL}/api/empleados`;

export const RUTAS_API = {
  CATEGORIAS: {
    BASE: BASE_CATEGORIAS,
    CONSULTAR_LISTA: `${BASE_CATEGORIAS}/consultar-lista-categorias`,
  },
  PRODUCTOS: {
    BASE: BASE_PRODUCTOS,
    CONSULTAR_LISTA: `${BASE_PRODUCTOS}/consultar-lista`,
  },
  CLIENTES: {
    BASE: BASE_CLIENTES,
    CONSULTAR_LISTA: `${BASE_CLIENTES}/consultar-lista`,
    CONSULTAR_SISTEMA: `${BASE_CLIENTES}/consultar-sistema`,
  },
  ROLES: {
    BASE: BASE_ROLES,
    CONSULTAR_LISTA: `${BASE_ROLES}/consultar-lista`,
  EMPLEADOS: {
    BASE: BASE_EMPLEADOS,
    CONSULTAR_GRUPOS: `${BASE_EMPLEADOS}/consultar-grupo`,
  },
};

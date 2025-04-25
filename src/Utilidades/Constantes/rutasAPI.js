const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_USUARIOS = `${BASE_URL}/api/usuarios`;
const BASE_CATEGORIAS = `${BASE_URL}/api/categorias`;
const BASE_PRODUCTOS = `${BASE_URL}/api/productos`;
const BASE_CLIENTES = `${BASE_URL}/api/clientes`;
const BASE_EMPLEADOS = `${BASE_URL}/api/empleados`;
const BASE_CUOTAS = `${BASE_URL}/api/cuotas`;

export const RUTAS_API = {
  USUARIOS: {
    BASE: BASE_USUARIOS,
    CONSULTAR_LISTA: `${BASE_USUARIOS}/consultar-lista-usuarios`,
  },
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
  EMPLEADOS: {
    BASE: BASE_EMPLEADOS,
    CONSULTAR_GRUPOS: `${BASE_EMPLEADOS}/consultar-grupo`,
  },
  CUOTAS: {
    BASE: BASE_CUOTAS,
    CREAR_CUOTA: `${BASE_CUOTAS}/crear-cuota`,
  },
};

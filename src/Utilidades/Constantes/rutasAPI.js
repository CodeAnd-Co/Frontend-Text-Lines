const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_CATEGORIAS = `${BASE_URL}/api/categorias`;
const BASE_CLIENTES = `${BASE_URL}/api/clientes`;

export const RUTAS_API = {
  CATEGORIAS: {
    BASE: BASE_CATEGORIAS,
    CONSULTAR_LISTA: `${BASE_CATEGORIAS}/consultar-lista-categorias`,
  },
  CLIENTES: {
    BASE: BASE_CLIENTES,
    CONSULTAR_LISTA: `${BASE_CLIENTES}/consultar-lista`,
    CONSULTAR_SISTEMA: `${BASE_CLIENTES}/consultar-sistema`,
  },
};

const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_CATEGORIAS = `${BASE_URL}/api/categorias`;
const BASE_PRODUCTOS = `${BASE_URL}/api/productos`;

export const RUTAS_API = {
  CATEGORIAS: {
    BASE: BASE_CATEGORIAS,
    CONSULTAR_LISTA: `${BASE_CATEGORIAS}/consultar-lista-categorias`,
  },
  PRODUCTOS: {
    BASE: BASE_PRODUCTOS,
    CONSULTAR_LISTA: `${BASE_PRODUCTOS}/consultar-lista`,
  },
};

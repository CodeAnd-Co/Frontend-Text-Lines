const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_CATEGORIAS = `${BASE_URL}/api/categorias`;

export const RUTAS_API = {
  CATEGORIAS: {
    BASE: BASE_CATEGORIAS,
    CONSULTAR_LISTA: `${BASE_CATEGORIAS}/consultar-lista-categorias`,
  },
};
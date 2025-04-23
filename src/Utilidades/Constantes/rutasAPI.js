const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_USUARIOS = `${BASE_URL}/api/usuarios`;
const BASE_CATEGORIAS = `${BASE_URL}/api/categorias`;

export const RUTAS_API = {
  USUARIOS: {
    BASE: BASE_USUARIOS,
    CONSULTAR_LISTA: `${BASE_USUARIOS}/consultar-usuario`,
  },
  CATEGORIAS: {
    BASE: BASE_CATEGORIAS,
    CONSULTAR_LISTA: `${BASE_CATEGORIAS}/consultar-lista-categorias`,
  },
};

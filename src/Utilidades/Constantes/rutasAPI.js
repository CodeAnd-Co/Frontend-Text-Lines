const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_USUARIOS = `${BASE_URL}/api/usuarios`;

export const RUTAS_API = {
  USUARIOS: {
    BASE: BASE_USUARIOS,
    CONSULTAR_LISTA: `${BASE_USUARIOS}/consultar-usuario`,
  },
};